/**
 * Writes brand-consistent placeholder artwork into /public/img/.
 *
 * These are committed so the site is always complete, even before
 * `npm run gen:images` has produced real photography (or while the Gemini
 * project has no image quota). Deliberately styled — ink black with the amber
 * accent — so a placeholder never reads as a broken image.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'img');

const INK = '#0E0E10';
const GRAPHITE = '#202027';
const AMBER = '#F5B301';

/** Simple side-profile taxi silhouette, scaled to the viewbox. */
function carGlyph(x: number, y: number, s: number, roofBox: boolean) {
  return `
    <g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${AMBER}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
      <path d="M20 96 L40 58 Q46 48 60 48 L168 48 Q182 48 190 58 L214 92" />
      <path d="M8 96 L232 96 Q244 96 244 108 L244 124 Q244 132 234 132 L206 132" />
      <path d="M62 132 L178 132" />
      <path d="M34 132 L6 132 Q-4 132 -4 124 L-4 108 Q-4 96 8 96" />
      <circle cx="48" cy="132" r="17" />
      <circle cx="192" cy="132" r="17" />
      <path d="M112 48 L112 96" stroke-width="4" opacity="0.6" />
      ${roofBox ? `<rect x="96" y="26" width="48" height="18" rx="4" fill="${AMBER}" stroke="none"/>` : ''}
    </g>`;
}

function fleetSvg(label: string, roofBox = true): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${GRAPHITE}"/>
      <stop offset="100%" stop-color="${INK}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="62%" r="52%">
      <stop offset="0%" stop-color="${AMBER}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${AMBER}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect width="1200" height="800" fill="url(#glow)"/>
  <ellipse cx="600" cy="612" rx="330" ry="26" fill="#000" opacity="0.45"/>
  ${carGlyph(480, 400, 1.0, roofBox)}
  <text x="600" y="700" text-anchor="middle" fill="#FAF8F3" opacity="0.92"
        font-family="Segoe UI, Inter, system-ui, sans-serif" font-size="38" font-weight="700">${label}</text>
  <text x="600" y="742" text-anchor="middle" fill="#6B6B72"
        font-family="Segoe UI, Inter, system-ui, sans-serif" font-size="22">Photography pending — run npm run gen:images</text>
</svg>`;
}

function heroSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-label="Black and yellow Barcelona taxi at El Prat airport at dusk">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0A0A0C"/>
      <stop offset="55%" stop-color="#1B1B22"/>
      <stop offset="100%" stop-color="${INK}"/>
    </linearGradient>
    <radialGradient id="dusk" cx="50%" cy="78%" r="60%">
      <stop offset="0%" stop-color="${AMBER}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${AMBER}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#sky)"/>
  <rect width="1600" height="900" fill="url(#dusk)"/>
  <g fill="#0B0B0E" opacity="0.85">
    <rect x="90"  y="470" width="120" height="220"/>
    <rect x="240" y="410" width="90"  height="280"/>
    <rect x="360" y="500" width="140" height="190"/>
    <rect x="1120" y="440" width="110" height="250"/>
    <rect x="1260" y="500" width="150" height="190"/>
    <path d="M1440 690 L1440 470 L1490 400 L1540 470 L1540 690 Z"/>
  </g>
  <rect x="0" y="686" width="1600" height="214" fill="#0C0C0F"/>
  <g stroke="${AMBER}" stroke-width="4" opacity="0.35">
    <path d="M0 800 L1600 800" stroke-dasharray="70 60"/>
  </g>
  <ellipse cx="800" cy="742" rx="330" ry="24" fill="#000" opacity="0.5"/>
  ${carGlyph(680, 540, 1.0, true)}
</svg>`;
}

const FILES: Array<[string, string]> = [
  ['hero-banner.svg', heroSvg()],
  ['fleet-toyota-prius.svg', fleetSvg('Toyota Prius+')],
  ['fleet-toyota-corolla.svg', fleetSvg('Toyota Corolla')],
  ['fleet-mercedes-vito.svg', fleetSvg('Mercedes Vito')],
  ['fleet-mercedes-vclass.svg', fleetSvg('Mercedes V-Class')],
];

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const [name, body] of FILES) {
    await writeFile(path.join(OUT, name), body, 'utf8');
    console.log(`wrote public/img/${name}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
