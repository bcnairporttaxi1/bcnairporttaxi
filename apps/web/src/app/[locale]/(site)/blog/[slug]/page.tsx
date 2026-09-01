import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { BLOG_POSTS, getBlogPost } from '@bcn/core/blog';
import { getLandingCopy, getLandingPage } from '@bcn/core/landing-pages';
import { altLanguages, locales } from '@/i18n/routing';
import { SITE_URL, absoluteUrl } from '@bcn/core/site';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    BLOG_POSTS.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const languages = altLanguages(`/blog/${slug}`);

  return {
    title: { absolute: post.title },
    description: post.description,
    alternates: { canonical: `/${locale}/blog/${slug}`, languages },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      url: `/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Guides', url: `/${locale}/blog` },
          { name: post.title, url: `/${locale}/blog/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.published,
            dateModified: post.published,
            mainEntityOfPage: absoluteUrl(`/${locale}/blog/${slug}`),
            author: { '@type': 'Organization', name: 'BCNAirportTaxi' },
            publisher: { '@id': `${SITE_URL}/#organization` },
          }),
        }}
      />

      <PageHero title={post.h1} intro={post.excerpt} />

      <article className="mx-auto max-w-3xl px-4 py-14">
        <p className="font-mono text-xs text-muted">
          {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
            new Date(post.published),
          )}{' '}
          · {post.readingMinutes} min read
        </p>

        {post.sections.map((s) => (
          <section key={s.h2} className="mt-9">
            <h2 className="font-display text-2xl font-extrabold">{s.h2}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-slate-body">
                {p}
              </p>
            ))}
          </section>
        ))}

        <nav aria-labelledby="related" className="mt-14 border-t border-hairline pt-8">
          <h2 id="related" className="font-display text-xl font-extrabold">
            Book your transfer
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {post.related.map((rel) => {
              const target = getLandingPage(rel);
              if (!target) return null;
              return (
                <li key={rel}>
                  <Link
                    href={`/${rel}`}
                    className="block rounded-xl border border-hairline p-4 transition hover:border-ink"
                  >
                    <span className="font-display font-bold">
                      {getLandingCopy(target, locale).h1}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </article>
    </>
  );
}
