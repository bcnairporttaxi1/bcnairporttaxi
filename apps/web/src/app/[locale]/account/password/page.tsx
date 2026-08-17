import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { ChangePasswordForm } from '@/components/change-password-form';
import { changePassword } from '@/app/[locale]/(auth)/actions';
import { requireRole } from '@/lib/guards';

export const metadata: Metadata = {
  title: { absolute: 'Change your password | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

export default async function ChangePasswordPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  // The one screen a temporary password may reach, so the guard is told to let
  // it through rather than bouncing straight back here.
  const user = await requireRole(['USER', 'DRIVER', 'ADMIN'], locale, {
    allowTemporaryPassword: true,
  });
  const t = await getTranslations('password');

  return (
    <>
      <PageHero
        title={user.mustChangePassword ? t('titleForced') : t('title')}
        intro={user.mustChangePassword ? t('introForced') : t('intro')}
      />
      <div className="mx-auto max-w-md px-4 py-14">
        <ChangePasswordForm locale={locale} action={changePassword} />
      </div>
    </>
  );
}
