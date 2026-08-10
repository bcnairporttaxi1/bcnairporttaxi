import { NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateQuote, isAirport } from '@/lib/pricing';

/**
 * Road distance + fare estimate.
 *
 * The quote is always computed on the server from OSRM road distance — never
 * from a client-supplied distance — so the figure shown and the figure stored
 * on a booking cannot diverge.
 */

const OSRM = process.env.OSRM_BASE_URL ?? 'https://router.project-osrm.org';

const bodySchema = z.object({
  pickup: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  dropoff: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  pickupAt: z.iso.datetime(),
});

/** Barcelona metropolitan bounding box — pickups must start inside it. */
const CITY_BOUNDS = { minLat: 41.2, maxLat: 41.55, minLng: 1.9, maxLng: 2.35 };

function insideServiceArea(p: { lat: number; lng: number }): boolean {
  return (
    p.lat >= CITY_BOUNDS.minLat &&
    p.lat <= CITY_BOUNDS.maxLat &&
    p.lng >= CITY_BOUNDS.minLng &&
    p.lng <= CITY_BOUNDS.maxLng
  );
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
  }

  const { pickup, dropoff, pickupAt } = parsed.data;

  // City pickup only at launch. Drop-off may be anywhere.
  if (!insideServiceArea(pickup) && !isAirport(pickup)) {
    return NextResponse.json({ error: 'pickup_outside_area' }, { status: 422 });
  }

  try {
    const path = `${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}`;
    const target = new URL(`/route/v1/driving/${path}`, OSRM);
    target.searchParams.set('overview', 'full');
    target.searchParams.set('geometries', 'geojson');

    const res = await fetch(target, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) {
      return NextResponse.json({ error: 'routing_unavailable' }, { status: 502 });
    }

    const data = (await res.json()) as {
      code: string;
      routes?: Array<{
        distance: number;
        duration: number;
        geometry: { coordinates: [number, number][] };
      }>;
    };

    const route = data.routes?.[0];
    if (data.code !== 'Ok' || !route) {
      return NextResponse.json({ error: 'no_route' }, { status: 422 });
    }

    const roadKm = Math.round((route.distance / 1000) * 100) / 100;
    const durationMin = Math.round(route.duration / 60);

    const quote = calculateQuote({
      pickup,
      dropoff,
      roadKm,
      durationMin,
      pickupAt: new Date(pickupAt),
    });

    return NextResponse.json({
      quote,
      // [lng, lat] from OSRM -> [lat, lng] for Leaflet.
      geometry: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    });
  } catch {
    return NextResponse.json({ error: 'routing_unavailable' }, { status: 503 });
  }
}
