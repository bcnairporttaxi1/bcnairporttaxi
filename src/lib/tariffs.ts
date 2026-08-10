/**
 * AMB official urban taxi tariffs — valid 19 Jan 2026 – 17 Jan 2027.
 *
 * VERIFY YEARLY at https://taxi.amb.cat before each January changeover.
 * This file is the single source of truth for pricing; nothing else should
 * hardcode a rate.
 *
 * Two distinct numbers come out of this config, and they must never be
 * conflated:
 *
 *  1. METER ESTIMATE — built from the official AMB rates below. This is what
 *     the taxi meter will actually read, and what the passenger pays the driver
 *     when they choose to settle in the car.
 *
 *  2. FIXED PREPAID FARE — the official rates plus `perKmMarkup`. This is our
 *     own locked, pay-in-advance price. It is deliberately a little above the
 *     meter because we absorb the traffic and routing variance when we
 *     guarantee a price up front.
 */

export const TARIFFS = {
  currency: 'EUR',

  /** Bajada de bandera — applies to both T-1 and T-2. */
  startFare: 2.8,

  /** Official AMB per-km rates. */
  perKm: { T1: 1.35, T2: 1.66 },

  /**
   * Our surcharge per kilometre on the FIXED PREPAID fare only.
   * e.g. T-1 1.35 -> 1.45 charged. Never applied to the meter estimate,
   * because we cannot change what the taxi meter reads.
   */
  perKmMarkup: 0.1,

  waitPerHour: 27.75,

  supplements: {
    airportElPrat: 4.6,
    mollAdossat: 4.6,
    sants: 2.55,
    firaGranVia: 3.3,
    maxPerService: 17.1,
  },

  /**
   * Special-night supplements, applied on top of the T-2 tariff.
   * VERIFY at taxi.amb.cat — these change with the yearly tariff order.
   */
  specialNights: {
    /** Nit de Nadal — Christmas Eve night into Christmas morning. */
    nitDeNadal: 4.2,
    /** Nit de Cap d'Any — New Year's Eve night into New Year's Day. */
    capDAny: 4.2,
  },

  /** Any trip originating at El Prat bills at least this much. */
  minFareFromAirport: 21.0,

  /** T-4: fixed closed price for El Prat <-> Moll Adossat (cruise terminal). */
  t4FixedAirportMollAdossat: 46.0,

  /** Closed price via app (T-3) — informational, shown on the pricing page only. */
  t3: {
    startDay: 4.11,
    startNight: 4.43,
    perKmDay: 1.11,
    perKmNight: 1.47,
    minFare: 8.0,
  },

  /** OUR booking fee, charged online. Never part of the meter. */
  bookingFeeRate: 0.2,

  /**
   * OUTSIDE-AMB (interurban) — PHASE 2, feature-flagged OFF.
   * Placeholder rates: VERIFY against the Generalitat de Catalunya interurban
   * tariff before flipping `enabled` to true.
   */
  outsideAMB: {
    enabled: false,
    perKm: { T6: 0, T7: 0 },
    startFare: 0,
  },
} as const;

export type TariffCode = 'T1' | 'T2' | 'T4';

/**
 * How the passenger settles the trip.
 *
 * FEE_ONLY      — pay our 20% booking fee online now, pay the metered fare to
 *                 the driver in the taxi.
 * FULL_PREPAID  — pay the fixed fare plus the booking fee online now, and
 *                 nothing at all in the taxi.
 */
export type PaymentMode = 'FEE_ONLY' | 'FULL_PREPAID';

/**
 * Official Barcelona public holidays (Catalonia + Barcelona local festivities).
 * On these dates the night/weekend tariff T-2 applies all day.
 * Dates are `YYYY-MM-DD` in Europe/Madrid local time.
 *
 * VERIFY YEARLY — the Generalitat publishes the calendar each autumn.
 */
export const BARCELONA_HOLIDAYS: readonly string[] = [
  // 2026
  '2026-01-01', // Cap d'Any
  '2026-01-06', // Reis
  '2026-04-03', // Divendres Sant
  '2026-04-06', // Dilluns de Pasqua Florida
  '2026-05-01', // Festa del Treball
  '2026-06-24', // Sant Joan
  '2026-08-15', // L'Assumpció
  '2026-09-11', // Diada Nacional de Catalunya
  '2026-09-24', // La Mercè (Barcelona local)
  '2026-10-12', // Festa Nacional d'Espanya
  '2026-11-01', // Tots Sants
  '2026-12-08', // La Immaculada
  '2026-12-25', // Nadal
  '2026-12-26', // Sant Esteve
  // 2027
  '2027-01-01',
  '2027-01-06',
  '2027-03-26', // Divendres Sant
  '2027-03-29', // Dilluns de Pasqua Florida
  '2027-05-01',
  '2027-06-24',
  '2027-08-15',
  '2027-09-11',
  '2027-09-24',
  '2027-10-12',
  '2027-11-01',
  '2027-12-06', // Dia de la Constitució
  '2027-12-08',
  '2027-12-25',
] as const;

/**
 * Nights carrying an extra supplement, as `MM-DD` in Barcelona local time.
 * The supplement runs from 20:00 on the given date through 06:00 the next
 * morning, so both halves of the night are covered.
 */
export const SPECIAL_NIGHTS = {
  '12-24': 'nitDeNadal',
  '12-25': 'nitDeNadal', // 00:00-06:00 on Christmas morning
  '12-31': 'capDAny',
  '01-01': 'capDAny', // 00:00-06:00 on New Year's Day
} as const satisfies Record<string, keyof typeof TARIFFS.specialNights>;

/** Known fixed points used for supplement detection. */
export const LANDMARKS = {
  elPratAirport: { lat: 41.2974, lng: 2.0833, radiusKm: 3.0 },
  mollAdossat: { lat: 41.3506, lng: 2.1739, radiusKm: 1.2 },
  santsStation: { lat: 41.3792, lng: 2.14, radiusKm: 0.6 },
  firaGranVia: { lat: 41.3542, lng: 2.1287, radiusKm: 0.8 },
} as const;
