/**
 * IndexNow submission.
 *
 * IndexNow is a push protocol: instead of waiting to be crawled, the site
 * tells the engine a URL changed. Bing, Yandex, Seznam and Naver share one
 * pool — submitting once reaches all of them. Google does not participate.
 *
 * Bing's index is what feeds Microsoft Copilot's citations, so this is the
 * cheapest route to being quoted by an AI assistant.
 *
 * OWNERSHIP is proved by hosting a file named after the key, containing the
 * key, at the site root. That file is public by design: anyone can read it.
 * The worst a stranger can do with it is submit URLs on this host's behalf,
 * and the protocol rejects any URL outside the host that owns the key — so
 * the blast radius is "someone helps us get indexed".
 *
 * The URL list comes from the live sitemap rather than from the source tree.
 * The sitemap is already the definition of what should be indexed, and
 * reading it back means this script cannot drift from what is published.
 *
 * Usage:
 *   npx tsx scripts/indexnow.ts [baseUrl] [--dry]
 */

const BASE = (
  process.argv.find((a) => a.startsWith('http')) ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://bcnairporttaxi.es'
).replace(/\/$/, '');

const DRY = process.argv.includes('--dry');

const KEY = '23121f2e427c2823eab90d4003ce5bb6';
const KEY_LOCATION = `${BASE}/${KEY}.txt`;

/** The shared endpoint. Submitting here fans out to every participant. */
const ENDPOINT = 'https://api.indexnow.org/IndexNow';

/** Protocol maximum per request. */
const BATCH = 10_000;

function host(url: string): string {
  return new URL(url).host;
}

async function urlsFromSitemap(): Promise<string[]> {
  const res = await fetch(`${BASE}/sitemap.xml`, {
    headers: { 'User-Agent': 'bcnairporttaxi-indexnow' },
  });
  if (!res.ok) throw new Error(`sitemap ${res.status} ${res.statusText}`);

  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/&amp;/g, '&').trim(),
  );

  // A submission for a different host is rejected for the whole batch, so
  // filter rather than discover that at the endpoint.
  const mine = locs.filter((u) => host(u) === host(BASE));
  if (mine.length !== locs.length) {
    console.warn(`  ! dropped ${locs.length - mine.length} URLs from another host`);
  }
  return [...new Set(mine)];
}

/**
 * Confirms the key file is reachable and correct before submitting.
 *
 * A missing or mismatched key file makes the endpoint return 403, and it does
 * so for the entire batch — so checking first turns a silent whole-run failure
 * into one clear line.
 */
async function checkKey(): Promise<void> {
  const res = await fetch(KEY_LOCATION, { headers: { 'User-Agent': 'bcnairporttaxi-indexnow' } });
  if (!res.ok) throw new Error(`key file ${KEY_LOCATION} -> ${res.status}`);

  const body = (await res.text()).trim();
  if (body !== KEY) {
    throw new Error(`key file contains ${JSON.stringify(body.slice(0, 40))}, expected the key`);
  }
  console.log(`  key file OK  ${KEY_LOCATION}`);
}

async function submit(urlList: string[]): Promise<void> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: host(BASE),
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  // 200 accepted, 202 accepted but key still validating. Both are success.
  const detail = await res.text().catch(() => '');
  if (res.status === 200 || res.status === 202) {
    console.log(`  submitted ${urlList.length} URLs -> ${res.status} ${res.statusText}`);
    return;
  }
  throw new Error(`${res.status} ${res.statusText} ${detail.slice(0, 200)}`);
}

async function main(): Promise<void> {
  console.log(`IndexNow -> ${BASE}${DRY ? '  (dry run)' : ''}`);

  await checkKey();

  const urls = await urlsFromSitemap();
  console.log(`  ${urls.length} URLs from the sitemap`);

  if (DRY) {
    console.log(`  would submit:\n    ${urls.slice(0, 5).join('\n    ')}\n    …`);
    return;
  }

  for (let i = 0; i < urls.length; i += BATCH) {
    await submit(urls.slice(i, i + BATCH));
  }

  console.log('done');
}

main().catch((err) => {
  console.error(`FAILED: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});

/* Marks this file a module. Without it TypeScript treats a script with no
   imports as global scope, and `BASE` and `main` collide with every sibling
   in scripts/ — which is why adding this file broke seo-audit.ts. */
export {};
