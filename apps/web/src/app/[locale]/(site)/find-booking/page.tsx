import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { FindBookingForm } from '@/components/find-booking-form';
import { findBooking } from './actions';

export const metadata: Metadata = {
  title: { absolute: 'Find my booking | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

/**
 * The way back to a trip for a passenger who has lost the email — or who
 * booked as a guest and has no account to sign in to. Reference plus the
 * booking email opens the same trip page an account holder sees.
 */
export default async function FindBookingPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ bad?: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const { bad } = await props.searchParams;
  const t = await getTranslations('findBooking');

  return (
    <>
      <PageHero title={t('title')} intro={t('intro')} />
      <div className="mx-auto max-w-md px-4 py-14">
        <FindBookingForm locale={locale} action={findBooking} badLink={bad === '1'} />
      </div>
    </>
  );
}
