import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { PageHero, Prose } from '@/components/page-hero';
import { BreadcrumbJsonLd } from '@/components/json-ld';
import { LEGAL_DOCS } from '@bcn/core/legal';

/** Shared metadata builder for the four legal routes. */
export async function legalMetadata(
  slug: string,
  locale: string,
): Promise<Metadata> {
  const doc = LEGAL_DOCS[slug];
  if (!doc) return {};
  // The documents exist in English only. Naming ten languages in the hreflang
  // set claimed translations of a contract that nobody has translated, and
  // every non-English URL carried an English title under a translated one.
  const languages: Record<string, string> = {
    en: `/en/${slug}`,
    'x-default': `/en/${slug}`,
  };
  const english = locale === 'en';
  return {
    title: doc.title,
    description: doc.description,
    // Every locale canonicalises to the one real document.
    alternates: { canonical: `/en/${slug}`, languages },
    // The English document is the one to index. The others remain reachable
    // for visitors reading the site in their own language.
    robots: english ? { index: true, follow: true } : { index: false, follow: true },
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
