import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config as loadEnv } from 'dotenv';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * Local development reads secrets from the single .env at the repository root,
 * shared by every workspace. Next only looks inside its own project directory,
 * which is now apps/web, so the root file is loaded explicitly here.
 *
 * On Vercel this is a no-op: the file does not exist there and environment
 * variables are injected by the platform.
 */
loadEnv({ path: join(dirname(fileURLToPath(import.meta.url)), '..', '..', '.env'), quiet: true });

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    // All imagery is generated at build time and served locally, so no remote
    // patterns are needed. AVIF first keeps the hero within the LCP budget.
    formats: ['image/avif', 'image/webp'],
    // Next 16 restricts qualities to [75] by default and silently coerces
    // anything else to the nearest allowed value. 60 is for the hero backdrop,
    // which sits at 40% opacity where the loss is invisible.
    qualities: [60, 75],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            /**
             * Content-Security-Policy.
             *
             * Every third-party call the app makes — OSRM routing, SumUp,
             * geocoding — runs server-side, so the browser only ever reaches
             * our own origin and the Esri tile server. That makes a tight
             * connect-src and img-src possible without breaking anything.
             *
             * script-src carries 'unsafe-inline' and 'unsafe-eval' because
             * Next inlines its hydration bootstrap and a nonce would have to
             * be threaded through the proxy on every request. That is worth
             * doing later; it is not a reason to ship no policy at all,
             * because the directives that stop the highest-impact attacks do
             * not depend on it: base-uri blocks base-tag injection,
             * object-src blocks plugin embedding, frame-ancestors blocks
             * clickjacking, and form-action stops a form being repointed at
             * an attacker — which matters most on a site that takes payments.
             */
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              "frame-ancestors 'none'",
              // SumUp hosts the card form and we navigate to it.
              "form-action 'self' https://api.sumup.com https://pay.sumup.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              // next/font self-hosts, so the only remote images are map tiles.
              "img-src 'self' data: blob: https://server.arcgisonline.com",
              "connect-src 'self' https://server.arcgisonline.com",
              "worker-src 'self' blob:",
              "manifest-src 'self'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
          {
            key: 'Permissions-Policy',
            // Geolocation stays enabled: drivers and passengers share position
            // during a live trip.
            value: 'camera=(), microphone=(), payment=(), geolocation=(self)',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
