import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { config as loadEnv } from 'dotenv';
import { defineConfig } from 'prisma/config';

/**
 * Prisma configuration for the workspace.
 *
 * The schema stays at the repository root because it is a contract shared by
 * every workspace, not the website's private property. That means these
 * commands get invoked from more than one working directory — the root for
 * local migrations, `apps/web` during the Vercel build — so every path here is
 * resolved from this file's own location rather than from the caller's CWD.
 */
const here = dirname(fileURLToPath(import.meta.url));

// Secrets live in one .env at the root, shared by all workspaces.
loadEnv({ path: join(here, '.env'), quiet: true });

export default defineConfig({
  schema: join(here, 'prisma', 'schema.prisma'),
  migrations: {
    path: join(here, 'prisma', 'migrations'),
  },
  datasource: {
    url: process.env['DATABASE_URL'],
  },
});
