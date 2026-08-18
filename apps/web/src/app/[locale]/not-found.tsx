import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function LocaleNotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <p className="font-mono text-6xl font-bold text-accent-text">404</p>
      <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-3 text-muted">{t('body')}</p>
      <Link
        href="/"
        className="wave mt-8 rounded-lg bg-accent px-5 py-3 font-display font-extrabold text-ink hover:bg-accent-deep"
      >
        {t('cta')}
      </Link>
    </div>
  );
}
