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
