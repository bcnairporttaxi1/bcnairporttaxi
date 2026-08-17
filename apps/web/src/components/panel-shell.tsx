import { Link } from '@/i18n/navigation';
import { logout } from '@/app/[locale]/(auth)/actions';

export interface PanelTab {
  href: string;
  label: string;
}

/** Shared chrome for the admin, driver and customer panels. */
export function PanelShell({
  title,
  subtitle,
  userName,
  locale,
  tabs = [],
  activeHref,
  children,
}: {
  title: string;
  subtitle?: string;
  userName: string;
  locale: string;
  tabs?: PanelTab[];
  activeHref?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b border-white/10 bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-porcelain sm:text-4xl">
                {title}
              </h1>
              {subtitle && <p className="mt-2 text-porcelain/65">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-porcelain/60">{userName}</span>
              <form action={logout}>
                <input type="hidden" name="locale" value={locale} />
                <button
                  type="submit"
                  className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-porcelain transition hover:bg-white/10"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>

          {tabs.length > 0 && (
            <nav aria-label="Panel sections" className="mt-7">
              <ul className="flex flex-wrap gap-1.5">
                {tabs.map((tab) => {
                  const active = tab.href === activeHref;
                  return (
                    <li key={tab.href}>
                      <Link
                        href={tab.href}
                        aria-current={active ? 'page' : undefined}
                        className={`inline-block rounded-lg px-4 py-2 text-sm font-semibold transition ${
                          active
                            ? 'bg-accent text-ink'
                            : 'text-porcelain/70 hover:bg-white/8 hover:text-porcelain'
                        }`}
                      >
                        {tab.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
    </>
  );
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-900',
  CONFIRMED: 'bg-green-100 text-green-900',
  ASSIGNED: 'bg-blue-100 text-blue-900',
  EN_ROUTE: 'bg-indigo-100 text-indigo-900',
  COMPLETED: 'bg-slate-200 text-slate-800',
  CANCELLED: 'bg-red-100 text-red-900',
  PAID: 'bg-green-100 text-green-900',
  FAILED: 'bg-red-100 text-red-900',
  REFUNDED: 'bg-slate-200 text-slate-800',
};

export function StatusPill({ value }: { value: string }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${
        STATUS_STYLES[value] ?? 'bg-slate-200 text-slate-800'
      }`}
    >
      {value.replace('_', ' ')}
    </span>
  );
}
