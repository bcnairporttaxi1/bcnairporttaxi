import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * No component may carry a literal euro amount.
 *
 * Twice a drawing on a booking surface kept asserting "€34.44", a meter
 * estimate from before the fixed price list: once in the blog cover (fixed),
 * once in the booking page's step artwork (found only when every amount on the
 * rendered site was compared with the tariff). Prices come from `TARIFFS` or
 * the quote engine; a figure typed into JSX is a figure that outlives the next
 * tariff change. Comment lines are ignored.
 */
const dir = join(__dirname);
const files = readdirSync(dir).filter((f) => f.endsWith('.tsx'));

describe('components carry no literal prices', () => {
  it.each(files)('%s', (f) => {
    const hits: string[] = [];
    for (const [i, line] of readFileSync(join(dir, f), 'utf8').split('\n').entries()) {
      const code = line.trim();
      if (code.startsWith('*') || code.startsWith('//') || code.startsWith('/*')) continue;
      if (/€\s?\d|\d\s?€|EUR\s?\d/.test(code)) hits.push(`${f}:${i + 1}: ${code.slice(0, 100)}`);
    }
    expect(hits).toEqual([]);
  });
});
