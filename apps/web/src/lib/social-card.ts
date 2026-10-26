/**
 * The site's social preview image, in one place.
 *
 * Next merges metadata from layout to page *shallowly*: a page that sets
 * `openGraph` replaces the layout's whole object rather than merging into it,
 * so any route that set `openGraph` without `images` shipped with no
 * `og:image` at all. That happened on the twelve destination pages and the
 * eleven landing pages — 230 of the site's 400 URLs — while the homepage and
 * the blog were fine, which is exactly why it went unnoticed.
 *
 * It matters more here than on most sites because WhatsApp is a primary
 * conversion channel and WhatsApp link previews read `og:image` only; they do
 * not fall back to `twitter:image`. Every WhatsApp share of a destination or
 * route page was a bare text card.
 *
 * The bug was found and fixed on the blog route first and the comment there
 * explains it, but the fix was never carried across. Hence this module: one
 * definition every route spreads, so the next route to set `openGraph`
 * cannot reintroduce it by omission.
 */

/**
 * JPEG on purpose. The usual "serve modern formats" rule does not apply to
 * social cards: the Facebook and WhatsApp scrapers are unreliable with WebP
 * for `og:image`. On-page images are a separate pipeline and already get
 * AVIF/WebP automatically through next/image.
 */
export const SOCIAL_CARD = {
  url: '/img/hero-banner.jpg',
  width: 1920,
  height: 1080,
  alt: 'Black and yellow Barcelona airport taxi on the waterfront at sunset with the Sagrada Família behind',
} as const;

/** Spread into an `openGraph` object so the image survives the shallow merge. */
export const socialImages = [SOCIAL_CARD];

/** Spread into a `twitter` object. Same file; a second asset would only drift. */
export const twitterImages = [SOCIAL_CARD.url];
