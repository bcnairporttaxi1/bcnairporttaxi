'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Link } from '@/i18n/navigation';

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
  /**
   * Pointing at the trigger already opens the panel, so a plain toggle on click
   * shut it again the instant the user clicked what they were pointing at.
   * Track whether the pointer is over the trigger and only toggle when it is
   * not — which leaves keyboard and touch, where nothing opened it on approach.
   */
  const hovering = useRef(false);

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
        hovering.current = true;
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={() => {
        hovering.current = false;
        scheduleClose();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => (hovering.current ? true : !v))}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-dim transition hover:bg-white/5 hover:text-ice"
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
          <ul className="min-w-[230px] overflow-hidden rounded-xl border border-white/12 bg-pane py-1.5 shadow-2xl">
            {item.children!.map((child) => (
              <li key={child.href + child.label}>
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-dim transition hover:bg-white/8 hover:text-gold"
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
  /**
   * Two things ride the scroll position: the island contracts a little once the
   * page has moved, so it stops competing with the hero it is floating over,
   * and a saffron hairline along its top edge reports progress through the
   * page. Both are written straight to a CSS custom property from a passive
   * listener inside rAF — no state, so scrolling never schedules a React
   * render.
   */
  const [condensed, setCondensed] = useState(false);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      barRef.current?.style.setProperty(
        '--progress',
        String(max > 0 ? Math.min(1, y / max) : 0),
      );
      setCondensed((was) => {
        // Hysteresis: without it a header that shrinks by 4px oscillates
        // forever at exactly the threshold, because shrinking moves the page.
        if (!was && y > 28) return true;
        if (was && y < 12) return false;
        return was;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    /* An island rather than a bar glued to the viewport edge: it floats clear of
       the top, so the page reads as sitting underneath it rather than being cut
       off by it. */
    <header
      className={`sticky top-0 z-50 px-3 transition-[padding] duration-700 ease-brand sm:px-4 ${
        condensed ? 'pt-1.5 sm:pt-2' : 'pt-3 sm:pt-4'
      }`}
    >
      <div
        className={`relative mx-auto flex max-w-6xl items-center gap-4 rounded-full border border-line px-4 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-700 ease-brand sm:px-5 ${
          condensed
            ? 'bg-pane/92 py-1.5 shadow-[inset_0_1px_0_rgb(255_255_255/8%),0_24px_60px_-26px_#000]'
            : 'bg-pane/80 py-2.5 shadow-[inset_0_1px_0_rgb(255_255_255/6%),0_20px_50px_-24px_#000]'
        }`}
      >
        <span
          ref={barRef}
          aria-hidden="true"
          className="progress-rail absolute inset-x-8 top-0 h-px rounded-full bg-gradient-to-r from-gold/0 via-gold to-gold/0"
        />
        <Link href="/" className="flex shrink-0 items-center" aria-label="BCNAirportTaxi — home">
          <Image
            src="/img/logo.png"
            alt="BCNAirportTaxi — premium Barcelona airport taxi service"
            width={258}
            height={120}
            priority
            className={`w-auto transition-all duration-700 ease-brand ${
              condensed ? 'h-8 sm:h-9' : 'h-9 sm:h-11'
            }`}
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
                className="rounded-lg px-3 py-2 text-sm font-medium text-dim transition hover:bg-white/5 hover:text-ice"
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
            className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-sm font-semibold text-ice transition hover:bg-white/10 sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 1.8c-3.6 0-8 1.8-8 4.2v2.2h16V18c0-2.4-4.4-4.2-8-4.2Z" />
            </svg>
            {t('signIn')}
          </Link>
          <Link href="/book" className="cta cta-gold cta-sm group">
            {t('book')}
            <span className="cta-pip" aria-hidden="true">
              <svg viewBox="0 0 20 20" className="h-2.5 w-2.5 fill-current">
                <path d="M4 9h9.2l-3.6-3.6L11 4l6 6-6 6-1.4-1.4L13.2 11H4V9Z" />
              </svg>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-lg p-2 text-ice lg:hidden"
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
          className="mx-auto mt-2 max-h-[70vh] max-w-6xl overflow-y-auto rounded-3xl border border-line bg-pane/95 px-4 py-3 shadow-2xl backdrop-blur-2xl lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-semibold text-dim hover:bg-white/5"
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
                          className="block rounded-lg px-3 py-2 text-sm text-dim hover:bg-white/5 hover:text-ice"
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
              className="block rounded-lg px-3 py-2.5 text-dim hover:bg-white/5"
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
