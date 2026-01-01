// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    // Read cookies from the request header
    console.log("Middleware: Checking authentication via cookies ...");

    const cookieHeader = request.headers.get("cookie") || "";
    console.log("flag: 1");
    const hasToken = cookieHeader.includes("accessToken=");
    console.log("flag: 2");
    const pathname = request.nextUrl.pathname;
    console.log("flag: 3");
    const isAuthPage = pathname.startsWith("/signin");
    console.log("flag: 4");

    // Redirect to login if no token on protected pages
    if (!hasToken && !isAuthPage) {
        console.log("flag: 5", { hasToken , isAuthPage });

        return NextResponse.redirect(new URL("/signin", request.url));
    }
    console.log("flag: 6");


    // Redirect to home if already logged in and visiting login page
    if (hasToken && isAuthPage) {
        console.log("flag: 7");

        return NextResponse.redirect(new URL("/", request.url));
    }
    console.log("flag: 8");

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Apply middleware to all pages except Next.js internals, API routes, and static assets
        "/((?!_next|favicon.ico|api|images|fonts|icons).*)",
    ],
};
