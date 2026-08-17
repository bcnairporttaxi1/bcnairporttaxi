# Vercel configuration change required

Phase 0 moved the Next.js application from the repository root into
`apps/web/`. **One Vercel dashboard setting must change before this branch is
merged, and it is a manual step.**

Documented here before being applied, per the Phase 0 brief. **Nothing has been
deployed and production is untouched.**

## The change

| Setting | Current | Required |
|---|---|---|
| Root Directory | *(empty — repository root)* | `apps/web` |

Everything else stays as it is: framework preset, region, environment
variables, domains, DNS.

Where to change it: **Vercel → Project → Settings → Build and Deployment →
Root Directory**.

## Why it is needed

Vercel builds from the Root Directory. After the migration the repository root
holds only a workspace manifest — no `next` dependency, no `next.config.ts`, no
`src/`. Left as-is, framework detection finds nothing to build.

Pointing it at `apps/web` puts Vercel where the app now lives. Vercel still
installs from the repository root because it detects the workspace via
`package-lock.json`, and it clones the whole repository, so `prisma/` at the
root remains reachable.

## Verified locally

Building from inside `apps/web`, exactly as Vercel will:

```
$ cd apps/web && npm run build:ci
✔ Generated Prisma Client (7.9.1)
✓ Compiled successfully
✓ Generating static pages (580/580)
exit 0
```

Prisma resolves the root schema through `--config ../../prisma.config.ts`,
whose paths are anchored to the config file rather than the working directory
precisely so this works from either location.

Route manifest compared before and after the migration: **102 routes before,
102 after, identical set, identical rendering modes** (23 dynamic, 6 static,
54 SSG).

## Order of operations — this matters

1. Merge `phase-0-foundation` into `main`
2. **Immediately** change Root Directory to `apps/web`
3. Redeploy

Steps 1 and 2 must be close together. A push to `main` triggers an automatic
build, and between the merge and the setting change that build **will fail** —
the repository root no longer looks like a Next.js app.

A failed build does not take the site down: Vercel keeps serving the last
successful deployment. But the window should be minutes, not hours.

### Safer alternative

Change the Root Directory setting *first*, while `main` still has the old
layout. The setting is ignored until a build actually needs it, so it is
harmless in advance — and then the merge deploys cleanly with no failure window
at all. **This is the recommended order.**

## Rollback

If the deployment misbehaves:

1. Vercel → Deployments → promote the last known-good build. Instant, no rebuild.
2. Revert Root Directory to empty.
3. `git revert` the merge, or reset `main` to the `pre-phase-0` tag.

No migration ran, so there is nothing to unwind in the database.

## Preview builds on this branch

While `phase-0-foundation` exists with the Root Directory still unset, Vercel
preview builds for the branch **will fail**. That is expected and harmless —
previews do not affect production. The failure disappears once the setting is
changed.
