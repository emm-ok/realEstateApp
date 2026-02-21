import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const { pathname, search } = req.nextUrl;

  // 🔐 If no token → redirect to login
  if (!accessToken) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname + search);
    return NextResponse.redirect(url);
  }

  // 🔎 Verify token
  const payload = await verifyToken(accessToken);

  if (!payload || !payload.role) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }

  const userRole = payload.role as string;

  // 🧠 Role-Based Dashboard Protection
  if (pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/dashboard/user") && userRole !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/dashboard/agent") && userRole !== "agent") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    pathname.startsWith("/dashboard/company-admin") &&
    userRole !== "company-admin"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/agent-application/:path*",
    "/become-agent/:path*",
    "/company-application/:path*",
    "/create-company/:path*",
    "/settings/:path*",
  ],
};
