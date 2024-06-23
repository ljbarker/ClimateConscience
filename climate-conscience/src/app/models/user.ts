import mongoose, { Schema } from 'mongoose';

export type User = {
    name: string;
    username: string;
    password: string;
    totalEmmisionsSaved: number;
    longestStreak: number;
    tasks: string[];
}

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    totalEmmisionsSaved: { type: Number, required: true, default: 0 },
    longestStreak: { type: Number, required: true, default: 0 },
    tasks: { type: [String], required: true, default: [] },
});

const UserModel = mongoose.models["User"] || mongoose.model('User', userSchema);

export default UserModel;