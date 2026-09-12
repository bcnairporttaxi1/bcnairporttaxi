import { TopBar } from '@/components/top-bar';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CookieBanner } from '@/components/cookie-banner';
import { WhatsAppFab } from '@/components/whatsapp-fab';
import { setRequestLocale } from 'next-intl/server';

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
 *
 * setRequestLocale here is not optional. The header, footer and WhatsApp
 * button are server components that call getTranslations() without a
 * locale; when this layout did not pin the locale, next-intl found it by
 * reading the request headers instead, which opted every public page —
 * the homepage, pricing, all four hundred landing pages — out of static
 * rendering. The build still printed 'Generating static pages (600/600)'
 * and then kept seven of them; production served the rest from a Frankfurt
 * function on every request, with Cache-Control: private, no-store.
 */
export default async function SiteLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const { children } = props;
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
