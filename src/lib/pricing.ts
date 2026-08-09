import { TZDate } from '@date-fns/tz';
import {
  BARCELONA_HOLIDAYS,
  LANDMARKS,
  TARIFFS,
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
}

export interface QuoteBreakdownLine {
  key: string;
  amount: number;
}

export interface Quote {
  tariff: TariffCode;
  roadKm: number;
  durationMin: number;
  startFare: number;
  perKmRate: number;
  distanceCharge: number;
  supplements: number;
  supplementLines: QuoteBreakdownLine[];
  /** Set when a legal minimum or fixed price overrode the metered calculation. */
  adjustment: 'AIRPORT_MINIMUM' | 'T4_FIXED' | null;
  /** Estimated metered fare, paid to the driver in the taxi. */
  estimateTotal: number;
  /** Our separate 20% online service charge. */
  bookingFee: number;
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

/**
 * Build a full fare estimate.
 *
 * Order of operations matters: supplements are capped, then the airport
 * minimum is applied to the whole metered total, and the booking fee is
 * derived from the final estimate.
 */
export function calculateQuote(input: QuoteInput): Quote {
  const { pickup, dropoff, roadKm, durationMin, pickupAt } = input;

  const pickupAirport = isAirport(pickup);
  const dropoffAirport = isAirport(dropoff);
  const pickupMoll = isMollAdossat(pickup);
  const dropoffMoll = isMollAdossat(dropoff);

  // T-4: fixed closed price between the airport and the cruise terminal.
  const isT4Route =
    (pickupAirport && dropoffMoll) || (pickupMoll && dropoffAirport);

  if (isT4Route) {
    const estimateTotal = TARIFFS.t4FixedAirportMollAdossat;
    return {
      tariff: 'T4',
      roadKm,
      durationMin,
      startFare: 0,
      perKmRate: 0,
      distanceCharge: 0,
      supplements: 0,
      supplementLines: [],
      adjustment: 'T4_FIXED',
      estimateTotal,
      bookingFee: round2(estimateTotal * TARIFFS.bookingFeeRate),
      currency: TARIFFS.currency,
    };
  }

  const tariff = selectTariff(pickupAt);
  const perKmRate = TARIFFS.perKm[tariff];
  const distanceCharge = round2(roadKm * perKmRate);

  // Supplements apply to either end of the trip.
  const lines: QuoteBreakdownLine[] = [];
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

  const rawSupplements = lines.reduce((sum, l) => sum + l.amount, 0);
  const supplements = round2(
    Math.min(rawSupplements, TARIFFS.supplements.maxPerService),
  );

  let estimateTotal = round2(TARIFFS.startFare + distanceCharge + supplements);
  let adjustment: Quote['adjustment'] = null;

  if (pickupAirport && estimateTotal < TARIFFS.minFareFromAirport) {
    estimateTotal = TARIFFS.minFareFromAirport;
    adjustment = 'AIRPORT_MINIMUM';
  }

  return {
    tariff,
    roadKm,
    durationMin,
    startFare: TARIFFS.startFare,
    perKmRate,
    distanceCharge,
    supplements,
    supplementLines: lines,
    adjustment,
    estimateTotal,
    bookingFee: round2(estimateTotal * TARIFFS.bookingFeeRate),
    currency: TARIFFS.currency,
  };
}
