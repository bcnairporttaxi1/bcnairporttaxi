import type { PanelTab } from '@/components/panel-shell';

export const ADMIN_TABS: PanelTab[] = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/rides', label: 'Rides' },
  { href: '/admin/revenue', label: 'Revenue' },
  { href: '/admin/drivers', label: 'Drivers' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/withdrawals', label: 'Payouts' },
  { href: '/admin/reports', label: 'Reports' },
  { href: '/admin/reviews', label: 'Ratings' },
];
