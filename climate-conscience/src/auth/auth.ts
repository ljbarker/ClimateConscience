import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// Middleware to authenticate user using JWT
export function authenticateUser(req: NextRequest, res: NextResponse, next: any) {
    const authHeader = req.headers.get("authorization");
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("No token received");
        return NextResponse.json(
            { error: "Unauthorized: No token received" },
            { status: 401 },
        )
    } else {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET as jwt.Secret,
            (error, decoded) => {
                if (decoded) {
                    next();
                } else {
                    console.log("JWT error:", error);
                    return NextResponse.json(
                        { error: "Unauthorized: Invalid token" },
                        { status: 401 },
                    );
                }
            },
        );
    }
}

// Controller function to handle user login
export const loginUser = async (req: NextRequest, res: NextResponse) => {
    const userInfo = await req.json(); // from form
    let userRes: Response;
    try {
        userRes = await fetch("/api/users", {
            method: "GET",
            body: JSON.stringify(userInfo['username']),
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
            console.log(userInfo['password'], existingUser.password);
            const matched = await bcrypt.compare(userInfo['password'], existingUser.password);
            console.log("Password matched:", matched);
            if (matched) {
                const token = await generateAccessToken(userInfo['username']);
                console.log("Token generated:", token);
                return NextResponse.json({ existingUser, token });
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
};

// Function to generate a JWT access token
function generateAccessToken(username: any) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { username: username },
            process.env.TOKEN_SECRET as jwt.Secret,
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

export { generateAccessToken };