import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const accessToken = req.cookies.get("accessToken")?.value;

    if(!accessToken){
        const url = new URL("/login", req.url);
        url.searchParams.set("redirect", req.nextUrl.pathname + req.nextUrl.search);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/account/:path*",
    ]
}