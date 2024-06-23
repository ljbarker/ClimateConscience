import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../mongoClient/client';
import SurveyModel from '@/app/models/survey';

export async function GET(request: NextRequest, { params }: { params: { usernameDate: string } }) {
    await connectDB();
    if (!params || !params.usernameDate) {
        return NextResponse.json(
            { error: 'No survey info provided' },
            {
                status: 400,
            }
        );
    }

    try {
        const data = await SurveyModel.findOne({ usernameDate: params.usernameDate });
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
    await connectDB();
    if (!request.body) {
        return NextResponse.json(
            { error: 'No survey info provided' },
            {
                status: 400,
            }
        );
    }

    const userSurveyInfo = await request.json();
    const surveyToAdd = new SurveyModel({
        usernameDate: userSurveyInfo['username'] + "_" + Date(),
        numInHousehold: userSurveyInfo['numInHousehold'],
        primaryHeatSource: userSurveyInfo['primaryHeatSource'],
        numVehicles: userSurveyInfo['numVehicles'],
        regularMaintainence: userSurveyInfo['regularMaintainence'],
        amountNaturalGas: userSurveyInfo['amountNaturalGas'],
        amountElectricity: userSurveyInfo['amountElectricity'],
        usesGreenPower: userSurveyInfo['usesGreenPower'],
        percentageGreenPower: userSurveyInfo['percentageGreenPower'],
        amountOil: userSurveyInfo['amountOil'],
        amountPropane: userSurveyInfo['amountPropane'],
        recyclesAluSteel: userSurveyInfo['recyclesAluSteel'],
        recyclesPlastic: userSurveyInfo['recyclesPlastic'],
        recyclesGlass: userSurveyInfo['recyclesGlass'],
        recyclesNewspaper: userSurveyInfo['recyclesNewspaper'],
        recyclesMagazines: userSurveyInfo['recyclesMagazines'],
    });

    try {
        const mongoRes = await surveyToAdd.save();
        return NextResponse.json({ mongoRes, message: 'Survey added successfully' });
    } catch {
        return NextResponse.json(
            { error: 'Failed to add survey' },
            {
                status: 400,
            }
        );
    }
}