import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell } from '@/components/panel-shell';
import { Card, CardHeader, Empty, MiniStat, RangeTabs, StatTile } from '@/components/panel/ui';
import { AreaChart, BarChart, DonutChart, MeterRow } from '@/components/panel/charts';
import { requireRole } from '@/lib/guards';
import { RANGES, dashboardData, type RangeKey } from '@/lib/analytics';
import { adminNav } from './tabs';

export const metadata: Metadata = {
  title: { absolute: 'Operations Center | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

const QUICK_ACTIONS: Array<{ href: string; label: string; dot: string }> = [
  { href: '/admin/rides', label: 'All bookings', dot: '#c9a227' },
  { href: '/admin/users', label: 'Customers', dot: '#60a5fa' },
  { href: '/admin/drivers', label: 'Drivers', dot: '#4ade80' },
  { href: '/admin/withdrawals', label: 'Payouts', dot: '#e3bf4a' },
  { href: '/admin/reports', label: 'Reports', dot: '#f87171' },
  { href: '/admin/reviews', label: 'Ratings', dot: '#a5b4fc' },
];

export default async function OperationsCenterPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ range?: string }>;
}) {
  const { locale } = await props.params;
  const { range: rawRange } = await props.searchParams;
  setRequestLocale(locale);

  const user = await requireRole(['ADMIN'], locale);

  const range = (RANGES.find((r) => r.key === rawRange)?.key ?? '30d') as RangeKey;
  const d = await dashboardData(range);

  /** Whole euros once the figures are big enough for cents to be noise. */
  const eur = (n: number) =>
    new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: n >= 1000 ? 0 : 2,
    }).format(n);
  const eur2 = (n: number) =>
    new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(n);

  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Madrid',
  }).format(new Date());

  const statusMax = Math.max(...d.statusCounts.map((s) => s.value), 1);

  /**
   * Axis precision follows the numbers on it. Rounding to whole euros turns a
   * young business's axis into "€0 €0 €1 €1 €1", which reads as broken rather
   * than as small.
   */
  const peak = Math.max(...d.revenueSeries.map((p) => p.value), 0);
  const axisMoney = (n: number) =>
    peak < 10
      ? `€${n.toFixed(2)}`
      : peak < 100
        ? `€${n.toFixed(1)}`
        : `€${Math.round(n)}`;

  return (
    <PanelShell
      title="Operations Center"
      subtitle={today}
      userName={user.name}
      locale={locale}
      groups={adminNav({
        needsDriver: d.needsDriver,
        payouts: d.payoutsPending,
      })}
      activeHref="/admin"
      actions={
        <Link href="/book" className="p-btn p-btn-gold">
          + New booking
        </Link>
      }
    >
      {/* Headline figures. Revenue is the booking fee only — see lib/analytics. */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          icon="€"
          label="Booking fee revenue"
          value={eur(d.revenue)}
          sub={`vs ${eur(d.revenuePrev)} previous ${range}`}
          trend={d.revenueTrend}
          tone="gold"
        />
        <StatTile
          icon="▦"
          label="Total bookings"
          value={d.bookings}
          sub={`${d.pendingConfirmed} awaiting travel`}
          trend={d.bookingsTrend}
        />
        <StatTile
          icon="✓"
          label="Completed rides"
          value={d.completed}
          sub={`${d.conversion.toFixed(1)}% of bookings`}
        />
        <StatTile
          icon="⛟"
          label="Active drivers"
          value={`${d.driversOnline} / ${d.driversActive}`}
          sub="on a ride now / on the books"
        />
      </div>

      {/* Things needing a decision rather than a number to admire. */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MiniStat
          label="Needs a driver"
          value={d.needsDriver}
          tone={d.needsDriver > 0 ? 'urgent' : 'good'}
          href="/admin/rides?bucket=new"
        />
        <MiniStat label="Rides today" value={d.todayBookings} href="/admin/rides" />
        <MiniStat
          label="In progress"
          value={d.inProgress}
          tone={d.inProgress > 0 ? 'good' : 'plain'}
          href="/admin/rides?bucket=active"
        />
        <MiniStat
          label="Abandoned checkouts"
          value={d.abandoned}
          tone={d.abandoned > 0 ? 'urgent' : 'plain'}
          href="/admin/rides?bucket=pending"
        />
      </div>

      {/* Revenue over time, next to where it came from. */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.9fr_1fr]">
        <Card>
          <CardHeader
            title="Revenue & bookings"
            hint={`${eur2(d.revenue)} in booking fees this period`}
            actions={
              <RangeTabs
                options={RANGES.map((r) => ({ key: r.key, label: r.label }))}
                active={range}
                hrefFor={(k) => ({ pathname: '/admin', query: { range: k } })}
              />
            }
          />
          <AreaChart
            data={d.revenueSeries}
            format={axisMoney}
            label={`Booking fee revenue over the last ${range}`}
          />
        </Card>

        <Card>
          <CardHeader title="Revenue by vehicle" hint="booking fees, this period" />
          {d.byVehicle.length === 0 ? (
            <Empty message="No paid bookings in this period." />
          ) : (
            <>
              <DonutChart
                data={d.byVehicle}
                total={d.byVehicle.length}
                centreLabel={eur(d.revenue)}
                label="Booking fee revenue split by vehicle class"
              />
              <ul className="mt-4 space-y-2">
                {d.byVehicle.map((v) => (
                  <li key={v.label} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: v.colour }}
                      />
                      <span className="truncate p-muted">{v.label}</span>
                    </span>
                    <span className="font-mono font-bold">{eur2(v.value)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader title="Daily bookings" hint="every booking created, paid or not" />
          <BarChart data={d.bookingSeries} label={`Bookings per day over the last ${range}`} />
        </Card>
      </div>

      {/* Status, shortcuts, health. */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader title="Booking status" hint="all time" />
          {d.statusCounts.length === 0 ? (
            <Empty message="No bookings yet." />
          ) : (
            <div>
              {d.statusCounts.map((s) => (
                <MeterRow
                  key={s.label}
                  label={s.label.replace(/_/g, ' ').toLowerCase()}
                  value={s.value}
                  max={statusMax}
                />
              ))}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader title="Quick actions" hint="the places you go most" />
          <div className="grid grid-cols-2 gap-2">
            {QUICK_ACTIONS.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center gap-2 rounded-lg border p-hairline px-3 py-2.5 text-sm transition hover:border-[var(--p-gold)]"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: a.dot }}
                />
                <span className="truncate">{a.label}</span>
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Platform health" hint="worth a glance daily" />
          <dl className="divide-y divide-[var(--p-line-soft)] text-sm">
            {[
              ['Conversion rate', `${d.conversion.toFixed(1)}%`, d.conversion >= 30],
              [
                'Revenue growth',
                d.revenueTrend === null ? '—' : `${d.revenueTrend > 0 ? '+' : ''}${d.revenueTrend.toFixed(1)}%`,
                (d.revenueTrend ?? 0) >= 0,
              ],
              ['Drivers online', `${d.driversOnline} / ${d.driversActive}`, d.driversOnline > 0],
              ['Owed to drivers', eur2(d.driverOwed), d.driverOwed === 0],
              ['Payouts to action', String(d.payoutsPending), d.payoutsPending === 0],
              ['Cancelled this period', String(d.cancelled), d.cancelled === 0],
              [
                'Abandoned value',
                eur2(d.abandonedValue),
                d.abandoned === 0,
              ],
            ].map(([label, value, good]) => (
              <div key={String(label)} className="flex justify-between gap-3 py-2">
                <dt className="p-muted">{label}</dt>
                <dd
                  className={`font-mono font-bold ${
                    good ? 'text-[var(--p-up)]' : 'text-[var(--p-gold-bright)]'
                  }`}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </PanelShell>
  );
}
