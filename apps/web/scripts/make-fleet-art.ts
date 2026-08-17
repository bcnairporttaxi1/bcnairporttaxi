/**
 * Generates the hero banner and fleet artwork as PNG.
 *
 * Two reasons these are raster rather than SVG:
 *   1. next/image refuses SVG sources unless `dangerouslyAllowSVG` is set, so
 *      SVG fleet images rendered as empty boxes.
 *   2. PNG lets next/image emit AVIF/WebP variants, which keeps LCP down.
 *
 * Each vehicle gets its own body outline so a Corolla does not look like a
 * Vito. Livery is the Barcelona black-and-yellow: black shell, yellow lower
 * door panel, taxi roof sign.
 *
 * These are illustrations, not photographs. Once the Gemini project has image
 * quota, `npm run gen:images` overwrites them with real photography.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.join(process.cwd(), 'public', 'img');

const INK = '#0E0E10';
const GRAPHITE = '#202027';
const AMBER = '#F5B301';
const AMBER_DEEP = '#E0A000';
const GLASS = '#7FB3D5';

interface CarSpec {
  /** Outline of the body shell, drawn in a 1000x340 local space. */
  body: string;
  /** Greenhouse (window) shapes. */
  windows: string[];
  /** Yellow lower-panel band following the body sides. */
  livery: string;
  /** Wheel centres [x, y] and radius. */
  wheels: Array<[number, number]>;
  wheelR: number;
  /** Roof-sign position. */
  sign: [number, number];
}

/** Toyota Corolla — three-box saloon: long bonnet, notchback boot. */
const COROLLA: CarSpec = {
  body: `M 40 250
    L 60 190 Q 70 172 96 168
    L 250 150 Q 300 96 400 88
    L 610 88 Q 700 96 748 152
    L 900 178 Q 950 190 958 214
    L 966 250 Q 968 268 946 268
    L 60 268 Q 36 268 40 250 Z`,
  windows: [
    'M 288 148 Q 330 108 402 104 L 486 104 L 486 146 Z',
    'M 508 104 L 600 104 Q 676 108 716 150 L 508 146 Z',
  ],
  livery: 'M 62 236 L 946 236 L 950 258 L 58 258 Z',
  wheels: [
    [230, 268],
    [770, 268],
  ],
  wheelR: 62,
  sign: [455, 88],
};

/** Toyota Prius+ — MPV: one-box wedge, roofline carried to the tailgate. */
const PRIUS: CarSpec = {
  body: `M 38 246
    L 54 184 Q 62 166 88 160
    L 214 140 Q 268 68 372 58
    L 640 58 Q 760 66 826 140
    L 930 168 Q 962 180 966 210
    L 970 248 Q 972 268 948 268
    L 58 268 Q 34 268 38 246 Z`,
  windows: [
    'M 252 138 Q 296 82 372 76 L 470 76 L 470 134 Z',
    'M 492 76 L 596 76 L 600 134 L 492 134 Z',
    'M 622 76 L 640 76 Q 726 82 790 136 L 622 134 Z',
  ],
  livery: 'M 60 232 L 950 232 L 954 256 L 56 256 Z',
  wheels: [
    [212, 268],
    [790, 268],
  ],
  wheelR: 62,
  sign: [430, 58],
};

/** Mercedes Vito — panel-van proportions: tall, flat face, upright tail. */
const VITO: CarSpec = {
  body: `M 34 232
    L 44 128 Q 50 96 86 90
    L 150 82 Q 196 34 288 30
    L 852 30 Q 908 34 924 76
    L 946 150 Q 970 166 972 206
    L 974 248 Q 976 268 950 268
    L 54 268 Q 30 268 34 232 Z`,
  windows: [
    'M 186 122 Q 220 60 292 54 L 372 54 L 372 118 Z',
    'M 396 54 L 540 54 L 540 118 L 396 118 Z',
    'M 564 54 L 712 54 L 712 118 L 564 118 Z',
    'M 736 54 L 846 54 Q 886 58 896 96 L 736 118 Z',
  ],
  livery: 'M 52 214 L 956 214 L 960 244 L 48 244 Z',
  wheels: [
    [206, 268],
    [812, 268],
  ],
  wheelR: 66,
  sign: [500, 30],
};

/** Mercedes V-Class — longer, softer nose, deeper glass than the Vito. */
const VCLASS: CarSpec = {
  body: `M 30 236
    L 40 132 Q 46 98 84 90
    L 142 80 Q 190 26 292 22
    L 866 22 Q 926 28 942 74
    L 962 150 Q 986 168 988 208
    L 990 250 Q 992 268 964 268
    L 50 268 Q 26 268 30 236 Z`,
  windows: [
    'M 180 124 Q 216 52 296 46 L 380 46 L 380 120 Z',
    'M 404 46 L 556 46 L 556 120 L 404 120 Z',
    'M 580 46 L 736 46 L 736 120 L 580 120 Z',
    'M 760 46 L 860 46 Q 904 52 914 92 L 760 120 Z',
  ],
  livery: 'M 48 216 L 972 216 L 976 246 L 44 246 Z',
  wheels: [
    [212, 268],
    [826, 268],
  ],
  wheelR: 68,
  sign: [520, 22],
};

function wheel(cx: number, cy: number, r: number): string {
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#0a0a0c"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.62}" fill="#2a2a31"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.5}" fill="#4a4a55"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.16}" fill="#1a1a1f"/>`;
}

function carSvg(spec: CarSpec, label: string, sublabel: string): string {
  const wheels = spec.wheels.map(([x, y]) => wheel(x, y, spec.wheelR)).join('');
  const windows = spec.windows
    .map((d) => `<path d="${d}" fill="url(#glass)" opacity="0.9"/>`)
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${GRAPHITE}"/>
      <stop offset="100%" stop-color="${INK}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="58%" r="55%">
      <stop offset="0%" stop-color="${AMBER}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${AMBER}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="shell" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a3a44"/>
      <stop offset="42%" stop-color="#15151a"/>
      <stop offset="100%" stop-color="#0b0b0e"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${GLASS}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#1b3a4d" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="yellow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${AMBER}"/>
      <stop offset="100%" stop-color="${AMBER_DEEP}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect width="1200" height="800" fill="url(#glow)"/>

  <!-- ground shadow -->
  <ellipse cx="600" cy="620" rx="420" ry="30" fill="#000" opacity="0.55"/>

  <g transform="translate(100 270)">
    ${wheels}
    <path d="${spec.body}" fill="url(#shell)" stroke="#43434f" stroke-width="2"/>
    <path d="${spec.livery}" fill="url(#yellow)"/>
    ${windows}
    <!-- taxi roof sign -->
    <rect x="${spec.sign[0]}" y="${spec.sign[1] - 26}" width="90" height="26" rx="6" fill="url(#yellow)"/>
    <!-- lamps -->
    <rect x="20" y="196" width="34" height="18" rx="7" fill="#fff3c4" opacity="0.92"/>
    <rect x="944" y="196" width="30" height="16" rx="7" fill="#ff5a4a" opacity="0.85"/>
    ${wheels}
  </g>

  <text x="600" y="700" text-anchor="middle" fill="#FAF8F3"
        font-family="Segoe UI, Inter, system-ui, sans-serif" font-size="40" font-weight="700">${label}</text>
  <text x="600" y="742" text-anchor="middle" fill="#9A9AA2"
        font-family="Segoe UI, Inter, system-ui, sans-serif" font-size="23">${sublabel}</text>
</svg>`;
}

function heroSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#08080A"/>
      <stop offset="52%" stop-color="#1A1A21"/>
      <stop offset="100%" stop-color="${INK}"/>
    </linearGradient>
    <radialGradient id="dusk" cx="50%" cy="72%" r="62%">
      <stop offset="0%" stop-color="${AMBER}" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="${AMBER}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="shell2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a3a44"/>
      <stop offset="45%" stop-color="#141419"/>
      <stop offset="100%" stop-color="#0a0a0d"/>
    </linearGradient>
    <linearGradient id="glass2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${GLASS}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#16323f" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="yellow2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${AMBER}"/>
      <stop offset="100%" stop-color="${AMBER_DEEP}"/>
    </linearGradient>
  </defs>

  <rect width="1600" height="900" fill="url(#sky)"/>
  <rect width="1600" height="900" fill="url(#dusk)"/>

  <!-- Barcelona skyline, softly behind -->
  <g fill="#0A0A0D" opacity="0.9">
    <rect x="60"  y="470" width="120" height="230"/>
    <rect x="205" y="405" width="86"  height="295"/>
    <rect x="315" y="500" width="140" height="200"/>
    <rect x="1140" y="440" width="104" height="260"/>
    <rect x="1270" y="505" width="150" height="195"/>
    <path d="M1455 700 L1455 470 L1502 392 L1549 470 L1549 700 Z"/>
    <g opacity="0.55">
      <rect x="236" y="430" width="8" height="8" fill="${AMBER}"/>
      <rect x="256" y="470" width="8" height="8" fill="${AMBER}"/>
      <rect x="1166" y="480" width="8" height="8" fill="${AMBER}"/>
      <rect x="1300" y="540" width="8" height="8" fill="${AMBER}"/>
    </g>
  </g>

  <!-- terminal canopy -->
  <path d="M0 640 L1600 640 L1600 664 L0 664 Z" fill="#101014"/>
  <rect x="0" y="664" width="1600" height="236" fill="#0B0B0F"/>
  <g stroke="${AMBER}" stroke-width="5" opacity="0.28">
    <path d="M0 812 L1600 812" stroke-dasharray="78 62"/>
  </g>

  <ellipse cx="800" cy="742" rx="400" ry="28" fill="#000" opacity="0.6"/>

  <g transform="translate(300 402) scale(1.0)">
    ${wheel(230, 268, 62)}
    ${wheel(770, 268, 62)}
    <path d="${COROLLA.body}" fill="url(#shell2)" stroke="#45454f" stroke-width="2"/>
    <path d="${COROLLA.livery}" fill="url(#yellow2)"/>
    ${COROLLA.windows.map((d) => `<path d="${d}" fill="url(#glass2)" opacity="0.9"/>`).join('')}
    <rect x="455" y="62" width="90" height="26" rx="6" fill="url(#yellow2)"/>
    <rect x="20" y="196" width="34" height="18" rx="7" fill="#fff3c4"/>
    <rect x="944" y="196" width="30" height="16" rx="7" fill="#ff5a4a" opacity="0.85"/>
    ${wheel(230, 268, 62)}
    ${wheel(770, 268, 62)}
  </g>

  <!-- headlight throw -->
  <path d="M300 600 L110 660 L110 700 L300 636 Z" fill="${AMBER}" opacity="0.10"/>
</svg>`;
}

const FLEET_ART: Array<[string, string, CarSpec, string]> = [
  ['fleet-toyota-prius.png', 'Toyota Prius+', PRIUS, 'Eco hybrid taxi · 4 passengers · 4 bags'],
  ['fleet-toyota-corolla.png', 'Toyota Corolla', COROLLA, 'Standard taxi · 4 passengers · 3 bags'],
  ['fleet-mercedes-vito.png', 'Mercedes Vito', VITO, 'Minivan taxi · 6 passengers · 6 bags'],
  ['fleet-mercedes-vclass.png', 'Mercedes V-Class', VCLASS, 'Premium van taxi · 7 passengers · 7 bags'],
];

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const [file, label, spec, sub] of FLEET_ART) {
    const svg = carSvg(spec, label, sub);
    const png = await sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer();
    await writeFile(path.join(OUT, file), png);
    console.log(`wrote public/img/${file} (${(png.length / 1024).toFixed(0)} KB)`);
  }

  // The hero renders at 40% opacity behind the headline, so it is effectively
  // a dark backdrop. Palette quantisation costs nothing visible there and cuts
  // the LCP payload by roughly 5x.
  const hero = await sharp(Buffer.from(heroSvg()))
    .resize(1280, 720)
    .png({ palette: true, quality: 70, compressionLevel: 9, effort: 10 })
    .toBuffer();
  await writeFile(path.join(OUT, 'hero-banner.png'), hero);
  console.log(`wrote public/img/hero-banner.png (${(hero.length / 1024).toFixed(0)} KB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
