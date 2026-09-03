import { getTranslations } from 'next-intl/server';
import { WHATSAPP_NUMBER, whatsappLink } from '@bcn/core/site';

/**
 * Floating WhatsApp action.
 *
 * The top bar carries a WhatsApp link too, but it scrolls away on the first
 * flick and never comes back — and on a phone the top bar hides its label
 * entirely. This is the one contact route that stays reachable from anywhere
 * on the page, which matters most to the person this site is actually for: a
 * traveller whose flight has just moved.
 *
 * Rendered on the server and gated on WHATSAPP_NUMBER, so an unset number
 * ships no button rather than a dead link. It sits at z-55, below the cookie
 * banner's z-60, and the banner raises `--fab-lift` while it is on screen so
 * the two never overlap on a narrow viewport.
 */
export async function WhatsAppFab() {
  if (!WHATSAPP_NUMBER) return null;

  const t = await getTranslations('topbar');

  return (
    <a
      href={whatsappLink(t('waIntro'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp')}
      className="fab"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 flex-none fill-current">
        <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.2 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1a15 15 0 0 1-6.6-5.8c-.5-.8-.8-1.6-.8-2.4 0-.8.4-1.5.8-1.9.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6a9 9 0 0 0 3.8 3.3c.3.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.4.4 0 .2 0 .8-.2 1.5Z" />
      </svg>
      <span className="fab-label text-sm font-bold">{t('whatsapp')}</span>
    </a>
  );
}
