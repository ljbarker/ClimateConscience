import {
    DynamoDBClient,
    PutItemCommand,
    UpdateItemCommand,
    DeleteItemCommand,
    ScanCommand,
    DynamoDBClientConfig
} from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';
import Achievements from '../../../lib/userData/Achievements';

const client = new DynamoDBClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
} as DynamoDBClientConfig);

export async function GET() {
    try {
        const data = await client.send(new ScanCommand({
            TableName: process.env.USER_TABLE,
        }));
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch users: ' },
            {
                status: 500,
            }
        );
    }
}

export async function POST(request: NextRequest) {
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
                surveyResults: { S: userInfo['surveyResults'] },
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