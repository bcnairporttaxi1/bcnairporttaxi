import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Address search, proxied server-side.
 *
 * Nominatim's usage policy requires an identifying User-Agent and no more than
 * one request per second. Proxying keeps that contract in one place (rather
 * than every browser hitting them directly) and lets us cache repeat lookups.
 */

const NOMINATIM =
  process.env.NOMINATIM_BASE_URL ?? 'https://nominatim.openstreetmap.org';

const USER_AGENT =
  'BCNAirportTaxi/1.0 (Barcelona airport transfer booking; contact: bookings@bcnairporttaxi.com)';

const querySchema = z.object({
  q: z.string().trim().min(3).max(200),
});

export interface GeocodeResult {
  label: string;
  lat: number;
  lng: number;
}

/** In-process cache. Survives warm invocations; nothing sensitive is stored. */
const cache = new Map<string, { at: number; results: GeocodeResult[] }>();
const CACHE_TTL_MS = 60 * 60 * 1000;
const CACHE_MAX = 500;

/** Simple global rate limiter to honour Nominatim's 1 req/sec policy. */
let lastCall = 0;
async function throttle() {
  const wait = Math.max(0, 1000 - (Date.now() - lastCall));
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastCall = Date.now();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({ q: url.searchParams.get('q') ?? '' });

  if (!parsed.success) {
    return NextResponse.json({ results: [] });
  }

  const q = parsed.data.q.toLowerCase();

  const hit = cache.get(q);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) {
    return NextResponse.json({ results: hit.results });
  }

  try {
    await throttle();

    const target = new URL('/search', NOMINATIM);
    target.searchParams.set('q', parsed.data.q);
    target.searchParams.set('format', 'jsonv2');
    target.searchParams.set('limit', '6');
    target.searchParams.set('addressdetails', '0');
    // Bias results to Catalonia so "Diagonal" finds the avenue, not Diagonal Street elsewhere.
    target.searchParams.set('countrycodes', 'es');
    target.searchParams.set('viewbox', '1.85,41.55,2.35,41.20');
    target.searchParams.set('bounded', '0');

    const res = await fetch(target, {
      headers: { 'User-Agent': USER_AGENT, 'Accept-Language': 'en' },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return NextResponse.json({ results: [], error: 'upstream' }, { status: 502 });
    }

    const raw = (await res.json()) as Array<{
      display_name: string;
      lat: string;
      lon: string;
    }>;

    const results: GeocodeResult[] = raw.map((r) => ({
      label: r.display_name,
      lat: Number(r.lat),
      lng: Number(r.lon),
    }));

    if (cache.size >= CACHE_MAX) cache.clear();
    cache.set(q, { at: Date.now(), results });

    return NextResponse.json(
      { results },
      { headers: { 'Cache-Control': 'public, max-age=3600' } },
    );
  } catch {
    return NextResponse.json({ results: [], error: 'unavailable' }, { status: 503 });
  }
}
