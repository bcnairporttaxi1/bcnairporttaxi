import credits from './destination-photo-credits.json';

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
