import { TZDate } from '@date-fns/tz';
import {
  BARCELONA_HOLIDAYS,
  LANDMARKS,
  SPECIAL_NIGHTS,
  SPECIAL_NIGHT_EVES,
  TARIFFS,
  type PaymentMode,
  type TariffCode,
} from './tariffs';

export const BARCELONA_TZ = 'Europe/Madrid';

/** Minimum lead time for a pre-booking. Shorter rides are routed to WhatsApp. */
export const MIN_LEAD_HOURS = 3;

export interface Coords {
  lat: number;
  lng: number;
}

export interface QuoteInput {
  pickup: Coords;
  dropoff: Coords;
  /** Road distance in km, from OSRM — not straight-line. */
  roadKm: number;
  durationMin: number;
  /** Absolute pickup instant. Tariff is derived from this in Barcelona time. */
  pickupAt: Date;
  /**
   * Seats in the chosen vehicle. Vehicles carrying 5-8 passengers attract an
   * official AMB supplement, so the quote changes with vehicle choice.
   */
  vehicleSeats?: number;
}

export interface SupplementLine {
  key: string;
  amount: number;
}

export interface Quote {
  tariff: TariffCode;
  roadKm: number;
  durationMin: number;

  startFare: number;
  /** Official AMB per-km rate for the active tariff. */
  perKmRate: number;
  /** What we charge per km on the prepaid fare (official + markup). */
  perKmRateCharged: number;

  supplements: number;
  supplementLines: SupplementLine[];

  /** Set when a legal minimum or fixed price overrode the calculation. */
  adjustment: 'AIRPORT_MINIMUM' | 'T4_FIXED' | null;

  /**
   * What the taxi meter is expected to read. Paid to the driver in the car
   * under FEE_ONLY. Uses official AMB rates only — never the markup.
   */
  meterEstimate: number;

  /**
   * Our locked, pay-in-advance fare. Official rates plus the per-km markup.
   * Under FULL_PREPAID this is what the passenger pays and nothing is owed
   * in the taxi.
   */
  fixedFare: number;

  /** 20% service charge, derived from the fixed fare. */
  bookingFee: number;

  /** Charged online when paying the booking fee only. */
  payNowFeeOnly: number;
  /** Charged online when prepaying everything. */
  payNowFull: number;
  /** Still owed to the driver under FEE_ONLY. */
  payInTaxiFeeOnly: number;

  currency: string;
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/** Great-circle distance in km — used only for landmark proximity, never for fares. */
export function haversineKm(a: Coords, b: Coords): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

function isNear(
  point: Coords,
  landmark: { lat: number; lng: number; radiusKm: number },
): boolean {
  return haversineKm(point, landmark) <= landmark.radiusKm;
}

export const isAirport = (p: Coords) => isNear(p, LANDMARKS.elPratAirport);
export const isMollAdossat = (p: Coords) => isNear(p, LANDMARKS.mollAdossat);
export const isSants = (p: Coords) => isNear(p, LANDMARKS.santsStation);
export const isFiraGranVia = (p: Coords) => isNear(p, LANDMARKS.firaGranVia);

/** `YYYY-MM-DD` for an instant, evaluated in Barcelona local time. */
export function barcelonaDateKey(at: Date): string {
  const z = new TZDate(at, BARCELONA_TZ);
  const y = z.getFullYear();
  const m = String(z.getMonth() + 1).padStart(2, '0');
  const d = String(z.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isBarcelonaHoliday(at: Date): boolean {
  return BARCELONA_HOLIDAYS.includes(barcelonaDateKey(at));
}

/**
 * Special-night supplement, if the pickup falls in one.
 *
 * The window is 20:00–06:00 Barcelona time, so Christmas Eve evening and the
 * small hours of Christmas morning both qualify, but Christmas Day daytime
 * does not.
 */
export function specialNightSupplement(
  at: Date,
): { key: string; amount: number } | null {
  const z = new TZDate(at, BARCELONA_TZ);
  const mmdd = `${String(z.getMonth() + 1).padStart(2, '0')}-${String(
    z.getDate(),
  ).padStart(2, '0')}`;
  const hour = z.getHours();

  const inNightWindow = hour >= 20 || hour < 6;
  if (!inNightWindow) return null;

  const key = (SPECIAL_NIGHTS as Record<string, string | undefined>)[mmdd];
  if (!key) return null;

  // Eves qualify only from 20:00; the following mornings only before 06:00.
  const isEve = SPECIAL_NIGHT_EVES.has(mmdd);
  if (isEve && hour < 20) return null;
  if (!isEve && hour >= 6) return null;

  const amount =
    TARIFFS.specialNights[key as keyof typeof TARIFFS.specialNights];
  return { key, amount };
}

/**
 * T-1 = Mon–Fri 08:00–20:00 (Barcelona local).
 * T-2 = 20:00–08:00, all day Saturday and Sunday, and official holidays.
 *
 * The AMB schedule is defined in Barcelona local time, so this must be
 * evaluated in Europe/Madrid rather than the server's timezone.
 */
export function selectTariff(at: Date): 'T1' | 'T2' {
  const z = new TZDate(at, BARCELONA_TZ);
  const day = z.getDay(); // 0 = Sunday
  const hour = z.getHours();

  if (day === 0 || day === 6) return 'T2';
  if (isBarcelonaHoliday(at)) return 'T2';
  return hour >= 8 && hour < 20 ? 'T1' : 'T2';
}

/** True when the pickup is at least MIN_LEAD_HOURS away. */
export function meetsLeadTime(pickupAt: Date, now: Date = new Date()): boolean {
  return pickupAt.getTime() - now.getTime() >= MIN_LEAD_HOURS * 3600_000;
}

/** What the passenger pays online for a given mode. */
export function amountDueOnline(quote: Quote, mode: PaymentMode): number {
  return mode === 'FULL_PREPAID' ? quote.payNowFull : quote.payNowFeeOnly;
}

/** What is still owed to the driver in the taxi for a given mode. */
export function amountDueInTaxi(quote: Quote, mode: PaymentMode): number {
  return mode === 'FULL_PREPAID' ? 0 : quote.payInTaxiFeeOnly;
}

/**
 * Build a full fare estimate.
 *
 * Produces two fare figures from one set of inputs: the official meter estimate
 * and our marked-up fixed prepaid fare. Supplements and the airport minimum
 * apply to both; only the per-km rate differs.
 */
export function calculateQuote(input: QuoteInput): Quote {
  const { pickup, dropoff, roadKm, durationMin, pickupAt, vehicleSeats } = input;

  const pickupAirport = isAirport(pickup);
  const dropoffAirport = isAirport(dropoff);
  const pickupMoll = isMollAdossat(pickup);
  const dropoffMoll = isMollAdossat(dropoff);

  // T-4: fixed closed price between the airport and the cruise terminal.
  const isT4Route =
    (pickupAirport && dropoffMoll) || (pickupMoll && dropoffAirport);

  if (isT4Route) {
    const meterEstimate = TARIFFS.t4FixedAirportMollAdossat;
    // A regulated closed price carries no per-km component, so there is
    // nothing for the markup to apply to.
    const fixedFare = meterEstimate;
    const bookingFee = round2(fixedFare * TARIFFS.bookingFeeRate);

    return {
      tariff: 'T4',
      roadKm,
      durationMin,
      startFare: 0,
      perKmRate: 0,
      perKmRateCharged: 0,
      supplements: 0,
      supplementLines: [],
      adjustment: 'T4_FIXED',
      meterEstimate,
      fixedFare,
      bookingFee,
      payNowFeeOnly: bookingFee,
      payNowFull: round2(fixedFare + bookingFee),
      payInTaxiFeeOnly: meterEstimate,
      currency: TARIFFS.currency,
    };
  }

  const tariff = selectTariff(pickupAt);
  const perKmRate = TARIFFS.perKm[tariff];
  const perKmRateCharged = round2(perKmRate + TARIFFS.perKmMarkup);

  // Supplements apply to either end of the trip.
  const lines: SupplementLine[] = [];
  if (pickupAirport || dropoffAirport) {
    lines.push({ key: 'airportElPrat', amount: TARIFFS.supplements.airportElPrat });
  }
  if (pickupMoll || dropoffMoll) {
    lines.push({ key: 'mollAdossat', amount: TARIFFS.supplements.mollAdossat });
  }
  if (isSants(pickup) || isSants(dropoff)) {
    lines.push({ key: 'sants', amount: TARIFFS.supplements.sants });
  }
  if (isFiraGranVia(pickup) || isFiraGranVia(dropoff)) {
    lines.push({ key: 'firaGranVia', amount: TARIFFS.supplements.firaGranVia });
  }

  const special = specialNightSupplement(pickupAt);
  if (special) lines.push({ key: special.key, amount: special.amount });

  if (vehicleSeats && vehicleSeats >= TARIFFS.largeVehicleMinSeats) {
    lines.push({
      key: 'largeVehicle',
      amount: TARIFFS.supplements.largeVehicle,
    });
  }

  const rawSupplements = lines.reduce((sum, l) => sum + l.amount, 0);
  const supplements = round2(
    Math.min(rawSupplements, TARIFFS.supplements.maxPerService),
  );

  let meterEstimate = round2(
    TARIFFS.startFare + round2(roadKm * perKmRate) + supplements,
  );
  let fixedFare = round2(
    TARIFFS.startFare + round2(roadKm * perKmRateCharged) + supplements,
  );

  let adjustment: Quote['adjustment'] = null;

  // The regulated minimum applies to the meter. Our prepaid fare must never
  // sit below it either, or prepaying would undercut the legal floor.
  if (pickupAirport && meterEstimate < TARIFFS.minFareFromAirport) {
    meterEstimate = TARIFFS.minFareFromAirport;
    adjustment = 'AIRPORT_MINIMUM';
  }
  if (pickupAirport && fixedFare < TARIFFS.minFareFromAirport) {
    fixedFare = TARIFFS.minFareFromAirport;
  }

  const bookingFee = round2(fixedFare * TARIFFS.bookingFeeRate);

  return {
    tariff,
    roadKm,
    durationMin,
    startFare: TARIFFS.startFare,
    perKmRate,
    perKmRateCharged,
    supplements,
    supplementLines: lines,
    adjustment,
    meterEstimate,
    fixedFare,
    bookingFee,
    payNowFeeOnly: bookingFee,
    payNowFull: round2(fixedFare + bookingFee),
    payInTaxiFeeOnly: meterEstimate,
    currency: TARIFFS.currency,
  };
}
