import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware replacements for `next/link` and the navigation hooks.
 * Import these everywhere instead of the `next/*` originals so internal links
 * keep the visitor in their current language.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
