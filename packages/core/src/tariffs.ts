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
    /** Vehicles carrying 5 to 8 passengers — our Vito and V-Class. */
    largeVehicle: 4.6,
    maxPerService: 17.1,
  },

  /** Seat count at or above which `largeVehicle` applies. */
  largeVehicleMinSeats: 5,

  /**
   * Eve-of-holiday supplement, verified against taxi.amb.cat (2026 tariff).
   * Applies on the nights of 24-25 Dec, 31 Dec-1 Jan and 23-24 Jun.
   */
  specialNights: {
    /** Nit de Nadal — Christmas Eve night into Christmas morning. */
    nitDeNadal: 4.6,
    /** Nit de Cap d'Any — New Year's Eve night into New Year's Day. */
    capDAny: 4.6,
    /** Revetlla de Sant Joan — 23 June night into 24 June. */
    santJoan: 4.6,
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

  /**
   * OUR booking fee, charged online. Never part of the meter.
   *
   * Weekends and special days cost more to staff, so they carry the higher
   * rate. This is decided by the calendar day of the pickup, not by which
   * meter tariff applies: a Monday at 23:00 bills the night tariff T-2 but is
   * still a weekday for the fee, while Saturday lunchtime is not.
   */
  bookingFeeRate: {
    /** Monday to Friday, excluding holidays. */
    weekday: 0.2,
    /** Saturday, Sunday, official holidays and special days. */
    weekend: 0.25,
  },

  /**
   * INTERURBAN (outside the AMB area) — tariffs T-6 and T-7.
   *
   * These are set by the Generalitat de Catalunya, not the AMB, and are not
   * published on taxi.amb.cat: that page states only that "when the origin or
   * destination lies outside the metropolitan area, the applicable fares are
   * established by the Generalitat de Catalunya".
   *
   * Figures confirmed by the operator against the Generalitat schedule.
   * Re-verify at the Portal Jurídic each time the order is updated.
   *
   * T-6 = Mon–Fri 08:00–20:00.
   * T-7 = Mon–Fri 20:00–08:00, plus Saturdays, Sundays and holidays all day.
   */
  outsideAMB: {
    enabled: true,
    startFare: { T6: 7.25, T7: 7.9 },
    perKm: { T6: 0.82, T7: 0.89 },
    waitPerHour: { T6: 22.47, T7: 24.32 },
    /** Waiting is billed in quarter-hour blocks. */
    waitPer15Min: { T6: 5.62, T7: 6.08 },
    /** Airport entry/exit, and 5–8 seat vehicles, both apply interurban too. */
    supplements: { airportElPrat: 4.6, largeVehicle: 4.6 },

    /**
     * The interurban meter bills the RETURN leg as well as the outbound one.
     *
     * The Generalitat defines an interurban service as "alquiler del vehiculo
     * completo, realizandose el trayecto en circuito cerrado hasta el punto de
     * partida" — a closed circuit back to the point of departure — because the
     * driver has no licence to pick up a return fare outside their own area and
     * drives home empty. The published guidance is explicit that when a client
     * does travel back, "como el taximetro ya ha contado los kilometros de
     * regreso, debera desactivarse el parametro kilometrico": the return km are
     * already on the meter.
     *
     * So billable distance is roadKm x 2. Billing one way understated a
     * Barcelona-Girona quote by about half (89 EUR against roughly 171 EUR).
     */
    billsReturnLeg: true,
  },
} as const;

/**
 * Bounding box for the AMB metropolitan area.
 *
 * A trip is interurban when either end falls outside this box, which switches
 * the whole journey to the T-6/T-7 tariff rather than the urban meter.
 */
export const AMB_BOUNDS = {
  minLat: 41.2,
  maxLat: 41.55,
  minLng: 1.9,
  maxLng: 2.35,
} as const;

export type TariffCode = 'T1' | 'T2' | 'T4' | 'T6' | 'T7';

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
  '06-23': 'santJoan',
  '06-24': 'santJoan', // 00:00-06:00 on Sant Joan morning
} as const satisfies Record<string, keyof typeof TARIFFS.specialNights>;

/** Dates whose supplement starts at 20:00 rather than ending at 06:00. */
export const SPECIAL_NIGHT_EVES = new Set(['12-24', '12-31', '06-23']);

/** Known fixed points used for supplement detection. */
export const LANDMARKS = {
  elPratAirport: { lat: 41.2974, lng: 2.0833, radiusKm: 3.0 },
  mollAdossat: { lat: 41.3506, lng: 2.1739, radiusKm: 1.2 },
  santsStation: { lat: 41.3792, lng: 2.14, radiusKm: 0.6 },
  firaGranVia: { lat: 41.3542, lng: 2.1287, radiusKm: 0.8 },
} as const;
