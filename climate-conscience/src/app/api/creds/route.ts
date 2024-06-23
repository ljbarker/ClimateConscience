import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from "../../../mongoClient/client";
import { generateAccessToken } from "../../../auth/auth";

export async function POST(request: NextRequest) {
    await connectDB();
    if (!request.body) {
        return NextResponse.json(
            { error: 'Not enough info provided' },
            {
                status: 400,
            }
        );
    }
    let userRes: Response;
    let creds = await request.json();

    if (creds.mode === "login") {
        console.log("Logging in...");
        try {
            userRes = await fetch(`http://localhost:3000/api/users`, {
                method: "GET",
                body: JSON.stringify(creds.username),
            });
        } catch (error) {
            console.log("Failed to find user");
            return NextResponse.json(
                { error: "Failed to find user" },
                { status: 500 },
            );
        }
        const existingUser = await userRes.json();

        if (existingUser == null) {
            // invalid username
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        } else {
            try {
                console.log("Comparing passwords");
                const matched = await bcrypt.compare(creds.password, existingUser.password);
                console.log("Password matched:", matched);
                if (matched) {
                    const token = await generateAccessToken(creds.username);
                    console.log("Token generated:", token);
                    return NextResponse.json({ status: 201, existingUser, token });
                } else {
                    // invalid password
                    console.log("Invalid password");
                    return NextResponse.json("Unauthorized: Invalid password");
                }
            } catch (error) {
                console.log("Failed to authenticate user");
                return NextResponse.json("Unauthorized: Failed to authenticate user");
            }
        }
    } else if (creds.mode === "signup") {
        console.log("Signing up...");
        try {
            const existingUser = await fetch(`http://localhost:3000/api/users/api/users/${creds.username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (existingUser.status === 500) {
                return NextResponse.json(
                    { error: "User already exists" },
                    { status: 400 },
                );
            }
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = "";
            let token: any;
            if (salt) {
                hashedPassword = await bcrypt.hash(creds.password, salt);
                token = await generateAccessToken(creds.username);
            }

            const newUser = {
                username: creds.username,
                password: hashedPassword,
                name: creds.name,
            };
            await fetch(`http://localhost:3000/api/users/${newUser.username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            return NextResponse.json({ status: 201, token });
        } catch (error) {
            console.log("Failed to create user: " + error);
            return NextResponse.json(
                { error: "Failed to create user: " + error },
                { status: 400 },
            );
        }

    } else {
        return NextResponse.json(
            { error: 'Invalid mode provided' },
            {
                status: 400,
            }
        );
    }
}