import mongoose, { Schema } from 'mongoose';

export type Task = {
    title: string;
    description: string;
    points: number;
    emissionsSaved: number;
    user: string;
}

const TaskSchema = new Schema<Task>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    points: { type: Number, required: true },
    emissionsSaved: { type: Number, required: true },
});

const TaskModel = mongoose.models["Task"] || mongoose.model('Task', TaskSchema);

export default TaskModel;