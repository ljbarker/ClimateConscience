import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../mongoClient/client';
import UserTaskListModel from '@/app/models/userTask';

export async function GET(request: NextRequest, { params }: { params: { username: string, title: string } }) {
    await connectDB();
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
            const data = await UserTaskListModel.find({ username: params.username });
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
        const data = await UserTaskListModel.findOne({ username: params.username, title: params.title });
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
    await connectDB();
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
        await UserTaskListModel.findOneAndUpdate(
            { username: userTaskInfo['username'], title: userTaskInfo['title'] },
            {
                streak: userTaskInfo['streak'],
                maxStreak: userTaskInfo['maxStreak'],
                level: userTaskInfo['level'],
                goal: userTaskInfo['goal'],
                daysComplete: userTaskInfo['daysComplete'],
                taskEmissionsSaved: userTaskInfo['totalEmissionsSaved'],
            }
        );
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
    await connectDB();
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
        const TaskToAdd = new UserTaskListModel({
            title: userTaskInfo['title'],
            username: userTaskInfo['username'],
            streak: userTaskInfo['streak'],
            maxStreak: userTaskInfo['maxStreak'],
            level: userTaskInfo['level'],
            goal: userTaskInfo['goal'],
            daysComplete: userTaskInfo['daysComplete'],
            taskEmissionsSaved: userTaskInfo['totalEmissionsSaved'],
        });
        const taskRes = await TaskToAdd.save();
        return NextResponse.json({ taskRes, message: 'Task added successfully' });
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
    await connectDB();
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
        const taskRes = await UserTaskListModel.findOneAndDelete({ username: userTaskInfo['username'], title: userTaskInfo['title'] });
        return NextResponse.json({ taskRes, message: 'Task deleted successfully' });
    } catch {
        return NextResponse.json(
            { error: 'Failed to delete Task' },
            {
                status: 400,
            }
        );
    }
}