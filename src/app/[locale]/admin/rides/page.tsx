import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell } from '@/components/panel-shell';
import { AdminRideTable, type RideRow } from '@/components/admin-ride-table';
import { prisma } from '@/lib/db';
import type { Prisma } from '@/generated/prisma/client';
import { requireRole } from '@/lib/guards';
import { ACTIVE_STATUSES, type RideBucket } from '@/lib/rides';
import { ADMIN_TABS } from '../tabs';
import { bulkUpdateRides } from '../actions';

export const metadata: Metadata = {
  title: { absolute: 'Rides | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

const BUCKETS: { key: RideBucket; label: string; hint: string }[] = [
  { key: 'new', label: 'New', hint: 'Paid, waiting for a driver' },
  { key: 'pending', label: 'Pending', hint: 'Payment not completed' },
  { key: 'upcoming', label: 'Upcoming', hint: 'Assigned and still ahead' },
  { key: 'active', label: 'In progress', hint: 'Driver working the ride' },
  { key: 'completed', label: 'Completed', hint: 'Finished rides' },
  { key: 'cancelled', label: 'Cancelled', hint: 'Called off' },
];

const ALL_STATUSES = [
  'PENDING',
  'CONFIRMED',
  'ASSIGNED',
  'EN_ROUTE',
  'ARRIVED',
  'ON_BOARD',
  'COMPLETED',
  'CANCELLED',
];

/** Turns a bucket into the database filter that fills it. */
function whereFor(bucket: RideBucket, now: Date): Prisma.BookingWhereInput {
  switch (bucket) {
    case 'pending':
      return { status: 'PENDING' };
    case 'new':
      // Two kinds of "needs attention": paid but nobody assigned, and anything
      // whose pickup has already passed while still unfinished.
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

export default async function AdminRidesPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ bucket?: string }>;
}) {
  const { locale } = await props.params;
  const { bucket: raw } = await props.searchParams;
  setRequestLocale(locale);

  const user = await requireRole(['ADMIN'], locale);

  const bucket = (BUCKETS.find((b) => b.key === raw)?.key ?? 'new') as RideBucket;
  const now = new Date();

  const eur = (n: unknown) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(Number(n));
  const when = (d: Date) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Europe/Madrid',
    }).format(d);

  const [bookings, drivers, counts] = await Promise.all([
    prisma.booking.findMany({
      where: whereFor(bucket, now),
      include: { driver: { select: { name: true } } },
      orderBy: bucket === 'completed' || bucket === 'cancelled'
        ? { pickupAt: 'desc' }
        : { pickupAt: 'asc' },
      take: 300,
    }),
    prisma.driver.findMany({
      where: { active: true, blocked: false },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    }),
    // Six counts, but one round trip: the bucket predicates overlap and
    // cannot be expressed as a single groupBy, so they are batched instead.
    // Promise.all here would open six connections against the same pool.
    prisma.$transaction(BUCKETS.map((b) => prisma.booking.count({ where: whereFor(b.key, now) }))),
  ]);

  const countOf = Object.fromEntries(
    BUCKETS.map((b, i) => [b.key, counts[i] ?? 0]),
  ) as Record<RideBucket, number>;

  const rows: RideRow[] = bookings.map((b) => ({
    id: b.id,
    reference: b.reference,
    status: b.status,
    pickupAt: when(b.pickupAt),
    pickupLabel: b.pickupLabel,
    dropoffLabel: b.dropoffLabel,
    contactName: b.contactName,
    contactPhone: b.contactPhone,
    driverName: b.driver?.name ?? null,
    paymentMode: b.paymentMode,
    paymentStatus: b.paymentStatus,
    bookingFee: eur(b.bookingFee),
    fare: eur(b.fixedFare),
    driverPayout: Number(b.driverPayout) > 0 ? eur(b.driverPayout) : '—',
    cashToCollect:
      b.paymentMode === 'FEE_ONLY' ? `${eur(b.meterEstimate)} in car` : '—',
  }));

  return (
    <PanelShell
      title="Rides"
      subtitle={BUCKETS.find((b) => b.key === bucket)?.hint}
      userName={user.name}
      locale={locale}
      tabs={ADMIN_TABS}
      activeHref="/admin/rides"
    >
      <nav aria-label="Ride states" className="mb-6">
        <ul className="flex flex-wrap gap-2">
          {BUCKETS.map((b) => {
            const active = b.key === bucket;
            return (
              <li key={b.key}>
                <Link
                  href={{ pathname: '/admin/rides', query: { bucket: b.key } }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    active
                      ? 'bg-ink text-porcelain'
                      : 'border border-hairline bg-white hover:border-ink'
                  }`}
                >
                  {b.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      active ? 'bg-accent text-ink' : 'bg-porcelain text-muted'
                    }`}
                  >
                    {countOf[b.key] ?? 0}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <AdminRideTable
        rows={rows}
        locale={locale}
        drivers={drivers}
        statuses={ALL_STATUSES}
        bulkAction={bulkUpdateRides}
      />
    </PanelShell>
  );
}
