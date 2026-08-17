import { Link } from '@/i18n/navigation';
import { logout } from '@/app/[locale]/(auth)/actions';

export interface PanelTab {
  href: string;
  label: string;
  /** Optional count badge — unread work, not decoration. */
  count?: number;
}

export interface PanelGroup {
  label: string;
  items: PanelTab[];
}

/**
 * Application chrome for the admin, driver and customer panels.
 *
 * Previously this was a marketing page header: a tall dark hero, a large
 * title, and a row of pills. It made every panel read as another page of the
 * website rather than as a tool, and it spent the top third of the viewport
 * saying something the operator already knew.
 *
 * A dashboard is returned to dozens of times a day, so navigation is
 * persistent and out of the way — a fixed rail on the left, a slim bar on top
 * — and the content starts at the top of the screen where the work is.
 *
 * Grouping in the rail is by what the sections are *for* (operations, money,
 * people), because that is how someone decides where to go. Counts sit on the
 * items that represent work waiting to be done, and nowhere else.
 */

function NavLink({ tab, active }: { tab: PanelTab; active: boolean }) {
  return (
    <Link
      href={tab.href}
      aria-current={active ? 'page' : undefined}
      className={`group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition ${
        active
          ? 'bg-accent font-bold text-ink'
          : 'font-medium text-porcelain/70 hover:bg-white/10 hover:text-porcelain'
      }`}
    >
      <span className="truncate">{tab.label}</span>
      {tab.count !== undefined && tab.count > 0 && (
        <span
          className={`shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-bold ${
            active ? 'bg-ink/15 text-ink' : 'bg-accent text-ink'
          }`}
        >
          {tab.count > 99 ? '99+' : tab.count}
        </span>
      )}
    </Link>
  );
}

export function PanelShell({
  title,
  subtitle,
  userName,
  locale,
  tabs = [],
  groups,
  activeHref,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  userName: string;
  locale: string;
  /** Flat navigation. Ignored when `groups` is supplied. */
  tabs?: PanelTab[];
  /** Grouped navigation, for panels with enough sections to need headings. */
  groups?: PanelGroup[];
  activeHref?: string;
  /** Page-level controls, rendered in the top bar beside the title. */
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const nav: PanelGroup[] = groups ?? (tabs.length > 0 ? [{ label: '', items: tabs }] : []);
  const flat = nav.flatMap((g) => g.items);

  return (
    <div className="min-h-screen bg-porcelain lg:flex">
      {/* Rail — fixed on desktop, out of the way and always available */}
      {flat.length > 0 && (
        <aside className="shrink-0 bg-ink lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:overflow-y-auto">
          <div className="hidden items-center gap-2 px-5 py-5 lg:flex">
            <span className="font-display text-lg font-extrabold text-porcelain">
              BCN<span className="text-accent">AirportTaxi</span>
            </span>
          </div>

          {/* Desktop: vertical grouped rail */}
          <nav aria-label="Sections" className="hidden px-3 pb-6 lg:block">
            {nav.map((group) => (
              <div key={group.label} className="mb-5">
                {group.label && (
                  <p className="px-3 pb-1.5 font-mono text-[10px] uppercase tracking-wider text-porcelain/35">
                    {group.label}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {group.items.map((tab) => (
                    <li key={tab.href}>
                      <NavLink tab={tab} active={tab.href === activeHref} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Mobile: one scrolling strip, no drawer to open */}
          <nav
            aria-label="Sections"
            className="overflow-x-auto px-3 py-2.5 lg:hidden"
          >
            <ul className="flex gap-1.5">
              {flat.map((tab) => (
                <li key={tab.href} className="shrink-0">
                  <NavLink tab={tab} active={tab.href === activeHref} />
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}

      <div className="min-w-0 flex-1">
        {/* Top bar — slim, sticky, everything the page needs to identify itself */}
        <header className="sticky top-0 z-20 border-b border-hairline bg-white/95 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 lg:px-8">
            <div className="min-w-0">
              <h1 className="truncate font-display text-xl font-extrabold leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-0.5 truncate text-sm text-muted">{subtitle}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              {actions}
              <span className="hidden text-sm text-muted sm:inline">{userName}</span>
              <form action={logout}>
                <input type="hidden" name="locale" value={locale} />
                <button
                  type="submit"
                  className="rounded-lg border border-hairline px-3 py-1.5 text-sm font-semibold transition hover:border-ink"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </header>

        <main className="px-5 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-900',
  CONFIRMED: 'bg-green-100 text-green-900',
  ASSIGNED: 'bg-blue-100 text-blue-900',
  EN_ROUTE: 'bg-indigo-100 text-indigo-900',
  // Added with the four-step driver flow. Without these the pills fell through
  // to the neutral default and the two busiest live states looked inert.
  ARRIVED: 'bg-violet-100 text-violet-900',
  ON_BOARD: 'bg-teal-100 text-teal-900',
  COMPLETED: 'bg-slate-200 text-slate-800',
  CANCELLED: 'bg-red-100 text-red-900',
  PAID: 'bg-green-100 text-green-900',
  FAILED: 'bg-red-100 text-red-900',
  REFUNDED: 'bg-slate-200 text-slate-800',
  REQUESTED: 'bg-amber-100 text-amber-900',
  APPROVED: 'bg-blue-100 text-blue-900',
  REJECTED: 'bg-red-100 text-red-900',
  OPEN: 'bg-red-100 text-red-900',
  REVIEWING: 'bg-amber-100 text-amber-900',
  RESOLVED: 'bg-green-100 text-green-900',
  DISMISSED: 'bg-slate-200 text-slate-700',
};

/** Human wording for machine statuses — EN_ROUTE reads badly on a screen. */
const STATUS_LABELS: Record<string, string> = {
  EN_ROUTE: 'On the way',
  ON_BOARD: 'On board',
  ARRIVED: 'At pickup',
};

export function StatusPill({ value }: { value: string }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${
        STATUS_STYLES[value] ?? 'bg-slate-200 text-slate-700'
      }`}
    >
      {STATUS_LABELS[value] ?? value.replace(/_/g, ' ').toLowerCase()}
    </span>
  );
}
