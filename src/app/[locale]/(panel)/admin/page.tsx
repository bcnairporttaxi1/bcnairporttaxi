import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell } from '@/components/panel-shell';
import { AdminBookingCard } from '@/components/admin-booking-card';
import type { AssignableDriver } from '@/components/assign-driver-control';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/guards';
import { assignDriver } from './actions';
import { adminNav } from './tabs';

export const metadata: Metadata = {
  title: { absolute: 'Dispatch | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

/** Statuses where a driver is actively working the ride. */
const ACTIVE = ['EN_ROUTE', 'ARRIVED', 'ON_BOARD'] as const;

function Stat({
  label,
  value,
  hint,
  tone = 'plain',
  href,
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: 'plain' | 'urgent' | 'good';
  href?: string;
}) {
  const body = (
    <div
      className={`h-full rounded-card border p-4 transition ${
        tone === 'urgent'
          ? 'border-amber-300 bg-amber-50'
          : tone === 'good'
            ? 'border-green-200 bg-green-50'
            : 'border-hairline bg-white'
      } ${href ? 'hover:border-ink' : ''}`}
    >
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 font-mono text-2xl font-extrabold">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
    </div>
  );
  return href ? (
    <Link href={href} className="block">
      {body}
    </Link>
  ) : (
    body
  );
}

export default async function AdminDispatchPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const user = await requireRole(['ADMIN'], locale);

  const eur = (n: unknown) =>
    new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(Number(n));
  const when = (d: Date) =>
    new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/Madrid',
    }).format(d);

  const now = new Date();
  const dayStart = new Date(now);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);

  const select = {
    id: true, reference: true, status: true, paymentStatus: true, paymentMode: true,
    pickupAt: true, createdAt: true, pickupLabel: true, dropoffLabel: true,
    pickupLat: true, pickupLng: true, dropoffLat: true, dropoffLng: true,
    contactName: true, contactEmail: true, contactPhone: true,
    passengers: true, luggage: true, notes: true,
    roadKm: true, durationMin: true, tariff: true, startFare: true, perKmRate: true,
    supplements: true, meterEstimate: true, fixedFare: true, bookingFee: true,
    amountOnline: true, driverPayout: true, driverId: true,
    driver: { select: { name: true, phone: true, plate: true } },
    vehicle: { select: { name: true } },
  } as const;

  // Batched into one round trip rather than eight concurrent connections.
  const [needsDriver, active, upcoming, driverRows, todayCount, feesToday, unpaid] =
    await prisma.$transaction([
      prisma.booking.findMany({
        where: { status: 'CONFIRMED', driverId: null },
        orderBy: { pickupAt: 'asc' },
        select,
        take: 40,
      }),
      prisma.booking.findMany({
        where: { status: { in: [...ACTIVE] } },
        orderBy: { pickupAt: 'asc' },
        select,
        take: 40,
      }),
      prisma.booking.findMany({
        where: { status: 'ASSIGNED', pickupAt: { gte: now } },
        orderBy: { pickupAt: 'asc' },
        select,
        take: 40,
      }),
      prisma.driver.findMany({
        where: { active: true, blocked: false },
        orderBy: { name: 'asc' },
        select: {
          id: true, name: true, plate: true,
          vehicle: { select: { name: true } },
          bookings: {
            where: { pickupAt: { gte: dayStart, lt: dayEnd }, status: { notIn: ['CANCELLED'] } },
            select: { status: true },
          },
        },
      }),
      prisma.booking.count({ where: { pickupAt: { gte: dayStart, lt: dayEnd } } }),
      prisma.booking.aggregate({
        where: { paymentStatus: 'PAID', createdAt: { gte: dayStart, lt: dayEnd } },
        _sum: { bookingFee: true },
      }),
      prisma.booking.count({ where: { status: 'PENDING' } }),
    ]);

  const drivers: AssignableDriver[] = driverRows.map((d) => ({
    id: d.id,
    name: d.name,
    plate: d.plate,
    vehicleName: d.vehicle?.name ?? null,
    loadToday: d.bookings.length,
    busy: d.bookings.some((b) => ACTIVE.includes(b.status as (typeof ACTIVE)[number])),
  }));

  const Section = ({
    title,
    hint,
    rides,
    empty,
  }: {
    title: string;
    hint: string;
    rides: typeof needsDriver;
    empty: string;
  }) => (
    <section className="mt-10 first:mt-0">
      <div className="mb-4 flex flex-wrap items-baseline gap-3">
        <h2 className="font-display text-xl font-extrabold">{title}</h2>
        <span className="rounded-full bg-ink px-2.5 py-0.5 font-mono text-xs font-bold text-accent">
          {rides.length}
        </span>
        <p className="text-sm text-muted">{hint}</p>
      </div>
      {rides.length === 0 ? (
        <p className="rounded-card border border-dashed border-hairline bg-white p-8 text-center text-sm text-muted">
          {empty}
        </p>
      ) : (
        <div className="space-y-5">
          {rides.map((b) => (
            <AdminBookingCard
              key={b.id}
              b={b}
              locale={locale}
              drivers={drivers}
              eur={eur}
              when={when}
              assignAction={assignDriver}
            />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <PanelShell
      title="Dispatch"
      subtitle="Everything waiting on a decision, with the whole ride on one card."
      userName={user.name}
      locale={locale}
      groups={adminNav({ needsDriver: needsDriver.length })}
      activeHref="/admin"
    >
      <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Stat
          label="Needs a driver"
          value={needsDriver.length}
          hint="paid, nobody assigned"
          tone={needsDriver.length > 0 ? 'urgent' : 'good'}
        />
        <Stat label="On the road" value={active.length} hint="in progress now" />
        <Stat label="Upcoming" value={upcoming.length} hint="assigned, ahead" />
        <Stat label="Rides today" value={todayCount} hint="all statuses" />
        <Stat
          label="Fees today"
          value={eur(feesToday._sum.bookingFee ?? 0)}
          hint="paid bookings"
          tone="good"
        />
      </div>

      {unpaid > 0 && (
        <p className="mb-8 rounded-card border-2 border-amber-300 bg-amber-50 px-4 py-3 text-sm">
          <strong>{unpaid}</strong> booking{unpaid === 1 ? '' : 's'} started checkout but
          never paid. They hold no driver and expire on their own —{' '}
          <Link
            href={{ pathname: '/admin/rides', query: { bucket: 'pending' } }}
            className="font-semibold text-accent-text underline underline-offset-2"
          >
            review them
          </Link>
          .
        </p>
      )}

      <Section
        title="Needs a driver"
        hint="paid and waiting — assign in one click"
        rides={needsDriver}
        empty="Nothing waiting. Every paid ride has a driver."
      />
      <Section
        title="On the road"
        hint="a driver is working these now"
        rides={active}
        empty="No rides in progress."
      />
      <Section
        title="Upcoming"
        hint="assigned and still ahead"
        rides={upcoming}
        empty="Nothing scheduled."
      />
    </PanelShell>
  );
}
