import { calculateQuote, type Quote } from './pricing';
import { CURATED_PLACES } from './places';
import { DESTINATION_GROUPS, type Destination } from './destinations';

/**
 * One indicative price per destination route, computed once.
 *
 * Two pages quoted the same journey and disagreed. The homepage priced
 * El Prat to Sitges at EUR 85.07 from the airport's real coordinates over
 * 32.8 km; the destination page priced it at EUR 75.65 — from Barcelona city
 * centre to *Girona's* coordinates over 38 km, because it used one hardcoded
 * pair of dummy points for every destination on the grounds that they were
 * "enough to select the interurban tariff". They were enough for the tariff
 * and wrong for the fare, and a visitor comparing the two pages saw a ten
 * euro contradiction on a page that also told them to confirm on WhatsApp.
 *
 * The tariff depends on where the ends actually are — which side of the
 * metropolitan boundary, whether an end is the airport — so the only way two
 * pages agree is to compute from the same real coordinates. Those exist
 * already in `places.ts`, surveyed for the address picker.
 */

/** Midday on a summer weekday: the cheaper T-6 band, so "from" is honest. */
const SAMPLE_AT = new Date('2026-07-15T13:00:00+02:00');

/*
 * Barcelona, not the airport.
 *
 * `Destination.km` is documented as the road distance *from Barcelona*, and
 * every destination is named "Barcelona to X", so the origin has to be the
 * city or the distance and the label describe different journeys. Pricing a
 * city-origin distance from the terminal was the first version of this file
 * and it inflated Sitges by twenty euros — the same class of mistake as the
 * dummy coordinates it replaced, just less obvious.
 */
const BARCELONA = { lat: 41.3874, lng: 2.1686 };

/** Every destination, flattened out of its group. */
const ALL: Destination[] = DESTINATION_GROUPS.flatMap((g) => g.destinations);

/**
 * Where a destination actually is.
 *
 * The curated places are the surveyed coordinates; a destination with no
 * curated entry has no usable location and is priced by nobody rather than
 * priced from a stand-in.
 */
function coordsFor(slug: string): { lat: number; lng: number } | null {
  const place = CURATED_PLACES.find((p) => p.id === slug);
  return place ? { lat: place.lat, lng: place.lng } : null;
}

/**
 * The indicative Barcelona-to-destination price, or null when the destination
 * has no published distance or no known coordinates.
 *
 * Indicative rather than binding: the distance is the published figure rather
 * than a live road lookup, which is why every surface that shows it calls it
 * a "from" price. What matters is that they all show the *same* one.
 */
export function destinationRoutePrice(slug: string): Quote | null {
  const dest = ALL.find((d) => d.slug === slug);
  if (!dest || dest.km === undefined) return null;

  const dropoff = coordsFor(slug);
  if (!dropoff) return null;

  return calculateQuote({
    pickup: BARCELONA,
    dropoff,
    roadKm: dest.km,
    durationMin: dest.minutes ?? Math.round(dest.km * 1.2),
    pickupAt: SAMPLE_AT,
  });
}

/** The same figure as a plain number, for callers that only format it. */
export function destinationRouteTotal(slug: string): number | null {
  return destinationRoutePrice(slug)?.total ?? null;
}
