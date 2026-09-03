import credits from './destination-photo-credits.json';
import { DESTINATION_GROUPS } from './destinations';

/**
 * Destination photography sourced from Wikimedia Commons.
 *
 * Every file here is CC0, public domain, CC BY or CC BY-SA — licences that
 * permit commercial use provided the author is credited. `PhotoCredit` carries
 * the attribution the licence requires; render it wherever the image appears.
 *
 * Destinations with no entry simply render without a photo rather than falling
 * back to an unrelated one.
 */
export interface PhotoCredit {
  slug: string;
  file: string;
  title: string;
  license: string;
  author: string;
  sourceUrl: string;
}

const BY_SLUG = new Map<string, PhotoCredit>(
  (credits as PhotoCredit[]).map((c) => [c.slug, c]),
);

export function destinationPhoto(slug: string): PhotoCredit | null {
  return BY_SLUG.get(slug) ?? null;
}

/** Short attribution line, e.g. "Photo: Jane Doe / CC BY-SA 3.0". */
export function attributionLine(credit: PhotoCredit): string {
  return `Photo: ${credit.author} / ${credit.license}`;
}

/**
 * Cover artwork for destinations with no photograph.
 *
 * Only eleven of the thirty-three destinations have a licensed photo, so the
 * hub grid had holes: some cards led with an image and the rest opened on a
 * badge, which made the ones without look unfinished rather than different.
 * Every card now leads with something.
 *
 * The motif is derived from the destination's GROUP rather than stored per
 * slug, so adding a destination to an existing group gets a sensible cover for
 * free and there is no second list to keep in step.
 */
export type DestinationMotif = 'coast' | 'parks' | 'mountains' | 'distance';

const GROUP_MOTIF: Record<string, DestinationMotif> = {
  'costa-brava': 'coast',
  'south-and-theme-parks': 'parks',
  'mountains-and-ski': 'mountains',
  'long-distance': 'distance',
};

let MOTIF_BY_SLUG: Map<string, DestinationMotif> | null = null;

/** The motif for a destination slug. Falls back to the coast, which is most of them. */
export function destinationMotif(slug: string): DestinationMotif {
  if (!MOTIF_BY_SLUG) {
    MOTIF_BY_SLUG = new Map();
    for (const group of DESTINATION_GROUPS) {
      const motif = GROUP_MOTIF[group.slug] ?? 'coast';
      for (const d of group.destinations) MOTIF_BY_SLUG.set(d.slug, motif);
    }
  }
  return MOTIF_BY_SLUG.get(slug) ?? 'coast';
}
