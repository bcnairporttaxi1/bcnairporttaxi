'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const STORAGE_KEY = 'bcn-cookie-consent';

/**
 * GDPR consent gate. No analytics or marketing script is loaded anywhere in the
 * app until `bcn-cookie-consent` is set to `all`, so the default state is
 * essential-cookies-only rather than opt-out.
 */
export function CookieBanner() {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage blocked (private mode / embedded webview): stay silent rather
      // than showing a banner whose choice we cannot remember.
    }
  }, []);

  /**
   * The banner is full-width at the bottom on a phone, exactly where the
   * WhatsApp action floats. Rather than hard-coding a clearance that goes
   * stale the moment the copy wraps to another line in another language, the
   * banner measures itself and publishes its height; `.fab` reads it as
   * `--fab-lift` and slides up out of the way.
   */
  const measure = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    document.documentElement.style.setProperty('--fab-lift', `${el.offsetHeight + 12}px`);
  }, []);

  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty('--fab-lift');
    };
  }, []);

  function choose(value: 'all' | 'essential') {
    document.documentElement.style.removeProperty('--fab-lift');
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      ref={measure}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-white/12 bg-pane p-5 text-ice shadow-2xl sm:inset-x-auto sm:right-4 sm:max-w-md"
    >
      <h2 id="cookie-title" className="font-display text-base font-bold">
        {t('title')}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-dim">{t('body')}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => choose('all')}
          className="cta cta-gold cta-sm"
        >
          {t('accept')}
        </button>
        <button
          type="button"
          onClick={() => choose('essential')}
          className="cta cta-ghost cta-sm"
        >
          {t('reject')}
        </button>
      </div>
    </div>
  );
}
