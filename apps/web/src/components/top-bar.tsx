import { getTranslations } from 'next-intl/server';
import { CONTACT_EMAIL, WHATSAPP_NUMBER, whatsappLink } from '@bcn/core/site';

const TRUST = ['licensed', 'always', 'fleet'] as const;

/**
 * Slim strip above the header.
 *
 * The three claims collapse away below `sm` — on a phone the contact routes are
 * what people reach for, so those keep the space. Phone and WhatsApp are both
 * gated on WHATSAPP_NUMBER: an unset number shows neither rather than a dead
 * link.
 */
export async function TopBar() {
  const t = await getTranslations('topbar');
  const phone = WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : null;

  return (
    <div className="border-b border-line bg-[#08080a] text-[13px] text-dim">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-5 py-2 sm:px-8">
        <ul className="hidden items-center gap-6 sm:flex">
          {TRUST.map((k) => (
            <li key={k} className="flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 flex-none fill-gold">
                <path d="M10 1.7 3 4.6v4.6c0 4.3 3 8.3 7 9.1 4-.8 7-4.8 7-9.1V4.6L10 1.7Zm-1 12L5.6 10.3 7 8.9l2 2 4-4 1.4 1.4L9 13.7Z" />
              </svg>
              {t(k)}
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-5">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label={`${t('emailUs')}: ${CONTACT_EMAIL}`}
            className="flex items-center gap-2 transition-colors duration-500 ease-brand hover:text-gold"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 flex-none fill-current">
              <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h13A1.5 1.5 0 0 1 18 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5v-9Zm2.2.5L10 10.3 15.8 6H4.2Z" />
            </svg>
            <span className="hidden sm:inline">{CONTACT_EMAIL}</span>
          </a>

          {phone && (
            <>
              <a
                href={`tel:${phone}`}
                aria-label={`${t('callUs')}: ${phone}`}
                className="flex items-center gap-2 font-medium text-ice transition-colors duration-500 ease-brand hover:text-gold"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 flex-none fill-current">
                  <path d="M4.3 2.5a1.5 1.5 0 0 1 2.1.3l1.5 2a1.5 1.5 0 0 1-.2 2l-.9.8a9 9 0 0 0 3.6 3.6l.8-.9a1.5 1.5 0 0 1 2-.2l2 1.5a1.5 1.5 0 0 1 .3 2.1l-1 1.3a2 2 0 0 1-2.3.6C8.6 14.2 5.8 11.4 3.4 6.1a2 2 0 0 1 .6-2.3l1.3-1Z" />
                </svg>
                {phone}
              </a>

              <a
                href={whatsappLink(t('waIntro'))}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('whatsapp')}
                className="flex items-center gap-2 font-medium text-ice transition-colors duration-500 ease-brand hover:text-jade"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 flex-none fill-current">
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.2 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1a15 15 0 0 1-6.6-5.8c-.5-.8-.8-1.6-.8-2.4 0-.8.4-1.5.8-1.9.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6a9 9 0 0 0 3.8 3.3c.3.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.4.4 0 .2 0 .8-.2 1.5Z" />
                </svg>
                <span className="hidden md:inline">WhatsApp</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
