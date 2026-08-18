import 'server-only';

/**
 * Fixed-window rate limiting, held in process memory.
 *
 * A deliberate compromise, and worth being clear about what it does and does
 * not buy. On serverless each instance keeps its own counters, so a determined
 * attacker spread across enough cold starts gets more than the nominal limit.
 * What it does stop is the realistic case: one script hammering one endpoint
 * from one address, which is what would get our IP banned from the free
 * Nominatim and OSRM services or fill the bookings table with junk.
 *
 * Moving to a shared store later means replacing this file and nothing else.
 */

interface Window {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Window>();

/** Stops the map growing without bound on a long-lived instance. */
function sweep(now: number) {
  if (buckets.size < 5_000) return;
  for (const [key, w] of buckets) {
    if (w.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  const remaining = limit - existing.count;
  return {
    ok: remaining >= 0,
    remaining: Math.max(0, remaining),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

/**
 * Best-effort client address.
 *
 * `x-forwarded-for` is only trustworthy because Vercel rewrites it at the
 * edge; the leftmost entry is the real client there. Behind a different proxy
 * this would need revisiting, hence taking it from a single place.
 */
export function clientKey(request: Request, scope: string): string {
  const fwd = request.headers.get('x-forwarded-for');
  const ip = fwd?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  return `${scope}:${ip}`;
}

/** The 429 body and headers, so every route answers the same way. */
export function tooManyRequests(result: RateLimitResult): Response {
  return new Response(JSON.stringify({ error: 'rate_limited' }), {
    status: 429,
    headers: {
      'Content-Type': 'application/json',
      'Retry-After': String(result.retryAfterSeconds),
    },
  });
}
