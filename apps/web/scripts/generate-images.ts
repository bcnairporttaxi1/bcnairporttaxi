/**
 * Build-time image generation — run manually with `npm run gen:images`.
 *
 * Generates the hero banner and the four fleet photos once, writes them to
 * /public/img/, and commits them. Nothing here runs per request: the site
 * always serves static optimized assets so Core Web Vitals stay clean.
 *
 * Re-run whenever you want fresh imagery. Existing files are only overwritten
 * on a successful generation, so a quota-exhausted run leaves the committed
 * images untouched.
 */
import 'dotenv/config';
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { generateImageWithFailover } from '../src/lib/gemini';

const OUT_DIR = path.join(process.cwd(), 'public', 'img');

/** Shared across all four fleet shots so the set reads as one photo shoot. */
const FLEET_STYLE_SUFFIX =
  'taxi, 3/4 front view, soft golden-hour light, clean neutral studio-street background, ' +
  'shallow depth of field, professional photorealistic automotive photography, ' +
  'no text, no logos, no watermarks, no license plate text.';

interface ImageSpec {
  file: string;
  prompt: string;
  label: string;
}

const IMAGES: ImageSpec[] = [
  {
    file: 'hero-banner.png',
    label: 'Hero banner',
    prompt:
      'Cinematic wide banner, an iconic black-and-yellow Barcelona taxi arriving at ' +
      'El Prat airport at dusk, dramatic dark background with warm amber lighting, ' +
      'Barcelona skyline softly in the background, shallow depth of field, ' +
      'premium editorial automotive photography, no text, no logos, no watermarks.',
  },
  {
    file: 'fleet-toyota-prius.png',
    label: 'Toyota Prius+ (eco hybrid)',
    prompt: `Photorealistic Toyota Prius+ black and yellow Barcelona ${FLEET_STYLE_SUFFIX}`,
  },
  {
    file: 'fleet-toyota-corolla.png',
    label: 'Toyota Corolla (standard)',
    prompt: `Photorealistic Toyota Corolla sedan black and yellow Barcelona ${FLEET_STYLE_SUFFIX}`,
  },
  {
    file: 'fleet-mercedes-vito.png',
    label: 'Mercedes Vito (minivan)',
    prompt: `Photorealistic Mercedes-Benz Vito passenger van black and yellow Barcelona ${FLEET_STYLE_SUFFIX}`,
  },
  {
    file: 'fleet-mercedes-vclass.png',
    label: 'Mercedes V-Class (premium van)',
    prompt: `Photorealistic Mercedes-Benz V-Class premium van black and yellow Barcelona ${FLEET_STYLE_SUFFIX}`,
  },
];

async function exists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  let generated = 0;
  let skipped = 0;

  for (const spec of IMAGES) {
    const dest = path.join(OUT_DIR, spec.file);
    process.stdout.write(`Generating ${spec.label} -> ${spec.file}\n`);

    try {
      const buf = await generateImageWithFailover(spec.prompt);
      await writeFile(dest, buf);
      generated++;
      console.log(`  ok (${(buf.length / 1024).toFixed(0)} KB)`);
    } catch (err) {
      skipped++;
      const kept = (await exists(dest)) ? 'keeping existing file' : 'NO FILE PRESENT';
      console.error(`  failed: ${(err as Error).message}`);
      console.error(`  -> ${kept}`);
    }
  }

  console.log(`\nDone. ${generated} generated, ${skipped} failed/skipped.`);
  if (skipped > 0) {
    console.log(
      'Failures are non-fatal: the build serves whatever is committed in public/img/.',
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
