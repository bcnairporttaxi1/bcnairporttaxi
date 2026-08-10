import './globals.css';

/**
 * Fallback for URLs that never reach a locale segment (for example a bad path
 * that the proxy could not prefix). It renders its own document because there
 * is no root layout above it — the locale layout owns `<html>` for the rest of
 * the site.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
          <p className="font-mono text-6xl font-bold text-accent-text">404</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold">Page not found</h1>
          <p className="mt-3 text-muted">
            The page you were looking for does not exist.
          </p>
          <a
            href="/en"
            className="mt-8 rounded-lg bg-accent px-5 py-3 font-display font-extrabold text-ink"
          >
            Back to home
          </a>
        </div>
      </body>
    </html>
  );
}
