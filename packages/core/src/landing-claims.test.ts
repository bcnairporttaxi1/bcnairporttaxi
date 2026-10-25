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
  ['en meter/tariff', /official (?:AMB )?(?:meter|tariff)|on the meter|metered rate/i],
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
  /factura oficial|fatura oficial|facture officielle|Taxameterrechnung|fattura ufficiale|officiële factuur|official taxi invoice|官方计价器发票/i,
  /suplement|supplément|Zuschlag|supplemento|toeslag|надбавк|附加费|supplement/i,
  /interurban|interurbano|interurbana|interurbain|Überland|междугород|城际|T-6|T-7/i,
  // Our own copy saying there is no meter.
  /no meter|not a meter|sin taxímetro|sense taxímetre|sem taxímetro|keine Taxameter|kein Taxameter|senza tassametro|geen meter|без таксометра|无计价器|statt des Taxameters|plutôt que du compteur|no hi ha taxímetre|no hay taxímetro/i,
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
