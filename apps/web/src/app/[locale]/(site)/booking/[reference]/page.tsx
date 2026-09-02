import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { prisma } from '@/lib/db';
import { eurIn } from '@bcn/core/format';
import { getCheckoutStatus } from '@/lib/payments/sumup';
import { bookingConfirmationEmail, sendEmail } from '@/lib/email';

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
  // so a hand-crafted return URL cannot mark a booking as paid.
  let paid = booking.paymentStatus === 'PAID';

  if (!paid && booking.sumupCheckoutId) {
    const status = await getCheckoutStatus(booking.sumupCheckoutId);

    if (status === 'PAID') {
      paid = true;
      await prisma.booking.update({
        where: { id: booking.id },
        data: { paymentStatus: 'PAID', status: 'CONFIRMED' },
      });

      // Receipt goes out once, on the transition to paid.
      const mail = bookingConfirmationEmail({
        reference: booking.reference,
        contactName: booking.contactName,
        pickupLabel: booking.pickupLabel,
        dropoffLabel: booking.dropoffLabel,
        pickupAt: booking.pickupAt,
        roadKm: booking.roadKm,
        durationMin: booking.durationMin,
        tariff: booking.tariff,
        paymentMode: booking.paymentMode,
        meterEstimate: Number(booking.meterEstimate),
        fixedFare: Number(booking.fixedFare),
        bookingFee: Number(booking.bookingFee),
        amountOnline: Number(booking.amountOnline),
        amountInTaxi:
          booking.paymentMode === 'FULL_PREPAID' ? 0 : Number(booking.meterEstimate),
        vehicleName: booking.vehicle?.name,
        feePaid: true,
        locale,
      });
      await sendEmail({
        to: booking.contactEmail,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      });
    } else if (status === 'FAILED') {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { paymentStatus: 'FAILED' },
      });
    }
  }

  /**
   * Every new booking is all-inclusive and prepaid, so the confirmation shows
   * one amount. Bookings taken before the changeover were settled partly with
   * the driver, and those still have to say so — `prepaid` is what separates
   * them, read from the stored mode rather than assumed.
   */
  const prepaid = booking.paymentMode === 'FULL_PREPAID';
  const when = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-Hans' : locale, {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Madrid',
  }).format(booking.pickupAt);

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
            {prepaid ? (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-dim">{tq('allInclusive')}</dt>
                <dd className="text-right font-medium text-jade">
                  {tq('nothingInTaxi')}
                </dd>
              </div>
            ) : (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-dim">{tq('payInTaxi')}</dt>
                <dd className="text-right font-mono">
                  {eur(Number(booking.meterEstimate))}
                </dd>
              </div>
            )}
          </dl>

          <p className="mt-6 rounded-lg bg-void p-4 text-sm leading-relaxed text-dim">
            {t('driverNote')}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-dim">{tq('disclaimer')}</p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="font-semibold text-gold underline underline-offset-4">
            {t('backHome')}
          </Link>
        </div>
      </div>
    </>
  );
}
