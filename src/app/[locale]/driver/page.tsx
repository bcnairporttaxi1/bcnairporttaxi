import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell, StatusPill } from '@/components/panel-shell';
import { RideActions } from '@/components/driver-ride-actions';
import { prisma } from '@/lib/db';
import { requireDriver } from '@/lib/guards';
import { ACTIVE_STATUSES } from '@/lib/rides';
import { advanceRide, driverBalance } from './actions';

export const metadata: Metadata = {
  title: { absolute: 'My trips | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

export default async function DriverPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const { user, driver } = await requireDriver(locale);

  const eur = (n: unknown) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(Number(n));
  const when = (d: Date) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/Madrid',
    }).format(d);

  if (!driver) {
    return (
      <PanelShell title="My trips" userName={user.name} locale={locale}>
        <p className="rounded-card border border-hairline bg-white p-10 text-center text-muted">
          This account has no driver record attached yet. Ask the office to link it.
        </p>
      </PanelShell>
    );
  }

  const [bookings, balance, ratingAgg] = await Promise.all([
    prisma.booking.findMany({
      where: { driverId: driver.id },
      include: { vehicle: true, user: { select: { whatsapp: true } } },
      orderBy: { pickupAt: 'asc' },
    }),
    driverBalance(driver.id),
    prisma.review.aggregate({
      where: { driverId: driver.id, direction: 'USER_TO_DRIVER' },
      _avg: { rating: true },
      _count: true,
    }),
  ]);

  const active = bookings.filter((b) => ACTIVE_STATUSES.includes(b.status));
  const upcoming = bookings.filter(
    (b) => !ACTIVE_STATUSES.includes(b.status) && b.status !== 'COMPLETED' && b.status !== 'CANCELLED',
  );
  const done = bookings
    .filter((b) => b.status === 'COMPLETED')
    .sort((a, b) => b.pickupAt.getTime() - a.pickupAt.getTime());

  function Trip({ b }: { b: (typeof bookings)[number] }) {
    const prepaid = b.paymentMode === 'FULL_PREPAID';

    return (
      <article className="rounded-card border border-hairline bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-lg font-extrabold">{when(b.pickupAt)}</p>
            <p className="text-sm text-muted">{b.reference}</p>
          </div>
          <StatusPill value={b.status} />
        </div>

        {/* The single thing a driver must know before pulling away: whether
            money changes hands in the car. Stated loudly, never buried. */}
        <p
          className={`mt-4 rounded-xl px-4 py-3 font-display text-sm font-extrabold ${
            prepaid
              ? 'bg-green-50 text-green-900 ring-1 ring-green-200'
              : 'bg-amber-50 text-amber-900 ring-1 ring-amber-200'
          }`}
        >
          {prepaid
            ? 'PAID ONLINE — collect nothing'
            : `COLLECT IN CAR — ${eur(b.meterEstimate)} on the meter`}
        </p>

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
              {b.user?.whatsapp && (
                <>
                  {' · '}
                  <a
                    href={`https://wa.me/${b.user.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-accent-text"
                  >
                    WhatsApp
                  </a>
                </>
              )}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">People / bags</dt>
            <dd>
              {b.passengers} / {b.luggage}
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
        </div>

        <RideActions
          bookingId={b.id}
          reference={b.reference}
          locale={locale}
          status={b.status}
          prepaid={prepaid}
          cashDue={eur(b.meterEstimate)}
          sharingLocation={b.driverSharesLocation}
          advance={advanceRide}
        />
      </article>
    );
  }

  const rated = ratingAgg._count > 0;

  return (
    <PanelShell
      title="My trips"
      subtitle={`${driver.name} · ${driver.plate ?? 'no plate on file'}`}
      userName={user.name}
      locale={locale}
    >
      {/* Earnings summary, with the detail a click away. */}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-card border border-hairline bg-white p-5">
          <p className="text-xs uppercase tracking-wider text-muted">Available to withdraw</p>
          <p className="mt-1 font-mono text-2xl font-extrabold">{eur(balance.available)}</p>
        </div>
        <div className="rounded-card border border-hairline bg-white p-5">
          <p className="text-xs uppercase tracking-wider text-muted">Awaiting payout</p>
          <p className="mt-1 font-mono text-2xl font-extrabold">{eur(balance.pending)}</p>
        </div>
        <div className="rounded-card border border-hairline bg-white p-5">
          <p className="text-xs uppercase tracking-wider text-muted">Your rating</p>
          <p className="mt-1 font-mono text-2xl font-extrabold">
            {rated ? `${(ratingAgg._avg.rating ?? 0).toFixed(1)} ★` : '—'}
            {rated && (
              <span className="ml-2 font-sans text-xs font-normal text-muted">
                {ratingAgg._count}
              </span>
            )}
          </p>
        </div>
      </div>

      <Link
        href="/driver/earnings"
        className="wave mb-10 inline-block rounded-xl bg-accent px-6 py-3 font-display font-extrabold text-ink hover:bg-accent-deep"
      >
        Earnings &amp; withdrawals
      </Link>

      {active.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-extrabold">In progress ({active.length})</h2>
          <div className="mt-4 space-y-4">
            {active.map((b) => (
              <Trip key={b.id} b={b} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-display text-xl font-extrabold">Upcoming ({upcoming.length})</h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 rounded-card border border-hairline bg-white p-8 text-center text-muted">
            Nothing assigned yet.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {upcoming.map((b) => (
              <Trip key={b.id} b={b} />
            ))}
          </div>
        )}
      </section>

      {done.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-extrabold">Completed ({done.length})</h2>
          <div className="mt-4 space-y-4">
            {done.slice(0, 25).map((b) => (
              <Trip key={b.id} b={b} />
            ))}
          </div>
        </section>
      )}
    </PanelShell>
  );
}
