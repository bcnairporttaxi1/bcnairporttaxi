/**
 * Rasterises the PWA app icons and the favicon from one SVG source.
 * Run with `npx tsx scripts/make-icons.ts` after changing the mark.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.join(process.cwd(), 'public', 'icons');

const INK = '#0E0E10';
const AMBER = '#F5B301';

/**
 * @param inset padding as a fraction of the canvas. Maskable icons need the
 * mark inside the safe zone so a circular OS mask cannot crop it.
 */
function markSvg(size: number, inset: number): string {
  const pad = size * inset;
  const inner = size - pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${INK}"/>
  <g transform="translate(${pad} ${pad}) scale(${inner / 100})">
    <rect x="6" y="8" width="88" height="84" rx="18" fill="${AMBER}"/>
    <g fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M26 46 L32 32 Q34 28 39 28 L61 28 Q66 28 68 32 L74 46"/>
      <path d="M20 46 H80 Q84 46 84 51 V63 Q84 66 81 66 H74"/>
      <path d="M38 66 H62"/>
      <path d="M26 66 H19 Q16 66 16 63 V51 Q16 46 20 46"/>
      <circle cx="32" cy="66" r="6"/>
      <circle cx="68" cy="66" r="6"/>
    </g>
  </g>
</svg>`;
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const targets: Array<[string, number, number]> = [
    ['icon-192.png', 192, 0.08],
    ['icon-512.png', 512, 0.08],
    // ~20% inset keeps the mark within the maskable safe zone.
    ['maskable-512.png', 512, 0.2],
    ['apple-touch-icon.png', 180, 0.08],
  ];

  for (const [name, size, inset] of targets) {
    const png = await sharp(Buffer.from(markSvg(size, inset))).png().toBuffer();
    await writeFile(path.join(OUT, name), png);
    console.log(`wrote public/icons/${name} (${size}px)`);
  }

  // Favicon: a single 32px PNG served as /icon.png via the app directory.
  const fav = await sharp(Buffer.from(markSvg(64, 0.06))).png().toBuffer();
  await writeFile(path.join(process.cwd(), 'src', 'app', 'icon.png'), fav);
  console.log('wrote src/app/icon.png');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
