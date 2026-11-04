import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Motorway tolls are NOT included in the fixed price and are charged separately to the customer
 * (owner, 2026-11-03). The site used to say the price was "all-inclusive" and that nothing is owed to
 * the driver; both claims are false the moment a route uses a toll road.
 *
 * This test fails on the old claims in any of the ten languages, and requires the pages where a price
 * is explained to mention tolls. It does NOT pin an amount, a method or a route list: none has been
 * given, and inventing one is worse than omitting it.
 */
const LOCALES = ['en', 'es', 'ca', 'fr', 'de', 'it', 'nl', 'pt', 'ru', 'zh'] as const;
type Loc = (typeof LOCALES)[number];

/** Phrases that claim the price covers everything, or that nothing is owed alongside it. */
const OLD_CLAIM: Record<Loc, RegExp> = {
  en: /no cash to find|all[- ]inclusive|nothing (?:further |at all |else )?(?:is |was )?(?:owed|to pay|to settle|due|to collect)|owe nothing|nothing is collected|nothing to settle/i,
  es: /no se cobra nada|todo incluido|todo-incluido|nada que pagar|no se debe nada|no pagas nada|no debes nada|nada que liquidar|nada que cobrar|sin nada que pagar|nada al conductor/i,
  ca: /no es cobra res|tot inclòs|res a pagar|no es deu res|no pagues res|res a liquidar|res al conductor|res a cobrar/i,
  fr: /rien n[’']est encaissé|tout compris|rien à payer|rien n[’']est dû|rien à régler|rien à verser|ne devez rien|rien à encaisser/i,
  de: /nichts kassiert|alles inklusive|all-inclusive|nichts zu zahlen|nichts zu bezahlen|nichts schuldig|dem Fahrer nichts|nichts im Wagen|nichts an den Fahrer|nichts zu kassieren/i,
  it: /non si incassa nulla|tutto incluso|nulla da pagare|non si deve nulla|non paghi nulla|non deve nulla|niente da pagare|nulla da saldare|nulla da riscuotere/i,
  nl: /niets geïnd|alles inbegrepen|alles-in|niets te betalen|niets verschuldigd|chauffeur niets|niets af te rekenen|niets te innen/i,
  pt: /não se cobra nada|tudo incluído|nada a pagar|nada é devido|não paga nada|nada ao motorista|nada para pagar|nada a cobrar|nada a liquidar/i,
  ru: /ничего не взимается|всё включено|все включено|ничего не нужно платить|платить ничего не нужно|ничего не должны|водителю платить ничего|ничего не оплачивается|не нужно платить водителю|ничего не нужно собирать/i,
  zh: /不收取任何费用|全包|无需再向司机付款|无需向司机|无需付款|无需再付|无需在车上|无需再支付/i,
};

/** The word for "toll" in each language. */
const TOLL: Record<Loc, RegExp> = {
  en: /toll/i,
  es: /peaje/i,
  ca: /peatge/i,
  fr: /péage/i,
  de: /Maut/i,
  it: /pedagg/i,
  nl: /\btol(?:wegen|kosten|len|heffing)?\b|tolweg/i,
  pt: /portagem|portagens/i,
  ru: /платн\S* дорог|пошлин|платных/i,
  zh: /过路费|通行费|收费公路|高速费|路桥费/,
};

/** The word for "driver", used to check the toll is said to be collected by the driver in the car. */
const DRIVER: Record<Loc, RegExp> = {
  en: /driver/i, es: /conductor/i, ca: /conductor/i, fr: /chauffeur/i, de: /Fahrer/i,
  it: /conducente|autista/i, nl: /chauffeur/i, pt: /motorista|condutor/i, ru: /водител/i, zh: /司机/,
};

/** Keys that must say the DRIVER collects the toll in the car (owner, 2026-11-03). */
const MUST_SAY_DRIVER_COLLECTS = [
  'account.tollsValue',
  'pricing.adjTollsValue',
  'quote.nothingInTaxi',
  'quote.disclaimer',
  'quote.includedNote',
  'home.payment.note',
  'pricing.feeBody',
  'howItWorks.steps.three.body',
  'howItWorks.dayBody2',
  'faq.items.fareAccurate.a',
  'faq.items.whyFee.a',
  'faq.items.payment.a',
];

/** Message keys that explain what a price covers: each must say tolls are separate. */
const MUST_MENTION_TOLLS = [
  'home.intro',
  'home.payment.note',
  'quote.disclaimer',
  'quote.includedNote',
  'pricing.feeBody',
  'pricing.officialBody',
  'faq.items.whyFee.a',
  'faq.items.payment.a',
  'faq.items.fareAccurate.a',
  'footer.about',
  'fares.note',
  'account.tollsValue',
  'howItWorks.dayBody2',
];

const web = (l: string) => JSON.parse(readFileSync(join(__dirname, `${l}.json`), 'utf8'));
const get = (o: unknown, path: string): string => {
  let cur = o as Record<string, unknown>;
  for (const k of path.split('.')) cur = cur?.[k] as Record<string, unknown>;
  return cur as unknown as string;
};
function* strings(o: unknown, p = ''): Generator<[string, string]> {
  if (typeof o === 'string') yield [p, o];
  else if (Array.isArray(o)) for (const [i, v] of o.entries()) yield* strings(v, `${p}[${i}]`);
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) yield* strings(v, p ? `${p}.${k}` : k);
}

const core = (rel: string) => readFileSync(join(__dirname, '../../../../packages/core/src', rel), 'utf8');
/** Reader-facing lines of a source file: comments are not reader-facing. */
const readerLines = (text: string) =>
  text.split('\n').filter((l) => !/^\s*(\*|\/\/|\/\*)/.test(l));

describe.each(LOCALES)('toll policy [%s]', (l) => {
  it('messages carry no "all-inclusive / nothing owed" claim', () => {
    const hits = [...strings(web(l))].filter(([, v]) => OLD_CLAIM[l].test(v)).map(([p, v]) => `${p}: ${v.slice(0, 90)}`);
    expect(hits, `\n${hits.join('\n')}`).toEqual([]);
  });

  it('the pages that explain a price say tolls are separate', () => {
    const d = web(l);
    const missing = MUST_MENTION_TOLLS.filter((k) => !TOLL[l].test(get(d, k) ?? ''));
    expect(missing).toEqual([]);
  });

  it('says the driver collects the toll in the car where payment is explained', () => {
    const d = web(l);
    const missing = MUST_SAY_DRIVER_COLLECTS.filter((k) => !(TOLL[l].test(get(d, k) ?? '') && DRIVER[l].test(get(d, k) ?? '')));
    expect(missing).toEqual([]);
  });

  it('landing, destination and blog copy carry no old claim', () => {
    const file = l === 'en' ? ['landing-pages.ts', 'blog.ts', 'destinations.ts'] : [`landing-copy/${l}.ts`, `destination-copy/${l}.ts`, `blog-copy/${l}.ts`];
    const hits: string[] = [];
    for (const f of file) {
      for (const line of readerLines(core(f))) if (OLD_CLAIM[l].test(line)) hits.push(`${f}: ${line.trim().slice(0, 110)}`);
    }
    expect(hits, `\n${hits.join('\n')}`).toEqual([]);
  });
});

describe('English-only sources', () => {
  it.each(['legal.ts', 'blog.ts', 'destinations.ts'])('packages/core/src/%s', (f) => {
    const hits = readerLines(core(f)).filter((line) => OLD_CLAIM.en.test(line)).map((x) => x.trim().slice(0, 110));
    expect(hits, `\n${hits.join('\n')}`).toEqual([]);
  });

  it('legal terms state that tolls are not included', () => {
    expect(core('legal.ts')).toMatch(/Motorway tolls are not included/);
  });

  it.each(['app/llms.txt/route.ts', 'app/pricing.md/route.ts', 'app/manifest.ts', 'components/json-ld.tsx', 'lib/email.ts'])(
    'apps/web/src/%s',
    (f) => {
      const text = readFileSync(join(__dirname, '..', f), 'utf8');
      const hits = readerLines(text).filter((line) => OLD_CLAIM.en.test(line)).map((x) => x.trim().slice(0, 110));
      expect(hits, `\n${hits.join('\n')}`).toEqual([]);
    },
  );
});
