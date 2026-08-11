import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { BLOG_POSTS } from '@/lib/blog';
import { locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/blog`;
  return {
    title: { absolute: 'Barcelona Airport Taxi Guides & Tips' },
    description:
      'Practical guides to getting to and from Barcelona El Prat airport: what a taxi costs, taxi versus Aerobús, and which terminal you need.',
    alternates: { canonical: `/${locale}/blog`, languages },
  };
}

export default async function BlogIndex(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Guides', url: `/${locale}/blog` },
        ]}
      />
      <PageHero
        title="Barcelona airport travel guides"
        intro="Straight answers on getting to and from El Prat — what things cost, how long they take, and when a taxi is genuinely the right call."
      />

      <div className="mx-auto max-w-3xl px-4 py-14">
        <ul className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-card border border-hairline bg-white p-6 transition hover:border-ink"
              >
                <h2 className="font-display text-xl font-extrabold">{post.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{post.excerpt}</p>
                <p className="mt-3 font-mono text-xs text-muted">
                  {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
                    new Date(post.published),
                  )}{' '}
                  · {post.readingMinutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
