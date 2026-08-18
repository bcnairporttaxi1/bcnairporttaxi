/**
 * Imports the supplied Barcelona taxi photographs into public/img.
 *
 * Source files arrive at mixed sizes and aspect ratios. Every fleet card
 * renders 3:2, so each is letterboxed onto a 1200x800 canvas in the same
 * near-black used by the source backdrops — the seam is invisible and the cars
 * keep their proportions rather than being cropped.
 *
 * Run once after dropping new photos in: `npx tsx scripts/import-fleet-photos.ts`
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.join(process.env.USERPROFILE ?? process.env.HOME ?? '', 'Downloads');
const OUT = path.join(process.cwd(), 'public', 'img');

/** Matches the dark studio backdrop in the source photographs. */
const BACKDROP = { r: 8, g: 8, b: 10, alpha: 1 };

/** Source filename of the brand logo in the Downloads folder. */
const LOGO_FILE = 'ChatGPT Image Aug 10, 2026, 04_34_16 PM.png';

/** Every fleet card renders 3:2. */
const CANVAS = { w: 1200, h: 800 };
/** Width every vehicle is scaled to, so all cards show cars at one scale. */
const CAR_TARGET_W = 1010;

interface Job {
  src: string;
  out: string;
  label: string;
}

const FLEET_JOBS: Job[] = [
  {
    src: 'Gemini_Generated_Image_63rdu963rdu963rd-clean.png',
    out: 'fleet-toyota-prius.png',
    label: 'Toyota Prius+',
  },
  {
    src: 'Gemini_Generated_Image_2y8gl72y8gl72y8g-clean.png',
    out: 'fleet-toyota-corolla.png',
    label: 'Toyota Corolla sedan',
  },
  {
    src: 'Gemini_Generated_Image_6dt8qx6dt8qx6dt8-clean.png',
    out: 'fleet-toyota-corolla-estate.png',
    label: 'Toyota Corolla Touring Sports',
  },
  {
    src: 'Gemini_Generated_Image_61ly4l61ly4l61ly-clean.png',
    out: 'fleet-seat-toledo.png',
    label: 'SEAT Toledo',
  },
  {
    src: 'Gemini_Generated_Image_9510in9510in9510-clean.png',
    out: 'fleet-mercedes-vito.png',
    label: 'Mercedes Vito',
  },
  {
    src: 'Gemini_Generated_Image_ns1sknns1sknns1s-clean.png',
    out: 'fleet-mercedes-vclass.png',
    label: 'Mercedes V-Class',
  },
];

/**
 * Scales a source so the vehicle itself occupies a fixed width, then crops to
 * the card canvas centred on the vehicle.
 *
 * Compositing a trimmed cut-out onto a flat fill was the obvious approach and
 * it does not work: these backdrops are vignetted, so any solid colour leaves a
 * visible rectangle. Scaling the whole frame keeps the original gradient
 * continuous while still equalising how large each car appears.
 */
async function normaliseVehicle(src: string): Promise<Buffer> {
  const meta = await sharp(src).metadata();
  const srcW = meta.width ?? CANVAS.w;
  const srcH = meta.height ?? CANVAS.h;

  // Locate the vehicle: trim reports how much flat border it removed.
  const { info } = await sharp(src)
    .trim({ threshold: 18 })
    .toBuffer({ resolveWithObject: true });

  const offsetLeft = -(info.trimOffsetLeft ?? 0);
  const offsetTop = -(info.trimOffsetTop ?? 0);
  const carCentreX = offsetLeft + info.width / 2;
  const carCentreY = offsetTop + info.height / 2;

  // Equalise apparent size by matching vehicle width, not image width.
  const scale = CAR_TARGET_W / info.width;
  const newW = Math.max(CANVAS.w, Math.round(srcW * scale));
  const newH = Math.max(CANVAS.h, Math.round(srcH * scale));

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  const left = clamp(Math.round(carCentreX * scale - CANVAS.w / 2), 0, newW - CANVAS.w);
  const top = clamp(Math.round(carCentreY * scale - CANVAS.h / 2), 0, newH - CANVAS.h);

  return sharp(src)
    .resize(newW, newH, { fit: 'fill' })
    .extract({ left, top, width: CANVAS.w, height: CANVAS.h })
    .png({ quality: 82, compressionLevel: 9, effort: 8 })
    .toBuffer();
}

async function exists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });

  for (const job of FLEET_JOBS) {
    const src = path.join(SRC, job.src);
    if (!(await exists(src))) {
      console.error(`  MISSING ${job.label}: ${job.src}`);
      continue;
    }

    const buf = await normaliseVehicle(src);

    await writeFile(path.join(OUT, job.out), buf);
    console.log(`  ${job.label.padEnd(30)} -> ${job.out} (${(buf.length / 1024).toFixed(0)} KB)`);
  }

  // Hero: the supplied waterfront banner. Shown at full strength behind a
  // directional scrim, so it is encoded as JPEG — a photograph of a sunset
  // compresses far better than PNG and next/image derives AVIF from it anyway.
  const heroSrc = path.join(SRC, 'bcnairporttaxi baner.png');
  if (await exists(heroSrc)) {
    const hero = await sharp(heroSrc)
      .resize(1920, 1080, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 78, mozjpeg: true })
      .toBuffer();
    await writeFile(path.join(OUT, 'hero-banner.jpg'), hero);
    console.log(`  Hero banner                    -> hero-banner.jpg (${(hero.length / 1024).toFixed(0)} KB)`);
  } else {
    console.error('  MISSING hero: bcnairporttaxi baner.png');
  }

  // Logo: trim the flat surround so it can be sized precisely in the nav. The
  // artwork is drawn on near-black, which matches the header, so it is kept as
  // a rectangle rather than being knocked out — a cutout of the glow would
  // leave a grey halo.
  const logoSrc = path.join(SRC, LOGO_FILE);
  if (await exists(logoSrc)) {
    for (const [name, height] of [
      ['logo.png', 120],
      ['logo-large.png', 400],
    ] as const) {
      const out = await sharp(logoSrc)
        .trim({ threshold: 26 })
        .resize({ height, withoutEnlargement: true })
        .png({ compressionLevel: 9, effort: 8 })
        .toBuffer();
      const meta = await sharp(out).metadata();
      await writeFile(path.join(OUT, name), out);
      console.log(
        `  Logo ${String(height).padStart(3)}px                     -> ${name} (${(out.length / 1024).toFixed(0)} KB, ${meta.width}x${meta.height})`,
      );
    }
  } else {
    console.error(`  MISSING logo: ${LOGO_FILE}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
