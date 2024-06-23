import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile", "/api/users", "/api/tasks", "/api/userTasks", "/api/taskList"];


export default function middleware(req: NextRequest) {
    let isAuthenticated = false;
    const authHeader = req.headers.get("authorization");
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("No token received in  middleware");
    } else {
        jwt.verify(
            token,
            process.env.TOKEN_SECRET as jwt.Secret,
            (error: any, decoded: any) => {
                if (decoded) {
                    isAuthenticated = true;
                } else {
                    console.log("JWT error:", error);
                }
            },
        );
    }

    if (!isAuthenticated && protectedRoutes.filter((route) => req.nextUrl.pathname.startsWith(route)).length) {
        const absoluteURL = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}