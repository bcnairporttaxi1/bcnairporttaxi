'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <p className="font-mono text-6xl font-bold text-accent-text">500</p>
      <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-3 text-muted">{t('body')}</p>
      <button
        type="button"
        onClick={reset}
        className="wave mt-8 rounded-lg bg-accent px-5 py-3 font-display font-extrabold text-ink hover:bg-accent-deep"
      >
        {t('retry')}
      </button>
    </div>
  );
}
