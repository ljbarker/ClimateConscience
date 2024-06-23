import { S3Client } from '@aws-sdk/client-s3'; // Use the appropriate AWS SDK module
import { InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'; // Placeholder, replace with actual import when available

const MAX_TOKENS = 4096;
const CHARS_PER_TOKEN = 3.5;

interface InvokeResponse {
  text: string;
  stop_reason: string;
}

interface S3ClientConfig {
  requestTimeout: number,
  connectTimeout: number,
  maxRetries: number
}

export async function invokeLLM(prompt: string): Promise<InvokeResponse> {
  // Increase read timeout to avoid early timeouts
  const config: S3ClientConfig = {
    requestTimeout: 1000000,
    connectTimeout: 100000,
    maxRetries: 2
  };

  // Initialize the Amazon Bedrock runtime client
  const client = new S3Client(config); // Replace with actual Bedrock runtime client initialization

  // Set parameters
  const maxTokens = MAX_TOKENS;
  const temperature = 0;
  const topP = 1;
  const modelId = "anthropic.claude-3-sonnet-20240229-v1:0";

  // Construct the request payload
  const requestBody = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: maxTokens,
    temperature: temperature,
    top_p: topP,
    stop_sequences: ["\n\nHuman:"],
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: prompt }],
      }
    ]
  };

  try {
    // Invoke Claude 3 with the text prompt
    const command = new InvokeModelCommand({
      modelId: modelId,
      body: JSON.stringify(requestBody)
    });

    const response = await client.send(command);
    const result = JSON.parse(new TextDecoder().decode(response.Body));

    const outputList = result.content;
    const stopReason = result.stop_reason;

    // We only expect one response, get the first one
    const output = outputList[0];

    return { text: output.text, stop_reason: stopReason };
  } catch (err) {
    console.error(err);
    return { text: "", stop_reason: "" };
  }
}

export async function invokeUntilCompletion(prompt: string): Promise<string> {
  let responseObj = await invokeLLM(prompt);
  let response = responseObj.text;
  let stopReason = responseObj.stop_reason;

  while (stopReason === "max_tokens") {
    responseObj = await invokeLLM(`${prompt}\n Continue from: ${response}\n`);
    response = responseObj.text;
    stopReason = responseObj.stop_reason;
  }

  return response;
}

export function fitsTokenLimit(prompt: string): boolean {
  const count = prompt.length;
  const numTokens = Math.floor(count / CHARS_PER_TOKEN);
  return numTokens <= MAX_TOKENS * 2;
}

export function makePrompt(promptList: [string, string], template: string, document: string): string {
  const humanTag = "Human: ";
  const assistantTag = "Assistant:";
  
  const [prePrompt, postPrompt] = promptList;
  const prompt = `${document}\n\n${humanTag}${prePrompt}\n\n${template}\n\n${postPrompt}\n\n${assistantTag}`;
  
  return prompt;
}

