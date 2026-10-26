import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { LANDING_PAGES, getLandingCopy } from './landing-pages';

/**
 * No landing copy may price a transfer off the official taxi meter.
 *
 * Transfers moved to a fixed price list, which made the old positioning false
 * rather than merely stale. Removing it by hand took three passes and still
 * left claims standing, every time for the same reason: the search pattern
 * matched one inflection and missed another. "offizieller AMB-Tarif" was
 * replaced while "offiziellem" and "offiziellen" survived; "du compteur" went
 * and "au compteur" stayed — including a French line still asserting that the
 * meter rate does not vary by vehicle size, which it does, by EUR 25.
 *
 * So the check is a test rather than a grep, run over every locale, and the
 * patterns are deliberately loose: a false positive costs one allowlist
 * entry, a false negative ships a lie about the price.
 */

/** Phrases that claim the price comes from the official meter or tariff. */
const CLAIMS: Array<[string, RegExp]> = [
  ['en meter/tariff', /official (?:AMB )?(?:meter|tariff|fare|rate)|on the meter|metered rate|AMB fares?\b|AMB tariffs?\b/i],
  ['es tarifa oficial', /tarifa oficial|taxímetro oficial|importe del taxímetro/i],
  ['ca tarifa oficial', /tarifa oficial|taxímetre oficial|tarifa de taxímetre/i],
  ['fr tarif officiel', /tarif officiel|compteur officiel|(?:au|du) compteur/i],
  ['de AMB-Tarif', /offiziell\w*\s+AMB[- ]|AMB-(?:Tarif|Nachttarif)|Taxameterpreis/i],
  ['it tariffa ufficiale', /tariffa ufficiale|tassametro ufficiale/i],
  ['nl metertarief', /officieel\w*\s+AMB|metertarief|AMB-meter/i],
  ['pt tarifa oficial', /tarifa oficial|taxímetro oficial/i],
  ['ru official tariff', /официальн\w*\s+(?:тариф|счётчик|таксометр)/i],
  ['zh official rate', /官方\s?AMB|官方费率|计价器费率/],
];

/**
 * Phrases that contain a flagged word but are true.
 *
 * The vehicles really are licensed, official supplements really exist and sit
 * inside the price, the official meter invoice really is available from the
 * driver, and a journey out of the metropolitan area really is metered on the
 * Generalitat's interurban tariff. Each entry is a substring that makes the
 * sentence legitimate.
 */
const ALLOWED = [
  /factura oficial|fatura oficial|facture officielle|Taxameterrechnung|fattura ufficiale|officiële factuur|official taxi invoice|official meter invoice|官方计价器发票/i,
  /*
   * OPEN QUESTION FOR THE OPERATOR, allowlisted so it does not block CI.
   *
   * `legal.ts` states that waiting beyond a reasonable period "is charged on
   * the meter at the official AMB waiting rate". Every other surface says the
   * price is fixed and nothing at all is owed in the car, so either:
   *   - excess waiting really is billable, and the "nothing to pay" claim
   *     needs a stated exception everywhere it appears; or
   *   - the clause is left over from the metered model and should go.
   *
   * `TARIFFS.waitPerHour` (27.75) exists, so the charge is implementable
   * either way. Which it is, is a commercial and contractual decision, not
   * one to settle by rewording a terms page, so it is surfaced rather than
   * silently changed.
   */
  /charged on the meter at the official AMB waiting rate/i,
  /suplement|supplément|Zuschlag|supplemento|toeslag|надбавк|附加费|supplement/i,
  /interurban|interurbano|interurbana|interurbain|Überland|междугород|城际|T-6|T-7/i,
  // Our own copy saying there is no meter.
  /no meter|not a meter|sin taxímetro|sense taxímetre|sem taxímetro|keine Taxameter|kein Taxameter|senza tassametro|geen meter|без таксометра|无计价器|statt des Taxameters|plutôt que du compteur|no hi ha taxímetre|no hay taxímetro/i,
  /*
   * Copy that denies the meter applies, or places the meter somewhere other
   * than our price. These say the opposite of the banned claim, so flagging
   * them would push the copy away from the accurate statement rather than
   * towards it.
   *
   * Deliberately narrow. Each alternative requires a negation or a
   * third-party attribution next to the flagged word, so "our price comes
   * from the official meter" is still caught.
   */
  /not metered|rather than (?:run on the meter|by us|the meter|metered)|than run on the meter|outside the (?:AMB )?metered zone|metered zone|set by the AMB rather than/i,
  /no se mide con taxímetro|en lugar de taxímetro|fuera de la zona de taxímetro/i,
  /non (?:è )?tassametro|anziché (?:il )?tassametro|fuori dalla zona (?:a )?tassametro/i,
];

const LOCALES = ['en', 'es', 'ca', 'fr', 'de', 'it', 'pt', 'nl', 'ru', 'zh'];

/** Every string a reader could see, across every page and locale. */
const strings = LANDING_PAGES.flatMap((page) =>
  LOCALES.flatMap((locale) => {
    const c = getLandingCopy(page, locale);
    const out: Array<{ where: string; text: string }> = [
      { where: `${page.slug} [${locale}] title`, text: c.title },
      { where: `${page.slug} [${locale}] description`, text: c.description },
      { where: `${page.slug} [${locale}] h1`, text: c.h1 },
      { where: `${page.slug} [${locale}] intro`, text: c.intro },
    ];
    for (const [i, s] of (c.sections ?? []).entries()) {
      out.push({ where: `${page.slug} [${locale}] section ${i} h2`, text: s.h2 });
      out.push({ where: `${page.slug} [${locale}] section ${i} body`, text: s.body });
    }
    return out;
  }),
);

/**
 * Source files outside the landing copy that also carry reader-facing claims.
 *
 * The guard above read `LANDING_PAGES` and nothing else, so the PWA manifest
 * went on describing the service as giving "an official AMB fare estimate
 * before you book" through three separate removal sweeps. Nobody reads
 * manifest.ts, which is exactly why it survived. Scanning the files as text
 * is cruder than walking a typed structure, and it catches the ones a
 * structural walk cannot see.
 */
const SCANNED_FILES = [
  'packages/core/src/blog.ts',
  'packages/core/src/legal.ts',
  'packages/core/src/destinations.ts',
  'apps/web/src/app/manifest.ts',
  'apps/web/src/app/llms.txt/route.ts',
  'apps/web/src/messages/en.json',
];

describe('no reader-facing file prices the ride off the meter', () => {
  it.each(SCANNED_FILES)('%s', (rel) => {
    // Resolved from this file so the test does not depend on the cwd.
    const path = fileURLToPath(new URL(`../../../${rel}`, import.meta.url));
    if (!existsSync(path)) {
      // A moved or renamed file must fail loudly rather than silently pass.
      throw new Error(`scanned file not found: ${rel}`);
    }
    const text = readFileSync(path, 'utf8');

    const hits: string[] = [];
    for (const line of text.split('\n')) {
      if (ALLOWED.some((ok) => ok.test(line))) continue;
      for (const [label, re] of CLAIMS) {
        const m = line.match(re);
        if (m) {
          hits.push(`${label}: ${line.trim().slice(0, 150)}`);
          break;
        }
      }
    }

    expect(hits, `\n${hits.join('\n')}`).toEqual([]);
  });
});

describe('landing copy does not price the ride off the meter', () => {
  it('reads every locale, not just English', () => {
    // The first version of the sibling length test read only English and so
    // reported clean while nine locales were broken.
    expect(strings.length).toBeGreaterThan(LANDING_PAGES.length * LOCALES.length);
  });

  it('contains no meter-pricing claim', () => {
    const hits: string[] = [];
    for (const { where, text } of strings) {
      if (ALLOWED.some((ok) => ok.test(text))) continue;
      for (const [label, re] of CLAIMS) {
        const m = text.match(re);
        if (m) {
          hits.push(`${where} — ${label}: "...${text.slice(Math.max(0, (m.index ?? 0) - 30), (m.index ?? 0) + 60)}..."`);
          break;
        }
      }
    }
    expect(hits, `\n${hits.join('\n')}`).toEqual([]);
  });
});
