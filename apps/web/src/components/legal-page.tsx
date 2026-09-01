import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PageHero, Prose } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { LEGAL_DOCS } from '@bcn/core/legal';
import { locales } from '@/i18n/routing';

/** Shared metadata builder for the four legal routes. */
export async function legalMetadata(
  slug: string,
  locale: string,
): Promise<Metadata> {
  const doc = LEGAL_DOCS[slug];
  if (!doc) return {};
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/${slug}`;
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/${locale}/${slug}`, languages },
  };
}

export function LegalPage({ slug, locale }: { slug: string; locale: string }) {
  setRequestLocale(locale);
  const doc = LEGAL_DOCS[slug];
  if (!doc) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: doc.h1, url: `/${locale}/${slug}` },
        ]}
      />
      <PageHero title={doc.h1} intro={doc.intro} />
      <Prose>
        <p className="text-sm text-dim">Last updated: {doc.updated}</p>
        {doc.sections.map((s) => (
          <section key={s.h2}>
            <h2>{s.h2}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </section>
        ))}
      </Prose>
    </>
  );
}
