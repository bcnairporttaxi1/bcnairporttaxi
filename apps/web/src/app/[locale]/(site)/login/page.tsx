import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { AuthForm } from '@/components/auth-form';
import { login } from '../../(auth)/actions';
import { getSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: { absolute: 'Sign in | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

export default async function LoginPage(props: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ reset?: string }>;
}) {
  const { locale } = await props.params;
  const { reset } = await props.searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('auth');

  // Already signed in — send them to their panel rather than a dead form.
  const session = await getSession();
  if (session) {
    const home =
      session.role === 'ADMIN' ? 'admin' : session.role === 'DRIVER' ? 'driver' : 'account';
    redirect(`/${locale}/${home}`);
  }

  return (
    <>
      <PageHero
        title="Sign in"
        intro="Manage your bookings, rebook a past trip, and track your driver."
      />
      <div className="mx-auto max-w-md px-4 py-14">
        <AuthForm
          mode="login"
          locale={locale}
          action={login}
          notice={reset === 'done' ? t('passwordUpdated') : undefined}
        />
      </div>
    </>
  );
}
