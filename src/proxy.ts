import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Next.js 16 renamed the `middleware` convention to `proxy` (Node.js runtime only).
 * This handles locale detection and prefixing for every public page.
 */
const handleI18n = createIntlMiddleware(routing);

export function proxy(request: Parameters<typeof handleI18n>[0]) {
  return handleI18n(request);
}

export const config = {
  // Skip API routes, Next internals, and anything with a file extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
