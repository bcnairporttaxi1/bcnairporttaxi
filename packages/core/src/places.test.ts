import { describe, expect, it } from 'vitest';
import {
  CURATED_PLACES,
  foldForSearch,
  searchPlaces,
  type CuratedPlace,
} from './places';
import { isAirport, isMollAdossat, insideAMB, calculateQuote } from './pricing';
import { LANDMARKS, TARIFFS } from './tariffs';

/** Great-circle kilometres, so the margin assertions can state a number. */
function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const byId = (id: string): CuratedPlace => {
  const p = CURATED_PLACES.find((x) => x.id === id);
  if (!p) throw new Error(`no curated place ${id}`);
  return p;
};

describe('curated places', () => {
  it('has no duplicate ids', () => {
    const ids = CURATED_PLACES.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps every coordinate inside Catalonia or mainland Spain', () => {
    // A transposed lat/lng is the classic way a hand-entered coordinate goes
    // wrong, and it would put a pickup in the sea off Somalia.
    for (const p of CURATED_PLACES) {
      expect(p.lat, p.id).toBeGreaterThan(35);
      expect(p.lat, p.id).toBeLessThan(44);
      expect(p.lng, p.id).toBeGreaterThan(-8);
      expect(p.lng, p.id).toBeLessThan(4);
    }
  });

  it('puts both airport terminals inside the airport zone', () => {
    // This is the load-bearing assertion. A terminal outside the radius stops
    // being an airport job: it loses the fixed price and the supplement, and
    // the passenger is quoted a city fare for an airport run.
    expect(isAirport(byId('bcn-t1'))).toBe(true);
    expect(isAirport(byId('bcn-t2'))).toBe(true);
  });

  it('does not let any other place read as Barcelona airport', () => {
    // Girona and Reus are airports, but not *the* airport. If either fell
    // inside the radius it would be sold at the fixed Barcelona price.
    for (const p of CURATED_PLACES) {
      if (p.id === 'bcn-t1' || p.id === 'bcn-t2') continue;
      expect(isAirport(p), p.id).toBe(false);
    }
  });

  it('puts the Moll Adossat cruise terminals on the fixed port fare', () => {
    for (const id of [
      'port-terminal-a',
      'port-terminal-b',
      'port-terminal-c',
      'port-terminal-d',
      'port-terminal-e',
    ]) {
      expect(isMollAdossat(byId(id)), id).toBe(true);
    }
  });

  it('keeps the World Trade Center off the Moll Adossat fare', () => {
    // It is a port, and it is not that quay — about 2.7 km up the harbour.
    // Labelling it as the cruise port would quote the fixed port price for a
    // journey the tariff treats as an ordinary city address.
    expect(isMollAdossat(byId('port-wtc'))).toBe(false);
    expect(insideAMB(byId('port-wtc'))).toBe(true);
  });

  it('keeps every cruise terminal clear of the edge of the port zone', () => {
    // The quay runs 1.3 km. Centred on its southern end, as it was, Terminal A
    // sat 1.45 km out and priced as a city address, and Terminal B cleared the
    // radius by 37 m. Margin is the point of this test, not mere membership.
    const centre = LANDMARKS.mollAdossat;
    for (const p of CURATED_PLACES.filter((x) => x.group === 'port' && x.id !== 'port-wtc')) {
      const km = distanceKm(p, centre);
      expect(km, p.id).toBeLessThan(centre.radiusKm - 0.2);
    }
  });

  it('does not let a seafront city address drift into the port fare', () => {
    // Barceloneta and Port Olímpic are on the water and near the quay. If the
    // port zone reached them they would be sold the fixed port price.
    for (const id of ['barceloneta', 'port-olimpic', 'port-wtc']) {
      expect(isMollAdossat(byId(id)), id).toBe(false);
    }
  });

  it('keeps city places inside the metropolitan area and destinations outside', () => {
    for (const p of CURATED_PLACES) {
      if (p.group === 'city' || p.group === 'station' || p.group === 'port') {
        expect(insideAMB(p), p.id).toBe(true);
      }
      if (p.group === 'destination') {
        // Every destination page promises an interurban, per-km price. One
        // that fell inside the AMB would quote the city meter instead.
        expect(insideAMB(p), p.id).toBe(false);
      }
    }
  });

  it('prices a terminal-to-city run at the fixed sedan price', () => {
    const q = calculateQuote({
      pickup: byId('bcn-t1'),
      dropoff: byId('placa-catalunya'),
      roadKm: 14,
      durationMin: 22,
      pickupAt: new Date('2026-07-15T11:00:00Z'),
    });
    expect(q.total).toBe(TARIFFS.fixedRoutes.cityAirport.sedan);
  });

  it('prices a terminal-to-cruise-quay run at the fixed port price', () => {
    const q = calculateQuote({
      pickup: byId('bcn-t2'),
      dropoff: byId('port-terminal-d'),
      roadKm: 16,
      durationMin: 24,
      pickupAt: new Date('2026-07-15T11:00:00Z'),
    });
    expect(q.total).toBe(TARIFFS.fixedRoutes.portAirport.sedan);
  });
});

describe('searchPlaces', () => {
  it('shows the shortlist before anything is typed', () => {
    const shown = searchPlaces('');
    expect(shown.length).toBeGreaterThan(0);
    expect(shown.every((p) => p.popular)).toBe(true);
    // The terminals are the whole point of the shortlist.
    expect(shown.map((p) => p.id)).toContain('bcn-t1');
  });

  it('finds a terminal from its code', () => {
    expect(searchPlaces('t1')[0].id).toBe('bcn-t1');
    expect(searchPlaces('t2')[0].id).toBe('bcn-t2');
  });

  it('finds the airport in the languages the site is sold in', () => {
    for (const q of ['aeropuerto', 'aeroport', 'flughafen', 'aéroport', 'аэропорт']) {
      const ids = searchPlaces(q).map((p) => p.id);
      expect(ids, q).toContain('bcn-t1');
    }
  });

  it('finds the cruise terminals from the word a passenger would use', () => {
    const ids = searchPlaces('cruise').map((p) => p.id);
    expect(ids).toContain('port-terminal-a');
  });

  it('ignores accents in both directions', () => {
    expect(searchPlaces('peniscola')[0].id).toBe('peniscola');
    expect(searchPlaces('Peníscola')[0].id).toBe('peniscola');
    expect(searchPlaces('guell').map((p) => p.id)).toContain('park-guell');
  });

  it('prefers a label that starts with the query over one that contains it', () => {
    // "Salou" is its own entry and also sits inside "PortAventura World, Salou".
    expect(searchPlaces('salou')[0].id).toBe('salou');
  });

  it('returns nothing for a query that matches nothing', () => {
    expect(searchPlaces('qqzzxx')).toEqual([]);
  });

  it('respects the limit', () => {
    expect(searchPlaces('a', 3).length).toBeLessThanOrEqual(3);
  });

  it('folds accents, apostrophes and case', () => {
    expect(foldForSearch('L’Hospitalet')).toBe('lhospitalet');
    expect(foldForSearch('  Málaga ')).toBe('malaga');
  });
});
