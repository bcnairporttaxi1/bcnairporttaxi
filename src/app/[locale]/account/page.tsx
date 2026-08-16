import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell, StatusPill } from '@/components/panel-shell';
import { EditRideForm } from '@/components/edit-ride-form';
import { editMyRide } from './actions';
import { isPassengerEditable, minutesLeftToEdit } from '@/lib/rides';
import { prisma } from '@/lib/db';
import { requireRole } from '@/lib/guards';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'account' });
  return {
    title: { absolute: t('metaTitle') },
    robots: { index: false, follow: false },
  };
}

export default async function AccountPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('account');

  // Money and dates follow the reader's locale, not a fixed English one.
  const eur = (n: unknown) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(Number(n));

  const user = await requireRole(['USER', 'ADMIN', 'DRIVER'], locale);

  // The header links everyone here; staff belong in their own panel.
  if (user.role === 'ADMIN') redirect(`/${locale}/admin`);
  if (user.role === 'DRIVER') redirect(`/${locale}/driver`);

  // Matched on the account's email as well as its id, so bookings made as a
  // guest before signing up still appear.
  const bookings = await prisma.booking.findMany({
    where: { OR: [{ userId: user.id }, { contactEmail: user.email }] },
    include: { vehicle: true, driver: true },
    orderBy: { pickupAt: 'desc' },
  });

  const now = Date.now();
  const upcoming = bookings.filter(
    (b) => b.pickupAt.getTime() >= now && b.status !== 'CANCELLED',
  );
  const past = bookings.filter(
    (b) => b.pickupAt.getTime() < now || b.status === 'CANCELLED',
  );

  const when = (d: Date) =>
    new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/Madrid',
    }).format(d);

  function Card({ b }: { b: (typeof bookings)[number] }) {
    return (
      <article className="rounded-card border border-hairline bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-lg font-extrabold">{b.reference}</p>
            <p className="text-sm text-muted">{when(b.pickupAt)}</p>
          </div>
          <StatusPill value={b.status} />
        </div>

        <dl className="mt-4 space-y-1.5 text-sm">
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">{t('from')}</dt>
            <dd className="font-medium">{b.pickupLabel}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">{t('to')}</dt>
            <dd className="font-medium">{b.dropoffLabel}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">{t('vehicle')}</dt>
            <dd>{b.vehicle?.name ?? t('vehicleTbd')}</dd>
          </div>
          {b.driver && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-muted">{t('driver')}</dt>
              <dd>
                {b.driver.name} · {b.driver.phone}
              </dd>
            </div>
          )}
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted">{t('toPayInTaxi')}</dt>
            <dd className="font-mono">
              {b.paymentMode === 'FULL_PREPAID' ? t('nothingToPay') : eur(b.meterEstimate)}
            </dd>
          </div>
        </dl>

        {isPassengerEditable(b) && (
          <div className="mt-5 border-t border-hairline pt-4">
            <EditRideForm
              bookingId={b.id}
              locale={locale}
              action={editMyRide}
              minutesLeft={minutesLeftToEdit(b)}
              current={{
                pickupLabel: b.pickupLabel,
                dropoffLabel: b.dropoffLabel,
                passengers: b.passengers,
                luggage: b.luggage,
                notes: b.notes ?? '',
              }}
            />
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3 border-t border-hairline pt-4">
          <Link
            href={`/booking/${b.reference}`}
            className="rounded-lg border-2 border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-porcelain"
          >
            {t('viewDetails')}
          </Link>
          {(b.status === 'ASSIGNED' || b.status === 'EN_ROUTE') && (
            <Link
              href={`/trip/${b.reference}`}
              className="rounded-lg bg-ink px-4 py-2 text-sm font-bold text-porcelain hover:bg-graphite"
            >
              {t('trackChat')}
            </Link>
          )}
          {/* One-click repeat: prefills a new quote with the same route. */}
          <Link
            href={{
              pathname: '/checkout',
              query: {
                plat: String(b.pickupLat),
                plng: String(b.pickupLng),
                plabel: b.pickupLabel,
                dlat: String(b.dropoffLat),
                dlng: String(b.dropoffLng),
                dlabel: b.dropoffLabel,
                at: new Date(Date.now() + 24 * 3600_000).toISOString(),
                mode: b.paymentMode,
              },
            }}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-ink hover:bg-accent-deep"
          >
            {t('bookAgain')}
          </Link>
        </div>
      </article>
    );
  }

  return (
    <PanelShell
      title={t('title')}
      subtitle={t('subtitle')}
      userName={user.name}
      locale={locale}
    >
      {bookings.length === 0 ? (
        <div className="rounded-card border border-hairline bg-white p-10 text-center">
          <p className="text-muted">{t('empty')}</p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-xl bg-accent px-6 py-3 font-display font-extrabold text-ink hover:bg-accent-deep"
          >
            {t('getPrice')}
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-xl font-extrabold">
              {t('upcoming', { count: upcoming.length })}
            </h2>
            {upcoming.length === 0 ? (
              <p className="mt-4 rounded-card border border-hairline bg-white p-8 text-center text-muted">
                {t('nothingUpcoming')}
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {upcoming.map((b) => (
                  <Card key={b.id} b={b} />
                ))}
              </div>
            )}
          </section>

          {past.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-extrabold">
                {t('past', { count: past.length })}
              </h2>
              <div className="mt-4 space-y-4">
                {past.map((b) => (
                  <Card key={b.id} b={b} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </PanelShell>
  );
}
