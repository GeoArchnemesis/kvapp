import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Optimistic cookie-presence check ONLY (decodes the JWT session cookie,
// no database round-trip) — per CLAUDE.md, proxy.ts is NOT the real
// authorization boundary for /admin. Every admin Server Action and Route
// Handler re-checks via lib/domain/admin/session.ts's verifySession().
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  if (pathname.startsWith("/admin") && !isLoginPage && !req.auth) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
