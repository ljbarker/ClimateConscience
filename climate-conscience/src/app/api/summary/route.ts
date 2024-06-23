import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const key  = process.env.ANTHROPIC_API_KEY
    let responses = await req.json();
    responses = responses.responses;
    console.log(key, responses)

    const anthropic = new Anthropic({
      apiKey: key,
    });
  
    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0,
      system: "Respond as a polite assistant giving advice to users on how to improve their impact on the climate. If you must refer to yourself, please use the collective we",
      messages: [
          {
          "role": "user",
          "content": [
              {
              "type": "text",
              "text": `How can I improve my impact on the climate based on my survey results? Survey results: ${JSON.stringify(responses)}`
              }
          ]
          }
      ]
    });
    console.log(msg);

    return NextResponse.json(msg, {status: 200});
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}