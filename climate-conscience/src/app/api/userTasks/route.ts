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
import { client } from '../../../dynamo/client';

export async function GET(request: NextRequest, { params }: { params: { username: string, title: string } }) {
    if (!params || params.username) {
        return NextResponse.json(
            { error: 'No username provided' },
            {
                status: 400,
            }
        );
    }

    if (!params.title) {
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
                title: { S: params.username },
                username: { S: params.title },
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
    if (!request.body) {
        return NextResponse.json(
            { error: 'No task info provided' },
            {
                status: 400,
            }
        );
    }
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
    if (!request.body) {
        return NextResponse.json(
            { error: 'No task info provided' },
            {
                status: 400,
            }
        );
    }

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
    if (!request.body) {
        return NextResponse.json(
            { error: 'No task info provided' },
            {
                status: 400,
            }
        );
    }

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