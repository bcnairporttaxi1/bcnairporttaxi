import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PanelShell } from '@/components/panel-shell';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/guards';
import { ADMIN_TABS } from '../tabs';

export const metadata: Metadata = {
  title: { absolute: 'Revenue | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

const PERIODS = [
  { key: '7', label: 'Last 7 days' },
  { key: '30', label: 'Last 30 days' },
  { key: '90', label: 'Last 90 days' },
  { key: 'all', label: 'All time' },
];

export default async function RevenuePage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ period?: string }>;
}) {
  const { locale } = await props.params;
  const { period: rawPeriod } = await props.searchParams;
  setRequestLocale(locale);

  const user = await requireRole(['ADMIN'], locale);

  const period = PERIODS.find((p) => p.key === rawPeriod)?.key ?? '30';
  const since =
    period === 'all' ? undefined : new Date(Date.now() - Number(period) * 86_400_000);

  const eur = (n: unknown) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(Number(n));

  const paidWindow = {
    paymentStatus: 'PAID' as const,
    ...(since ? { createdAt: { gte: since } } : {}),
  };

  const [fees, prepaid, feeOnly, completed, owed, paidOut, pendingOut, byMode] =
    await Promise.all([
      // What the business actually earns: the booking fee, and nothing else.
      prisma.booking.aggregate({
        where: paidWindow,
        _sum: { bookingFee: true, amountOnline: true },
        _count: true,
      }),
      prisma.booking.aggregate({
        where: { ...paidWindow, paymentMode: 'FULL_PREPAID' },
        _sum: { fixedFare: true, bookingFee: true },
        _count: true,
      }),
      prisma.booking.aggregate({
        where: { ...paidWindow, paymentMode: 'FEE_ONLY' },
        _sum: { meterEstimate: true, bookingFee: true },
        _count: true,
      }),
      prisma.booking.count({
        where: { status: 'COMPLETED', ...(since ? { completedAt: { gte: since } } : {}) },
      }),
      prisma.booking.aggregate({
        where: { status: 'COMPLETED', ...(since ? { completedAt: { gte: since } } : {}) },
        _sum: { driverPayout: true },
      }),
      prisma.withdrawal.aggregate({
        where: { status: 'PAID', ...(since ? { processedAt: { gte: since } } : {}) },
        _sum: { amount: true },
      }),
      prisma.withdrawal.aggregate({
        where: { status: { in: ['REQUESTED', 'APPROVED'] } },
        _sum: { amount: true },
        _count: true,
      }),
      prisma.booking.groupBy({
        by: ['status'],
        _count: true,
        ...(since ? { where: { createdAt: { gte: since } } } : {}),
      }),
    ]);

  const bookingFees = Number(fees._sum.bookingFee ?? 0);
  const takenOnline = Number(fees._sum.amountOnline ?? 0);
  const driverOwed = Number(owed._sum.driverPayout ?? 0);
  const withdrawn = Number(paidOut._sum.amount ?? 0);
  const outstanding = Math.max(0, driverOwed - withdrawn);

  const Card = ({
    label,
    value,
    hint,
    tone = 'plain',
  }: {
    label: string;
    value: string;
    hint?: string;
    tone?: 'plain' | 'good' | 'warn';
  }) => (
    <div
      className={`rounded-card border p-5 ${
        tone === 'good'
          ? 'border-green-200 bg-green-50'
          : tone === 'warn'
            ? 'border-amber-200 bg-amber-50'
            : 'border-hairline bg-white'
      }`}
    >
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 font-mono text-2xl font-extrabold">{value}</p>
      {hint && <p className="mt-1.5 text-xs leading-relaxed text-muted">{hint}</p>}
    </div>
  );

  return (
    <PanelShell
      title="Revenue"
      subtitle="Booking fees are the business's income. Everything else is money passing through."
      userName={user.name}
      locale={locale}
      tabs={ADMIN_TABS}
      activeHref="/admin/revenue"
    >
      <nav aria-label="Period" className="mb-8">
        <ul className="flex flex-wrap gap-2">
          {PERIODS.map((p) => (
            <li key={p.key}>
              <a
                href={`/${locale}/admin/revenue?period=${p.key}`}
                className={`inline-block rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  p.key === period
                    ? 'bg-ink text-porcelain'
                    : 'border border-hairline bg-white hover:border-ink'
                }`}
              >
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section>
        <h2 className="font-display text-xl font-extrabold">What we earn</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Card
            label="Booking fees"
            value={eur(bookingFees)}
            tone="good"
            hint="Our service charge. This is the only figure on this page that is income."
          />
          <Card
            label="Paid bookings"
            value={String(fees._count)}
            hint="Bookings whose online payment completed."
          />
          <Card
            label="Average fee"
            value={eur(fees._count ? bookingFees / fees._count : 0)}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-extrabold">Money passing through</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Card
            label="Taken online"
            value={eur(takenOnline)}
            hint="Fees plus prepaid fares. The fare part is not ours — it is owed onward to drivers."
          />
          <Card
            label="Prepaid fares"
            value={eur(prepaid._sum.fixedFare ?? 0)}
            hint={`${prepaid._count} prepaid rides. Collected by us, payable to the driver.`}
          />
          <Card
            label="Settled in car"
            value={eur(feeOnly._sum.meterEstimate ?? 0)}
            hint={`${feeOnly._count} fee-only rides. Never touches our account.`}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-extrabold">Driver payments</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <Card
            label="Earned by drivers"
            value={eur(driverOwed)}
            hint={`Across ${completed} completed rides.`}
          />
          <Card label="Paid out" value={eur(withdrawn)} />
          <Card
            label="Still owed"
            value={eur(outstanding)}
            tone={outstanding > 0 ? 'warn' : 'plain'}
            hint="Sitting in driver balances, not yet withdrawn."
          />
          <Card
            label="Awaiting approval"
            value={eur(pendingOut._sum.amount ?? 0)}
            tone={pendingOut._count > 0 ? 'warn' : 'plain'}
            hint={`${pendingOut._count} request(s) to action.`}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-extrabold">Bookings by status</h2>
        <div className="mt-4 overflow-x-auto rounded-card border border-hairline bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-hairline text-left text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Count</th>
              </tr>
            </thead>
            <tbody>
              {byMode.map((r) => (
                <tr key={r.status} className="border-b border-hairline last:border-0">
                  <td className="p-4">{r.status}</td>
                  <td className="p-4 text-right font-mono font-bold">{r._count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PanelShell>
  );
}
