import { describe, expect, it } from 'vitest';
import { LANDMARKS, TARIFFS } from './tariffs';
import {
  calculateQuote,
  isBarcelonaHoliday,
  meetsLeadTime,
  selectTariff,
} from './pricing';

/** Barcelona is UTC+2 in summer (CEST), UTC+1 in winter (CET). */
const summer = (hhmm: string) => new Date(`2026-07-15T${hhmm}:00+02:00`); // Wednesday
const winter = (hhmm: string) => new Date(`2026-02-11T${hhmm}:00+01:00`); // Wednesday

const AIRPORT = { lat: LANDMARKS.elPratAirport.lat, lng: LANDMARKS.elPratAirport.lng };
const MOLL = { lat: LANDMARKS.mollAdossat.lat, lng: LANDMARKS.mollAdossat.lng };
const SANTS = { lat: LANDMARKS.santsStation.lat, lng: LANDMARKS.santsStation.lng };
/** Plain city point in Eixample, away from any supplement landmark. */
const EIXAMPLE = { lat: 41.3915, lng: 2.1649 };

describe('selectTariff', () => {
  it('picks T1 on a weekday inside 08:00-20:00 Barcelona time', () => {
    expect(selectTariff(summer('08:00'))).toBe('T1');
    expect(selectTariff(summer('13:30'))).toBe('T1');
    expect(selectTariff(summer('19:59'))).toBe('T1');
  });

  it('picks T2 outside the daytime window', () => {
    expect(selectTariff(summer('07:59'))).toBe('T2');
    expect(selectTariff(summer('20:00'))).toBe('T2');
    expect(selectTariff(summer('03:00'))).toBe('T2');
  });

  it('picks T2 all weekend', () => {
    expect(selectTariff(new Date('2026-07-18T13:00:00+02:00'))).toBe('T2'); // Sat
    expect(selectTariff(new Date('2026-07-19T13:00:00+02:00'))).toBe('T2'); // Sun
  });

  it('picks T2 on a Barcelona holiday even at midday on a weekday', () => {
    // 2026-09-24 La Mercè falls on a Thursday.
    expect(selectTariff(new Date('2026-09-24T13:00:00+02:00'))).toBe('T2');
  });

  it('evaluates the window in Barcelona time, not UTC', () => {
    // 21:30 UTC on a summer Wednesday is 23:30 in Barcelona -> night tariff.
    expect(selectTariff(new Date('2026-07-15T21:30:00Z'))).toBe('T2');
    // 06:30 UTC is 08:30 in Barcelona -> day tariff, despite being <08:00 UTC.
    expect(selectTariff(new Date('2026-07-15T06:30:00Z'))).toBe('T1');
    // Winter offset differs: 07:30 UTC is 08:30 in Barcelona -> day tariff.
    expect(selectTariff(new Date('2026-02-11T07:30:00Z'))).toBe('T1');
    // ...but 06:30 UTC in winter is only 07:30 local -> still night tariff.
    expect(selectTariff(new Date('2026-02-11T06:30:00Z'))).toBe('T2');
  });

  it('honours the winter daytime window', () => {
    expect(selectTariff(winter('09:00'))).toBe('T1');
    expect(selectTariff(winter('21:00'))).toBe('T2');
  });
});

describe('isBarcelonaHoliday', () => {
  it('recognises Diada and Sant Esteve', () => {
    expect(isBarcelonaHoliday(new Date('2026-09-11T10:00:00+02:00'))).toBe(true);
    expect(isBarcelonaHoliday(new Date('2026-12-26T10:00:00+01:00'))).toBe(true);
  });

  it('rejects an ordinary day', () => {
    expect(isBarcelonaHoliday(summer('10:00'))).toBe(false);
  });
});

describe('calculateQuote — city trip', () => {
  it('bills start fare plus distance at the T1 rate', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: { lat: 41.4036, lng: 2.1744 }, // Gràcia, no supplements
      roadKm: 10,
      durationMin: 18,
      pickupAt: summer('13:00'),
    });

    expect(q.tariff).toBe('T1');
    expect(q.distanceCharge).toBe(13.5); // 10 * 1.35
    expect(q.supplements).toBe(0);
    expect(q.estimateTotal).toBe(16.3); // 2.80 + 13.50
    expect(q.adjustment).toBeNull();
  });

  it('uses the higher T2 rate at night', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: { lat: 41.4036, lng: 2.1744 },
      roadKm: 10,
      durationMin: 18,
      pickupAt: summer('22:00'),
    });

    expect(q.tariff).toBe('T2');
    expect(q.distanceCharge).toBe(16.6); // 10 * 1.66
    expect(q.estimateTotal).toBe(19.4);
  });

  it('charges the booking fee at exactly 20% of the estimate', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: { lat: 41.4036, lng: 2.1744 },
      roadKm: 10,
      durationMin: 18,
      pickupAt: summer('13:00'),
    });

    expect(q.bookingFee).toBe(3.26); // 16.30 * 0.20
    expect(q.bookingFee).toBe(
      Math.round(q.estimateTotal * TARIFFS.bookingFeeRate * 100) / 100,
    );
  });
});

describe('calculateQuote — airport rules', () => {
  it('adds the El Prat supplement and enforces the minimum fare', () => {
    // A very short hop from the airport would otherwise fall under 21 EUR.
    const q = calculateQuote({
      pickup: AIRPORT,
      dropoff: { lat: 41.3275, lng: 2.0761 }, // El Prat de Llobregat town
      roadKm: 4,
      durationMin: 9,
      pickupAt: summer('13:00'),
    });

    expect(q.supplementLines.some((l) => l.key === 'airportElPrat')).toBe(true);
    expect(q.adjustment).toBe('AIRPORT_MINIMUM');
    expect(q.estimateTotal).toBe(TARIFFS.minFareFromAirport);
    expect(q.bookingFee).toBe(4.2); // 21.00 * 0.20
  });

  it('does not apply the minimum when the metered total already exceeds it', () => {
    const q = calculateQuote({
      pickup: AIRPORT,
      dropoff: EIXAMPLE,
      roadKm: 15,
      durationMin: 25,
      pickupAt: summer('13:00'),
    });

    // 2.80 + (15 * 1.35) + 4.60 = 27.65
    expect(q.estimateTotal).toBe(27.65);
    expect(q.adjustment).toBeNull();
  });

  it('applies the airport supplement when the airport is the destination', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: AIRPORT,
      roadKm: 15,
      durationMin: 25,
      pickupAt: summer('13:00'),
    });

    expect(q.supplements).toBe(4.6);
    // The 21 EUR minimum is origin-only, so it must not trigger here.
    expect(q.adjustment).toBeNull();
  });

  it('uses the fixed T4 price between the airport and Moll Adossat', () => {
    const q = calculateQuote({
      pickup: AIRPORT,
      dropoff: MOLL,
      roadKm: 18,
      durationMin: 28,
      pickupAt: summer('13:00'),
    });

    expect(q.tariff).toBe('T4');
    expect(q.estimateTotal).toBe(46);
    expect(q.adjustment).toBe('T4_FIXED');
    expect(q.bookingFee).toBe(9.2);
  });

  it('applies T4 in the reverse direction too', () => {
    const q = calculateQuote({
      pickup: MOLL,
      dropoff: AIRPORT,
      roadKm: 18,
      durationMin: 28,
      pickupAt: summer('02:00'),
    });

    expect(q.estimateTotal).toBe(46);
  });
});

describe('calculateQuote — supplements', () => {
  it('adds the Sants supplement', () => {
    const q = calculateQuote({
      pickup: SANTS,
      dropoff: EIXAMPLE,
      roadKm: 3,
      durationMin: 8,
      pickupAt: summer('13:00'),
    });

    expect(q.supplements).toBe(2.55);
    expect(q.estimateTotal).toBe(9.4); // 2.80 + 4.05 + 2.55
  });

  it('caps combined supplements at the per-service maximum', () => {
    const q = calculateQuote({
      pickup: AIRPORT,
      dropoff: SANTS,
      roadKm: 14,
      durationMin: 22,
      pickupAt: summer('13:00'),
    });

    expect(q.supplements).toBeLessThanOrEqual(TARIFFS.supplements.maxPerService);
  });
});

describe('meetsLeadTime', () => {
  const now = new Date('2026-07-15T10:00:00+02:00');

  it('accepts a pickup at least 3 hours out', () => {
    expect(meetsLeadTime(new Date('2026-07-15T13:00:00+02:00'), now)).toBe(true);
    expect(meetsLeadTime(new Date('2026-07-16T09:00:00+02:00'), now)).toBe(true);
  });

  it('rejects anything inside the 3 hour window', () => {
    expect(meetsLeadTime(new Date('2026-07-15T12:59:00+02:00'), now)).toBe(false);
    expect(meetsLeadTime(new Date('2026-07-15T10:30:00+02:00'), now)).toBe(false);
    expect(meetsLeadTime(new Date('2026-07-15T09:00:00+02:00'), now)).toBe(false);
  });
});
