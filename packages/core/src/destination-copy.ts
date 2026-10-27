import type { Destination, DestinationGroup } from './destinations';
import { ES_DESTINATION_COPY } from './destination-copy/es';
import { CA_DESTINATION_COPY } from './destination-copy/ca';
import { FR_DESTINATION_COPY } from './destination-copy/fr';
import { DE_DESTINATION_COPY } from './destination-copy/de';
import { IT_DESTINATION_COPY } from './destination-copy/it';
import { PT_DESTINATION_COPY } from './destination-copy/pt';
import { NL_DESTINATION_COPY } from './destination-copy/nl';
import { RU_DESTINATION_COPY } from './destination-copy/ru';
import { ZH_DESTINATION_COPY } from './destination-copy/zh';

/**
 * Destination copy in each language.
 *
 * `destinations.ts` holds one English copy of everything, and the destination
 * pages passed its `name` straight into per-locale message templates. So the
 * Spanish page for Andorra read "Traslado a Barcelona to Andorra" in its
 * title, H1, meta description and breadcrumb, and the body underneath was
 * English prose. The same on every locale.
 *
 * It sat on exactly the pages that serve the long-distance queries Search
 * Console shows people typing in Spanish ("taxi barcelona andorra" 60
 * impressions, lloret de mar, valencia, girona, sitges, tarragona), and the
 * Spanish title never contained the word "taxi" at all.
 *
 * The fix is data rather than a smarter template: each locale carries its own
 * place name, its own route phrase and its own body, and the page reads those.
 * A template can reorder words; it cannot translate "Three hours into the
 * Pyrenees".
 */

export interface DestinationLocaleCopy {
  /** The place's own name in this language: "Andorra", "Lloret de Mar". */
  place: string;
  /**
   * The route as a phrase, in this language: "Barcelona a Andorra",
   * "Aeropuerto de Barcelona a la Costa Brava". Feeds titles, the H1,
   * breadcrumbs and the WhatsApp text, so it replaces the English `name`.
   */
  route: string;
  /** Card summary. */
  blurb: string;
  /** Long-form page copy, paragraph for paragraph the same as English. */
  body?: string[];
}

export interface GroupLocaleCopy {
  title: string;
  intro: string;
}

export interface LocaleDestinationCopy {
  /** Keyed by destination slug. */
  destinations: Record<string, DestinationLocaleCopy>;
  /** Keyed by group slug. */
  groups: Record<string, GroupLocaleCopy>;
}

const COPY: Record<string, LocaleDestinationCopy> = {
  es: ES_DESTINATION_COPY,
  ca: CA_DESTINATION_COPY,
  fr: FR_DESTINATION_COPY,
  de: DE_DESTINATION_COPY,
  it: IT_DESTINATION_COPY,
  pt: PT_DESTINATION_COPY,
  nl: NL_DESTINATION_COPY,
  ru: RU_DESTINATION_COPY,
  zh: ZH_DESTINATION_COPY,
};

/** "Barcelona to Andorra" -> "Andorra". The English place name. */
function englishPlace(name: string): string {
  return name.replace(/^Barcelona Airport to /, '').replace(/^Barcelona to /, '');
}

export interface ResolvedDestination {
  place: string;
  route: string;
  blurb: string;
  body: string[] | undefined;
  /** False when this locale falls back to English for the page. */
  translated: boolean;
}

export function destinationCopy(d: Destination, locale: string): ResolvedDestination {
  const t = locale === 'en' ? undefined : COPY[locale]?.destinations[d.slug];
  return {
    place: t?.place ?? englishPlace(d.name),
    route: t?.route ?? d.name,
    blurb: t?.blurb ?? d.blurb,
    body: t?.body ?? d.body,
    translated: locale === 'en' || Boolean(t),
  };
}

export function groupCopy(
  g: DestinationGroup,
  locale: string,
): { title: string; intro: string } {
  const t = locale === 'en' ? undefined : COPY[locale]?.groups[g.slug];
  return { title: t?.title ?? g.title, intro: t?.intro ?? g.intro };
}

/** Locales that ship destination copy, for the parity tests. */
export const DESTINATION_COPY_LOCALES = Object.keys(COPY);

/** The raw per-locale tables, for the parity tests only. */
export function destinationCopyFor(locale: string): LocaleDestinationCopy | undefined {
  return COPY[locale];
}
