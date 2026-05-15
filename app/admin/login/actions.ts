"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { setSessionCookie, verifyPassword } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0].trim() ||
    h.get("x-real-ip") ||
    "local";

  const rate = checkRateLimit(`login:${ip}`, { max: 5, windowMs: 60_000 });
  if (!rate.ok) {
    return { error: `Too many attempts. Try again in ${Math.ceil(rate.retryAfterMs / 1000)}s.` };
  }

  if (!password) {
    return { error: "Enter your password." };
  }

  const ok = await verifyPassword(password);
  if (!ok) {
    return { error: "Wrong password." };
  }

  await setSessionCookie();
  redirect(next || "/admin");
}
