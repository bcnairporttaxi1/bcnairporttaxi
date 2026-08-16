'use client';

import { useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/routing';

/**
 * Language switcher.
 *
 * The whole site is translated per-locale on the server, so switching means
 * loading the same route in another language. Doing that through the router
 * rather than `window.location` keeps it a client-side navigation: React
 * swaps the tree in place instead of tearing the document down and
 * re-downloading CSS, fonts and JavaScript, which is the difference between
 * "instant" and "a page reload".
 *
 * `useTransition` keeps the current page interactive while the next language
 * streams in, and gives us a pending flag to dim the control rather than
 * leaving it looking frozen.
 */

/** Short code shown in the collapsed control — zh reads better as 中文. */
const SHORT: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  ca: 'CA',
  fr: 'FR',
  de: 'DE',
  it: 'IT',
  pt: 'PT',
  nl: 'NL',
  ru: 'RU',
  zh: '中',
};

export function LanguageSwitcher({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const active = useLocale() as Locale;
  const [pending, startTransition] = useTransition();

  function go(next: Locale) {
    if (next === active) return;
    startTransition(() => {
      // `pathname` here already excludes the locale prefix, so the same route
      // is re-requested under the new one and the visitor stays where they are.
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{t('language')}</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute left-2.5 text-xs font-bold ${
          tone === 'dark' ? 'text-accent' : 'text-accent-text'
        }`}
      >
        {SHORT[active]}
      </span>
      <select
        value={active}
        disabled={pending}
        onChange={(e) => go(e.target.value as Locale)}
        className={`cursor-pointer appearance-none rounded-full border py-2 pl-9 pr-7 text-sm transition ${
          tone === 'dark'
            ? 'border-white/15 bg-white/5 text-porcelain hover:bg-white/10'
            : 'border-hairline bg-white text-slate-body hover:border-ink'
        } ${pending ? 'opacity-50' : ''}`}
      >
        {locales.map((l) => (
          <option key={l} value={l} className="bg-ink text-porcelain">
            {localeNames[l]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className={`pointer-events-none absolute right-2 h-4 w-4 ${
          tone === 'dark' ? 'fill-porcelain/70' : 'fill-slate-body/60'
        }`}
      >
        <path d="M5.5 7.5 10 12l4.5-4.5z" />
      </svg>
    </label>
  );
}

/**
 * The expanded picker for the homepage: every language visible at once.
 *
 * A dropdown hides nine of ten options behind a click, which is the wrong
 * trade on a page whose whole job is telling an arriving visitor they are in
 * the right place. Laid out as a grid, someone scanning for their own language
 * finds it without interacting at all.
 */
export function LanguageGrid() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const active = useLocale() as Locale;
  const [pending, startTransition] = useTransition();
  const [target, setTarget] = useState<Locale | null>(null);

  function go(next: Locale) {
    if (next === active) return;
    setTarget(next);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <section aria-labelledby="lang-heading" className="border-t border-hairline bg-white py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2
          id="lang-heading"
          className="font-display text-2xl font-extrabold sm:text-3xl"
        >
          {t('languageHeading')}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{t('languageIntro')}</p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {locales.map((l) => {
            const on = l === active;
            const loading = pending && target === l;
            return (
              <li key={l}>
                <button
                  type="button"
                  onClick={() => go(l)}
                  aria-current={on ? 'true' : undefined}
                  disabled={pending}
                  className={`tilt group flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition ${
                    on
                      ? 'border-accent bg-accent/10'
                      : 'border-hairline bg-white hover:border-ink'
                  } ${loading ? 'opacity-60' : ''}`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg font-mono text-xs font-extrabold ${
                      on ? 'bg-accent text-ink' : 'bg-porcelain text-muted'
                    }`}
                  >
                    {SHORT[l]}
                  </span>
                  <span className="font-display text-sm font-bold">{localeNames[l]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
