import type { Metadata } from 'next';
import './globals.css';

/**
 * Fallback for URLs that never reach a locale segment (for example a bad path
 * that the proxy could not prefix). It renders its own document because there
 * is no root layout above it — the locale layout owns `<html>` for the rest of
 * the site.
 *
 * That is also why it is `global-not-found` rather than `not-found`. A root
 * `not-found.tsx` is rendered *inside* the root layout, and this app has no
 * root layout to render it in, so every unmatched path that skipped the proxy
 * — anything with a dot in it, which the matcher excludes — returned 500
 * instead of 404. Search engines read that as "come back later" and keep the
 * URL queued; a 404 retires it. `global-not-found` is handled at the routing
 * level and skips layout rendering entirely, which is exactly the shape this
 * file already had.
 *
 * Bypassing the layout also means none of the site metadata applies here, so
 * the stale canonical pointing at `/en` and the layout's `index, follow`
 * robots directive no longer contradict the 404's own `noindex`. Next injects
 * that `noindex` automatically for any page returning a 404 status, so it is
 * not repeated below.
 */
export const metadata: Metadata = {
  title: { absolute: 'Page not found | BCNAirportTaxi' },
  description: 'This page does not exist. Book a fixed-price Barcelona airport transfer from the home page.',
};
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
          <p className="font-mono text-6xl font-bold text-gold">404</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold">Page not found</h1>
          <p className="mt-3 text-dim">
            The page you were looking for does not exist.
          </p>
          {/*
            A plain anchor, deliberately. `global-not-found` is served without
            the app router above it, so `next/link` would attach client router
            machinery to the one page built to skip app rendering entirely —
            and a full navigation is what we want anyway, to leave the 404 and
            enter the locale tree properly.
          */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/en"
            className="wave mt-8 rounded-lg bg-gold px-5 py-3 font-display font-extrabold text-void"
          >
            Back to home
          </a>
        </div>
      </body>
    </html>
  );
}
