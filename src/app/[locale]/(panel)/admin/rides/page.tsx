import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell } from '@/components/panel-shell';
import { AdminRideTable, type RideRow } from '@/components/admin-ride-table';
import { prisma } from '@/lib/db';
import { eurIn, dateIn } from '@/lib/format';
import { requireRole } from '@/lib/guards';
import { bucketWhere, type RideBucket } from '@/lib/rides';
import { liveRides } from '@/lib/live-rides';
import { LiveBoard } from '@/components/panel/live-board';
import { STAGE_SENTENCE, formatMinutes, stageSince } from '@/components/panel/ride-progress';
import { adminNav } from '../tabs';
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

  const eur = eurIn(locale);
  const when = dateIn(locale, 'short');

  const [bookings, drivers, counts, live] = await Promise.all([
    prisma.booking.findMany({
      where: bucketWhere(bucket, now),
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
    prisma.$transaction(BUCKETS.map((b) => prisma.booking.count({ where: bucketWhere(b.key, now) }))),
    // Only fetched for the in-progress view, where it is the point of the page.
    raw === 'active' ? liveRides(now) : Promise.resolve([]),
  ]);

  const countOf = Object.fromEntries(
    BUCKETS.map((b, i) => [b.key, counts[i] ?? 0]),
  ) as Record<RideBucket, number>;

  const LIVE = ['EN_ROUTE', 'ARRIVED', 'ON_BOARD'];

  const rows: RideRow[] = bookings.map((b) => {
    const live = LIVE.includes(b.status);
    const since = stageSince({
      status: b.status,
      hasDriver: b.driverId !== null,
      enRouteAt: b.enRouteAt,
      arrivedAt: b.arrivedAt,
      onBoardAt: b.onBoardAt,
      completedAt: b.completedAt,
      cancelledAt: b.cancelledAt,
    });

    return {
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
      stage: STAGE_SENTENCE[b.status] ?? b.status.replace(/_/g, ' ').toLowerCase(),
      // Elapsed time is computed here, on the server, from the same `now` the
      // rest of the page uses — so every figure on the screen agrees.
      stageFor:
        live && since
          ? `${formatMinutes((now.getTime() - since.getTime()) / 60_000)} in this stage`
          : null,
      live,
    };
  });

  return (
    <PanelShell
      title="Rides"
      subtitle={BUCKETS.find((b) => b.key === bucket)?.hint}
      userName={user.name}
      locale={locale}
      groups={adminNav()}
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
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    active
                      ? 'bg-[var(--p-gold)] text-[#0a0a0b]'
                      : 'border p-hairline text-[var(--p-text)] hover:border-[var(--p-gold)]'
                  }`}
                >
                  {b.label}
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-xs font-bold ${
                      active
                        ? 'bg-[rgb(0_0_0/18%)] text-[#0a0a0b]'
                        : 'bg-[rgb(255_255_255/7%)] p-muted'
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

      {/* On the in-progress view the board comes first: it answers what is
          happening right now, which is the only reason to open this view.
          The table stays underneath so bulk actions remain available. */}
      {bucket === 'active' && (
        <div className="mb-6">
          <LiveBoard rides={live} locale={locale} now={now} />
        </div>
      )}

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
