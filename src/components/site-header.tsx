'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { localeNames, locales } from '@/i18n/routing';

const NAV = [
  { href: '/pricing', key: 'pricing' },
  { href: '/fleet', key: 'fleet' },
  { href: '/how-it-works', key: 'howItWorks' },
  { href: '/faq', key: 'faq' },
  { href: '/contact', key: 'contact' },
] as const;

function LanguageSwitcher() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{t('language')}</span>
      <select
        value={locale}
        onChange={(e) => {
          // Same page, different language — pathname here excludes the prefix.
          window.location.href = `/${e.target.value}${pathname === '/' ? '' : pathname}`;
        }}
        className="cursor-pointer appearance-none rounded-lg border border-white/15 bg-white/5 py-2 pl-3 pr-8 text-sm text-porcelain hover:bg-white/10"
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
        className="pointer-events-none absolute right-2 h-4 w-4 fill-porcelain/70"
      >
        <path d="M5.5 7.5 10 12l4.5-4.5z" />
      </svg>
    </label>
  );
}

export function SiteHeader() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center" aria-label="BCNAirportTaxi — home">
          <Image
            src="/img/logo.png"
            alt="BCNAirportTaxi — premium Barcelona airport taxi service"
            width={258}
            height={120}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-porcelain/80 transition hover:bg-white/5 hover:text-porcelain"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link
            href="/book"
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-accent-deep"
          >
            {t('book')}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-lg p-2 text-porcelain lg:hidden"
          >
            <span className="sr-only">{open ? t('closeMenu') : t('openMenu')}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-white/10 bg-ink px-4 py-3 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-porcelain/90 hover:bg-white/5"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-white/10 pt-3 sm:hidden">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
