import {
    DynamoDBClient,
    PutItemCommand,
    UpdateItemCommand,
    DeleteItemCommand,
    ScanCommand
} from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';

const client = new DynamoDBClient({ region: 'us-east-1' });

export async function GET() {
    try {
        const data = await client.send(new ScanCommand({
            TableName: 'Users',
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
    const { /*...*/ } = await request.json();

    try {
        await client.send(new PutItemCommand({
            TableName: 'Users',
            Item: {
                /*...*/: { S: /*...*/ },
                /*...*/: { S: /*...*/ },
                /*...*/: { S: /*...*/ },
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