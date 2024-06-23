import { NextResponse } from "next/server";
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Controller function to handle user login
export const loginUser = async (creds: { username: string, password: string }) => {
    let userRes: Response;
    try {
        userRes = await fetch(`/api/users/${creds.username}`, {
            method: "GET",
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
            const matched = await bycrypt.compare(creds.password, existingUser.password);
            console.log("Password matched:", matched);
            if (matched) {
                const token = await generateAccessToken(creds.username);
                return NextResponse.json({ existingUser, token });
            } else {
                // invalid password
                console.log("Invalid password");
                return NextResponse.json("Unauthorized: Invalid password");
            }
        } catch (error) {
            console.log("Failed to authenticate user: ", error);
            return NextResponse.json("Unauthorized: Failed to authenticate user");
        }
    }
};

export function generateAccessToken(username: any) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username },
            process.env.NEXT_PUBLIC_TOKEN_SECRET as jwt.Secret,
            { expiresIn: "1d" },
            (error: Error | null, token: string | undefined) => {
                if (error) {
                    reject(error);
                } else if (token) {
                    resolve(token);
                } else {
                    reject(new Error("Token generation failed"));
                }
            },
        );
    });
}