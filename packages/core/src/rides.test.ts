import { describe, expect, it } from 'vitest';
import {
  bucketFor,
  bucketWhere,
  canRoleTransition,
  canTransition,
  distanceMetres,
  editWindowEnd,
  isPassengerEditable,
  minutesLeftToEdit,
  settlementFor,
  shouldNotifyAtDoor,
  statusWriteFor,
} from './rides';

const min = (n: number) => n * 60_000;

describe('status transitions', () => {
  it('walks the driver flow in order', () => {
    expect(canTransition('ASSIGNED', 'EN_ROUTE')).toBe(true);
    expect(canTransition('EN_ROUTE', 'ARRIVED')).toBe(true);
    expect(canTransition('ARRIVED', 'ON_BOARD')).toBe(true);
    expect(canTransition('ON_BOARD', 'COMPLETED')).toBe(true);
  });

  it('refuses to skip a step', () => {
    expect(canTransition('ASSIGNED', 'ON_BOARD')).toBe(false);
    expect(canTransition('EN_ROUTE', 'COMPLETED')).toBe(false);
  });

  it('refuses to go backwards', () => {
    expect(canTransition('ON_BOARD', 'ARRIVED')).toBe(false);
    expect(canTransition('COMPLETED', 'ON_BOARD')).toBe(false);
  });

  it('treats completed and cancelled as terminal', () => {
    expect(canTransition('COMPLETED', 'CANCELLED')).toBe(false);
    expect(canTransition('CANCELLED', 'CONFIRMED')).toBe(false);
  });

  it('will not cancel a ride with the passenger already aboard', () => {
    expect(canTransition('ON_BOARD', 'CANCELLED')).toBe(false);
  });
});

describe('who may change a status', () => {
  it('lets a driver work their own flow', () => {
    for (const s of ['EN_ROUTE', 'ARRIVED', 'ON_BOARD', 'COMPLETED'] as const) {
      expect(canRoleTransition('DRIVER', s)).toBe(true);
    }
  });

  it('never lets a driver cancel', () => {
    expect(canRoleTransition('DRIVER', 'CANCELLED')).toBe(false);
  });

  it('never lets a passenger change anything, cancellation included', () => {
    for (const s of ['EN_ROUTE', 'COMPLETED', 'CANCELLED'] as const) {
      expect(canRoleTransition('USER', s)).toBe(false);
    }
  });

  it('lets an admin do anything', () => {
    expect(canRoleTransition('ADMIN', 'CANCELLED')).toBe(true);
  });
});

describe('passenger edit window', () => {
  const now = new Date('2026-08-16T12:00:00Z');
  const base = {
    status: 'CONFIRMED' as const,
    createdAt: now,
    pickupAt: new Date('2026-08-18T09:00:00Z'),
    editableUntil: null,
  };

  it('closes 30 minutes after booking', () => {
    expect(editWindowEnd(now, base.pickupAt).getTime()).toBe(now.getTime() + min(30));
  });

  it('is open at 29 minutes and shut at 31', () => {
    expect(isPassengerEditable(base, new Date(now.getTime() + min(29)))).toBe(true);
    expect(isPassengerEditable(base, new Date(now.getTime() + min(31)))).toBe(false);
  });

  it('shuts exactly on the boundary', () => {
    expect(isPassengerEditable(base, new Date(now.getTime() + min(30)))).toBe(false);
  });

  it('never runs past the pickup, however recent the booking', () => {
    const soon = new Date(now.getTime() + min(10));
    expect(editWindowEnd(now, soon).getTime()).toBe(soon.getTime());
  });

  it('shuts the moment a driver sets off, clock notwithstanding', () => {
    const enRoute = { ...base, status: 'EN_ROUTE' as const };
    expect(isPassengerEditable(enRoute, new Date(now.getTime() + min(1)))).toBe(false);
  });

  it('counts down in whole minutes and floors at zero', () => {
    expect(minutesLeftToEdit(base, now)).toBe(30);
    expect(minutesLeftToEdit(base, new Date(now.getTime() + min(29.5)))).toBe(1);
    expect(minutesLeftToEdit(base, new Date(now.getTime() + min(45)))).toBe(0);
  });
});

describe('settlement', () => {
  it('gives the meter to the driver and owes nothing on a fee-only ride', () => {
    const s = settlementFor({
      paymentMode: 'FEE_ONLY',
      meterEstimate: 42.5,
      fixedFare: 48.9,
    });
    expect(s).toEqual({ prepaid: false, cashToCollect: 42.5, driverPayout: 0 });
  });

  it('collects nothing in the car and owes the fare on a prepaid ride', () => {
    const s = settlementFor({
      paymentMode: 'FULL_PREPAID',
      meterEstimate: 42.5,
      fixedFare: 48.9,
    });
    expect(s).toEqual({ prepaid: true, cashToCollect: 0, driverPayout: 48.9 });
  });
});

describe('at-door notification', () => {
  const pickup = { lat: 41.3874, lng: 2.1686 };
  const base = {
    status: 'EN_ROUTE' as const,
    atDoorNotifiedAt: null,
    pickup,
  };

  it('measures real distance', () => {
    // One minute of latitude is close to 1852 m anywhere on the globe.
    const d = distanceMetres(pickup, { lat: pickup.lat + 1 / 60, lng: pickup.lng });
    expect(d).toBeGreaterThan(1800);
    expect(d).toBeLessThan(1900);
  });

  it('fires once the car is within 150 m', () => {
    expect(
      shouldNotifyAtDoor({ ...base, driver: { lat: pickup.lat + 0.0005, lng: pickup.lng } }),
    ).toBe(true);
  });

  it('stays quiet while the car is still streets away', () => {
    expect(
      shouldNotifyAtDoor({ ...base, driver: { lat: pickup.lat + 0.02, lng: pickup.lng } }),
    ).toBe(false);
  });

  it('never sends twice', () => {
    expect(
      shouldNotifyAtDoor({
        ...base,
        atDoorNotifiedAt: new Date(),
        driver: { lat: pickup.lat, lng: pickup.lng },
      }),
    ).toBe(false);
  });

  it('stays quiet before a driver is on the way', () => {
    expect(
      shouldNotifyAtDoor({ ...base, status: 'ASSIGNED', driver: pickup }),
    ).toBe(false);
  });

  it('stays quiet with no location to go on', () => {
    expect(shouldNotifyAtDoor({ ...base, driver: null })).toBe(false);
  });
});

describe('admin ride buckets', () => {
  const now = new Date('2026-08-16T12:00:00Z');
  const future = new Date('2026-08-20T09:00:00Z');
  const past = new Date('2026-08-01T09:00:00Z');

  it('calls a paid ride with no driver new work', () => {
    expect(bucketFor({ status: 'CONFIRMED', pickupAt: future, driverId: null }, now)).toBe(
      'new',
    );
  });

  it('calls an assigned future ride upcoming', () => {
    expect(bucketFor({ status: 'ASSIGNED', pickupAt: future, driverId: 'd1' }, now)).toBe(
      'upcoming',
    );
  });

  it('separates unpaid from paid', () => {
    expect(bucketFor({ status: 'PENDING', pickupAt: future, driverId: null }, now)).toBe(
      'pending',
    );
  });

  it('groups the three in-progress statuses as active', () => {
    for (const s of ['EN_ROUTE', 'ARRIVED', 'ON_BOARD'] as const) {
      expect(bucketFor({ status: s, pickupAt: now, driverId: 'd1' }, now)).toBe('active');
    }
  });

  it('flags an assigned ride whose pickup has passed as needing attention', () => {
    expect(bucketFor({ status: 'ASSIGNED', pickupAt: past, driverId: 'd1' }, now)).toBe(
      'new',
    );
  });

  it('keeps finished rides out of the working buckets', () => {
    expect(bucketFor({ status: 'COMPLETED', pickupAt: past, driverId: 'd1' }, now)).toBe(
      'completed',
    );
    expect(bucketFor({ status: 'CANCELLED', pickupAt: past, driverId: null }, now)).toBe(
      'cancelled',
    );
  });
});


describe('status writes', () => {
  const prepaid = {
    paymentMode: 'FULL_PREPAID' as const,
    meterEstimate: 40.05,
    fixedFare: 43.6,
  };
  const feeOnly = { ...prepaid, paymentMode: 'FEE_ONLY' as const };

  // The bug this pins: completion used to settle only when a driver pressed
  // the button, so an office-completed prepaid ride paid the driver nothing.
  it('settles a prepaid ride whoever completes it', () => {
    for (const actor of ['DRIVER', 'ADMIN'] as const) {
      const w = statusWriteFor('COMPLETED', prepaid, actor);
      expect(w.driverPayout).toBe(43.6);
      expect(w.cashToCollect).toBe(0);
    }
  });

  it('settles a fee-only ride to cash in the car, never a payout', () => {
    const w = statusWriteFor('COMPLETED', feeOnly, 'ADMIN');
    expect(w.driverPayout).toBe(0);
    expect(w.cashToCollect).toBe(40.05);
    expect(w.cashCollected).toBe(true);
  });

  it('stamps the matching timestamp for every step', () => {
    expect(statusWriteFor('EN_ROUTE', prepaid, 'DRIVER').enRouteAt).toBeInstanceOf(Date);
    expect(statusWriteFor('ARRIVED', prepaid, 'DRIVER').arrivedAt).toBeInstanceOf(Date);
    expect(statusWriteFor('ON_BOARD', prepaid, 'DRIVER').onBoardAt).toBeInstanceOf(Date);
    expect(statusWriteFor('COMPLETED', prepaid, 'DRIVER').completedAt).toBeInstanceOf(Date);
  });

  it('does not settle a ride that has not completed', () => {
    const w = statusWriteFor('ARRIVED', prepaid, 'DRIVER');
    expect(w.driverPayout).toBeUndefined();
    expect(w.cashToCollect).toBeUndefined();
  });

  it('records who cancelled', () => {
    expect(statusWriteFor('CANCELLED', prepaid, 'ADMIN').cancelledBy).toBe('ADMIN');
    expect(statusWriteFor('CANCELLED', prepaid, 'ADMIN').cancelledAt).toBeInstanceOf(Date);
  });
});

describe('bucket definitions agree', () => {
  // bucketFor says which bucket a booking is in; bucketWhere says which
  // bookings a bucket holds. They are two statements of one rule, so this
  // checks a representative booking lands in the bucket whose filter matches
  // it — the property that quietly broke when they lived in separate files.
  const now = new Date('2026-08-16T12:00:00Z');
  const future = new Date('2026-08-20T09:00:00Z');
  const past = new Date('2026-08-01T09:00:00Z');

  const cases = [
    { b: { status: 'PENDING', pickupAt: future, driverId: null }, bucket: 'pending' },
    { b: { status: 'CONFIRMED', pickupAt: future, driverId: null }, bucket: 'new' },
    { b: { status: 'ASSIGNED', pickupAt: future, driverId: 'd' }, bucket: 'upcoming' },
    { b: { status: 'ASSIGNED', pickupAt: past, driverId: 'd' }, bucket: 'new' },
    { b: { status: 'ON_BOARD', pickupAt: now, driverId: 'd' }, bucket: 'active' },
    { b: { status: 'COMPLETED', pickupAt: past, driverId: 'd' }, bucket: 'completed' },
    { b: { status: 'CANCELLED', pickupAt: past, driverId: null }, bucket: 'cancelled' },
  ] as const;

  /** Evaluates the Prisma-shaped predicate against one booking. */
  function matches(where: Record<string, unknown>, b: (typeof cases)[number]['b']): boolean {
    if (Array.isArray(where.OR)) {
      return (where.OR as Record<string, unknown>[]).some((clause) => matches(clause, b));
    }
    for (const [field, cond] of Object.entries(where)) {
      const value = (b as Record<string, unknown>)[field];
      if (cond && typeof cond === 'object') {
        const c = cond as Record<string, unknown>;
        if ('in' in c && !(c.in as unknown[]).includes(value)) return false;
        if ('lt' in c && !((value as Date) < (c.lt as Date))) return false;
        if ('gte' in c && !((value as Date) >= (c.gte as Date))) return false;
      } else if (value !== cond) {
        return false;
      }
    }
    return true;
  }

  for (const { b, bucket } of cases) {
    it(`${b.status} lands in "${bucket}" by both routes`, () => {
      expect(bucketFor(b, now)).toBe(bucket);
      expect(matches(bucketWhere(bucket, now), b)).toBe(true);
    });
  }
});
