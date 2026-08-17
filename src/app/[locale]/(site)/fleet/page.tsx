import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { VehicleCard } from '@/components/vehicle-card';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { FLEET } from '@/lib/fleet';
import { locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'fleet' });
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/fleet`;
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/fleet`, languages },
  };
}

export default async function FleetPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('fleet');
  const tc = await getTranslations('common');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: t('h1'), url: `/${locale}/fleet` },
        ]}
      />
      <PageHero title={t('h1')} intro={t('intro')} />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FLEET.map((v, i) => (
            <li key={v.slug} className="flex">
              <VehicleCard
                vehicle={v}
                priority={i === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </li>
          ))}
        </ul>

        <Link
          href="/book"
          className="wave mt-10 inline-block rounded-lg bg-accent px-6 py-3.5 font-display font-extrabold text-ink transition hover:bg-accent-deep"
        >
          {tc('book')}
        </Link>
      </div>
    </>
  );
}
