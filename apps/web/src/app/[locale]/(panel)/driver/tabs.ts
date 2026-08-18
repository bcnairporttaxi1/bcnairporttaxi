import type { PanelTab } from '@/components/panel-shell';

/** A driver has two places to be: the work, and the money. */
export const DRIVER_TABS: PanelTab[] = [
  { href: '/driver', label: 'My trips' },
  { href: '/driver/earnings', label: 'Earnings' },
];
