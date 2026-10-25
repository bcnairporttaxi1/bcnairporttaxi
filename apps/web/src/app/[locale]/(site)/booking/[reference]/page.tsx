import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { prisma } from '@/lib/db';
import { eurIn } from '@bcn/core/format';
import { confirmBookingPayment } from '@/lib/payments/confirm';
import { tripLink } from '@/lib/trip-token';
import { balanceDue } from '@bcn/core/rides';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'confirmation' });
  return {
    title: t('metaTitle'),
    // A booking page is personal; it must never be indexed.
    robots: { index: false, follow: false },
    alternates: { canonical: `/${locale}/booking` },
  };
}

export default async function BookingPage(props: {
  params: Promise<{ locale: string; reference: string }>;
}) {
  const { locale, reference } = await props.params;
  setRequestLocale(locale);
  const eur = eurIn(locale);

  const t = await getTranslations('confirmation');
  const tq = await getTranslations('quote');
  const tf = await getTranslations('findBooking');

  const booking = await prisma.booking
    .findUnique({ where: { reference }, include: { vehicle: true } })
    .catch(() => null);

  if (!booking) {
    return (
      <>
        <PageHero title={t('notFound')} />
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <Link
            href="/"
            className="wave inline-block rounded-lg bg-gold px-5 py-3 font-display font-extrabold text-void hover:bg-accent-deep"
          >
            {t('backHome')}
          </Link>
        </div>
      </>
    );
  }

  // Payment state is re-read from SumUp rather than trusted from the redirect,
  // so a hand-crafted return URL cannot mark a booking as paid. The same
  // function serves the webhook, and only whichever of the two flips the row
  // sends the receipt — see lib/payments/confirm.ts.
  let paid = booking.paymentStatus === 'PAID';
  if (!paid) {
    const outcome = await confirmBookingPayment(booking.reference);
    paid = outcome === 'paid' || outcome === 'already-paid';
  }

  /**
   * Every new booking is all-inclusive and prepaid, so the confirmation shows
   * one amount. Bookings taken before the changeover were settled partly with
   * the driver, and those still have to say so — `prepaid` is what separates
   * them, read from the stored mode rather than assumed.
   */
  const prepaid = booking.paymentMode === 'FULL_PREPAID';

  // What the card actually took can fall short of the price. The passenger is
  // told here so the driver asking for the rest in the car is not a surprise.
  const owed = balanceDue({
    amountOnline: Number(booking.amountOnline),
    amountPaid: booking.amountPaid == null ? null : Number(booking.amountPaid),
    paid: booking.paymentStatus === 'PAID',
  });
  const fmtWhen = (d: Date) =>
    new Intl.DateTimeFormat(locale === 'zh' ? 'zh-Hans' : locale, {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Europe/Madrid',
    }).format(d);
  const when = fmtWhen(booking.pickupAt);

  /*
   * Everything else paid for on this order.
   *
   * A return has one sibling; a party in three vans has two more cars per
   * direction, each its own booking with its own driver. This used to take
   * only the first, so a multi-car order showed one of its cars and silently
   * hid the rest.
   */
  const siblings = booking.groupId
    ? await prisma.booking
        .findMany({
          where: { groupId: booking.groupId, id: { not: booking.id } },
          select: { reference: true, pickupAt: true, amountOnline: true },
          orderBy: { pickupAt: 'asc' },
        })
        .catch(() => [])
    : [];

/*
 * What the card was actually charged.
 *
 * One booking row is one car, so a party in two vans sees EUR 70 on a page
 * for a payment of EUR 140 and reasonably concludes they have been charged
 * twice. The order total is the sum across everything on the same checkout.
 */
  const orderTotal =
    Math.round(
      (Number(booking.amountOnline) +
        siblings.reduce((n, o) => n + Number(o.amountOnline), 0)) *
        100,
    ) / 100;

  return (
    <>
      <PageHero
        title={paid ? t('titlePaid') : t('titlePending')}
        intro={paid ? t('bodyPaid') : t('bodyPending')}
      />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-card border border-line bg-raise p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
            <div>
              <p className="text-sm text-dim">{t('reference')}</p>
              <p className="font-mono text-2xl font-extrabold">{booking.reference}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${
                paid ? 'bg-green-100 text-green-900' : 'bg-amber-100 text-amber-900'
              }`}
            >
              {paid ? t('titlePaid') : t('titlePending')}
            </span>
          </div>

          {booking.vehicle && (
            <div className="mt-5 flex items-center gap-4">
              <Image
                src={booking.vehicle.imageUrl}
                alt={booking.vehicle.imageAlt}
                width={1200}
                height={800}
                sizes="160px"
                className="w-40 rounded-xl object-cover"
              />
              <div>
                <p className="font-display font-bold">{booking.vehicle.name}</p>
                <p className="text-sm text-dim">{booking.vehicle.category}</p>
              </div>
            </div>
          )}

          <dl className="mt-6 divide-y divide-line border-t border-line">
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-dim">{tq('pickup')}</dt>
              <dd className="text-right font-medium">{booking.pickupLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-dim">{tq('dropoff')}</dt>
              <dd className="text-right font-medium">{booking.dropoffLabel}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-dim">{tq('date')}</dt>
              <dd className="text-right font-medium">{when}</dd>
            </div>
            {booking.flightNumber && (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-dim">{t('flight')}</dt>
                <dd className="text-right font-mono font-medium">{booking.flightNumber}</dd>
              </div>
            )}
            {siblings.map((other) => (
              <div key={other.reference} className="flex justify-between gap-4 py-3">
                <dt className="text-dim">
                  {other.pickupAt.getTime() === booking.pickupAt.getTime()
                    ? t('anotherCar')
                    : other.pickupAt > booking.pickupAt
                      ? t('returnLeg')
                      : t('outboundLeg')}
                </dt>
                <dd className="text-right">
                  <Link href={`/booking/${other.reference}`} className="font-medium text-gold underline underline-offset-4">
                    {other.reference}
                  </Link>
                  <span className="block text-xs text-dim">{fmtWhen(other.pickupAt)}</span>
                </dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-dim">{tq('distance')}</dt>
              <dd className="text-right font-mono">
                {booking.roadKm} km · {booking.durationMin} min
              </dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="font-display font-bold">
                {prepaid ? tq('totalPrice') : tq('payNow')}
              </dt>
              <dd className="text-right font-mono text-lg font-extrabold">
                {eur(Number(booking.amountOnline))}
              </dd>
            </div>
            {siblings.length > 0 && (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-dim">
                  {t('orderTotal', { count: siblings.length + 1 })}
                </dt>
                <dd className="text-right font-mono font-bold text-gold">{eur(orderTotal)}</dd>
              </div>
            )}
            {prepaid && owed > 0 ? (
              // The card took less than the price. Saying so here, rather than
              // letting the driver surprise them, is the whole point.
              <>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-dim">{tq('paidOnline')}</dt>
                  <dd className="text-right font-mono">
                    {eur(Number(booking.amountPaid ?? 0))}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-dim">{tq('balanceInTaxi')}</dt>
                  <dd className="text-right font-mono font-bold text-gold">{eur(owed)}</dd>
                </div>
              </>
            ) : prepaid ? (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-dim">{tq('allInclusive')}</dt>
                <dd className="text-right font-medium text-jade">{tq('nothingInTaxi')}</dd>
              </div>
            ) : (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-dim">{tq('payInTaxi')}</dt>
                <dd className="text-right font-mono">{eur(Number(booking.meterEstimate))}</dd>
              </div>
            )}
          </dl>

          <p className="mt-6 rounded-lg bg-void p-4 text-sm leading-relaxed text-dim">
            {t('driverNote')}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-dim">{tq('disclaimer')}</p>
        </div>

        {/* The trip page is where the driver's details, live position and
            chat live. A guest reaches it through the signed link; an account
            holder through their session. Either way, one button. */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <a href={tripLink(locale, booking.reference)} className="cta cta-gold group">
            {tf('trackLink')}
            <span className="cta-pip" aria-hidden="true">
              <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
                <path d="M4 9h9.2l-3.6-3.6L11 4l6 6-6 6-1.4-1.4L13.2 11H4V9Z" />
              </svg>
            </span>
          </a>
          <Link href="/" className="font-semibold text-gold underline underline-offset-4">
            {t('backHome')}
          </Link>
        </div>
      </div>
    </>
  );
}
