import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell, StatusPill } from '@/components/panel-shell';
import { RideActions } from '@/components/driver-ride-actions';
import { prisma } from '@/lib/db';
import { eurIn, dateIn } from '@bcn/core/format';
import { requireDriver } from '@/lib/guards';
import { DRIVER_TABS } from './tabs';
import { driverBalance } from '@/lib/driver-balance';
import { ACTIVE_STATUSES } from '@bcn/core/rides';
import { advanceRide, } from './actions';

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

  const eur = eurIn(locale);
  const when = dateIn(locale, 'medium');

  if (!driver) {
    return (
      <PanelShell title="My trips" userName={user.name} locale={locale}>
        <p className="p-card p-10 text-center p-muted">
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

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);

  const scheduled = bookings.filter(
    (b) =>
      !ACTIVE_STATUSES.includes(b.status) &&
      b.status !== 'COMPLETED' &&
      b.status !== 'CANCELLED',
  );
  const today = scheduled.filter((b) => b.pickupAt >= dayStart && b.pickupAt < dayEnd);
  const upcoming = scheduled.filter((b) => b.pickupAt >= dayEnd);
  const overdue = scheduled.filter((b) => b.pickupAt < dayStart);

  // What the driver takes home today, split the way they are actually paid.
  const doneToday = bookings.filter(
    (b) => b.status === 'COMPLETED' && b.completedAt && b.completedAt >= dayStart,
  );
  const cashToday = doneToday.reduce((n, b) => n + Number(b.cashToCollect), 0);
  const owedToday = doneToday.reduce((n, b) => n + Number(b.driverPayout), 0);
  const done = bookings
    .filter((b) => b.status === 'COMPLETED')
    .sort((a, b) => b.pickupAt.getTime() - a.pickupAt.getTime());

  function Trip({ b }: { b: (typeof bookings)[number] }) {
    const prepaid = b.paymentMode === 'FULL_PREPAID';

    return (
      <article className="p-card p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-lg font-extrabold">{when(b.pickupAt)}</p>
            <p className="text-sm p-muted">{b.reference}</p>
          </div>
          <StatusPill value={b.status} />
        </div>

        {/* The single thing a driver must know before pulling away: whether
            money changes hands in the car. Stated loudly, never buried. */}
        <p
          className={`mt-4 rounded-xl px-4 py-3 font-display text-sm font-extrabold ${
            prepaid
              ? 'border p-tone-good'
              : 'border p-tone-warn'
          }`}
        >
          {prepaid
            ? 'PAID ONLINE — collect nothing'
            : `COLLECT IN CAR — ${eur(b.meterEstimate)} on the meter`}
        </p>

        {/* The one money line a driver gets: what the desk agreed to pay them.
            The fare and the service charge are the business's figures and do
            not appear anywhere in this panel. */}
        {prepaid && (
          <p className="mt-2 flex items-baseline justify-between rounded-xl bg-[var(--p-surface-2)] px-4 py-2.5 text-sm">
            <span className="p-muted">Your pay</span>
            {b.driverPay != null ? (
              <span className="font-mono text-base font-extrabold tabular-nums">{eur(b.driverPay)}</span>
            ) : (
              <span className="p-faint">to be confirmed by the desk</span>
            )}
          </p>
        )}

        <dl className="mt-4 space-y-1.5 text-sm">
          <div className="flex gap-2">
            <dt className="shrink-0 p-muted">Pick up</dt>
            <dd className="font-medium">{b.pickupLabel}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 p-muted">Drop off</dt>
            <dd className="font-medium">{b.dropoffLabel}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 p-muted">Passenger</dt>
            <dd>
              {b.contactName} ·{' '}
              <a href={`tel:${b.contactPhone}`} className="font-semibold p-gold">
                {b.contactPhone}
              </a>
              {b.user?.whatsapp && (
                <>
                  {' · '}
                  <a
                    href={`https://wa.me/${b.user.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold p-gold"
                  >
                    WhatsApp
                  </a>
                </>
              )}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 p-muted">People / bags</dt>
            <dd>
              {b.passengers} / {b.luggage}
            </dd>
          </div>
        </dl>

        {b.notes && (
          <p className="mt-3 rounded-lg bg-[var(--p-surface-2)] p-3 text-sm p-muted">{b.notes}</p>
        )}

        <div className="mt-5 flex flex-wrap gap-3 border-t p-hairline pt-4">
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${b.pickupLat},${b.pickupLng}&destination=${b.dropoffLat},${b.dropoffLng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-[var(--p-gold)] px-4 py-2 text-sm font-bold hover:bg-[var(--p-gold)] hover:text-[#0a0a0b]"
          >
            Navigate
          </a>
          <Link
            href={`/trip/${b.reference}`}
            className="rounded-lg border-2 border-[var(--p-gold)] px-4 py-2 text-sm font-bold hover:bg-[var(--p-gold)] hover:text-[#0a0a0b]"
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
      tabs={DRIVER_TABS}
      activeHref="/driver"
    >
      {/* A ride in progress comes before everything. This page is opened on a
          phone at the rank or at a door, and the six full-height figure tiles
          that used to sit here pushed the live ride — the only thing the
          driver needs in that moment — eight hundred pixels below the fold. */}
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

      {overdue.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-extrabold text-[var(--p-down)]">
            Pickup time passed ({overdue.length})
          </h2>
          <p className="mt-1 text-sm p-muted">
            These were due before today and have not been started. Call the office if
            something is wrong.
          </p>
          <div className="mt-4 space-y-4">
            {overdue.map((b) => (
              <Trip key={b.id} b={b} />
            ))}
          </div>
        </section>
      )}


      {/* The figures, in one strip. Two across on a phone, so all of them fit
          in the height one tile used to take. */}
      <div className="mb-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-xl border border-[var(--p-gold)]/40 bg-[var(--p-gold-dim)] p-3.5 sm:p-4">
          <p className="text-[10px] uppercase tracking-wider p-muted">Rides today</p>
          <p className="mt-1 font-mono text-xl font-extrabold tabular-nums sm:text-2xl">
            {doneToday.length}
            <span className="ml-1.5 font-sans text-[11px] font-normal p-muted">
              done · {today.length} to go
            </span>
          </p>
        </div>
        <div className="p-card p-3.5 sm:p-4">
          <p className="text-[10px] uppercase tracking-wider p-muted">Earned today</p>
          <p className="mt-1 font-mono text-xl font-extrabold tabular-nums sm:text-2xl">{eur(owedToday)}</p>
        </div>
        <div className="p-card p-3.5 sm:p-4">
          <p className="text-[10px] uppercase tracking-wider p-muted">Available</p>
          <p className="mt-1 font-mono text-xl font-extrabold tabular-nums sm:text-2xl">{eur(balance.available)}</p>
        </div>
        <div className="p-card p-3.5 sm:p-4">
          <p className="text-[10px] uppercase tracking-wider p-muted">Awaiting payout</p>
          <p className="mt-1 font-mono text-xl font-extrabold tabular-nums sm:text-2xl">{eur(balance.pending)}</p>
        </div>
        <div className="p-card p-3.5 sm:p-4">
          <p className="text-[10px] uppercase tracking-wider p-muted">Rating</p>
          <p className="mt-1 font-mono text-xl font-extrabold tabular-nums sm:text-2xl">
            {rated ? `${(ratingAgg._avg.rating ?? 0).toFixed(1)} ★` : '—'}
            {rated && (
              <span className="ml-1.5 font-sans text-[11px] font-normal p-muted">
                {ratingAgg._count}
              </span>
            )}
          </p>
        </div>
        {/* Every new booking is prepaid, so cash in the car is a thing of the
            past — the tile only appears on a day it is actually non-zero,
            which means a legacy fee-only ride was worked. */}
        {cashToday > 0 && (
          <div className="p-card p-3.5 sm:p-4">
            <p className="text-[10px] uppercase tracking-wider p-muted">Cash taken</p>
            <p className="mt-1 font-mono text-xl font-extrabold tabular-nums sm:text-2xl">{eur(cashToday)}</p>
          </div>
        )}
      </div>

      <Link
        href="/driver/earnings"
        className="mb-10 inline-flex items-center gap-2 text-sm font-semibold p-gold underline decoration-[rgb(201_162_39/35%)] underline-offset-4 hover:decoration-[var(--p-gold-bright)]"
      >
        Earnings &amp; withdrawals
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
          <path d="m7.5 4 6 6-6 6-1.4-1.4L10.7 10 6.1 5.4z" />
        </svg>
      </Link>

      <section>
        <h2 className="font-display text-xl font-extrabold">Today ({today.length})</h2>
        {today.length === 0 ? (
          <p className="mt-4 p-card border-dashed p-8 text-center p-muted">
            Nothing left today.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {today.map((b) => (
              <Trip key={b.id} b={b} />
            ))}
          </div>
        )}
      </section>

      {upcoming.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-extrabold">
            Coming up ({upcoming.length})
          </h2>
          <div className="mt-4 space-y-4">
            {upcoming.map((b) => (
              <Trip key={b.id} b={b} />
            ))}
          </div>
        </section>
      )}

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
