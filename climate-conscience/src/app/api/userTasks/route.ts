import {
    DynamoDBClient,
    PutItemCommand,
    UpdateItemCommand,
    DeleteItemCommand,
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
    const userTaskInfo = await request.json();

    if (!userTaskInfo['username']) {
        return NextResponse.json(
            { error: 'No username provided' },
            {
                status: 400,
            }
        );
    }

    if (!userTaskInfo['title']) {
        try {
            const data = await client.send(new ScanCommand({
                TableName: process.env.TASK_LIST_TABLE,
            }));
            return NextResponse.json(data);
        } catch {
            return NextResponse.json(
                { error: 'Failed to fetch user\'s tasks: ' },
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
                title: { S: userTaskInfo['title'] },
                username: { S: userTaskInfo['username'] },
            }
        }));
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch user\'s tasks: ' },
            {
                status: 500,
            }
        );
    }
}

export async function PATCH(request: NextRequest) {
    const userTaskInfo = await request.json();

    try {
        await client.send(new UpdateItemCommand({
            TableName: process.env.TASK_LIST_TABLE,
            Key: {
                title: { S: userTaskInfo['title'] },
                username: { S: userTaskInfo['username'] },
            },
            AttributeUpdates: {
                streak: {
                    Action: 'PUT',
                    Value: userTaskInfo['streak'],
                },
                maxStreak: {
                    Action: 'PUT',
                    Value: userTaskInfo['maxStreak'],
                },
                level: {
                    Action: 'PUT',
                    Value: userTaskInfo['level'],
                },
                goal: {
                    Action: 'PUT',
                    Value: userTaskInfo['goal'],
                },
                daysComplete: {
                    Action: 'PUT',
                    Value: userTaskInfo['daysComplete'],
                },
                taskEmissionsSaved: {
                    Action: 'PUT',
                    Value: userTaskInfo['totalEmissionsSaved'],
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

export async function POST(request: NextRequest) {
    const userTaskInfo = await request.json();

    try {
        await client.send(new PutItemCommand({
            TableName: process.env.TASK_LIST_TABLE,
            Item: {
                title: { S: userTaskInfo['title'] },
                username: { S: userTaskInfo['username'] },
                streak: { N: userTaskInfo['streak'] },
                maxStreak: { N: userTaskInfo['maxStreak'] },
                level: { N: userTaskInfo['level'] },
                goal: { N: userTaskInfo['goal'] },
                daysComplete: { N: userTaskInfo['daysComplete'] },
                taskEmissionsSaved: { N: userTaskInfo['totalEmissionsSaved'] },
            },
        }));
        return NextResponse.json({ message: 'Task added successfully' });
    } catch {
        return NextResponse.json(
            { error: 'Failed to add Task' },
            {
                status: 400,
            }
        );
    }
}

export async function DELETE(request: NextRequest) {
    const userTaskInfo = await request.json();

    try {
        await client.send(new DeleteItemCommand({
            TableName: process.env.TASK_LIST_TABLE,
            Key: {
                title: { S: userTaskInfo['title'] },
                username: { S: userTaskInfo['username'] },
            },
        }));
        return NextResponse.json({ message: 'Task deleted successfully' });
    } catch {
        return NextResponse.json(
            { error: 'Failed to delete Task' },
            {
                status: 400,
            }
        );
    }
}