import jwt from "jsonwebtoken";
import { randomBytes, scryptSync } from 'crypto';
import { NextRequest, NextResponse } from "next/server";

// Middleware to authenticate user using JWT
export function authenticateUser(req: NextRequest, res: NextResponse, next: any) {
    const authHeader = req.headers.get("authorization");
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("No token received");
        return NextResponse.json(
            { error: "Unauthorized: No token received in Auth.js" },
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

// Pass the password string and get hashed password back
// ( and store only the hashed string in your database)
const encryptPassword = (password: string, salt: string) => {
    return scryptSync(password, salt, 32).toString('hex');
};

/**
 * Hash password with random salt
 * @return {string} password hash followed by salt
 *  XXXX till 64 XXXX till 32
 *
 */
export const hashPassword = (password: string): string => {
    // Any random string here (ideally should be at least 16 bytes)
    const salt = randomBytes(16).toString('hex');
    return encryptPassword(password, salt) + salt;
};

// fetch the user from your db and then use this function

/**
 * Match password against the stored hash
 */
export const matchPassword = (password: string, hash: string): Boolean => {
    // extract salt from the hashed string
    // our hex password length is 32*2 = 64
    const salt = hash.slice(64);
    const originalPassHash = hash.slice(0, 64);
    const currentPassHash = encryptPassword(password, salt);
    return originalPassHash === currentPassHash;
};