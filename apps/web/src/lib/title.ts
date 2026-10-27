import type { Metadata } from 'next';

/**
 * The layout appends " | BCNAirportTaxi" to every title that does not opt out.
 * That is 17 characters, and 52 titles across the site ended up past the 60
 * Google shows: the Spanish fleet page was 73, Catalan 77, French 75, German
 * 74, because the page text was written to fit and the suffix was added
 * afterwards by a template nobody was looking at.
 *
 * Rather than shortening ten translations of every page to leave room for a
 * brand name that is already in the domain, the suffix is dropped when, and
 * only when, it would overflow. Short titles keep it.
 */
const SUFFIX = ' | BCNAirportTaxi';
const LIMIT = 60;

export function fitTitle(title: string): Metadata['title'] {
  return title.length + SUFFIX.length > LIMIT ? { absolute: title } : title;
}
