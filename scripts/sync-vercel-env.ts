/**
 * Pushes environment variables from a local .env file into a Vercel project.
 *
 * Usage:
 *   VERCEL_TOKEN=... VERCEL_PROJECT_ID=... npx tsx scripts/sync-vercel-env.ts
 *
 * Existing variables of the same key+target are replaced (upsert), so re-running
 * after rotating a credential is safe. Values are never printed.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const TOKEN = process.env.VERCEL_TOKEN;
const PROJECT = process.env.VERCEL_PROJECT_ID;

if (!TOKEN || !PROJECT) {
  console.error('Set VERCEL_TOKEN and VERCEL_PROJECT_ID.');
  process.exit(1);
}

/** Keys that must never be uploaded even if present locally. */
const SKIP = new Set<string>();

/** Overrides applied on top of the .env values, for production-only settings. */
const OVERRIDES: Record<string, string> = {};
for (const arg of process.argv.slice(2)) {
  const eq = arg.indexOf('=');
  if (eq > 0) OVERRIDES[arg.slice(0, eq)] = arg.slice(eq + 1);
}

function parseEnv(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

async function main() {
  const text = await readFile(path.join(process.cwd(), '.env'), 'utf8');
  const vars = { ...parseEnv(text), ...OVERRIDES };

  const targets = ['production', 'preview', 'development'];
  let ok = 0;
  let skipped = 0;

  for (const [key, value] of Object.entries(vars)) {
    if (SKIP.has(key) || value === '') {
      console.log(`  skip   ${key} (empty or excluded)`);
      skipped++;
      continue;
    }

    const res = await fetch(
      `https://api.vercel.com/v10/projects/${PROJECT}/env?upsert=true`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key,
          value,
          // NEXT_PUBLIC_* are inlined at build time and are not secret.
          type: key.startsWith('NEXT_PUBLIC_') ? 'plain' : 'encrypted',
          target: targets,
        }),
      },
    );

    if (res.ok) {
      console.log(`  set    ${key}`);
      ok++;
    } else {
      console.error(`  FAILED ${key}: ${res.status} ${await res.text()}`);
    }
  }

  console.log(`\n${ok} set, ${skipped} skipped.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
