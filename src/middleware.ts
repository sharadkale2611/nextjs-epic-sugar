import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const cookieHeader = request.headers.get("cookie") || "";
    const hasToken = cookieHeader.includes("accessToken=");

    const pathname = request.nextUrl.pathname;
    const isAuthPage = pathname.startsWith("/signin");

    if (!hasToken && !isAuthPage) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (hasToken && isAuthPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next|favicon.ico|api|images|fonts|icons).*)",
    ],
};
