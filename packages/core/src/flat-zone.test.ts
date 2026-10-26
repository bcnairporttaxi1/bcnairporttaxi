import { describe, expect, it } from 'vitest';
import { TARIFFS } from './tariffs';

/**
 * The flat zone is a pricing promise, so the copy about it has to match the
 * geometry.
 *
 * The copy claimed that every part of Barcelona falls inside the 16 km zone
 * and that Park Guell, at 14.3 km, is the furthest point in the city. The
 * first half was false, and it was repeated on /pricing, /airport-to-city,
 * /faq, /neighborhoods/city-centre, the price guide and llms.txt, in all ten
 * languages. A passenger in Sant Andreu read that their address was covered
 * and would then have been billed the excess rate.
 *
 * This file fixes the arithmetic in place so the claim cannot drift back, and
 * so that changing `flatZoneRadiusKm` fails loudly instead of silently making
 * the prose wrong again.
 */

/** Straight-line distance in km — the same measure the zone is defined on. */
function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLng = (b.lng - a.lng) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const TERMINAL = { lat: 41.2974, lng: 2.0833 };

/** Places the copy names as inside the zone, with the distance it claims. */
const CLAIMED_INSIDE: Array<[string, number, number, number]> = [
  ['Placa de Catalunya', 41.387, 2.17, 12.3],
  ['Barceloneta', 41.3797, 2.1899, 12.8],
  ['Sagrada Familia', 41.4036, 2.1744, 14.0],
  ['Park Guell', 41.4145, 2.1527, 14.3],
  ['Poblenou', 41.4036, 2.2041, 15.5],
];

/** Places the copy names as outside, with the distance it claims. */
const CLAIMED_OUTSIDE: Array<[string, number, number, number]> = [
  ['La Sagrera', 41.4225, 2.187, 16.4],
  ['El Forum', 41.4106, 2.228, 17.4],
  ['Sant Andreu', 41.435, 2.19, 17.7],
  ['Nou Barris', 41.442, 2.177, 17.9],
  ['Torre Baro', 41.456, 2.176, 19.3],
  ['Sant Cugat', 41.472, 2.086, 19.4],
  ['Badalona', 41.45, 2.247, 21.8],
];

describe('flat zone copy matches the geometry', () => {
  const radius = TARIFFS.fixedRoutes.flatZoneRadiusKm;

  it('is still a 16 km radius, which every page states in prose', () => {
    // Change this and the prose in ten languages has to change with it.
    expect(radius).toBe(16);
  });

  it.each(CLAIMED_INSIDE)('%s is inside, at the stated %s km', (name, lat, lng, stated) => {
    const d = haversineKm(TERMINAL, { lat, lng });
    expect(d, `${name} measured ${d.toFixed(1)} km`).toBeLessThanOrEqual(radius);
    // The figure printed on the page must be the real one, within rounding.
    expect(Math.abs(d - stated), `${name}: copy says ${stated}, measured ${d.toFixed(1)}`)
      .toBeLessThan(0.6);
  });

  it.each(CLAIMED_OUTSIDE)('%s is outside, at the stated %s km', (name, lat, lng, stated) => {
    const d = haversineKm(TERMINAL, { lat, lng });
    expect(d, `${name} measured ${d.toFixed(1)} km`).toBeGreaterThan(radius);
    expect(Math.abs(d - stated), `${name}: copy says ${stated}, measured ${d.toFixed(1)}`)
      .toBeLessThan(0.6);
  });

  it('does not cover the whole municipality, which is why the claim changed', () => {
    // The assertion the old copy made. Keep it failing on purpose: if a future
    // radius really did cover these, the prose would need rewriting again.
    const outside = CLAIMED_OUTSIDE.filter(
      ([, lat, lng]) => haversineKm(TERMINAL, { lat, lng }) > radius,
    );
    expect(outside.length).toBeGreaterThan(0);
  });
});
