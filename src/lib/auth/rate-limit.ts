import "server-only";

/**
 * Small in-memory fixed-window limiter. Enough to stop password guessing on a
 * single-node deployment; swap for Redis if you ever run more than one
 * instance.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  const retryAfterSeconds = Math.ceil((bucket.resetAt - now) / 1000);

  if (bucket.count > limit) {
    return { ok: false, remaining: 0, retryAfterSeconds };
  }

  return { ok: true, remaining: limit - bucket.count, retryAfterSeconds };
}

export function resetRateLimit(key: string): void {
  buckets.delete(key);
}

/** Best-effort client identifier from proxy headers. */
export function clientKey(headers: Headers, prefix: string): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || headers.get("x-real-ip") || "local";
  return `${prefix}:${ip}`;
}
