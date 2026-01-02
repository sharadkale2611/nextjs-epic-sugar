// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {

    console.log("Proxy Auth Check...");

    const accessToken = request.cookies.get("accessToken")?.value;
    const pathname = request.nextUrl.pathname;

    const isAuthPage = pathname.startsWith("/signin");

    // Not logged in → block protected pages
    if (!accessToken && !isAuthPage) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    // Logged in → block signin page
    if (accessToken && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next|favicon.ico|api|images|fonts|icons).*)",
    ],
};
