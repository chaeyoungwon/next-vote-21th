import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  // 로그인 페이지 접근 시 리다이렉트
  if (pathname === "/login") {
    if (refreshToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  //  /vote 하위 경로 접근 시 비로그인 유저는 로그인 페이지로 리다이렉트
  if (pathname.startsWith("/vote")) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/vote", "/vote/:path*"],
};
