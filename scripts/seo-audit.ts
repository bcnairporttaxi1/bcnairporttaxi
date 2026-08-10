/**
 * SEO audit: keyword coverage and on-page checks against the live site.
 *
 * Coverage is measured against rendered HTML, not source, so it reflects what
 * a crawler actually sees. A keyword counts as covered only if it appears in
 * a place that carries weight: title, meta description, or a heading.
 *
 * Usage: npx tsx scripts/seo-audit.ts [baseUrl]
 */

const BASE = process.argv[2] ?? 'https://bcnairporttaxi.vercel.app';
const LOCALE = 'en';

/** The exact target keyword list. */
const KEYWORDS = [
  'barcelona airport taxi',
  'taxi barcelona airport',
  'barcelona to airport taxi',
  'taxi from barcelona to airport',
  'barcelona airport transfer',
  'barcelona airport transfer taxi',
  'taxi to barcelona airport',
  'barcelona city to airport taxi',
  'taxi barcelona el prat airport',
  'barcelona to el prat airport taxi',
  'el prat airport taxi',
  'taxi to el prat airport',
  'barcelona airport taxi price',
  'barcelona airport taxi fare',
  'cheap taxi barcelona airport',
  'book taxi barcelona airport',
  'barcelona airport taxi booking',
  'private taxi barcelona airport',
  'barcelona airport private transfer',
  'hotel to barcelona airport taxi',
  'barcelona hotel to airport transfer',
  'taxi from hotel to barcelona airport',
  'taxi sants station to barcelona airport',
  'taxi gothic quarter to barcelona airport',
  'taxi eixample to barcelona airport',
  'taxi barcelona city centre to airport',
  '24 hour taxi barcelona airport',
  'airport taxi barcelona 24 hours',
  'barcelona airport transfer from hotel',
  'book airport taxi barcelona online',
];

const PATHS = [
  '',
  '/book',
  '/book-online',
  '/pricing',
  '/fleet',
  '/how-it-works',
  '/faq',
  '/contact',
  '/reviews',
  '/install',
  '/airport-to-city',
  '/city-to-airport',
  '/el-prat-airport-taxi',
  '/barcelona-airport-taxi-price',
  '/hotel-transfers',
  '/sants-station-to-airport',
  '/private-transfer',
  '/24-hour-taxi',
  '/neighborhoods/gothic-quarter',
  '/neighborhoods/eixample',
  '/neighborhoods/city-centre',
  '/blog',
  '/terms',
  '/privacy',
  '/cookies',
  '/refund-policy',
];

interface PageData {
  path: string;
  status: number;
  title: string;
  description: string;
  h1: string[];
  h2: string[];
  canonical: string;
  ogImage: string;
  jsonLdTypes: string[];
  hreflangCount: number;
  imgWithoutAlt: number;
  html: string;
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x2F;/g, '/');
}

function stripTags(s: string): string {
  return decode(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function allMatches(html: string, re: RegExp): string[] {
  return [...html.matchAll(re)].map((m) => stripTags(m[1] ?? ''));
}

async function fetchPage(path: string): Promise<PageData> {
  const url = `${BASE}/${LOCALE}${path}`;
  const res = await fetch(url, { redirect: 'follow' });
  const html = res.ok ? await res.text() : '';

  const meta = (name: string) =>
    decode(
      html.match(
        new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]+content="([^"]*)"`, 'i'),
      )?.[1] ?? '',
    );

  // [\s\S] rather than the `s` flag, which needs an es2018 target.
  const jsonLdTypes = [
    ...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi),
  ].flatMap((m) => {
    try {
      const parsed = JSON.parse(m[1]);
      return [parsed['@type']].flat().filter(Boolean) as string[];
    } catch {
      return [];
    }
  });

  const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);

  return {
    path,
    status: res.status,
    title: decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ''),
    description: meta('description'),
    h1: allMatches(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi),
    h2: allMatches(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi),
    canonical: decode(
      html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i)?.[1] ?? '',
    ),
    ogImage: meta('og:image'),
    jsonLdTypes,
    // React emits the attribute as `hrefLang`, so this must be case-insensitive.
    hreflangCount: (html.match(/hreflang=/gi) ?? []).length,
    imgWithoutAlt: imgTags.filter((t) => !/\balt=/i.test(t)).length,
    html,
  };
}

/** Loose match: all words present in order, tolerating small joining words. */
function containsPhrase(haystack: string, phrase: string): boolean {
  const words = phrase.toLowerCase().split(/\s+/).map((w) => w.replace(/[^a-z0-9]/g, ''));
  const pattern = words.join('[\\s\\w\'’-]{0,18}?');
  return new RegExp(pattern, 'i').test(haystack.toLowerCase());
}

async function main() {
  console.log(`SEO audit of ${BASE}/${LOCALE}\n`);

  const pages: PageData[] = [];
  for (const p of PATHS) {
    pages.push(await fetchPage(p));
  }

  // --- Route health -------------------------------------------------------
  console.log('ROUTES');
  const broken = pages.filter((p) => p.status !== 200);
  for (const p of pages) {
    const flag = p.status === 200 ? 'ok ' : 'ERR';
    console.log(`  ${flag} ${String(p.status).padEnd(4)} /${LOCALE}${p.path || '/'}`);
  }
  console.log(`  -> ${pages.length - broken.length}/${pages.length} reachable\n`);

  // --- On-page checks -----------------------------------------------------
  console.log('ON-PAGE ISSUES');
  let issues = 0;
  for (const p of pages.filter((x) => x.status === 200)) {
    const probs: string[] = [];
    if (!p.title) probs.push('no <title>');
    else if (p.title.length > 65) probs.push(`title ${p.title.length} chars (>65)`);
    if (!p.description) probs.push('no meta description');
    else if (p.description.length > 165)
      probs.push(`description ${p.description.length} chars (>165)`);
    if (p.h1.length === 0) probs.push('no <h1>');
    if (p.h1.length > 1) probs.push(`${p.h1.length} <h1> tags`);
    if (!p.canonical) probs.push('no canonical');
    if (p.hreflangCount === 0) probs.push('no hreflang');
    if (p.imgWithoutAlt > 0) probs.push(`${p.imgWithoutAlt} img without alt`);
    if (probs.length) {
      issues += probs.length;
      console.log(`  /${LOCALE}${p.path || '/'}`);
      for (const x of probs) console.log(`      - ${x}`);
    }
  }
  if (issues === 0) console.log('  none');
  console.log();

  // --- Structured data ----------------------------------------------------
  const allTypes = new Set(pages.flatMap((p) => p.jsonLdTypes));
  console.log('JSON-LD TYPES FOUND');
  console.log(`  ${[...allTypes].sort().join(', ') || 'none'}\n`);

  // --- Keyword coverage ---------------------------------------------------
  console.log('KEYWORD COVERAGE (title / description / headings)');
  const uncovered: string[] = [];
  for (const kw of KEYWORDS) {
    const hits = pages
      .filter((p) => p.status === 200)
      .filter((p) =>
        [p.title, p.description, ...p.h1, ...p.h2].some((f) => containsPhrase(f, kw)),
      );

    if (hits.length === 0) {
      // Fall back to body copy so we can distinguish "absent" from "weakly placed".
      const inBody = pages
        .filter((p) => p.status === 200)
        .filter((p) => containsPhrase(stripTags(p.html), kw));
      if (inBody.length > 0) {
        console.log(`  BODY-ONLY  ${kw}  (${inBody.length} page(s))`);
      } else {
        console.log(`  MISSING    ${kw}`);
      }
      uncovered.push(kw);
    } else {
      console.log(`  ok         ${kw}  -> ${hits[0].path || '/'}`);
    }
  }

  const strong = KEYWORDS.length - uncovered.length;
  console.log(
    `\n  -> ${strong}/${KEYWORDS.length} in a weighted position (${Math.round(
      (strong / KEYWORDS.length) * 100,
    )}%)`,
  );

  if (broken.length) {
    console.log(`\nBROKEN ROUTES: ${broken.map((b) => b.path || '/').join(', ')}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
