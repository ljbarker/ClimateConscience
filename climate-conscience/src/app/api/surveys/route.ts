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
    const surveyInfo = await request.json();

    if (!surveyInfo['usernameDate']) {
        try {
            const data = await client.send(new ScanCommand({
                TableName: process.env.SURVEY_TABLE,
            }));
            return NextResponse.json(data);
        } catch {
            return NextResponse.json(
                { error: 'Failed to fetch surveys: ' },
                {
                    status: 500,
                }
            );
        }
    }

    try {
        const data = await client.send(new GetItemCommand({
            TableName: process.env.SURVEY_TABLE,
            Key: {
                usernameDate: { S: surveyInfo['usernameDate'] },
            }
        }));
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch survey: ' },
            {
                status: 500,
            }
        );
    }
}

export async function POST(request: NextRequest) {
    const userSurveyInfo = await request.json();

    try {
        await client.send(new PutItemCommand({
            TableName: process.env.SURVEY_TABLE,
            Item: {
                usernameDate: { S: userSurveyInfo['username'] + "_" + Date() },
                numInHousehold: { N: userSurveyInfo['numInHousehold'] },
                primaryHeatSource: { N: userSurveyInfo['primaryHeatSource'] },
                numVehicles: { N: userSurveyInfo['numVehicles'] },
                regularMaintainence: { N: userSurveyInfo['regularMaintainence'] },
                amountNaturalGas: { N: userSurveyInfo['amountNaturalGas'] },
                amountElectricity: { N: userSurveyInfo['amountElectricity'] },
                usesGreenPower: { N: userSurveyInfo['usesGreenPower'] },
                percentageGreenPower: { N: userSurveyInfo['percentageGreenPower'] },
                amountOil: { N: userSurveyInfo['amountOil'] },
                amountPropane: { N: userSurveyInfo['amountPropane'] },
                recyclesAluSteel: { N: userSurveyInfo['recyclesAluSteel'] },
                recyclesPlastic: { N: userSurveyInfo['recyclesPlastic'] },
                recyclesGlass: { N: userSurveyInfo['recyclesGlass'] },
                recyclesNewspaper: { N: userSurveyInfo['recyclesNewspaper'] },
                recyclesMagazines: { N: userSurveyInfo['recyclesMagazines'] },
            },
        }));
        return NextResponse.json({ message: 'Survey added successfully' });
    } catch {
        return NextResponse.json(
            { error: 'Failed to add survey' },
            {
                status: 400,
            }
        );
    }
}