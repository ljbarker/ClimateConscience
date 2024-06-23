import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../mongoClient/client';
import TaskListModel from '@/app/models/taskList';

export async function GET(request: NextRequest, { params }: { params: { title: string } }) {
    await connectDB();
    if (!params || !params.title) {
        try {
            const data = await TaskListModel.find();
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
        const data = await TaskListModel.findOne({ title: params.title });
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
    await connectDB();
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
        await TaskListModel.updateOne({ title: taskInfo.title },
            {
                title: taskInfo.title,
                description: taskInfo.description,
                emissionsSaved: taskInfo.emissionsSaved,
                points: taskInfo.points,

            });
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