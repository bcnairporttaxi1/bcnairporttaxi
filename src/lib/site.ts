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

export const CONTACT_EMAIL = 'bookings@bcnairporttaxi.es';
