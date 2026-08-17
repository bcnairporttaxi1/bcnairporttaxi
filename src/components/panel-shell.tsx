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
      className="p-nav-item"
    >
      <span className="truncate">{tab.label}</span>
      {tab.count !== undefined && tab.count > 0 && (
        <span className="shrink-0 rounded-full bg-[var(--p-gold)] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0a0a0b]">
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
    <div className="panel min-h-screen lg:flex">
      {/* Rail — fixed on desktop, out of the way and always available */}
      {flat.length > 0 && (
        <aside className="shrink-0 border-b p-hairline bg-[var(--p-surface)] lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <div className="hidden items-center gap-2.5 px-5 py-5 lg:flex">
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--p-gold)] font-display text-sm font-extrabold text-[#0a0a0b]"
            >
              B
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-extrabold tracking-wide">
                BCNAIRPORTTAXI
              </span>
              <span className="block text-[10px] uppercase tracking-wider p-faint">
                Operations
              </span>
            </span>
          </div>

          {/* Desktop: vertical grouped rail */}
          <nav aria-label="Sections" className="hidden px-3 pb-6 lg:block">
            {nav.map((group) => (
              <div key={group.label} className="mb-5">
                {group.label && (
                  <p className="px-3 pb-1.5 font-mono text-[10px] uppercase tracking-wider p-faint">
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
        <header className="sticky top-0 z-20 border-b p-hairline bg-[rgb(10_10_11/88%)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 lg:px-8">
            <div className="min-w-0">
              <h1 className="truncate font-display text-xl font-extrabold leading-tight">
                {title}
              </h1>
              {subtitle && <p className="mt-0.5 truncate text-sm p-muted">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-3">
              {actions}
              <span className="hidden text-sm p-muted sm:inline">{userName}</span>
              <form action={logout}>
                <input type="hidden" name="locale" value={locale} />
                <button type="submit" className="p-btn p-btn-ghost">
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

/**
 * Status colours for a dark surface.
 *
 * The previous set was tuned for white cards — pale-100 backgrounds with
 * dark-900 text — and effectively disappeared on near-black. These are tinted
 * fills with a bright foreground, which is the same idea inverted.
 */
const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-[rgb(251_191_36/14%)] text-[#fbbf24]',
  CONFIRMED: 'bg-[rgb(74_222_128/14%)] text-[#4ade80]',
  ASSIGNED: 'bg-[rgb(96_165_250/14%)] text-[#60a5fa]',
  EN_ROUTE: 'bg-[rgb(129_140_248/16%)] text-[#a5b4fc]',
  ARRIVED: 'bg-[rgb(192_132_252/16%)] text-[#d8b4fe]',
  ON_BOARD: 'bg-[rgb(45_212_191/16%)] text-[#5eead4]',
  COMPLETED: 'bg-[rgb(255_255_255/8%)] text-[#b8b8c0]',
  CANCELLED: 'bg-[rgb(248_113_113/14%)] text-[#f87171]',
  PAID: 'bg-[rgb(74_222_128/14%)] text-[#4ade80]',
  FAILED: 'bg-[rgb(248_113_113/14%)] text-[#f87171]',
  REFUNDED: 'bg-[rgb(255_255_255/8%)] text-[#b8b8c0]',
  REQUESTED: 'bg-[rgb(251_191_36/14%)] text-[#fbbf24]',
  APPROVED: 'bg-[rgb(96_165_250/14%)] text-[#60a5fa]',
  REJECTED: 'bg-[rgb(248_113_113/14%)] text-[#f87171]',
  OPEN: 'bg-[rgb(248_113_113/14%)] text-[#f87171]',
  REVIEWING: 'bg-[rgb(251_191_36/14%)] text-[#fbbf24]',
  RESOLVED: 'bg-[rgb(74_222_128/14%)] text-[#4ade80]',
  DISMISSED: 'bg-[rgb(255_255_255/8%)] text-[#8b8b95]',
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
        STATUS_STYLES[value] ?? 'bg-[rgb(255_255_255/8%)] text-[#b8b8c0]'
      }`}
    >
      {STATUS_LABELS[value] ?? value.replace(/_/g, ' ').toLowerCase()}
    </span>
  );
}
