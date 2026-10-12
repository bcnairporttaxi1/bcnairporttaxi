/**
 * Checks the curated pickup points against Nominatim.
 *
 * `places.test.ts` proves each coordinate falls in the right tariff zone,
 * which is what protects the price. It cannot prove the pin is where the
 * passenger expects the car to be — a point 400 m from the Terminal 1 kerb is
 * still "the airport" to the pricing engine but sends the driver to the wrong
 * road. This asks a third party where the place actually is and prints the
 * distance, so a drifted pin is visible.
 *
 * Deliberately not part of CI: it depends on Nominatim being up and is bound
 * by their one-request-a-second policy, so the whole run takes a minute.
 *
 *   npx tsx apps/web/scripts/verify-places.ts
 *   npx tsx apps/web/scripts/verify-places.ts t1 port    # only matching ids
 */

import { CURATED_PLACES, type CuratedPlace } from '@bcn/core/places';

const NOMINATIM = process.env.NOMINATIM_BASE_URL ?? 'https://nominatim.openstreetmap.org';
const USER_AGENT =
  'BCNAirportTaxi/1.0 (Barcelona airport transfer booking; contact: bookings@bcnairporttaxi.com)';

/** Above this, the pin is worth a human look. Below, it is kerbside noise. */
const WARN_METRES = 600;

function metres(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6_371_000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)));
}

async function lookup(place: CuratedPlace): Promise<{ lat: number; lng: number; name: string } | null> {
  const url = new URL('/search', NOMINATIM);
  url.searchParams.set('q', place.label);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('limit', '1');

  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, 'Accept-Language': 'en' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) return null;

  const raw = (await res.json()) as Array<{ lat: string; lon: string; display_name: string }>;
  const hit = raw[0];
  if (!hit) return null;
  return { lat: Number(hit.lat), lng: Number(hit.lon), name: hit.display_name };
}

async function main() {
  const filters = process.argv.slice(2).map((s) => s.toLowerCase());
  const places = filters.length
    ? CURATED_PLACES.filter((p) => filters.some((f) => p.id.includes(f)))
    : CURATED_PLACES;

  console.log(`Checking ${places.length} curated places against ${NOMINATIM}\n`);

  let warned = 0;
  let unresolved = 0;

  for (const place of places) {
    // Nominatim's policy is one request a second, and they will ban an
    // address that ignores it.
    await new Promise((r) => setTimeout(r, 1100));

    let found: Awaited<ReturnType<typeof lookup>> = null;
    try {
      found = await lookup(place);
    } catch {
      /* treated as unresolved below */
    }

    if (!found) {
      unresolved += 1;
      console.log(`  ?  ${place.id.padEnd(26)} no Nominatim match for "${place.label}"`);
      continue;
    }

    const d = metres(place, found);
    const flag = d > WARN_METRES ? '!!' : 'ok';
    if (d > WARN_METRES) warned += 1;
    console.log(
      `  ${flag} ${place.id.padEnd(26)} ${String(d).padStart(6)} m  ${found.name.slice(0, 70)}`,
    );
  }

  console.log(
    `\n${places.length} checked · ${warned} over ${WARN_METRES} m · ${unresolved} unresolved`,
  );
  console.log(
    'A large distance is not automatically wrong: our pin is the taxi kerb,\n' +
      "Nominatim's is the centre of the whole feature. Judge each one.",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
