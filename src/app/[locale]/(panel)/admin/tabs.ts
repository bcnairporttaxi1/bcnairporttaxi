import type { PanelGroup } from '@/components/panel-shell';

/**
 * Admin navigation, grouped by what each section is for rather than listed
 * flat. Eight equal items is a menu to read; three labelled groups is a menu
 * to scan.
 *
 * Counts are supplied by the page that knows them, and only ever on items
 * representing work waiting to be done.
 */
export function adminNav(counts: {
  needsDriver?: number;
  payouts?: number;
  reports?: number;
  ratings?: number;
} = {}): PanelGroup[] {
  return [
    {
      label: 'Operations',
      items: [
        { href: '/admin', label: 'Dispatch', count: counts.needsDriver },
        { href: '/admin/rides', label: 'All rides' },
      ],
    },
    {
      label: 'Money',
      items: [
        { href: '/admin/revenue', label: 'Revenue' },
        { href: '/admin/withdrawals', label: 'Payouts', count: counts.payouts },
      ],
    },
    {
      label: 'People',
      items: [
        { href: '/admin/drivers', label: 'Drivers' },
        { href: '/admin/users', label: 'Users' },
        { href: '/admin/reports', label: 'Reports', count: counts.reports },
        { href: '/admin/reviews', label: 'Ratings', count: counts.ratings },
      ],
    },
  ];
}

/** Flat list for pages that do not need the counts. */
export const ADMIN_TABS = adminNav().flatMap((g) => g.items);
