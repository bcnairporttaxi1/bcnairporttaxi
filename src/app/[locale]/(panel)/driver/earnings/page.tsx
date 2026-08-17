import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell } from '@/components/panel-shell';
import { PayoutDetailsForm, WithdrawForm } from '@/components/driver-payout-forms';
import { prisma } from '@/lib/db';
import { eurIn, dateIn } from '@/lib/format';
import { requireDriver } from '@/lib/guards';
import { DRIVER_TABS } from '../tabs';
import { driverBalance } from '@/lib/driver-balance';
import { requestWithdrawal, savePayoutDetails } from '../actions';

export const metadata: Metadata = {
  title: { absolute: 'Earnings | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

const STATUS_TONE: Record<string, string> = {
  REQUESTED: 'bg-amber-100 text-amber-900',
  APPROVED: 'bg-blue-100 text-blue-900',
  PAID: 'bg-green-100 text-green-900',
  REJECTED: 'bg-red-100 text-red-900',
};

export default async function EarningsPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const { user, driver } = await requireDriver(locale);

  const eur = eurIn(locale);
  const day = dateIn(locale, 'dateOnly');

  if (!driver) {
    return (
      <PanelShell title="Earnings" userName={user.name} locale={locale}>
        <p className="rounded-card border border-hairline bg-white p-10 text-center text-muted">
          This account has no driver record attached yet.
        </p>
      </PanelShell>
    );
  }

  const [balance, withdrawals, completed] = await Promise.all([
    driverBalance(driver.id),
    prisma.withdrawal.findMany({
      where: { driverId: driver.id },
      orderBy: { requestedAt: 'desc' },
      take: 50,
    }),
    prisma.booking.findMany({
      where: { driverId: driver.id, status: 'COMPLETED' },
      orderBy: { completedAt: 'desc' },
      take: 50,
      select: {
        id: true,
        reference: true,
        pickupAt: true,
        completedAt: true,
        pickupLabel: true,
        dropoffLabel: true,
        paymentMode: true,
        driverPayout: true,
        cashToCollect: true,
      },
    }),
  ]);

  return (
    <PanelShell
      title="Earnings"
      subtitle="What you have earned, and how to get it paid out."
      userName={user.name}
      locale={locale}
      tabs={DRIVER_TABS}
      activeHref="/driver/earnings"
    >
      <Link
        href="/driver"
        className="mb-8 inline-block text-sm font-bold text-accent-text underline underline-offset-4"
      >
        ← Back to my trips
      </Link>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ['Available', balance.available],
          ['Requested', balance.pending],
          ['Paid out', balance.paid],
          ['Earned total', balance.earned],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-card border border-hairline bg-white p-5">
            <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
            <p className="mt-1 font-mono text-2xl font-extrabold">{eur(value)}</p>
          </div>
        ))}
      </div>

      {/* Fee-only rides settle in the car, so they never reach this balance.
          Saying so here saves the same question every week. */}
      <p className="mt-4 rounded-card border-2 border-accent/40 bg-accent/5 p-4 text-sm leading-relaxed">
        Only <strong>prepaid</strong> rides appear here. On a fee-only ride you take the
        metered fare directly from the passenger in the car, so there is nothing for us to
        pay you afterwards.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-xl font-extrabold">Where to send it</h2>
          <div className="mt-4">
            <PayoutDetailsForm
              locale={locale}
              action={savePayoutDetails}
              current={{
                method: driver.payoutMethod ?? null,
                bizumPhone: driver.payoutBizumPhone ?? '',
                iban: driver.payoutIban ?? '',
                holder: driver.payoutHolder ?? '',
              }}
            />
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-extrabold">Request a payout</h2>
          <div className="mt-4">
            <WithdrawForm
              locale={locale}
              action={requestWithdrawal}
              available={balance.available}
              hasDetails={Boolean(driver.payoutMethod)}
            />
          </div>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold">Payout history</h2>
        {withdrawals.length === 0 ? (
          <p className="mt-4 rounded-card border border-hairline bg-white p-8 text-center text-muted">
            No payouts requested yet.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-card border border-hairline bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-hairline text-left text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="p-4">Requested</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr key={w.id} className="border-b border-hairline last:border-0">
                    <td className="p-4">{day(w.requestedAt)}</td>
                    <td className="p-4 font-mono font-bold">{eur(w.amount)}</td>
                    <td className="p-4">{w.method === 'BIZUM' ? 'Bizum' : 'Bank'}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          STATUS_TONE[w.status] ?? 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {w.status}
                      </span>
                      {w.adminNotes && (
                        <span className="ml-2 text-xs text-muted">{w.adminNotes}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold">Completed rides</h2>
        {completed.length === 0 ? (
          <p className="mt-4 rounded-card border border-hairline bg-white p-8 text-center text-muted">
            No completed rides yet.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-card border border-hairline bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-hairline text-left text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Route</th>
                  <th className="p-4">Taken in car</th>
                  <th className="p-4">Owed to you</th>
                </tr>
              </thead>
              <tbody>
                {completed.map((b) => (
                  <tr key={b.id} className="border-b border-hairline last:border-0">
                    <td className="whitespace-nowrap p-4">{day(b.completedAt ?? b.pickupAt)}</td>
                    <td className="p-4 font-mono">{b.reference}</td>
                    <td className="p-4 text-muted">
                      {b.pickupLabel} → {b.dropoffLabel}
                    </td>
                    <td className="p-4 font-mono">
                      {Number(b.cashToCollect) > 0 ? eur(b.cashToCollect) : '—'}
                    </td>
                    <td className="p-4 font-mono font-bold">
                      {Number(b.driverPayout) > 0 ? eur(b.driverPayout) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </PanelShell>
  );
}
