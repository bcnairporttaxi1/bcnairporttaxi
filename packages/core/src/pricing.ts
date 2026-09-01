import { TZDate } from '@date-fns/tz';
import {
  AMB_BOUNDS,
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

  /** Service charge, derived from the fixed fare. */
  bookingFee: number;
  /** Which rate applied: 0.20 on weekdays, 0.25 at weekends and special days. */
  bookingFeeRate: number;

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

/**
 * Interurban fare on the Generalitat's T-6/T-7 tariff.
 *
 * The daytime/night split matches the urban rule — weekday 08:00–20:00 is the
 * cheaper band — so `selectTariff` decides which applies and it maps onto
 * T-6/T-7. The airport minimum and the fixed T-4 price are urban rules and
 * deliberately do not apply here.
 */
function interurbanQuote(
  input: QuoteInput,
  ends: { pickupAirport: boolean; dropoffAirport: boolean },
): Quote {
  const { roadKm, durationMin, pickupAt, vehicleSeats } = input;
  const cfg = TARIFFS.outsideAMB;

  const tariff: TariffCode = selectTariff(pickupAt) === 'T1' ? 'T6' : 'T7';
  const band = tariff === 'T6' ? 'T6' : 'T7';

  const startFare = cfg.startFare[band];
  const perKmRate = cfg.perKm[band];
  const perKmRateCharged = round2(perKmRate + TARIFFS.perKmMarkup);

  const lines: SupplementLine[] = [];
  if (ends.pickupAirport || ends.dropoffAirport) {
    lines.push({ key: 'airportElPrat', amount: cfg.supplements.airportElPrat });
  }
  if (vehicleSeats && vehicleSeats >= TARIFFS.largeVehicleMinSeats) {
    lines.push({ key: 'largeVehicle', amount: cfg.supplements.largeVehicle });
  }

  const special = specialNightSupplement(pickupAt);
  if (special) lines.push({ key: special.key, amount: special.amount });

  const supplements = round2(lines.reduce((sum, l) => sum + l.amount, 0));

  // The interurban meter runs on the closed circuit out and back, not just the
  // outbound leg — see TARIFFS.outsideAMB.billsReturnLeg.
  const billableKm = cfg.billsReturnLeg ? round2(roadKm * 2) : roadKm;

  const meterEstimate = round2(startFare + round2(billableKm * perKmRate) + supplements);
  const fixedFare = round2(
    startFare + round2(billableKm * perKmRateCharged) + supplements,
  );
  const bookingFee = round2(fixedFare * bookingFeeRateFor(pickupAt));

  return {
    tariff,
    roadKm,
    durationMin,
    startFare,
    perKmRate,
    perKmRateCharged,
    supplements,
    supplementLines: lines,
    adjustment: null,
    meterEstimate,
    fixedFare,
    bookingFee,
    bookingFeeRate: bookingFeeRateFor(pickupAt),
    payNowFeeOnly: bookingFee,
    payNowFull: round2(fixedFare + bookingFee),
    payInTaxiFeeOnly: meterEstimate,
    currency: TARIFFS.currency,
  };
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

/**
 * Booking fee rate for a given pickup.
 *
 * Driven by the calendar day rather than the meter tariff: a weekday night
 * bills on T-2 but is still a weekday for the fee, whereas Saturday lunchtime
 * is a weekend even though it is daytime. Holidays and the special nights
 * (Nadal, Cap d'Any, Sant Joan) count as weekend.
 */
export function bookingFeeRateFor(at: Date): number {
  return inElevatedFeeWindow(at)
    ? TARIFFS.bookingFeeRate.weekend
    : TARIFFS.bookingFeeRate.weekday;
}

/** Same instant, shifted back a day — used to test the small hours. */
function previousDay(at: Date): Date {
  return new Date(at.getTime() - 24 * 3600_000);
}

/**
 * True inside the higher-fee window.
 *
 * The window runs 08:00 to 08:00, not midnight to midnight: it opens Saturday
 * at 08:00 and closes Monday at 08:00, so Friday's late night is still a
 * weekday and Sunday's late night is not. Holidays and special days use the
 * same shape — from 08:00 on the day itself until 08:00 the next morning.
 */
export function inElevatedFeeWindow(at: Date): boolean {
  const z = new TZDate(at, BARCELONA_TZ);
  const day = z.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = z.getHours();

  // Saturday 08:00 through Monday 08:00.
  if (day === 6 && hour >= 8) return true;
  if (day === 0) return true;
  if (day === 1 && hour < 8) return true;

  // A holiday or special day, from 08:00 on the day itself...
  const special = (d: Date) =>
    isBarcelonaHoliday(d) || specialNightDateKey(d) !== null;

  if (special(at) && hour >= 8) return true;
  // ...through 08:00 the following morning.
  if (hour < 8 && special(previousDay(at))) return true;

  return false;
}

/** The special-day key for a date, ignoring the time of day. */
function specialNightDateKey(at: Date): string | null {
  const z = new TZDate(at, BARCELONA_TZ);
  const mmdd = `${String(z.getMonth() + 1).padStart(2, '0')}-${String(
    z.getDate(),
  ).padStart(2, '0')}`;
  return (SPECIAL_NIGHTS as Record<string, string | undefined>)[mmdd] ?? null;
}

/** True when a point lies inside the AMB metropolitan area. */
export function insideAMB(p: Coords): boolean {
  return (
    p.lat >= AMB_BOUNDS.minLat &&
    p.lat <= AMB_BOUNDS.maxLat &&
    p.lng >= AMB_BOUNDS.minLng &&
    p.lng <= AMB_BOUNDS.maxLng
  );
}

/**
 * A journey is interurban when either end sits outside the AMB. The whole
 * trip then bills on T-6/T-7, not just the portion beyond the boundary.
 */
export function isInterurban(pickup: Coords, dropoff: Coords): boolean {
  return !insideAMB(pickup) || !insideAMB(dropoff);
}

/**
 * Whether we serve a trip at all.
 *
 * The business is Barcelona-centred, so ONE end must sit inside the AMB or at
 * El Prat — but either end will do. That is what makes the return leg of an
 * interurban transfer bookable: Girona to Barcelona is as valid a job as
 * Barcelona to Girona, and T-6/T-7 already prices both.
 *
 * The API routes previously demanded that the PICKUP be inside the area, which
 * rejected every inbound journey from the destinations the site actually
 * sells — Girona, Sitges, Costa Brava, Tarragona, Andorra — with
 * `pickup_outside_area`. Half of every advertised route was unbookable.
 */
export function servesTrip(pickup: Coords, dropoff: Coords): boolean {
  const served = (p: Coords) => insideAMB(p) || isAirport(p);
  return served(pickup) || served(dropoff);
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
    const bookingFee = round2(fixedFare * bookingFeeRateFor(pickupAt));

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
      bookingFeeRate: bookingFeeRateFor(pickupAt),
      payNowFeeOnly: bookingFee,
      payNowFull: round2(fixedFare + bookingFee),
      payInTaxiFeeOnly: meterEstimate,
      currency: TARIFFS.currency,
    };
  }

  // Interurban: either end outside the AMB switches the whole journey to the
  // Generalitat's T-6/T-7 tariff, which has its own start fare and per-km rate.
  if (TARIFFS.outsideAMB.enabled && isInterurban(pickup, dropoff)) {
    return interurbanQuote(input, { pickupAirport, dropoffAirport });
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

  const bookingFee = round2(fixedFare * bookingFeeRateFor(pickupAt));

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
    bookingFeeRate: bookingFeeRateFor(pickupAt),
    payNowFeeOnly: bookingFee,
    payNowFull: round2(fixedFare + bookingFee),
    payInTaxiFeeOnly: meterEstimate,
    currency: TARIFFS.currency,
  };
}
