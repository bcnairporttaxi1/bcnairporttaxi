import { describe, expect, it } from 'vitest';
import { MUNICIPALITIES, nearestMunicipality } from './municipalities';
import { insideAMB, isInterurban, servesTrip } from './pricing';

const BARCELONA = { lat: 41.3874, lng: 2.1686 };

describe('AMB membership', () => {
  it('lists exactly the 36 AMB municipalities', () => {
    const members = MUNICIPALITIES.filter((m) => m.amb);
    expect(members).toHaveLength(36);
  });

  it('has no duplicate names', () => {
    const names = MUNICIPALITIES.map((m) => m.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('resolves every listed centre to itself', () => {
    // The guard against a typo'd coordinate: if an entry's own centre lands on
    // a different municipality, its digits are wrong.
    for (const m of MUNICIPALITIES) {
      expect(nearestMunicipality({ lat: m.lat, lng: m.lng })?.name).toBe(m.name);
    }
  });

  it('classifies every AMB member as inside', () => {
    for (const m of MUNICIPALITIES.filter((x) => x.amb)) {
      expect(insideAMB({ lat: m.lat, lng: m.lng })).toBe(true);
    }
  });

  it('classifies every ring municipality as outside', () => {
    for (const m of MUNICIPALITIES.filter((x) => !x.amb)) {
      expect(insideAMB({ lat: m.lat, lng: m.lng })).toBe(false);
    }
  });
});

describe('the two the bounding box got wrong', () => {
  // Both sat inside the old rectangle and were billed on the urban meter.
  const SABADELL = { lat: 41.5463, lng: 2.1086 };
  const VALLIRANA = { lat: 41.3878, lng: 1.93 };

  it('prices Sabadell as interurban', () => {
    expect(nearestMunicipality(SABADELL)?.name).toBe('Sabadell');
    expect(insideAMB(SABADELL)).toBe(false);
    expect(isInterurban(BARCELONA, SABADELL)).toBe(true);
  });

  it('prices Vallirana as interurban', () => {
    expect(nearestMunicipality(VALLIRANA)?.name).toBe('Vallirana');
    expect(insideAMB(VALLIRANA)).toBe(false);
    expect(isInterurban(BARCELONA, VALLIRANA)).toBe(true);
  });

  it('still serves both — one end is in Barcelona', () => {
    expect(servesTrip(BARCELONA, SABADELL)).toBe(true);
    expect(servesTrip(VALLIRANA, BARCELONA)).toBe(true);
  });

  it('does not drag their AMB neighbours out with them', () => {
    // Barbera and Badia border Sabadell; Cervello borders Vallirana. Excluding
    // Sabadell by moving a rectangle edge would have taken these too.
    expect(insideAMB({ lat: 41.5158, lng: 2.125 })).toBe(true); // Barberà
    expect(insideAMB({ lat: 41.5088, lng: 2.1136 })).toBe(true); // Badia
    expect(insideAMB({ lat: 41.3937, lng: 1.9583 })).toBe(true); // Cervelló
    expect(insideAMB({ lat: 41.418, lng: 1.92 })).toBe(true); // Corbera
  });
});

describe('the wider region', () => {
  it('treats places well outside the ring as interurban', () => {
    const FAR = [
      { name: 'Girona', lat: 41.9794, lng: 2.8214 },
      { name: 'Tarragona', lat: 41.1189, lng: 1.2445 },
      { name: 'Andorra la Vella', lat: 42.5063, lng: 1.5218 },
      { name: 'Reus', lat: 41.1561, lng: 1.1069 },
      { name: 'Lleida', lat: 41.6176, lng: 0.6200 },
    ];
    for (const p of FAR) {
      expect(insideAMB(p), p.name).toBe(false);
      expect(nearestMunicipality(p), p.name).toBeNull();
    }
  });

  it('keeps the airport and the city urban', () => {
    expect(insideAMB({ lat: 41.2974, lng: 2.0833 })).toBe(true); // El Prat
    expect(insideAMB(BARCELONA)).toBe(true);
    expect(isInterurban(BARCELONA, { lat: 41.2974, lng: 2.0833 })).toBe(false);
  });

  it('keeps the destinations we sell interurban', () => {
    const SOLD = [
      { name: 'Sitges', lat: 41.235, lng: 1.812 },
      { name: 'Mataró', lat: 41.539, lng: 2.445 },
      { name: 'Granollers', lat: 41.608, lng: 2.287 },
      { name: 'Terrassa', lat: 41.564, lng: 2.011 },
      { name: 'Martorell', lat: 41.474, lng: 1.93 },
    ];
    for (const p of SOLD) {
      expect(isInterurban(BARCELONA, p), p.name).toBe(true);
    }
  });
});
