// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    const pathname = request.nextUrl.pathname;

    const isAuthPage = pathname.startsWith("/signin");

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        "/((?!_next|favicon.ico|api|images|fonts|icons).*)",
    ],
};
