import { getTranslations } from 'next-intl/server';

/**
 * The four claims a nervous traveller wants settled before they read on:
 * licensed cars, the official tariff, no surge, booking around the clock.
 *
 * They used to sit inside the hero as a fourth text element under the
 * intro, which made the hero a list and pushed the buttons down a phone
 * screen. As a band directly beneath it they are still the first thing
 * read after the headline, and the hero is back to a headline, a sentence
 * and a button.
 */
export async function TrustBand() {
  const t = await getTranslations('home');
  const keys = ['licensed', 'meter', 'noSurge', 'support'] as const;

  return (
    <section aria-label={t('trust.licensed')} className="border-y border-line bg-pane">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-3 px-4 py-4 text-sm text-ice/85 sm:flex sm:flex-wrap sm:justify-between sm:py-3.5">
        {keys.map((k) => (
          <li key={k} className="flex items-center gap-2.5">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 flex-none fill-gold">
              <path d="M8 14.5 3.5 10l1.4-1.4L8 11.7l7.1-7.1L16.5 6z" />
            </svg>
            {t(`trust.${k}`)}
          </li>
        ))}
      </ul>
    </section>
  );
}
