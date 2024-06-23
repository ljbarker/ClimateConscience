import mongoose, { Schema } from 'mongoose';

export type UserTaskList = {
    username: string;
    tasks: string[];
}

const UserTaskListSchema = new Schema<UserTaskList>({
    username: { type: String, required: true },
    tasks: { type: [String], required: true },
});

const UserTaskListModel = mongoose.models["UserTaskList"] || mongoose.model('UserTaskList', UserTaskListSchema);

export default UserTaskListModel;