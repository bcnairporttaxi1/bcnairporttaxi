import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PanelShell, StatusPill } from '@/components/panel-shell';
import { EditRideForm } from '@/components/edit-ride-form';
import { RebookButton } from '@/components/rebook-button';
import { editMyRide } from './actions';
import { ACTIVE_STATUSES, isPassengerEditable, minutesLeftToEdit } from '@bcn/core/rides';
import { prisma } from '@/lib/db';
import { eurIn, dateIn } from '@bcn/core/format';
import { requireRole } from '@/lib/guards';
import { ACCOUNT_TABS } from './tabs';

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

  const eur = eurIn(locale);
  const when = dateIn(locale, 'medium');

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
    // A frequent traveller's history is unbounded otherwise, and nobody
    // scrolls past a couple of hundred past trips.
    take: 200,
  });

  const now = Date.now();
  // A ride in progress is its own thing: it belongs at the top, not filed
  // under "upcoming" with a pickup time that has already passed.
  const live = bookings.filter((b) => ACTIVE_STATUSES.includes(b.status));
  const upcoming = bookings.filter(
    (b) =>
      b.pickupAt.getTime() >= now &&
      b.status !== 'CANCELLED' &&
      !ACTIVE_STATUSES.includes(b.status),
  );
  const past = bookings.filter(
    (b) =>
      (b.pickupAt.getTime() < now || b.status === 'CANCELLED') &&
      !ACTIVE_STATUSES.includes(b.status),
  );

  // Most airport transfers are round trips, so the journey someone is most
  // likely to want again is the last one they actually took.
  const mostRecent = past.find((b) => b.status === 'COMPLETED') ?? past[0];

  /**
   * Where a rebooked pickup should land: the same clock time on the next day,
   * or tomorrow if that has already passed. Computed once here rather than in
   * the button, which must stay free of clock reads to remain idempotent.
   */
  const rebookAt = (pickupAt: Date) => {
    const next = new Date(pickupAt);
    next.setDate(next.getDate() + 1);
    return next.getTime() > now ? next : new Date(now + 24 * 3600_000);
  };

  function Card({
    b,
    live: isLive = false,
  }: {
    b: (typeof bookings)[number];
    live?: boolean;
  }) {
    const prepaid = b.paymentMode === 'FULL_PREPAID';
    return (
      <article
        className={`overflow-hidden p-card ${
          isLive ? 'border-[var(--p-gold)] shadow-lg shadow-[var(--p-gold)]/10' : 'p-hairline'
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 border-b p-hairline bg-[var(--p-surface-2)] px-5 py-3.5">
          <div>
            <p className="font-display text-lg font-extrabold leading-tight">
              {when(b.pickupAt)}
            </p>
            <p className="font-mono text-xs p-muted">{b.reference}</p>
          </div>
          <StatusPill value={b.status} />
        </div>

        <div className="px-5 py-4">
          <div className="space-y-1.5 text-sm">
            <p className="flex gap-2">
              <span aria-hidden="true" className="mt-0.5 p-gold">
                &#9650;
              </span>
              <span className="font-medium">{b.pickupLabel}</span>
            </p>
            <p className="flex gap-2">
              <span aria-hidden="true" className="mt-0.5 p-muted">
                &#9660;
              </span>
              <span className="font-medium">{b.dropoffLabel}</span>
            </p>
          </div>

          <dl className="mt-4 grid gap-x-6 gap-y-1.5 border-t p-hairline pt-3 text-sm sm:grid-cols-2">
            <div className="flex gap-2">
              <dt className="shrink-0 p-muted">{t('vehicle')}</dt>
              <dd>{b.vehicle?.name ?? t('vehicleTbd')}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 p-muted">{t('toPayInTaxi')}</dt>
              <dd className="font-mono font-bold">
                {prepaid ? t('nothingToPay') : eur(b.meterEstimate)}
              </dd>
            </div>
            {b.driver && (
              <div className="flex gap-2 sm:col-span-2">
                <dt className="shrink-0 p-muted">{t('driver')}</dt>
                <dd>
                  <span className="font-semibold">{b.driver.name}</span>
                  {' · '}
                  <a
                    href={`tel:${b.driver.phone}`}
                    className="font-semibold p-gold"
                  >
                    {b.driver.phone}
                  </a>
                  {b.driver.plate && (
                    <span className="ml-2 rounded bg-[rgb(255_255_255/8%)] px-1.5 py-0.5 font-mono text-[11px] font-bold p-gold">
                      {b.driver.plate}
                    </span>
                  )}
                </dd>
              </div>
            )}
          </dl>

          {isPassengerEditable(b) && (
            <div className="mt-4">
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
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t p-hairline bg-[var(--p-surface-2)] px-5 py-3">
          {(b.status === 'ASSIGNED' || ACTIVE_STATUSES.includes(b.status)) && (
            <Link
              href={`/trip/${b.reference}`}
              className="wave rounded-lg bg-[var(--p-gold)] px-4 py-2 text-sm font-bold text-[#0a0a0b] hover:bg-[var(--p-gold-bright)]"
            >
              {t('trackChat')}
            </Link>
          )}
          <Link
            href={`/booking/${b.reference}`}
            className="text-sm font-semibold p-gold underline underline-offset-4"
          >
            {t('viewDetails')}
          </Link>
          <div className="ml-auto">
            <RebookButton
              booking={b}
              label={t('bookAgain')}
              variant="quiet"
              defaultAt={rebookAt(b.pickupAt)}
            />
          </div>
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
      tabs={ACCOUNT_TABS}
      activeHref="/account"
    >
      {bookings.length === 0 ? (
        <div className="p-card p-12 text-center">
          <p className="p-muted">{t('empty')}</p>
          <Link
            href="/"
            className="wave mt-6 inline-block rounded-xl bg-[var(--p-gold)] px-6 py-3 font-display font-extrabold text-[#0a0a0b] hover:bg-[var(--p-gold-bright)]"
          >
            {t('getPrice')}
          </Link>
        </div>
      ) : (
        <>
          {/* The single action most people open this page to take. */}
          {mostRecent && (
            <section className="mb-10 rounded-card border-2 border-[var(--p-gold)]/40 bg-[var(--p-gold-dim)] p-5 sm:p-6">
              <h2 className="font-display text-lg font-extrabold">{t('rebookTitle')}</h2>
              <p className="mt-1 text-sm p-muted">{t('rebookIntro')}</p>
              <p className="mt-3 text-sm">
                <span className="font-medium">{mostRecent.pickupLabel}</span>
                <span className="mx-2 p-muted">&rarr;</span>
                <span className="font-medium">{mostRecent.dropoffLabel}</span>
              </p>
              <div className="mt-4">
                <RebookButton
                  booking={mostRecent}
                  label={t('rebookCta')}
                  defaultAt={rebookAt(mostRecent.pickupAt)}
                />
              </div>
            </section>
          )}

          {live.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 font-display text-xl font-extrabold">
                {t('happeningNow')}
              </h2>
              <div className="space-y-4">
                {live.map((b) => (
                  <Card key={b.id} b={b} live />
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-4 font-display text-xl font-extrabold">
              {t('upcoming', { count: upcoming.length })}
            </h2>
            {upcoming.length === 0 ? (
              <p className="p-card border-dashed p-8 text-center p-muted">
                {t('nothingUpcoming')}
              </p>
            ) : (
              <div className="space-y-4">
                {upcoming.map((b) => (
                  <Card key={b.id} b={b} />
                ))}
              </div>
            )}
          </section>

          {past.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 font-display text-xl font-extrabold">
                {t('past', { count: past.length })}
              </h2>
              <div className="space-y-4">
                {past.slice(0, 20).map((b) => (
                  <Card key={b.id} b={b} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </PanelShell>
  );
}
