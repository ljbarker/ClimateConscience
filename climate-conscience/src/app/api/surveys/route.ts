import {
    PutItemCommand,
    ScanCommand,
    GetItemCommand
} from '@aws-sdk/client-dynamodb';
import { NextRequest, NextResponse } from 'next/server';
import { client } from '../../../dynamo/client';

export async function GET(request: NextRequest, { params }: { params: { usernameDate: string } }) {
    if (!params || !params.usernameDate) {
        return NextResponse.json(
            { error: 'No survey info provided' },
            {
                status: 400,
            }
        );
    }

    try {
        const data = await client.send(new GetItemCommand({
            TableName: process.env.SURVEY_TABLE,
            Key: {
                usernameDate: { S: params.usernameDate },
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
    if (!request.body) {
        return NextResponse.json(
            { error: 'No survey info provided' },
            {
                status: 400,
            }
        );
    }

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