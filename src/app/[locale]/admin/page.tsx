import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PanelShell, StatusPill } from '@/components/panel-shell';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/guards';
import { assignDriver, setBookingStatus } from './actions';
import { ADMIN_TABS } from './tabs';

export const metadata: Metadata = {
  title: { absolute: 'Admin | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

const eur = (n: unknown) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(Number(n));

const STATUSES = [
  'PENDING',
  'CONFIRMED',
  'ASSIGNED',
  'EN_ROUTE',
  'COMPLETED',
  'CANCELLED',
] as const;

export default async function AdminPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const user = await requireRole(['ADMIN'], locale);

  const [bookings, drivers, counts] = await Promise.all([
    prisma.booking.findMany({
      include: { driver: true, vehicle: true },
      orderBy: { pickupAt: 'asc' },
      take: 100,
    }),
    prisma.driver.findMany({ where: { active: true }, orderBy: { name: 'asc' } }),
    prisma.booking.groupBy({ by: ['status'], _count: { _all: true } }),
  ]);

  const countFor = (s: string) =>
    counts.find((c) => c.status === s)?._count._all ?? 0;

  const revenue = bookings
    .filter((b) => b.paymentStatus === 'PAID')
    .reduce((sum, b) => sum + Number(b.amountOnline), 0);

  return (
    <PanelShell
      title="Bookings"
      subtitle="Every reservation, newest pickup first. Assign a driver and move the status as the trip progresses."
      userName={user.name}
      locale={locale}
      tabs={ADMIN_TABS}
      activeHref="/admin"
    >
      {/* Snapshot */}
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Awaiting payment', String(countFor('PENDING'))],
          ['Confirmed', String(countFor('CONFIRMED'))],
          ['Needs a driver', String(countFor('CONFIRMED'))],
          ['Collected online', eur(revenue)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-card border border-hairline bg-white p-5">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="mt-1 font-mono text-2xl font-extrabold">{value}</dd>
          </div>
        ))}
      </dl>

      {bookings.length === 0 ? (
        <p className="mt-8 rounded-card border border-hairline bg-white p-10 text-center text-muted">
          No bookings yet.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {bookings.map((b) => (
            <article
              key={b.id}
              className="rounded-card border border-hairline bg-white p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-lg font-extrabold">{b.reference}</p>
                  <p className="text-sm text-muted">
                    {new Intl.DateTimeFormat('en-GB', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                      timeZone: 'Europe/Madrid',
                    }).format(b.pickupAt)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill value={b.status} />
                  <StatusPill value={b.paymentStatus} />
                </div>
              </div>

              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <div className="flex gap-2">
                  <dt className="shrink-0 text-muted">From</dt>
                  <dd className="font-medium">{b.pickupLabel}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 text-muted">To</dt>
                  <dd className="font-medium">{b.dropoffLabel}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 text-muted">Passenger</dt>
                  <dd>
                    {b.contactName} · {b.contactPhone}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 text-muted">Vehicle</dt>
                  <dd>{b.vehicle?.name ?? '—'}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 text-muted">Paid online</dt>
                  <dd className="font-mono">{eur(b.amountOnline)}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="shrink-0 text-muted">In the taxi</dt>
                  <dd className="font-mono">
                    {b.paymentMode === 'FULL_PREPAID' ? 'Nothing' : eur(b.meterEstimate)}
                  </dd>
                </div>
              </dl>

              {b.notes && (
                <p className="mt-3 rounded-lg bg-porcelain p-3 text-sm text-muted">{b.notes}</p>
              )}

              <div className="mt-5 flex flex-wrap gap-3 border-t border-hairline pt-4">
                <form action={assignDriver} className="flex items-center gap-2">
                  <input type="hidden" name="bookingId" value={b.id} />
                  <input type="hidden" name="locale" value={locale} />
                  <label className="sr-only" htmlFor={`driver-${b.id}`}>
                    Assign driver to {b.reference}
                  </label>
                  <select
                    id={`driver-${b.id}`}
                    name="driverId"
                    defaultValue={b.driverId ?? ''}
                    className="rounded-lg border border-hairline bg-white px-3 py-2 text-sm"
                  >
                    <option value="">No driver</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-lg bg-ink px-4 py-2 text-sm font-bold text-porcelain hover:bg-graphite"
                  >
                    Assign
                  </button>
                </form>

                <form action={setBookingStatus} className="flex items-center gap-2">
                  <input type="hidden" name="bookingId" value={b.id} />
                  <input type="hidden" name="locale" value={locale} />
                  <label className="sr-only" htmlFor={`status-${b.id}`}>
                    Status for {b.reference}
                  </label>
                  <select
                    id={`status-${b.id}`}
                    name="status"
                    defaultValue={b.status}
                    className="rounded-lg border border-hairline bg-white px-3 py-2 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-porcelain"
                  >
                    Update
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </PanelShell>
  );
}
