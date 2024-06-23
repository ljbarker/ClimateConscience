import mongoose, { Schema } from 'mongoose';

export type TaskList = {
    tasks: string[];
}

const TaskListSchema = new Schema<TaskList>({
    tasks: { type: [], required: true },
});

const TaskListModel = mongoose.models["TaskList"] || mongoose.model('TaskList', TaskListSchema);

export default TaskListModel;