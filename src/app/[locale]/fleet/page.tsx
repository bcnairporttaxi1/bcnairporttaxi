import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
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
        <ul className="grid gap-6 sm:grid-cols-2">
          {FLEET.map((v) => (
            <li
              key={v.slug}
              className="overflow-hidden rounded-card border border-hairline bg-white"
            >
              <Image
                src={v.image}
                alt={v.imageAlt}
                width={1200}
                height={800}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="p-6">
                <h2 className="font-display text-xl font-bold">{v.name}</h2>
                <p className="text-sm text-muted">{t(`categories.${v.categoryKey}`)}</p>
                <p className="mt-3 font-mono text-sm">
                  {t('seats', { count: v.seats })} · {t('bags', { count: v.bags })}
                </p>
                <Link
                  href="/book"
                  className="mt-5 inline-block rounded-lg bg-ink px-4 py-2.5 text-sm font-bold text-porcelain hover:bg-graphite"
                >
                  {tc('book')}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
