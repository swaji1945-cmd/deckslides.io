/**
 * Simple in-memory IP rate limiter — works for single-instance dev.
 * On Vercel (multi-instance), swap to Vercel KV using the same interface.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function checkRateLimit(ip: string, opts = { max: 5, windowMs: 60_000 }): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, retryAfterMs: 0 };
  }
  if (b.count >= opts.max) {
    return { ok: false, retryAfterMs: b.resetAt - now };
  }
  b.count += 1;
  return { ok: true, retryAfterMs: 0 };
}
