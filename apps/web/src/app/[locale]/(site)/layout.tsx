import { TopBar } from '@/components/top-bar';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CookieBanner } from '@/components/cookie-banner';
import { WhatsAppFab } from '@/components/whatsapp-fab';

/**
 * The public website: marketing, booking funnel, legal, blog.
 *
 * This chrome used to sit in the locale layout, which meant the admin, driver
 * and customer panels rendered inside it — a dashboard wearing a marketing
 * header, a language switcher, a "Book online" call to action and a full
 * sitemap footer. Confining it to this route group is what lets the panels
 * look like tools.
 *
 * Route groups do not appear in URLs, so every public path is unchanged.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <SiteHeader accountHref="/account" />
      <main id="main">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
      <CookieBanner />
    </>
  );
}
