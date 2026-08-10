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

    const buf = await sharp(src)
      .resize(1200, 800, { fit: 'contain', background: BACKDROP })
      .png({ quality: 82, compressionLevel: 9, effort: 8 })
      .toBuffer();

    await writeFile(path.join(OUT, job.out), buf);
    console.log(`  ${job.label.padEnd(30)} -> ${job.out} (${(buf.length / 1024).toFixed(0)} KB)`);
  }

  // Hero: the V-Class, cropped wide and darkened by the overlay in the page.
  const heroSrc = path.join(SRC, 'Gemini_Generated_Image_ns1sknns1sknns1s-clean.png');
  if (await exists(heroSrc)) {
    const hero = await sharp(heroSrc)
      .resize(1600, 900, { fit: 'cover', position: 'centre' })
      .png({ quality: 70, compressionLevel: 9, effort: 8 })
      .toBuffer();
    await writeFile(path.join(OUT, 'hero-banner.png'), hero);
    console.log(`  Hero banner                    -> hero-banner.png (${(hero.length / 1024).toFixed(0)} KB)`);
  }

  // Logo: trim the transparent margin so it can be sized precisely in the nav.
  const logoSrc = path.join(SRC, 'bcnairporttaxi logo.png');
  if (await exists(logoSrc)) {
    const logo = await sharp(logoSrc)
      .trim()
      .resize({ height: 96, withoutEnlargement: true })
      .png({ compressionLevel: 9, effort: 8 })
      .toBuffer();
    const meta = await sharp(logo).metadata();
    await writeFile(path.join(OUT, 'logo.png'), logo);
    console.log(
      `  Logo                           -> logo.png (${(logo.length / 1024).toFixed(0)} KB, ${meta.width}x${meta.height})`,
    );

    // Larger copy for social cards and the app icon source.
    const logoLarge = await sharp(logoSrc)
      .trim()
      .resize({ height: 320, withoutEnlargement: true })
      .png({ compressionLevel: 9, effort: 8 })
      .toBuffer();
    await writeFile(path.join(OUT, 'logo-large.png'), logoLarge);
    console.log(`  Logo (large)                   -> logo-large.png (${(logoLarge.length / 1024).toFixed(0)} KB)`);
  } else {
    console.error('  MISSING logo: bcnairporttaxi logo.png');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
