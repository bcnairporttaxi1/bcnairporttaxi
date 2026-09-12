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
 * Where the dispatch desk is told about bookings. Overridable per environment
 * without a deploy; defaults to the same inbox as enquiries.
 */
export const ADMIN_NOTIFY_EMAIL =
  process.env.ADMIN_NOTIFY_EMAIL ?? 'bcnairporttaxi1@gmail.com';
