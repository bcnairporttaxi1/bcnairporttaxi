/**
 * Sources destination photography from Wikimedia Commons.
 *
 * Only freely-licensed files are accepted (CC0 / public domain / CC BY /
 * CC BY-SA). Anything else is skipped rather than downloaded — using an
 * all-rights-reserved photo of Montserrat on a commercial site is a real
 * liability, not a theoretical one.
 *
 * Attribution for every accepted file is written to
 * `src/lib/destination-photo-credits.json` so the site can display it, which
 * the CC BY / BY-SA licences require.
 *
 * Run: npx tsx scripts/fetch-destination-photos.ts
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.join(process.cwd(), 'public', 'img', 'destinations');
const CREDITS = path.join(process.cwd(), 'src', 'lib', 'destination-photo-credits.json');

const UA = 'BCNAirportTaxi/1.0 (https://bcnairporttaxi.vercel.app; bookings@bcnairporttaxi.com)';
const API = 'https://commons.wikimedia.org/w/api.php';

/** Licences we may use commercially, with attribution. */
const ALLOWED = /^(cc0|public domain|cc[- ]by([- ]sa)?([- ]\d(\.\d)?)?)$/i;

/**
 * Wikipedia articles per destination.
 *
 * Keyword search on Commons was tried first and produced wrong subjects — a
 * search for "Montserrat monastery" returned an unrelated village church.
 * An article's lead image is editorially chosen to depict that subject, so it
 * is reliable in a way a keyword match is not.
 */
const TARGETS: Array<{ slug: string; articles: string[] }> = [
  { slug: 'girona', articles: ['Girona'] },
  { slug: 'montserrat', articles: ['Montserrat (mountain)', 'Santa Maria de Montserrat Abbey'] },
  { slug: 'sitges', articles: ['Sitges'] },
  { slug: 'andorra', articles: ['Andorra la Vella', 'Andorra'] },
  { slug: 'tarragona', articles: ['Tarragona'] },
  { slug: 'valencia', articles: ['Valencia'] },
  { slug: 'costa-brava', articles: ['Costa Brava'] },
  { slug: 'lloret-de-mar', articles: ['Lloret de Mar'] },
  { slug: 'tossa-de-mar', articles: ['Tossa de Mar'] },
  { slug: 'blanes', articles: ['Blanes'] },
  { slug: 'cadaques', articles: ['Cadaqués'] },
  { slug: 'la-roca-village', articles: ['La Roca del Vallès'] },
];

interface Credit {
  slug: string;
  file: string;
  title: string;
  license: string;
  author: string;
  sourceUrl: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function api(params: Record<string, string>) {
  const url = new URL(API);
  url.searchParams.set('format', 'json');
  url.searchParams.set('origin', '*');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Commons ${res.status}`);
  return res.json();
}

function clean(html: string | undefined): string {
  return (html ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Lead image of an English Wikipedia article, with its Commons licence.
 *
 * Two hops: Wikipedia gives the filename its editors chose to represent the
 * subject, then Commons supplies the licence and author for attribution.
 */
async function findPhoto(article: string): Promise<
  | { title: string; url: string; license: string; author: string; descUrl: string }
  | null
> {
  const wiki = new URL('https://en.wikipedia.org/w/api.php');
  wiki.searchParams.set('format', 'json');
  wiki.searchParams.set('action', 'query');
  wiki.searchParams.set('prop', 'pageimages');
  wiki.searchParams.set('piprop', 'original|name');
  wiki.searchParams.set('titles', article);
  wiki.searchParams.set('redirects', '1');

  const wres = await fetch(wiki, { headers: { 'User-Agent': UA } });
  if (!wres.ok) return null;

  const wjson = (await wres.json()) as {
    query?: { pages?: Record<string, { pageimage?: string }> };
  };
  const pageimage = Object.values(wjson.query?.pages ?? {})[0]?.pageimage;
  if (!pageimage) return null;

  const info = (await api({
    action: 'query',
    titles: `File:${pageimage}`,
    prop: 'imageinfo',
    iiprop: 'url|extmetadata|size',
    iiurlwidth: '1600',
  })) as {
    query?: {
      pages?: Record<
        string,
        {
          title: string;
          imageinfo?: Array<{
            thumburl?: string;
            url: string;
            descriptionurl: string;
            width: number;
            height: number;
            extmetadata?: Record<string, { value?: string }>;
          }>;
        }
      >;
    };
  };

  const page = Object.values(info.query?.pages ?? {})[0];
  const ii = page?.imageinfo?.[0];
  if (!ii) return null;

  const meta = ii.extmetadata ?? {};
  const license = clean(meta.LicenseShortName?.value);
  // Skip anything we cannot use commercially, even if it is the lead image.
  if (!ALLOWED.test(license)) return null;

  return {
    title: (page.title ?? pageimage).replace(/^File:/, ''),
    url: ii.thumburl ?? ii.url,
    license,
    author: clean(meta.Artist?.value) || 'Unknown',
    descUrl: ii.descriptionurl,
  };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const credits: Credit[] = [];

  for (const target of TARGETS) {
    let found = null;
    for (const a of target.articles) {
      found = await findPhoto(a);
      if (found) break;
      await sleep(400); // be polite to the API
    }

    if (!found) {
      console.error(`  MISS  ${target.slug}`);
      continue;
    }

    const res = await fetch(found.url, { headers: { 'User-Agent': UA } });
    if (!res.ok) {
      console.error(`  FAIL  ${target.slug} (${res.status})`);
      continue;
    }

    const buf = Buffer.from(await res.arrayBuffer());
    const out = await sharp(buf)
      .resize(1200, 800, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 76, mozjpeg: true })
      .toBuffer();

    const file = `${target.slug}.jpg`;
    await writeFile(path.join(OUT, file), out);

    credits.push({
      slug: target.slug,
      file: `/img/destinations/${file}`,
      title: found.title,
      license: found.license,
      author: found.author,
      sourceUrl: found.descUrl,
    });

    console.log(
      `  ok    ${target.slug.padEnd(18)} ${(out.length / 1024).toFixed(0).padStart(4)} KB  ${found.license}`,
    );
    await sleep(400);
  }

  await writeFile(CREDITS, JSON.stringify(credits, null, 2) + '\n', 'utf8');
  console.log(`\n${credits.length}/${TARGETS.length} photos, credits written.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
