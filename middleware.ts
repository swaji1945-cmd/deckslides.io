import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "pd_session";

async function isValidSession(token: string | undefined, secret: string) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.admin === true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Two admin panels share this guard: the old dark site's /admin/* and the
  // new light site's /light/admin/*. Each has its own login page to skip.
  const adminBase = pathname.startsWith("/light/admin") ? "/light/admin" : "/admin";
  if (!pathname.startsWith(adminBase)) return NextResponse.next();
  if (pathname === `${adminBase}/login`) return NextResponse.next();

  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    return NextResponse.redirect(new URL(`${adminBase}/login`, req.url));
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const ok = await isValidSession(token, secret);
  if (!ok) {
    const url = new URL(`${adminBase}/login`, req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/light/admin/:path*"],
};
