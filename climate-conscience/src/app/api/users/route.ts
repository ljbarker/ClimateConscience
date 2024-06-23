import {
    DynamoDBClient,
    PutItemCommand,
    ScanCommand,
    DynamoDBClientConfig,
    UpdateItemCommand,
    GetItemCommand
} from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';
import Achievements from '../../../lib/userData/Achievements';
import { client } from '../../../dynamo/client';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    if (!params || !params.username) {
        return NextResponse.json(
            { error: 'No user info provided' },
            {
                status: 400,
            }
        );
    }
    try {
        const data = await client.send(new GetItemCommand({
            TableName: process.env.USER_TABLE,
            Key: { username: { S: params.username } },
        }));
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch user: ' },
            {
                status: 500,
            }
        );
    }
}

export async function POST(request: NextRequest) {
    if (!request.body) {
        return NextResponse.json(
            { error: 'No user info provided' },
            {
                status: 400,
            }
        );
    }
    const userInfo = await request.json();

    try {
        await client.send(new PutItemCommand({
            TableName: process.env.USER_TABLE,
            Item: {
                username: { S: userInfo['username'] },
                password: { S: userInfo['password'] },
                name: { S: userInfo['name'] },
                totalEmmisionsSaved: { N: '0' },
                longestStreak: { N: '0' },
                tasks: { L: [] },
                achievements: { S: JSON.stringify(Achievements) },
            },
        }));
        return NextResponse.json({ message: 'User created successfully' });
    } catch {
        return NextResponse.json(
            { error: 'Failed to create user' },
            {
                status: 400,
            }
        );
    }
}

export async function PATCH(request: NextRequest) {
    if (!request.body) {
        return NextResponse.json(
            { error: 'No user info provided' },
            {
                status: 400,
            }
        );
    }

    const userInfo = await request.json();

    try {
        await client.send(new UpdateItemCommand({
            TableName: process.env.USER_TABLE,
            Key: {
                username: { S: userInfo['username'] },
            },
            AttributeUpdates: {
                totalEmmisionsSaved: {
                    Action: 'PUT',
                    Value: userInfo['totalEmmisionsSaved'],
                },
                longestStreak: {
                    Action: 'PUT',
                    Value: userInfo['longestStreak'],
                },
                tasks: {
                    Action: 'PUT',
                    Value: userInfo['tasks'],
                },
                achievements: {
                    Action: 'PUT',
                    Value: userInfo['achievements'],
                },
            },
        }));
        return NextResponse.json({ message: 'User updated successfully' });
    } catch {
        return NextResponse.json(
            { error: 'Failed to update user' },
            {
                status: 400,
            }
        );
    }
}