'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Link, usePathname } from '@/i18n/navigation';

interface NavChild {
  href: string;
  label: string;
}

interface NavItem {
  href: string;
  key: string;
  children?: NavChild[];
}

/**
 * Nav with two dropdowns. Children are literal labels rather than message keys
 * because they name specific routes and destinations, which read the same in
 * every language.
 */
const NAV: NavItem[] = [
  {
    href: '/book',
    key: 'services',
    children: [
      { href: '/airport-to-city', label: 'Airport to city' },
      { href: '/city-to-airport', label: 'City to airport' },
      { href: '/hotel-transfers', label: 'Hotel transfers' },
      { href: '/private-transfer', label: 'Private transfer' },
      { href: '/24-hour-taxi', label: '24 hour taxi' },
      { href: '/sants-station-to-airport', label: 'Sants station' },
    ],
  },
  {
    href: '/destinations',
    key: 'destinations',
    children: [
      { href: '/destinations/costa-brava', label: 'Costa Brava' },
      { href: '/destinations/sitges', label: 'Sitges' },
      { href: '/destinations/tarragona', label: 'Tarragona' },
      { href: '/destinations/montserrat', label: 'Montserrat' },
      { href: '/destinations/andorra', label: 'Andorra' },
      { href: '/destinations', label: 'All destinations' },
    ],
  },
  { href: '/fleet', key: 'fleet' },
  { href: '/pricing', key: 'pricing' },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
];

function Dropdown({ item, label }: { item: NavItem; label: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Closing on a short delay stops the menu vanishing while the pointer
  // crosses the gap between the trigger and the panel.
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-porcelain/80 transition hover:bg-white/5 hover:text-porcelain"
      >
        {label}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 fill-current transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M5.5 7.5 10 12l4.5-4.5z" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <ul className="min-w-[230px] overflow-hidden rounded-xl border border-white/12 bg-graphite py-1.5 shadow-2xl">
            {item.children!.map((child) => (
              <li key={child.href + child.label}>
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-porcelain/80 transition hover:bg-white/8 hover:text-accent"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function SiteHeader({ accountHref }: { accountHref: string }) {
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

        <nav aria-label="Main" className="ml-auto hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <Dropdown key={item.key} item={item} label={t(item.key)} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-porcelain/80 transition hover:bg-white/5 hover:text-porcelain"
              >
                {t(item.key)}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <Link
            href={accountHref}
            className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-sm font-semibold text-porcelain transition hover:bg-white/10 sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 1.8c-3.6 0-8 1.8-8 4.2v2.2h16V18c0-2.4-4.4-4.2-8-4.2Z" />
            </svg>
            {t('signIn')}
          </Link>
          <Link
            href="/book"
            className="wave rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-accent-deep"
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
          className="max-h-[70vh] overflow-y-auto border-t border-white/10 bg-ink px-4 py-3 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-semibold text-porcelain/90 hover:bg-white/5"
                >
                  {t(item.key)}
                </Link>
                {item.children && (
                  <ul className="mb-1 ml-3 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <li key={child.href + child.label}>
                        <Link
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-porcelain/65 hover:bg-white/5 hover:text-porcelain"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-3 space-y-3 border-t border-white/10 pt-3 sm:hidden">
            <Link
              href={accountHref}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-porcelain/90 hover:bg-white/5"
            >
              {t('signIn')}
            </Link>
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
