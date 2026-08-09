/**
 * AMB official urban taxi tariffs — valid 19 Jan 2026 – 17 Jan 2027.
 *
 * VERIFY YEARLY at https://taxi.amb.cat before each January changeover.
 * This file is the single source of truth for pricing; nothing else should
 * hardcode a rate.
 *
 * Legal framing: the figures below produce an *estimate* only. The fare the
 * passenger actually pays is whatever the official taxi meter shows, settled
 * with the driver in the car. Our 20% booking fee is a separate service charge
 * collected online and is never added to the metered fare.
 */

export const TARIFFS = {
  currency: 'EUR',

  /** Bajada de bandera — applies to both T-1 and T-2. */
  startFare: 2.8,

  perKm: { T1: 1.35, T2: 1.66 },

  waitPerHour: 27.75,

  supplements: {
    airportElPrat: 4.6,
    mollAdossat: 4.6,
    sants: 2.55,
    firaGranVia: 3.3,
    maxPerService: 17.1,
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

  /** OUR booking fee. Charged online via SumUp. Never part of the meter. */
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

/** Known fixed points used for supplement detection. */
export const LANDMARKS = {
  elPratAirport: { lat: 41.2974, lng: 2.0833, radiusKm: 3.0 },
  mollAdossat: { lat: 41.3506, lng: 2.1739, radiusKm: 1.2 },
  santsStation: { lat: 41.3792, lng: 2.14, radiusKm: 0.6 },
  firaGranVia: { lat: 41.3542, lng: 2.1287, radiusKm: 0.8 },
} as const;
