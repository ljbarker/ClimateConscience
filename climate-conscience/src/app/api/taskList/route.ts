import {
    DynamoDBClient,
    UpdateItemCommand,
    ScanCommand,
    DynamoDBClientConfig,
    GetItemCommand
} from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';

const client = new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
} as DynamoDBClientConfig);

export async function GET(request: NextRequest) {
    const taskInfo = await request.json();

    if (!taskInfo['title']) {
        try {
            const data = await client.send(new ScanCommand({
                TableName: process.env.TASK_LIST_TABLE,
            }));
            return NextResponse.json(data);
        } catch {
            return NextResponse.json(
                { error: 'Failed to fetch tasks: ' },
                {
                    status: 500,
                }
            );
        }
    }

    try {
        const data = await client.send(new GetItemCommand({
            TableName: process.env.TASK_LIST_TABLE,
            Key: {
                title: { S: taskInfo['title'] },
            }
        }));
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch tasks: ' },
            {
                status: 500,
            }
        );
    }
}

export async function PATCH(request: NextRequest) {
    const taskInfo = await request.json();

    try {
        await client.send(new UpdateItemCommand({
            TableName: process.env.TASK_LIST_TABLE,
            Key: {
                title: { S: taskInfo['title'] },
            },
            AttributeUpdates: {
                numPeoplePursuing: {
                    Action: 'PUT',
                    Value: taskInfo['numPeoplePursuing'],
                },
                totalEmissionsSaved: {
                    Action: 'PUT',
                    Value: taskInfo['totalEmissionsSaved'],
                },
            },
        }));
        return NextResponse.json({ message: 'Task updated successfully' });
    } catch {
        return NextResponse.json(
            { error: 'Failed to update Task' },
            {
                status: 400,
            }
        );
    }
}