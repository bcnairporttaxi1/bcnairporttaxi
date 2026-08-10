import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell, StatusPill } from '@/components/panel-shell';
import { prisma } from '@/lib/db';
import { requireDriver } from '@/lib/guards';
import { updateTripStatus } from './actions';

export const metadata: Metadata = {
  title: { absolute: 'My trips | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

const eur = (n: unknown) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(Number(n));

export default async function DriverPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const { user, driver } = await requireDriver(locale);

  if (!driver) {
    return (
      <PanelShell
        title="My trips"
        userName={user.name}
        locale={locale}
      >
        <p className="rounded-card border border-hairline bg-white p-10 text-center text-muted">
          This account has no driver record attached yet. Ask the office to link it.
        </p>
      </PanelShell>
    );
  }

  const bookings = await prisma.booking.findMany({
    where: { driverId: driver.id, status: { notIn: ['CANCELLED'] } },
    include: { vehicle: true },
    orderBy: { pickupAt: 'asc' },
  });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(startOfToday);
  endOfToday.setDate(endOfToday.getDate() + 1);

  const today = bookings.filter(
    (b) => b.pickupAt >= startOfToday && b.pickupAt < endOfToday,
  );
  const later = bookings.filter((b) => b.pickupAt >= endOfToday);

  const when = (d: Date) =>
    new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/Madrid',
    }).format(d);

  function Trip({ b }: { b: (typeof bookings)[number] }) {
    return (
      <article className="rounded-card border border-hairline bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-lg font-extrabold">{when(b.pickupAt)}</p>
            <p className="text-sm text-muted">{b.reference}</p>
          </div>
          <StatusPill value={b.status} />
        </div>

        <dl className="mt-4 space-y-1.5 text-sm">
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">Pick up</dt>
            <dd className="font-medium">{b.pickupLabel}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">Drop off</dt>
            <dd className="font-medium">{b.dropoffLabel}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">Passenger</dt>
            <dd>
              {b.contactName} ·{' '}
              <a href={`tel:${b.contactPhone}`} className="font-semibold text-accent-text">
                {b.contactPhone}
              </a>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">People / bags</dt>
            <dd>
              {b.passengers} / {b.luggage}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">Collect in car</dt>
            <dd className="font-mono font-bold">
              {b.paymentMode === 'FULL_PREPAID'
                ? 'Nothing — prepaid'
                : `${eur(b.meterEstimate)} (meter)`}
            </dd>
          </div>
        </dl>

        {b.notes && (
          <p className="mt-3 rounded-lg bg-porcelain p-3 text-sm text-muted">{b.notes}</p>
        )}

        <div className="mt-5 flex flex-wrap gap-3 border-t border-hairline pt-4">
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${b.pickupLat},${b.pickupLng}&destination=${b.dropoffLat},${b.dropoffLng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-porcelain"
          >
            Navigate
          </a>

          <Link
            href={`/trip/${b.reference}`}
            className="rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-porcelain"
          >
            Track &amp; chat
          </Link>

          {b.status !== 'EN_ROUTE' && b.status !== 'COMPLETED' && (
            <form action={updateTripStatus}>
              <input type="hidden" name="bookingId" value={b.id} />
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="status" value="EN_ROUTE" />
              <button
                type="submit"
                className="rounded-lg bg-ink px-4 py-2 text-sm font-bold text-porcelain hover:bg-graphite"
              >
                Start trip
              </button>
            </form>
          )}

          {b.status !== 'COMPLETED' && (
            <form action={updateTripStatus}>
              <input type="hidden" name="bookingId" value={b.id} />
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="status" value="COMPLETED" />
              <button
                type="submit"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-ink hover:bg-accent-deep"
              >
                Mark completed
              </button>
            </form>
          )}
        </div>
      </article>
    );
  }

  return (
    <PanelShell
      title="My trips"
      subtitle={`${driver.name} · ${bookings.length} assigned`}
      userName={user.name}
      locale={locale}
    >
      <section>
        <h2 className="font-display text-xl font-extrabold">Today ({today.length})</h2>
        {today.length === 0 ? (
          <p className="mt-4 rounded-card border border-hairline bg-white p-8 text-center text-muted">
            Nothing scheduled today.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {today.map((b) => (
              <Trip key={b.id} b={b} />
            ))}
          </div>
        )}
      </section>

      {later.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-extrabold">Coming up ({later.length})</h2>
          <div className="mt-4 space-y-4">
            {later.map((b) => (
              <Trip key={b.id} b={b} />
            ))}
          </div>
        </section>
      )}
    </PanelShell>
  );
}
