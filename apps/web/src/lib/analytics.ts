import 'server-only';
import { prisma } from '@/lib/db';
import type { Point } from '@/components/panel/charts';

/**
 * Figures for the operations dashboard.
 *
 * Every number the panel shows is computed here, in one place, so the stat
 * tiles and the charts can never disagree about the same period. Two rules the
 * panels depend on:
 *
 * 1. **Only the booking fee is revenue.** A prepaid fare passes through the
 *    account on its way to a driver. Showing gross online takings as revenue
 *    would flatter the business by roughly five times.
 * 2. **A period is compared against the one immediately before it**, of equal
 *    length, so a trend badge means something rather than being decoration.
 */

export type RangeKey = '7d' | '30d' | '90d';

export const RANGES: Array<{ key: RangeKey; label: string; days: number }> = [
  { key: '7d', label: '7d', days: 7 },
  { key: '30d', label: '30d', days: 30 },
  { key: '90d', label: '90d', days: 90 },
];

export function rangeDays(key: string): number {
  return RANGES.find((r) => r.key === key)?.days ?? 30;
}

/** Percentage change, or null when there is no baseline to compare against. */
function change(now: number, before: number): number | null {
  if (before === 0) return now === 0 ? 0 : null;
  return ((now - before) / before) * 100;
}

const DAY = 86_400_000;

function dayKey(d: Date, tz = 'Europe/Madrid'): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

function shortLabel(iso: string): string {
  const [, m, d] = iso.split('-');
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${Number(d)} ${month[Number(m) - 1]}`;
}

export interface DashboardData {
  revenue: number;
  revenuePrev: number;
  revenueTrend: number | null;
  bookings: number;
  bookingsPrev: number;
  bookingsTrend: number | null;
  completed: number;
  conversion: number;
  driversActive: number;
  driversOnline: number;
  todayBookings: number;
  pendingConfirmed: number;
  abandoned: number;
  abandonedValue: number;
  cancelled: number;
  needsDriver: number;
  inProgress: number;
  revenueSeries: Point[];
  bookingSeries: Point[];
  byVehicle: Array<{ label: string; value: number; colour: string }>;
  statusCounts: Array<{ label: string; value: number }>;
  driverOwed: number;
  payoutsPending: number;
}

const VEHICLE_COLOURS = ['#c9a227', '#e3bf4a', '#8a6f1c', '#f0d888', '#6b5615'];

export async function dashboardData(range: RangeKey): Promise<DashboardData> {
  const days = rangeDays(range);
  const now = new Date();
  const from = new Date(now.getTime() - days * DAY);
  const prevFrom = new Date(now.getTime() - 2 * days * DAY);

  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(todayStart.getTime() + DAY);

  // One batched round trip rather than a dozen concurrent connections.
  const [
    paidNow,
    paidPrev,
    completed,
    allInRange,
    driversActive,
    todayCount,
    pendingConfirmed,
    abandonedAgg,
    cancelled,
    needsDriver,
    inProgress,
    owedAgg,
    payoutsAgg,
    vehicleRows,
    statusRows,
    seriesRows,
  ] = await prisma.$transaction([
    prisma.booking.aggregate({
      where: { paymentStatus: 'PAID', createdAt: { gte: from } },
      _sum: { bookingFee: true },
      _count: true,
    }),
    prisma.booking.aggregate({
      where: { paymentStatus: 'PAID', createdAt: { gte: prevFrom, lt: from } },
      _sum: { bookingFee: true },
      _count: true,
    }),
    prisma.booking.count({ where: { status: 'COMPLETED', createdAt: { gte: from } } }),
    prisma.booking.count({ where: { createdAt: { gte: from } } }),
    prisma.driver.count({ where: { active: true, blocked: false } }),
    prisma.booking.count({ where: { pickupAt: { gte: todayStart, lt: todayEnd } } }),
    prisma.booking.count({ where: { status: { in: ['CONFIRMED', 'ASSIGNED'] } } }),
    prisma.booking.aggregate({
      where: { status: 'PENDING' },
      _count: true,
      _sum: { amountOnline: true },
    }),
    prisma.booking.count({ where: { status: 'CANCELLED', createdAt: { gte: from } } }),
    prisma.booking.count({ where: { status: 'CONFIRMED', driverId: null } }),
    prisma.booking.count({ where: { status: { in: ['EN_ROUTE', 'ARRIVED', 'ON_BOARD'] } } }),
    prisma.booking.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { driverPayout: true },
    }),
    prisma.withdrawal.aggregate({
      where: { status: { in: ['REQUESTED', 'APPROVED'] } },
      _sum: { amount: true },
      _count: true,
    }),
    // groupBy requires an explicit orderBy inside a transaction.
    prisma.booking.groupBy({
      by: ['vehicleId'],
      where: { paymentStatus: 'PAID', createdAt: { gte: from } },
      _sum: { bookingFee: true },
      orderBy: { vehicleId: 'asc' },
    }),
    prisma.booking.groupBy({
      by: ['status'],
      _count: { _all: true },
      orderBy: { status: 'asc' },
    }),
    prisma.booking.findMany({
      where: { createdAt: { gte: from } },
      select: { createdAt: true, bookingFee: true, paymentStatus: true },
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  // Drivers with a ride actually in progress right now.
  const driversOnline = await prisma.driver.count({
    where: {
      active: true,
      blocked: false,
      bookings: { some: { status: { in: ['EN_ROUTE', 'ARRIVED', 'ON_BOARD'] } } },
    },
  });

  const vehicles = await prisma.vehicle.findMany({ select: { id: true, name: true } });
  const vehicleName = new Map(vehicles.map((v) => [v.id, v.name]));

  // Build a dense day series so gaps render as zero rather than closing up —
  // a quiet Tuesday should look quiet, not disappear.
  const buckets = new Map<string, { fee: number; count: number }>();
  for (let i = days - 1; i >= 0; i--) {
    buckets.set(dayKey(new Date(now.getTime() - i * DAY)), { fee: 0, count: 0 });
  }
  for (const b of seriesRows) {
    const k = dayKey(b.createdAt);
    const slot = buckets.get(k);
    if (!slot) continue;
    slot.count += 1;
    if (b.paymentStatus === 'PAID') slot.fee += Number(b.bookingFee);
  }

  const revenueSeries: Point[] = [...buckets].map(([k, v]) => ({
    label: shortLabel(k),
    value: Math.round(v.fee * 100) / 100,
  }));
  const bookingSeries: Point[] = [...buckets].map(([k, v]) => ({
    label: shortLabel(k),
    value: v.count,
  }));

  const byVehicle = vehicleRows
    .map((r, i) => ({
      label: r.vehicleId ? (vehicleName.get(r.vehicleId) ?? 'Unassigned') : 'Unassigned',
      value: Math.round(Number(r._sum?.bookingFee ?? 0) * 100) / 100,
      colour: VEHICLE_COLOURS[i % VEHICLE_COLOURS.length],
    }))
    .filter((v) => v.value > 0)
    .sort((a, b) => b.value - a.value);

  const revenue = Number(paidNow._sum.bookingFee ?? 0);
  const revenuePrev = Number(paidPrev._sum.bookingFee ?? 0);

  return {
    revenue,
    revenuePrev,
    revenueTrend: change(revenue, revenuePrev),
    bookings: allInRange,
    bookingsPrev: paidPrev._count,
    bookingsTrend: change(paidNow._count, paidPrev._count),
    completed,
    conversion: allInRange > 0 ? (completed / allInRange) * 100 : 0,
    driversActive,
    driversOnline,
    todayBookings: todayCount,
    pendingConfirmed,
    abandoned: abandonedAgg._count,
    abandonedValue: Number(abandonedAgg._sum.amountOnline ?? 0),
    cancelled,
    needsDriver,
    inProgress,
    revenueSeries,
    bookingSeries,
    byVehicle,
    statusCounts: statusRows
      .map((r) => ({
        label: String(r.status),
        // `_count` widens to a union inside $transaction; the shape requested
        // above is always the object form.
        value: (r._count as { _all: number })._all,
      }))
      .sort((a, b) => b.value - a.value),
    driverOwed: Number(owedAgg._sum.driverPayout ?? 0),
    payoutsPending: payoutsAgg._count,
  };
}
