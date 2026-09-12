import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { ForgotPasswordForm } from '@/components/password-reset-forms';
import { requestPasswordReset } from '../../(auth)/actions';
import { getSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: { absolute: 'Reset your password | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  // A signed-in reader changes their password from the account page, where
  // the current one is asked for. This form is for people who cannot get in.
  if (await getSession()) redirect(`/${locale}/account/password`);

  const t = await getTranslations('auth');

  return (
    <>
      <PageHero title={t('forgotTitle')} intro={t('forgotIntro')} />
      <div className="mx-auto max-w-md px-4 py-14">
        <ForgotPasswordForm locale={locale} action={requestPasswordReset} />
      </div>
    </>
  );
}
