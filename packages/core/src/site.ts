export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function whatsappLink(text: string): string {
  const base = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}`
    : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(text)}`;
}

/** Core pages that exist as their own route files. */
export const CORE_ROUTES = [
  '/',
  '/pricing',
  '/fleet',
  '/how-it-works',
  '/book',
  '/faq',
  '/contact',
  '/install',
  '/reviews',
  '/terms',
  '/privacy',
  '/cookies',
  '/refund-policy',
] as const;

/**
 * Where enquiries go. Shown on the contact page, the top bar and in the
 * Organization schema — so it must be a mailbox somebody actually reads.
 */
export const CONTACT_EMAIL = 'bcnairporttaxi1@gmail.com';

/**
 * Who is legally behind the site. Spanish LSSI requires a commercial site
 * to state the company name, tax id and address; it is also the first thing
 * a search-quality rater looks for on a page that takes money.
 *
 * Deliberately sourced from the environment and empty by default: this is
 * not something to guess at. Set NEXT_PUBLIC_LEGAL_COMPANY,
 * NEXT_PUBLIC_LEGAL_VAT_ID and NEXT_PUBLIC_LEGAL_ADDRESS in Vercel and the
 * footer notice and the schema address appear on the next build.
 */
export const LEGAL = {
  company: process.env.NEXT_PUBLIC_LEGAL_COMPANY ?? '',
  vatId: process.env.NEXT_PUBLIC_LEGAL_VAT_ID ?? '',
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS ?? '',
};

/**
 * Where the dispatch desk is told about bookings. Overridable per environment
 * without a deploy; defaults to the same inbox as enquiries.
 */
export const ADMIN_NOTIFY_EMAIL =
  process.env.ADMIN_NOTIFY_EMAIL ?? 'bcnairporttaxi1@gmail.com';
