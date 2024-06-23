import mongoose, { Schema } from 'mongoose';
import Task from './task';

export type TaskList = {
    tasks: string[];
}

const TaskListSchema = new Schema<TaskList>({
    tasks: { type: [Task], required: true },
});

const TaskListModel = mongoose.models["TaskList"] || mongoose.model('TaskList', TaskListSchema);

export default TaskListModel;