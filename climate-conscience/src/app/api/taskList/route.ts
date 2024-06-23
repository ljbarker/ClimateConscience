import {
    DynamoDBClient,
    UpdateItemCommand,
    ScanCommand,
    DynamoDBClientConfig,
    GetItemCommand
} from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../dynamo/client';

export async function GET(request: NextRequest, { params }: { params: { title: string } }) {
    if (!params || !params.title) {
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
                title: { S: params.title },
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
    if (!request.body) {
        return NextResponse.json(
            { error: 'No task info provided' },
            {
                status: 400,
            }
        );
    }

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