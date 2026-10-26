import { describe, expect, it } from 'vitest';
import { DESTINATION_GROUPS } from './destinations';
import { destinationRoutePrice, destinationRouteTotal } from './route-price';

/**
 * One journey must carry one number, and that number is `total`.
 *
 * This file exists because centralising the price was not enough. The helper
 * below was written specifically to stop the homepage and the destination
 * page disagreeing about Sitges, and they went on disagreeing: the homepage
 * printed `destinationRouteTotal()` while the destination page printed
 * `estimate.fixedFare` off the same helper. Sitges read EUR 90.78 in one
 * place and EUR 75.65 in the other, fifteen euros apart, on twelve pages in
 * ten languages.
 *
 * `fixedFare` is an internal figure: the fare before our service charge, used
 * to settle with the driver. `total` is the only amount a passenger is ever
 * quoted or charged. A surface showing anything else is understating the
 * price, which is worse than showing none.
 */

const ALL = DESTINATION_GROUPS.flatMap((g) => g.destinations);

describe('destination route pricing', () => {
  it('prices the destinations that have a distance and a known location', () => {
    const priced = ALL.filter((d) => destinationRoutePrice(d.slug) !== null);
    // Guards against the helper silently returning null for everything, which
    // would make every assertion below vacuous.
    expect(priced.length).toBeGreaterThanOrEqual(10);
  });

  it('always has total above fixedFare, so the two are never interchangeable', () => {
    for (const d of ALL) {
      const q = destinationRoutePrice(d.slug);
      if (!q) continue;
      expect(q.total, d.slug).toBeGreaterThan(q.fixedFare);
    }
  });

  it('exposes total through the convenience helper, not the fare', () => {
    for (const d of ALL) {
      const q = destinationRoutePrice(d.slug);
      if (!q) continue;
      expect(destinationRouteTotal(d.slug), d.slug).toBe(q.total);
      expect(destinationRouteTotal(d.slug), d.slug).not.toBe(q.fixedFare);
    }
  });

  it('gives one stable figure per destination however often it is asked', () => {
    // Every surface computes independently rather than sharing a cached
    // value, so the function has to be deterministic or the pages drift.
    for (const d of ALL) {
      const a = destinationRouteTotal(d.slug);
      const b = destinationRouteTotal(d.slug);
      expect(a, d.slug).toBe(b);
    }
  });

  it('prices Sitges as one figure', () => {
    // The specific contradiction this file was written for.
    const q = destinationRoutePrice('sitges');
    expect(q).not.toBeNull();
    expect(destinationRouteTotal('sitges')).toBe(q!.total);
  });
});
