import { NextRequest, NextResponse } from 'next/server';
import { generateAccessToken, hashPassword, matchPassword } from '@/auth/auth';
import connectDB from "../../../mongoClient/client";



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
            userRes = await fetch(`${process.env.SITE_URL}/api/users`, {
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
        console.log("Existing user:", existingUser);

        if (existingUser == null) {
            // invalid username
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 },
            );
        } else {
            try {
                console.log("Comparing passwords");
                console.log(creds.password, existingUser.password);
                const matched = matchPassword(creds.password, existingUser.password);
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
        console.log(`${process.env.SITE_URL}/api/users/${creds.username}`);
        try {
            const existingUser = await fetch(`${process.env.SITE_URL}/api/users/${creds.username}`, {
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
            let hashedPassword = hashPassword(creds.password);
            const token = await generateAccessToken(creds.username);
            const newUser = {
                username: creds.username,
                password: hashedPassword,
                name: creds.name,
            };
            console.log("trying to post new user");
            await fetch(`${process.env.SITE_URL}/api/users`, {
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