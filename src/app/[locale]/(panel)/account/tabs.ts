import type { PanelTab } from '@/components/panel-shell';

/**
 * The customer panel previously had no navigation at all — the password screen
 * was reachable only by being redirected to it.
 */
export const ACCOUNT_TABS: PanelTab[] = [
  { href: '/account', label: 'My bookings' },
  { href: '/account/password', label: 'Password' },
];
