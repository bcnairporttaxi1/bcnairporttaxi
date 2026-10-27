import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { BlogCover, coverFor } from '@/components/blog-cover';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { BLOG_POSTS, getBlogPost } from '@bcn/core/blog';
import { getLandingCopy, getLandingPage } from '@bcn/core/landing-pages';
import { blogCopy, hasBlogTranslation } from '@bcn/core/blog-copy';
import { localeHrefLang, locales } from '@/i18n/routing';
import { SITE_URL, absoluteUrl } from '@bcn/core/site';

/** Shared by the social card and the Article `image`, so they cannot drift. */
const OG_IMAGE = '/img/hero-banner.jpg';

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
  const c = blogCopy(post, locale);
  // No translation yet: serve the English text but tell search engines the
  // English URL is the real one, rather than vouching for a Spanish page that
  // is not Spanish.
  const untranslated = !hasBlogTranslation(slug, locale);

  const languages: Record<string, string> = {};
  // Only the languages this guide actually exists in. Listing all ten when
  // nine were English claimed translations that did not exist.
  for (const l of locales) {
    if (hasBlogTranslation(slug, l)) languages[localeHrefLang[l]] = `/${l}/blog/${slug}`;
  }
  // x-default tells Google which version to serve a language we do not
  // publish. Without it the ten alternates describe a set with no default.
  languages['x-default'] = `/en/blog/${slug}`;

  return {
    title: { absolute: c.title },
    description: c.description,
    alternates: {
      canonical: untranslated ? `/en/blog/${slug}` : `/${locale}/blog/${slug}`,
      languages,
    },
    robots: untranslated ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'article',
      title: c.title,
      description: c.description,
      publishedTime: post.published,
      modifiedTime: post.updated ?? post.published,
      url: `/${locale}/blog/${slug}`,
      /*
       * Setting `openGraph` here replaces the layout's object rather than
       * merging into it, so leaving images out did not inherit the site image
       * — it shipped an article card with no image at all. Every share of
       * every post rendered as a bare line of text.
       */
      images: [
        {
          url: OG_IMAGE,
          width: 1920,
          height: 1080,
          alt: 'Black and yellow Barcelona airport taxi on the waterfront at sunset with the Sagrada Família behind',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.title,
      description: c.description,
      images: [OG_IMAGE],
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
  const c = blogCopy(post, locale);
  const tb = await getTranslations('blog');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tb('crumbHome'), url: `/${locale}` },
          { name: tb('breadcrumb'), url: `/${locale}/blog` },
          { name: c.title, url: `/${locale}/blog/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: c.title,
            description: c.description,
            datePublished: post.published,
            // The post's own revision date when it has one. These were the
            // same field, so a post rewritten around a new price model still
            // reported that nothing had changed since it was first published.
            dateModified: post.updated ?? post.published,
            /*
             * Google treats `image` as required on Article and drops the
             * result without it. There is no per-post artwork — the covers are
             * inline SVG drawn from a motif — so this is the site image, which
             * is a real photograph at a known size rather than a placeholder.
             */
            image: [absoluteUrl(OG_IMAGE)],
            inLanguage: localeHrefLang[locale as keyof typeof localeHrefLang] ?? locale,
            mainEntityOfPage: absoluteUrl(`/${locale}/blog/${slug}`),
            author: { '@type': 'Organization', name: 'BCNAirportTaxi' },
            publisher: { '@id': `${SITE_URL}/#provider` },
          }),
        }}
      />

      <PageHero title={c.h1} intro={c.excerpt} />

      <article className="mx-auto max-w-3xl px-4 py-14">
        {/* The same cover the index card carries, so arriving from the shelf
            feels continuous rather than like a different page. */}
        <BlogCover
          motif={coverFor(post.slug)}
          className="mb-10 aspect-[16/7] w-full rounded-[1.4rem] border border-line"
        />
        <p className="font-mono text-xs text-dim">
          {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
            new Date(post.published),
          )}{' '}
          · {tb('minRead', { minutes: post.readingMinutes })}
        </p>

        {c.sections.map((s) => (
          <section key={s.h2} className="mt-9">
            <h2 className="font-display text-2xl font-extrabold">{s.h2}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)} className="mt-3 leading-relaxed text-ice">
                {p}
              </p>
            ))}
          </section>
        ))}

        <nav aria-labelledby="related" className="mt-14 border-t border-line pt-8">
          <h2 id="related" className="font-display text-xl font-extrabold">
            {tb('bookHeading')}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {post.related.map((rel) => {
              const target = getLandingPage(rel);
              if (!target) return null;
              return (
                <li key={rel}>
                  <Link
                    href={`/${rel}`}
                    className="block rounded-xl border border-line p-4 transition hover:border-gold/60"
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
