import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { AuthForm } from '@/components/auth-form';
import { register } from '../(auth)/actions';
import { getSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: { absolute: 'Create an account | BCNAirportTaxi' },
  robots: { index: false, follow: false },
};

export default async function RegisterPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const session = await getSession();
  if (session) redirect(`/${locale}/account`);

  return (
    <>
      <PageHero
        title="Create an account"
        intro="Keep your trip history, rebook in one tap, and follow your driver on the day."
      />
      <div className="mx-auto max-w-md px-4 py-14">
        <AuthForm mode="register" locale={locale} action={register} />
      </div>
    </>
  );
}
