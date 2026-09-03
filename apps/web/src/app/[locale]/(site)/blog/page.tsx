import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { BLOG_POSTS } from '@bcn/core/blog';
import { BlogCover, coverFor } from '@/components/blog-cover';
import { Stagger, StaggerItem } from '@/components/motion';
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
                    · {post.readingMinutes} min
                  </p>
                  <h2 className="mt-2.5 font-display text-lg font-bold leading-snug transition-colors duration-500 group-hover:text-gold">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-dim">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </>
  );
}
