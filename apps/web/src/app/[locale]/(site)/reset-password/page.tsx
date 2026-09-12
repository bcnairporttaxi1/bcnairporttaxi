import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { ResetPasswordForm } from '@/components/password-reset-forms';
import { resetPassword } from '../../(auth)/actions';

export const metadata: Metadata = {
  title: { absolute: 'Choose a new password | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { locale } = await props.params;
  const { token } = await props.searchParams;
  setRequestLocale(locale);

  const t = await getTranslations('auth');

  // No token means the URL was typed or the link was mangled by a mail
  // client. The token itself is not checked here — that happens on submit, so
  // an expired link still shows the form and explains itself when used,
  // rather than 404ing on arrival.
  if (!token) {
    return (
      <>
        <PageHero title={t('resetTitle')} intro={t('invalidLink')} />
        <div className="mx-auto max-w-md px-4 py-14 text-center">
          <Link href="/forgot-password" className="cta cta-gold group">
            {t('requestNew')}
            <span className="cta-pip" aria-hidden="true">
              <svg viewBox="0 0 20 20" className="h-3 w-3 fill-current">
                <path d="M4 9h9.2l-3.6-3.6L11 4l6 6-6 6-1.4-1.4L13.2 11H4V9Z" />
              </svg>
            </span>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero title={t('resetTitle')} intro={t('resetIntro')} />
      <div className="mx-auto max-w-md px-4 py-14">
        <ResetPasswordForm locale={locale} token={token} action={resetPassword} />
      </div>
    </>
  );
}
