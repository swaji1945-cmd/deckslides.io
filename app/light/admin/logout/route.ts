import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  await clearSessionCookie();
  return NextResponse.redirect(new URL("/light/admin/login", req.url));
}

export async function GET(req: Request) {
  return POST(req);
}
