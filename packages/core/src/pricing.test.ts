import { describe, expect, it } from 'vitest';
import { LANDMARKS, TARIFFS } from './tariffs';
import {
  isInterurban,
  bookingFeeRateFor,
  amountDueInTaxi,
  amountDueOnline,
  calculateQuote,
  isBarcelonaHoliday,
  meetsLeadTime,
  selectTariff,
  servesTrip,
  specialNightSupplement,
} from './pricing';

/** Barcelona is UTC+2 in summer (CEST), UTC+1 in winter (CET). */
const summer = (hhmm: string) => new Date(`2026-07-15T${hhmm}:00+02:00`); // Wednesday
const winter = (hhmm: string) => new Date(`2026-02-11T${hhmm}:00+01:00`); // Wednesday

const AIRPORT = { lat: LANDMARKS.elPratAirport.lat, lng: LANDMARKS.elPratAirport.lng };
const MOLL = { lat: LANDMARKS.mollAdossat.lat, lng: LANDMARKS.mollAdossat.lng };
const SANTS = { lat: LANDMARKS.santsStation.lat, lng: LANDMARKS.santsStation.lng };
const FIRA = { lat: LANDMARKS.firaGranVia.lat, lng: LANDMARKS.firaGranVia.lng };
/** Plain city points away from any supplement landmark. */
const EIXAMPLE = { lat: 41.3915, lng: 2.1649 };
const GRACIA = { lat: 41.4036, lng: 2.1744 };

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
    expect(selectTariff(new Date('2026-09-24T13:00:00+02:00'))).toBe('T2');
  });

  it('evaluates the window in Barcelona time, not UTC', () => {
    expect(selectTariff(new Date('2026-07-15T21:30:00Z'))).toBe('T2');
    expect(selectTariff(new Date('2026-07-15T06:30:00Z'))).toBe('T1');
    expect(selectTariff(new Date('2026-02-11T07:30:00Z'))).toBe('T1');
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

describe('specialNightSupplement', () => {
  it('applies on Christmas Eve from 20:00', () => {
    expect(specialNightSupplement(new Date('2026-12-24T21:00:00+01:00'))?.key).toBe(
      'nitDeNadal',
    );
  });

  it('applies in the small hours of Christmas morning', () => {
    expect(specialNightSupplement(new Date('2026-12-25T02:00:00+01:00'))?.key).toBe(
      'nitDeNadal',
    );
  });

  it('does not apply on Christmas Eve afternoon', () => {
    expect(specialNightSupplement(new Date('2026-12-24T15:00:00+01:00'))).toBeNull();
  });

  it('does not apply on Christmas Day daytime', () => {
    expect(specialNightSupplement(new Date('2026-12-25T13:00:00+01:00'))).toBeNull();
  });

  it("applies on New Year's Eve night and New Year's morning", () => {
    expect(specialNightSupplement(new Date('2026-12-31T23:30:00+01:00'))?.key).toBe(
      'capDAny',
    );
    expect(specialNightSupplement(new Date('2027-01-01T03:00:00+01:00'))?.key).toBe(
      'capDAny',
    );
  });

  it('applies on the Sant Joan revetlla', () => {
    expect(specialNightSupplement(new Date('2026-06-23T23:00:00+02:00'))?.key).toBe(
      'santJoan',
    );
    expect(specialNightSupplement(new Date('2026-06-24T02:00:00+02:00'))?.key).toBe(
      'santJoan',
    );
  });

  it('does not apply on Sant Joan daytime', () => {
    expect(specialNightSupplement(new Date('2026-06-24T14:00:00+02:00'))).toBeNull();
  });

  it('does not apply on an ordinary night', () => {
    expect(specialNightSupplement(summer('23:00'))).toBeNull();
  });
});

describe('calculateQuote — meter vs fixed fare', () => {
  const q = calculateQuote({
    pickup: EIXAMPLE,
    dropoff: GRACIA,
    roadKm: 10,
    durationMin: 18,
    pickupAt: summer('13:00'),
  });

  it('bills the meter estimate at the official T1 rate', () => {
    expect(q.tariff).toBe('T1');
    expect(q.perKmRate).toBe(1.35);
    expect(q.meterEstimate).toBe(16.3); // 2.80 + 13.50
  });

  it('adds exactly 10 cents per km to the charged rate', () => {
    expect(q.perKmRateCharged).toBe(1.45);
    // Rounded, not raw float addition: 1.35 + 0.10 is 1.4500000000000002.
    expect(q.perKmRateCharged).toBe(round(q.perKmRate + TARIFFS.perKmMarkup));
  });

  it('bills the fixed prepaid fare at the marked-up rate', () => {
    expect(q.fixedFare).toBe(17.3); // 2.80 + 14.50
  });

  it('keeps the fixed fare above the meter by exactly markup x km', () => {
    expect(round(q.fixedFare - q.meterEstimate)).toBe(1.0); // 10 km x 0.10
  });

  it('derives the booking fee from the fixed fare', () => {
    expect(q.bookingFee).toBe(3.46); // 17.30 * 0.20
  });

  it('uses the higher T2 rate at night, markup still 10 cents', () => {
    const n = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: GRACIA,
      roadKm: 10,
      durationMin: 18,
      pickupAt: summer('22:00'),
    });
    expect(n.tariff).toBe('T2');
    expect(n.perKmRate).toBe(1.66);
    expect(n.perKmRateCharged).toBe(1.76);
    expect(n.meterEstimate).toBe(19.4); // 2.80 + 16.60
    expect(n.fixedFare).toBe(20.4); // 2.80 + 17.60
  });
});

describe('calculateQuote — payment modes', () => {
  const q = calculateQuote({
    pickup: EIXAMPLE,
    dropoff: GRACIA,
    roadKm: 10,
    durationMin: 18,
    pickupAt: summer('13:00'),
  });

  it('FEE_ONLY charges just the booking fee online', () => {
    expect(amountDueOnline(q, 'FEE_ONLY')).toBe(q.bookingFee);
    expect(amountDueOnline(q, 'FEE_ONLY')).toBe(3.46);
  });

  it('FEE_ONLY leaves the metered fare owed to the driver', () => {
    expect(amountDueInTaxi(q, 'FEE_ONLY')).toBe(q.meterEstimate);
    expect(amountDueInTaxi(q, 'FEE_ONLY')).toBe(16.3);
  });

  it('FULL_PREPAID charges fixed fare plus fee online', () => {
    expect(amountDueOnline(q, 'FULL_PREPAID')).toBe(20.76); // 17.30 + 3.46
    expect(q.payNowFull).toBe(round(q.fixedFare + q.bookingFee));
  });

  it('FULL_PREPAID leaves nothing to pay in the taxi', () => {
    expect(amountDueInTaxi(q, 'FULL_PREPAID')).toBe(0);
  });
});

describe('calculateQuote — airport rules', () => {
  it('adds the El Prat supplement and enforces the minimum on both fares', () => {
    const q = calculateQuote({
      pickup: AIRPORT,
      dropoff: { lat: 41.3275, lng: 2.0761 },
      roadKm: 4,
      durationMin: 9,
      pickupAt: summer('13:00'),
    });

    expect(q.supplementLines.some((l) => l.key === 'airportElPrat')).toBe(true);
    expect(q.adjustment).toBe('AIRPORT_MINIMUM');
    expect(q.meterEstimate).toBe(TARIFFS.minFareFromAirport);
    // The prepaid fare must never dip below the regulated floor either.
    expect(q.fixedFare).toBeGreaterThanOrEqual(TARIFFS.minFareFromAirport);
  });

  it('does not apply the minimum when the metered total already exceeds it', () => {
    const q = calculateQuote({
      pickup: AIRPORT,
      dropoff: EIXAMPLE,
      roadKm: 15,
      durationMin: 25,
      pickupAt: summer('13:00'),
    });

    expect(q.meterEstimate).toBe(27.65); // 2.80 + 20.25 + 4.60
    expect(q.fixedFare).toBe(29.15); // 2.80 + 21.75 + 4.60
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
    expect(q.adjustment).toBeNull(); // minimum is origin-only
  });

  it('uses the fixed T4 price in both directions with no markup', () => {
    const a = calculateQuote({
      pickup: AIRPORT,
      dropoff: MOLL,
      roadKm: 18,
      durationMin: 28,
      pickupAt: summer('13:00'),
    });

    expect(a.tariff).toBe('T4');
    expect(a.meterEstimate).toBe(46);
    // A regulated closed price has no per-km component to mark up.
    expect(a.fixedFare).toBe(46);
    expect(a.bookingFee).toBe(9.2);
    expect(a.payNowFull).toBe(55.2);

    const b = calculateQuote({
      pickup: MOLL,
      dropoff: AIRPORT,
      roadKm: 18,
      durationMin: 28,
      pickupAt: summer('02:00'),
    });
    expect(b.fixedFare).toBe(46);
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
    expect(q.meterEstimate).toBe(9.4); // 2.80 + 4.05 + 2.55
  });

  it('adds the Fira Gran Via supplement', () => {
    const q = calculateQuote({
      pickup: FIRA,
      dropoff: EIXAMPLE,
      roadKm: 6,
      durationMin: 12,
      pickupAt: summer('13:00'),
    });

    expect(q.supplementLines.some((l) => l.key === 'firaGranVia')).toBe(true);
    expect(q.supplements).toBe(3.3);
  });

  it('adds the special-night supplement on top of T2 at New Year', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: GRACIA,
      roadKm: 10,
      durationMin: 18,
      pickupAt: new Date('2026-12-31T23:00:00+01:00'),
    });

    expect(q.tariff).toBe('T2');
    expect(q.supplementLines.some((l) => l.key === 'capDAny')).toBe(true);
    expect(q.supplements).toBe(4.6);
    expect(q.meterEstimate).toBe(24); // 2.80 + 16.60 + 4.60
  });

  it('adds the Sant Joan night supplement', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: GRACIA,
      roadKm: 10,
      durationMin: 18,
      pickupAt: new Date('2026-06-23T22:00:00+02:00'),
    });

    expect(q.supplementLines.some((l) => l.key === 'santJoan')).toBe(true);
    expect(q.supplements).toBe(4.6);
  });

  it('adds the large-vehicle supplement for 5+ seat vehicles', () => {
    const base = {
      pickup: EIXAMPLE,
      dropoff: GRACIA,
      roadKm: 10,
      durationMin: 18,
      pickupAt: summer('13:00'),
    };

    const small = calculateQuote({ ...base, vehicleSeats: 4 });
    const large = calculateQuote({ ...base, vehicleSeats: 6 });

    expect(small.supplementLines.some((l) => l.key === 'largeVehicle')).toBe(false);
    expect(large.supplementLines.some((l) => l.key === 'largeVehicle')).toBe(true);
    expect(round(large.meterEstimate - small.meterEstimate)).toBe(4.6);
  });

  it('omits the large-vehicle supplement when no vehicle is chosen yet', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: GRACIA,
      roadKm: 10,
      durationMin: 18,
      pickupAt: summer('13:00'),
    });
    expect(q.supplementLines.some((l) => l.key === 'largeVehicle')).toBe(false);
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
  });
});

function round(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

describe('interurban (outside AMB) tariffs T-6 and T-7', () => {
  // Girona: comfortably north of the AMB boundary.
  const GIRONA = { lat: 41.9794, lng: 2.8214 };
  // Sitges: south-west, also outside.
  const SITGES = { lat: 41.2351, lng: 1.8117 };

  it('treats a trip as interurban when either end is outside the AMB', () => {
    expect(isInterurban(EIXAMPLE, GRACIA)).toBe(false);
    expect(isInterurban(EIXAMPLE, GIRONA)).toBe(true);
    expect(isInterurban(GIRONA, EIXAMPLE)).toBe(true);
    expect(isInterurban(AIRPORT, SITGES)).toBe(true);
  });

  it('bills T-6 on a weekday daytime run', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: GIRONA,
      roadKm: 100,
      durationMin: 75,
      pickupAt: summer('13:00'),
    });

    expect(q.tariff).toBe('T6');
    expect(q.startFare).toBe(7.25);
    expect(q.perKmRate).toBe(0.82);
    // 100 km out, 100 km back: the interurban meter bills the closed circuit.
    expect(q.meterEstimate).toBe(171.25); // 7.25 + (200 x 0.82)
  });

  it('bills T-7 at night', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: GIRONA,
      roadKm: 100,
      durationMin: 75,
      pickupAt: summer('22:00'),
    });

    expect(q.tariff).toBe('T7');
    expect(q.startFare).toBe(7.9);
    expect(q.perKmRate).toBe(0.89);
    expect(q.meterEstimate).toBe(185.9); // 7.90 + (200 x 0.89)
  });

  it('applies the same 10 cent markup to the prepaid fare', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: GIRONA,
      roadKm: 100,
      durationMin: 75,
      pickupAt: summer('13:00'),
    });

    expect(q.perKmRateCharged).toBe(0.92);
    expect(round(q.fixedFare - q.meterEstimate)).toBe(20); // 200 km x 0.10
  });

  it('adds the airport supplement on an interurban airport run', () => {
    const q = calculateQuote({
      pickup: AIRPORT,
      dropoff: SITGES,
      roadKm: 30,
      durationMin: 30,
      pickupAt: summer('13:00'),
    });

    expect(q.tariff).toBe('T6');
    expect(q.supplementLines.some((l) => l.key === 'airportElPrat')).toBe(true);
    expect(q.meterEstimate).toBe(61.05); // 7.25 + (60 x 0.82) + 4.60
  });

  it('does not apply the urban airport minimum to an interurban trip', () => {
    // Short hop from the airport to just outside the AMB: the 21 EUR urban
    // minimum is an AMB rule and must not leak into the Generalitat tariff.
    const q = calculateQuote({
      pickup: AIRPORT,
      dropoff: { lat: 41.19, lng: 1.95 },
      roadKm: 8,
      durationMin: 12,
      pickupAt: summer('13:00'),
    });

    expect(q.tariff).toBe('T6');
    expect(q.adjustment).toBeNull();
    expect(q.meterEstimate).toBe(24.97); // 7.25 + (16 x 0.82) + 4.60
  });

  it('bills the return leg, because the interurban service is a closed circuit', () => {
    // The driver has no licence to pick up outside their area and drives home
    // empty, so the Generalitat meter counts the km back to the origin too.
    const oneWay = 100;
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: GIRONA,
      roadKm: oneWay,
      durationMin: 75,
      pickupAt: summer('13:00'),
    });

    expect(oneWay).toBe(100);
    expect(q.meterEstimate).toBeGreaterThan(89.25); // outbound leg alone
    expect(q.meterEstimate).toBe(171.25); // 7.25 + (100 x 2 x 0.82)
  });

  it('keeps urban trips on the AMB meter', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: GRACIA,
      roadKm: 10,
      durationMin: 18,
      pickupAt: summer('13:00'),
    });
    expect(q.tariff).toBe('T1');
  });
});

describe('booking fee window (Sat 08:00 to Mon 08:00)', () => {
  const rate = (iso: string) => bookingFeeRateFor(new Date(iso));

  it('stays at 20% through Friday night and Saturday before 08:00', () => {
    expect(rate('2026-07-17T23:00:00+02:00')).toBe(0.2); // Fri 23:00
    expect(rate('2026-07-18T02:00:00+02:00')).toBe(0.2); // Sat 02:00
    expect(rate('2026-07-18T07:59:00+02:00')).toBe(0.2); // Sat 07:59
  });

  it('opens at exactly Saturday 08:00', () => {
    expect(rate('2026-07-18T08:00:00+02:00')).toBe(0.25);
  });

  it('holds all Saturday and all Sunday', () => {
    expect(rate('2026-07-18T13:00:00+02:00')).toBe(0.25);
    expect(rate('2026-07-18T23:30:00+02:00')).toBe(0.25);
    expect(rate('2026-07-19T04:00:00+02:00')).toBe(0.25);
    expect(rate('2026-07-19T23:30:00+02:00')).toBe(0.25);
  });

  it('holds into Monday until 08:00, then drops', () => {
    expect(rate('2026-07-20T03:00:00+02:00')).toBe(0.25); // Mon 03:00
    expect(rate('2026-07-20T07:59:00+02:00')).toBe(0.25);
    expect(rate('2026-07-20T08:00:00+02:00')).toBe(0.2); // Mon 08:00
  });

  it('uses the same 08:00 window for a midweek holiday', () => {
    // La Mercè, Thursday 24 September 2026.
    expect(rate('2026-09-24T07:00:00+02:00')).toBe(0.2); // before it opens
    expect(rate('2026-09-24T08:00:00+02:00')).toBe(0.25);
    expect(rate('2026-09-24T23:00:00+02:00')).toBe(0.25);
    expect(rate('2026-09-25T03:00:00+02:00')).toBe(0.25); // spills into Friday
    expect(rate('2026-09-25T09:00:00+02:00')).toBe(0.2); // back to normal
  });

  it('uses the same window for special days', () => {
    expect(rate('2026-12-24T07:00:00+01:00')).toBe(0.2);
    expect(rate('2026-12-24T10:00:00+01:00')).toBe(0.25);
    expect(rate('2026-12-25T02:00:00+01:00')).toBe(0.25);
    expect(rate('2026-06-23T09:00:00+02:00')).toBe(0.25); // Sant Joan
  });

  it('is evaluated in Barcelona time, not UTC', () => {
    // 06:30 UTC on Saturday in summer is 08:30 in Barcelona: inside the window.
    expect(rate('2026-07-18T06:30:00Z')).toBe(0.25);
    // 05:30 UTC is 07:30 local: still outside.
    expect(rate('2026-07-18T05:30:00Z')).toBe(0.2);
  });

  it('charges the rate it reports', () => {
    const q = calculateQuote({
      pickup: EIXAMPLE,
      dropoff: GRACIA,
      roadKm: 10,
      durationMin: 18,
      pickupAt: new Date('2026-07-18T13:00:00+02:00'),
    });
    expect(q.bookingFeeRate).toBe(0.25);
    expect(q.bookingFee).toBe(round(q.fixedFare * 0.25));
  });
});

describe('service area — which trips we accept at all', () => {
  const BCN = { lat: 41.3874, lng: 2.1686 };
  const AIRPORT_PT = { lat: LANDMARKS.elPratAirport.lat, lng: LANDMARKS.elPratAirport.lng };
  const GIRONA_AIRPORT = { lat: 41.901, lng: 2.7606 };
  const SITGES_PT = { lat: 41.235, lng: 1.805 };
  const MADRID = { lat: 40.4168, lng: -3.7038 };

  it('accepts an outbound interurban trip', () => {
    expect(servesTrip(BCN, GIRONA_AIRPORT)).toBe(true);
    expect(servesTrip(AIRPORT_PT, SITGES_PT)).toBe(true);
  });

  it('accepts the return leg — the case that used to be rejected', () => {
    // Requiring the pickup to be inside the AMB made every inbound journey
    // from an advertised destination unbookable.
    expect(servesTrip(GIRONA_AIRPORT, BCN)).toBe(true);
    expect(servesTrip(SITGES_PT, AIRPORT_PT)).toBe(true);
  });

  it('still refuses a trip with neither end near Barcelona', () => {
    expect(servesTrip(MADRID, GIRONA_AIRPORT)).toBe(false);
  });

  it('accepts a purely urban trip', () => {
    expect(servesTrip(BCN, { lat: 41.4036, lng: 2.1744 })).toBe(true);
  });
});

describe('Barcelona holiday calendar', () => {
  it('treats Dilluns de Pasqua Granada as a holiday in both years', () => {
    // Barcelona local festivity; missing from the calendar until now, which
    // billed T-1 on a day the meter runs T-2.
    expect(isBarcelonaHoliday(new Date('2026-05-25T12:00:00+02:00'))).toBe(true);
    expect(isBarcelonaHoliday(new Date('2027-05-17T12:00:00+02:00'))).toBe(true);
  });

  it('bills T-2 all day on that holiday', () => {
    expect(selectTariff(new Date('2026-05-25T13:00:00+02:00'))).toBe('T2');
  });

  it('charges the weekend booking fee on that holiday', () => {
    expect(bookingFeeRateFor(new Date('2026-05-25T13:00:00+02:00'))).toBe(
      TARIFFS.bookingFeeRate.weekend,
    );
  });
});
