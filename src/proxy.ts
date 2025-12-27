import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;
    const pathname = request.nextUrl.pathname;

    const isAuthPage = pathname.startsWith("/signin");

    // ❌ Not logged in → block protected routes
    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    // ✅ Logged in → block auth pages
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
