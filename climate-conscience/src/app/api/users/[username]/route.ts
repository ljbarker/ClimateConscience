import { NextRequest, NextResponse } from 'next/server';
import User from '../../../models/user';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    console.log(params.username + " getting a user by name");
    if (!params || !params.username) {
        return NextResponse.json(
            { error: 'No user info provided' },
            {
                status: 400,
            }
        );
    }
    try {
        const data = await User.findOne({ username: params.username });
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to fetch user: ', message: error, },
            {
                status: 500,

            }
        );
    }
}

export async function POST(request: NextRequest, { params }: { params: { username: string } }) {
    if (!request.body) {
        return NextResponse.json(
            { error: 'No user info provided' },
            {
                status: 400,
            }
        );
    }
    const userInfo = await request.json();
    const existingUser = await User.findOne({ username: params.username });
    if (existingUser) {
        return NextResponse.json(
            { error: 'User already exists' },
            {
                status: 400,
            }
        );
    }
    const userToAdd = new User({ name: userInfo.name, username: params.username, password: userInfo.password, totalEmissionsSaved: userInfo.totalEmissionsSaved, longestStreak: userInfo.longestStreak, tasks: userInfo.tasks });
    try {
        const mongores = await userToAdd.save();
        return NextResponse.json({ result: mongores, message: 'User created successfully' });
    } catch (error) {
        console.error(error);
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
        const mongoRes = await User.findOneAndUpdate({ username: userInfo.username },
            {
                $set: {
                    totalEmissionsSaved: userInfo.totalEmissionsSaved,
                    longestStreak: userInfo.longestStreak,
                    tasks: userInfo.tasks
                }
            },
            { new: true });
        return NextResponse.json({ mongoRes, message: 'User updated successfully' });
    } catch {
        return NextResponse.json(
            { error: 'Failed to update user' },
            {
                status: 400,
            }
        );
    }
}