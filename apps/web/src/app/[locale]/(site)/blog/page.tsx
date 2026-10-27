import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { BLOG_POSTS } from '@bcn/core/blog';
import { blogCopy } from '@bcn/core/blog-copy';
import { BlogCover, coverFor } from '@/components/blog-cover';
import { Stagger, StaggerItem } from '@/components/motion';
import { localeHrefLang, locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeHrefLang[l]] = `/${l}/blog`;
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/blog`;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: { absolute: t('metaTitle') },
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/blog`, languages },
  };
}

export default async function BlogIndex(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // The hero, the metadata and the breadcrumb label were hardcoded English on
  // a page published in ten languages.
  const t = await getTranslations('blog');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('crumbHome'), url: `/${locale}` },
          { name: t('breadcrumb'), url: `/${locale}/blog` },
        ]}
      />
      <PageHero title={t('h1')} intro={t('intro')} />

      <div className="mx-auto max-w-5xl px-4 py-14">
        {/* Cards rather than a stack of paragraphs: every post now leads with
            its own drawn cover, so the index scans as a shelf instead of a
            wall of grey text. */}
        <Stagger as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <StaggerItem as="li" key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-line bg-raise transition-all duration-500 ease-brand hover:-translate-y-1.5 hover:border-gold/50"
              >
                <BlogCover
                  motif={coverFor(post.slug)}
                  className="aspect-[16/9] w-full border-b border-line transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ghost">
                    {new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(
                      new Date(post.published),
                    )}{' '}
                    · {t('minRead', { minutes: post.readingMinutes })}
                  </p>
                  <h2 className="mt-2.5 font-display text-lg font-bold leading-snug transition-colors duration-500 group-hover:text-gold">
                    {blogCopy(post, locale).title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-dim">
                    {blogCopy(post, locale).excerpt}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {/* An index of three cards is a navigation element, not a page. What
            the guides are for, and what they deliberately do not do, is the
            part worth reading before clicking into one. */}
        <section className="mx-auto mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-extrabold">{t('aboutTitle')}</h2>
          <p className="mt-3 leading-relaxed">{t('aboutBody1')}</p>
          <p className="mt-3 leading-relaxed">{t('aboutBody2')}</p>
          <p className="mt-3 leading-relaxed">{t('aboutBody3')}</p>
        </section>
      </div>
    </>
  );
}
