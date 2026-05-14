import { NextRequest, NextResponse } from "next/server";

const authCookieName = "tw_session";
const protectedRoutes = [
  "/dashboard",
  "/qr-manager",
  "/nfc-manager",
  "/analytics",
  "/campaigns",
  "/qr-customizer",
  "/client-portal",
];

function isProtected(pathname: string) {
  return protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!isProtected(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(authCookieName)?.value;
  if (token) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/qr-manager/:path*",
    "/nfc-manager/:path*",
    "/analytics/:path*",
    "/campaigns/:path*",
    "/qr-customizer/:path*",
    "/client-portal/:path*",
  ],
};
