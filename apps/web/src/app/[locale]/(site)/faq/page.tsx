import { fitTitle } from '@/lib/title';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/json-ld';
import { localeHrefLang, locales } from '@/i18n/routing';

/**
 * Order matters: this is the reading order on the page and the order in the
 * FAQPage graph. Price questions first, because that is what the traffic to
 * this page is asking, then logistics, then the edge cases.
 */
const KEYS = [
  'fareAccurate',
  'whyFee',
  'whereInCity',
  'weekendNight',
  'vsMeter',
  'payment',
  'invoice',
  'meetDriver',
  'flightDelay',
  'findDriver',
  'whichVehicle',
  'luggage',
  'multipleCars',
  'cruisePort',
  'longDistance',
  'urgent',
  'changeBooking',
  'cancel',
  'outsideBarcelona',
] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeHrefLang[l]] = `/${l}/faq`;
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/faq`;
  return {
    title: fitTitle(t('metaTitle')),
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/faq`, languages },
  };
}

export default async function FaqPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('faq');

  const items = KEYS.map((k) => ({ q: t(`items.${k}.q`), a: t(`items.${k}.a`) }));

  return (
    <>
      <FaqJsonLd items={items} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: t('h1'), url: `/${locale}/faq` },
        ]}
      />
      <PageHero title={t('h1')} />

      <div className="mx-auto max-w-3xl px-4 py-14">
        <dl className="divide-y divide-line">
          {items.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="font-display text-lg font-extrabold">{item.q}</dt>
              <dd className="mt-2 leading-relaxed text-ice">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
