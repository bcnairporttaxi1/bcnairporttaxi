import type { MetadataRoute } from 'next';
import { SITE_URL } from '@bcn/core/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Panels and API endpoints hold personal data and have no search value.
        disallow: ['/api/', '/admin', '/account', '/driver'],
      },
      {
        // Named explicitly rather than left to the wildcard. Assistants are
        // increasingly how people ask "how much is a taxi from the airport",
        // and being absent from that answer is worse for a booking business
        // than being quoted in it. /llms.txt states the facts we want quoted.
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
          'Bingbot',
        ],
        allow: '/',
        disallow: ['/api/', '/admin', '/account', '/driver'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
