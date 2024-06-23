import mongoose from "mongoose";
import { NextResponse } from "next/server";

const url: string = process.env.MONGODB_URI as string;
let connection: typeof mongoose;

/**
 * Makes a connection to a MongoDB database. If a connection already exists, does nothing
 * Call this function before all api routes
 * @returns {Promise<typeof mongoose>}
 */
const connectDB = async () => {
    console.log("Checking database connection...");
    if (!connection) {
        console.log("Connecting to database...");
        console.log(url);
        try {
            connection = await mongoose.connect(url);
            return NextResponse.json(connection);
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: "Failed to connect to database" }, { status: 500 });
        }
    }
};

export default connectDB;