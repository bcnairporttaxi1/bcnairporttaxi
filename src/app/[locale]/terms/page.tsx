import type { Metadata } from 'next';
import { LegalPage, legalMetadata } from '@/components/legal-page';
import { locales } from '@/i18n/routing';

const SLUG = 'terms';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  return legalMetadata(SLUG, locale);
}

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  return <LegalPage slug={SLUG} locale={locale} />;
}
