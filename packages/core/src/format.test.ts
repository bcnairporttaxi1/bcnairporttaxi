import { describe, expect, it } from 'vitest';
import { dateIn, eurIn } from './format';

/**
 * These formatters take a locale straight off the URL, so a malformed tag is
 * reachable input rather than a theoretical one.
 *
 * `Intl` throws a RangeError on a tag it cannot parse. Unmatched paths with a
 * dot in them — `/ads.txt`, `/wp-config.php`, every vulnerability scanner's
 * first guess — skip the proxy's locale handling and match the `[locale]`
 * segment instead, so the locale arrived here as "ads.txt" and the price
 * formatter took the whole response down with a 500. The layout's own
 * unknown-locale check returns a 404, but a child component formats a price
 * while that check is still resolving, and the throw won.
 */
describe('locale-aware formatters survive a bad tag', () => {
  const BAD = [
    'ads.txt',
    'wp-config.php',
    '.env',
    'foo bar',
    '',
    '..',
    'en_US', // underscore is not a valid separator in a BCP 47 tag
    'a',
    '🙂',
  ];

  it('formats money rather than throwing', () => {
    for (const tag of BAD) {
      expect(() => eurIn(tag)(45.2), tag).not.toThrow();
      // Still a euro amount, whatever the tag was.
      expect(eurIn(tag)(45.2), tag).toMatch(/45[.,]20/);
    }
  });

  it('formats dates rather than throwing', () => {
    const when = new Date('2026-07-15T13:00:00+02:00');
    for (const tag of BAD) {
      expect(() => dateIn(tag)(when), tag).not.toThrow();
      expect(dateIn(tag)(when), tag).toMatch(/2026/);
    }
  });

  it('still honours the locales we actually publish', () => {
    // English puts the symbol first, Spanish and French put it last. If this
    // ever stops being true the fallback has swallowed a real locale.
    expect(eurIn('en')(45.2)).toMatch(/^€/);
    expect(eurIn('es')(45.2)).toMatch(/€$/);
    expect(eurIn('fr')(45.2)).toMatch(/€$/);
  });

  it('gives Chinese an explicit script subtag', () => {
    // Bare `zh` lets the runtime pick the Han script, which differs between
    // environments; the mapping to zh-Hans must survive tag canonicalisation.
    expect(() => eurIn('zh')(45.2)).not.toThrow();
    expect(eurIn('zh')(45.2)).toMatch(/45[.,]20/);
  });

  it('renders dates on Barcelona time regardless of the host zone', () => {
    // 13:00 in Barcelona is the pickup time wherever the reader is.
    expect(dateIn('en', 'timeOnly')(new Date('2026-07-15T13:00:00+02:00'))).toContain('1:00');
  });
});
