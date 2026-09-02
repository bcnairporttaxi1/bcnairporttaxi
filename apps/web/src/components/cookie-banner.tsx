'use client';

import { useEffect, useState } from 'react';
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

  function choose(value: 'all' | 'essential') {
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
          className="wave rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-void hover:bg-accent-deep"
        >
          {t('accept')}
        </button>
        <button
          type="button"
          onClick={() => choose('essential')}
          className="rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-ice hover:bg-white/5"
        >
          {t('reject')}
        </button>
      </div>
    </div>
  );
}
