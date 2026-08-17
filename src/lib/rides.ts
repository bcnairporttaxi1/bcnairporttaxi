import type { BookingStatus, PaymentMode, Role } from '@/generated/prisma/enums';

/**
 * Ride lifecycle rules.
 *
 * Kept away from the panels so the driver buttons, the admin actions and the
 * API routes all agree on what is allowed. Every rule here is enforced on the
 * server; the panels only use it to decide what to draw.
 */

/** How long after booking a passenger may still change the ride. */
export const EDIT_WINDOW_MINUTES = 30;

/** How close a driver must be before the passenger is told they are outside. */
export const AT_DOOR_METRES = 150;

/** The driver-side buttons, in the order they are pressed. */
export const DRIVER_FLOW: readonly BookingStatus[] = [
  'EN_ROUTE',
  'ARRIVED',
  'ON_BOARD',
  'COMPLETED',
] as const;

/** Statuses that mean the ride has not started and has not been called off. */
export const OPEN_STATUSES: readonly BookingStatus[] = [
  'PENDING',
  'CONFIRMED',
  'ASSIGNED',
] as const;

/** Statuses where a driver is actively working the ride. */
export const ACTIVE_STATUSES: readonly BookingStatus[] = [
  'EN_ROUTE',
  'ARRIVED',
  'ON_BOARD',
] as const;

const TRANSITIONS: Record<BookingStatus, readonly BookingStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['ASSIGNED', 'CANCELLED'],
  ASSIGNED: ['EN_ROUTE', 'CANCELLED'],
  EN_ROUTE: ['ARRIVED', 'CANCELLED'],
  ARRIVED: ['ON_BOARD', 'CANCELLED'],
  ON_BOARD: ['COMPLETED'],
  COMPLETED: [],
  CANCELLED: [],
};

/** True when `to` is a legal next step from `from`. */
export function canTransition(from: BookingStatus, to: BookingStatus): boolean {
  return TRANSITIONS[from].includes(to);
}

/**
 * Who is allowed to make a given transition.
 *
 * Passengers are deliberately absent: they can edit a ride but never cancel
 * one, so a cancellation always goes through an admin who can decide what
 * happens to the booking fee.
 */
export function canRoleTransition(role: Role, to: BookingStatus): boolean {
  if (role === 'ADMIN') return true;
  if (role === 'DRIVER') return DRIVER_FLOW.includes(to);
  return false;
}

/** The column stamped when a ride reaches each status. */
export function timestampFieldFor(status: BookingStatus): string | null {
  switch (status) {
    case 'EN_ROUTE':
      return 'enRouteAt';
    case 'ARRIVED':
      return 'arrivedAt';
    case 'ON_BOARD':
      return 'onBoardAt';
    case 'COMPLETED':
      return 'completedAt';
    case 'CANCELLED':
      return 'cancelledAt';
    default:
      return null;
  }
}

/** The moment a newly created booking stops being passenger-editable. */
export function editWindowEnd(createdAt: Date, pickupAt: Date): Date {
  const fromBooking = new Date(createdAt.getTime() + EDIT_WINDOW_MINUTES * 60_000);
  // Never allow edits past the pickup itself, however recent the booking is.
  return fromBooking < pickupAt ? fromBooking : pickupAt;
}

export interface EditableInput {
  status: BookingStatus;
  createdAt: Date;
  pickupAt: Date;
  editableUntil: Date | null;
}

/**
 * Whether the passenger may still change this ride.
 *
 * Two gates, both of which must hold: the 30-minute window from booking is
 * still open, and no driver has set off yet. The second matters more than the
 * clock — once someone is driving to an address, changing that address is a
 * phone call, not a form.
 */
export function isPassengerEditable(b: EditableInput, now: Date = new Date()): boolean {
  if (!OPEN_STATUSES.includes(b.status)) return false;
  const until = b.editableUntil ?? editWindowEnd(b.createdAt, b.pickupAt);
  return now < until;
}

/** Whole minutes left in the edit window, floored at zero. */
export function minutesLeftToEdit(b: EditableInput, now: Date = new Date()): number {
  const until = b.editableUntil ?? editWindowEnd(b.createdAt, b.pickupAt);
  return Math.max(0, Math.ceil((until.getTime() - now.getTime()) / 60_000));
}

export interface MoneyInput {
  paymentMode: PaymentMode;
  meterEstimate: number;
  fixedFare: number;
}

/**
 * Splits a ride's money into what the driver collects in the car and what the
 * platform owes them afterwards.
 *
 * Fee-only rides are settled entirely in the taxi — we already took our fee
 * online, so the meter belongs to the driver and the platform owes nothing.
 * Prepaid rides are the reverse: nothing changes hands in the car, and the
 * fare sits in the driver's balance until they withdraw it.
 */
export function settlementFor(b: MoneyInput): {
  cashToCollect: number;
  driverPayout: number;
  prepaid: boolean;
} {
  const prepaid = b.paymentMode === 'FULL_PREPAID';
  return {
    prepaid,
    cashToCollect: prepaid ? 0 : b.meterEstimate,
    driverPayout: prepaid ? b.fixedFare : 0,
  };
}

/** Metres between two coordinates, via the haversine formula. */
export function distanceMetres(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6_371_000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Whether the "your driver is outside" mail should go now.
 *
 * Fires on proximity rather than on the driver pressing Arrived, so the
 * passenger hears about it while the car is pulling up rather than after. It
 * is deliberately one-shot: `atDoorNotifiedAt` being set at all blocks a
 * resend, even if the driver circles the block.
 */
export function shouldNotifyAtDoor(input: {
  status: BookingStatus;
  atDoorNotifiedAt: Date | null;
  driver: { lat: number; lng: number } | null;
  pickup: { lat: number; lng: number };
}): boolean {
  if (input.atDoorNotifiedAt) return false;
  if (!input.driver) return false;
  if (input.status !== 'EN_ROUTE' && input.status !== 'ARRIVED') return false;
  return distanceMetres(input.driver, input.pickup) <= AT_DOOR_METRES;
}

/** Buckets used by the admin ride panel. */
export type RideBucket =
  | 'new'
  | 'pending'
  | 'upcoming'
  | 'active'
  | 'completed'
  | 'cancelled';

/**
 * The database filter that fills each bucket.
 *
 * Kept beside `bucketFor` on purpose: one says which bucket a booking belongs
 * to, the other says which bookings a bucket contains, and they have to be two
 * statements of the same rule. Apart, they drifted silently — a test now
 * asserts they agree.
 */
export function bucketWhere(bucket: RideBucket, now: Date): Record<string, unknown> {
  switch (bucket) {
    case 'pending':
      return { status: 'PENDING' };
    case 'new':
      // Two kinds of needs-attention: paid with nobody assigned, and anything
      // whose pickup has passed while still unfinished.
      return {
        OR: [
          { status: 'CONFIRMED', driverId: null },
          { status: { in: ['CONFIRMED', 'ASSIGNED'] }, pickupAt: { lt: now } },
        ],
      };
    case 'upcoming':
      return { status: 'ASSIGNED', pickupAt: { gte: now } };
    case 'active':
      return { status: { in: [...ACTIVE_STATUSES] } };
    case 'completed':
      return { status: 'COMPLETED' };
    case 'cancelled':
      return { status: 'CANCELLED' };
  }
}

export function bucketFor(
  b: { status: BookingStatus; pickupAt: Date; driverId: string | null },
  now: Date = new Date(),
): RideBucket {
  if (b.status === 'CANCELLED') return 'cancelled';
  if (b.status === 'COMPLETED') return 'completed';
  if (ACTIVE_STATUSES.includes(b.status)) return 'active';
  if (b.status === 'PENDING') return 'pending';
  // Paid but nobody assigned yet is what the office needs to act on first.
  if (b.status === 'CONFIRMED' && !b.driverId) return 'new';
  return b.pickupAt >= now ? 'upcoming' : 'new';
}

/**
 * The full set of columns written when a ride changes status.
 *
 * Completion is not merely a status change: it freezes what the driver is owed
 * and what they took in the car. Keeping that here, rather than in whichever
 * panel happens to trigger it, is what stops an office-completed ride from
 * silently paying a driver nothing.
 */
export function statusWriteFor(
  status: BookingStatus,
  booking: { paymentMode: PaymentMode; meterEstimate: number; fixedFare: number },
  actor: Role,
): Record<string, unknown> {
  const stamp = timestampFieldFor(status);
  const data: Record<string, unknown> = {
    status,
    ...(stamp ? { [stamp]: new Date() } : {}),
  };

  if (status === 'COMPLETED') {
    const money = settlementFor(booking);
    data.driverPayout = money.driverPayout;
    data.cashToCollect = money.cashToCollect;
    // Fee-only rides settle in the car by definition; prepaid ones have
    // nothing to collect. Neither leaves money outstanding at this point.
    data.cashCollected = !money.prepaid;
  }

  if (status === 'CANCELLED') data.cancelledBy = actor;

  return data;
}
