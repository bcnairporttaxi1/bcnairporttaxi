import type { BlogPost } from './blog';
import { ES_BLOG_COPY } from './blog-copy/es';
import { CA_BLOG_COPY } from './blog-copy/ca';
import { FR_BLOG_COPY } from './blog-copy/fr';
import { DE_BLOG_COPY } from './blog-copy/de';
import { IT_BLOG_COPY } from './blog-copy/it';
import { PT_BLOG_COPY } from './blog-copy/pt';
import { NL_BLOG_COPY } from './blog-copy/nl';
import { RU_BLOG_COPY } from './blog-copy/ru';
import { ZH_BLOG_COPY } from './blog-copy/zh';

/**
 * The guides in each language.
 *
 * `blog.ts` holds a single English copy of each post, and the nine other
 * locales rendered it unchanged: `<html lang="es">` around an English title,
 * an English H1, an English meta description, ~2,400 words of English and an
 * English Article headline — 27 URLs that hreflang told Google were Spanish,
 * German, Portuguese and so on.
 *
 * They were not invisible. `/es/blog/barcelona-airport-terminals-t1-t2-guide`
 * collected 136 impressions in Search Console, shown to Spanish searchers as
 * an English page. A Spanish query for the price of an airport taxi has the
 * best-written answer on the site sitting one click away in a language the
 * searcher did not ask for.
 */

export interface BlogLocaleCopy {
  title: string;
  description: string;
  h1: string;
  excerpt: string;
  sections: Array<{ h2: string; body: string[] }>;
}

const COPY: Record<string, Record<string, BlogLocaleCopy>> = {
  es: ES_BLOG_COPY,
  ca: CA_BLOG_COPY,
  fr: FR_BLOG_COPY,
  de: DE_BLOG_COPY,
  it: IT_BLOG_COPY,
  pt: PT_BLOG_COPY,
  nl: NL_BLOG_COPY,
  ru: RU_BLOG_COPY,
  zh: ZH_BLOG_COPY,
};

/** Whether this post exists in this language, as opposed to falling back. */
export function hasBlogTranslation(slug: string, locale: string): boolean {
  return locale === 'en' || Boolean(COPY[locale]?.[slug]);
}

/** The post's text in `locale`, or the English original when there is none. */
export function blogCopy(post: BlogPost, locale: string): BlogLocaleCopy {
  const t = locale === 'en' ? undefined : COPY[locale]?.[post.slug];
  return (
    t ?? {
      title: post.title,
      description: post.description,
      h1: post.h1,
      excerpt: post.excerpt,
      sections: post.sections,
    }
  );
}

export const BLOG_COPY_LOCALES = Object.keys(COPY);

/** The raw per-locale tables, for the parity tests only. */
export function blogCopyFor(locale: string): Record<string, BlogLocaleCopy> | undefined {
  return COPY[locale];
}
