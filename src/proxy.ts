import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, verifyToken } from "@/lib/auth/token";

/**
 * Route guard for the admin area (Next.js 16 renamed `middleware` to `proxy`).
 * Pages and server actions re-check the session themselves — this only keeps
 * signed-out visitors from ever rendering the admin shell.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  let session = null;
  try {
    session = verifyToken(request.cookies.get(SESSION_COOKIE)?.value);
  } catch {
    // AUTH_SECRET missing/invalid — treat the request as signed out.
    session = null;
  }

  if (pathname.startsWith("/admin") && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && session) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
