import { getTranslations } from 'next-intl/server';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '@bcn/core/site';

/**
 * Slim trust strip above the header.
 *
 * The three claims collapse away below `sm` — on a phone the contact details
 * are what people actually reach for, so those keep the space.
 */
export async function TopBar() {
  const t = await getTranslations('topbar');

  const phone = WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : null;

  return (
    <div className="border-b border-white/10 bg-graphite text-porcelain/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-4 py-2 text-xs">
        <ul className="hidden items-center gap-6 sm:flex">
          {(['licensed', 'always', 'fleet'] as const).map((k) => (
            <li key={k} className="flex items-center gap-1.5">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-3.5 w-3.5 fill-accent"
              >
                <path d="M10 1.7 3 4.6v4.6c0 4.3 3 8.3 7 9.1 4-.8 7-4.8 7-9.1V4.6L10 1.7Zm-1 12L5.6 10.3 7 8.9l2 2 4-4 1.4 1.4L9 13.7Z" />
              </svg>
              {t(k)}
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-5">
          {/* The label is hidden on the narrowest screens, so the link carries
              an explicit name — otherwise it is an icon with no text at all. */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label={`${t('emailUs')}: ${CONTACT_EMAIL}`}
            className="flex items-center gap-1.5 transition hover:text-accent"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
              <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h13A1.5 1.5 0 0 1 18 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 14.5v-9Zm2.2.5L10 10.3 15.8 6H4.2Z" />
            </svg>
            <span className="hidden sm:inline">{CONTACT_EMAIL}</span>
          </a>

          {phone && (
            <a
              href={`tel:${phone}`}
              aria-label={`${t('callUs')}: ${phone}`}
              className="flex items-center gap-1.5 font-semibold text-porcelain transition hover:text-accent"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
                <path d="M4.3 2.5a1.5 1.5 0 0 1 2.1.3l1.5 2a1.5 1.5 0 0 1-.2 2l-.9.8a9 9 0 0 0 3.6 3.6l.8-.9a1.5 1.5 0 0 1 2-.2l2 1.5a1.5 1.5 0 0 1 .3 2.1l-1 1.3a2 2 0 0 1-2.3.6C8.6 14.2 5.8 11.4 3.4 6.1a2 2 0 0 1 .6-2.3l1.3-1Z" />
              </svg>
              {phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
