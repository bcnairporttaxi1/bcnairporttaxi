# Phase 0 deployment runbook

How to put the monorepo restructure into production without an outage.

Phase 0 is **structural only** — same routes, same prices, same emails, same
database. If anything about the site behaves differently after this deploy,
that is a bug, not an expected consequence.

## Before you start

| | |
|---|---|
| Branch to merge | `phase-0-rebased` |
| Merges into | `main` |
| Production project | Vercel, region `fra1` |
| Database | Neon `eu-central-1`, unchanged by this deploy |
| Expected downtime | None, if steps 2 and 3 happen together |

## The one setting that must change

Vercel builds from its **Root Directory**. After this merge the repository root
holds only a workspace manifest — no `next.config.ts`, no `src/`. Left as it
is, framework detection finds nothing and the build fails.

| Setting | Now | After merge |
|---|---|---|
| Root Directory | *(empty — repository root)* | `apps/web` |

**Do not change it in advance.** Root Directory applies to *every* build,
production included. Changing it before the merge breaks the live site on the
next deploy of `main`.

### Why `vercel.json` moved with the app

`vercel.json` pins functions to `fra1`. It was at the repository root, and
Vercel reads it from the Root Directory — so once that becomes `apps/web`, a
file left at the root would be ignored. Functions would fall back to the
default US region while the database stays in Frankfurt, which is the exact
regression fixed in commit `2df0c84` (664 ms per query, down to 4 ms).

The file now lives at `apps/web/vercel.json`. Nothing to do at deploy time —
but if you ever change the Root Directory again, move it again.

## Sequence

### 1. Verify the branch

```bash
git checkout phase-0-rebased
git status                 # must be clean
npm install
npm run typecheck          # must pass
npm run lint               # must pass
npm run test               # 101 tests
npx prisma validate        # schema valid
npm run build:ci           # must succeed
```

Do not continue if any step fails.

### 2. Merge into main

```bash
git checkout main
git merge --no-ff phase-0-rebased
git push origin main
```

Vercel will start a build immediately, and **that build will fail** — the Root
Directory is still the repository root. This is expected. The currently
deployed version keeps serving traffic; a failed build is not promoted.

### 3. Change the Root Directory — immediately

Vercel → Project → Settings → Build and Deployment → Root Directory →
`apps/web` → Save.

Do this straight after the push. The window between step 2 and step 3 is the
only period where a deploy cannot succeed.

### 4. Trigger a deployment

Vercel → Deployments → the failed build → **Redeploy**. Leave "use existing
build cache" unchecked.

### 5. Monitor the build

Watch for:

- `Detected Next.js version` — proves the framework was found at the new root
- `Generating static pages (580/580)` — the expected count
- `Route (app)` table listing 48 routes

A build that finds no framework means the Root Directory did not save.

### 6. Verify the deployment

```bash
curl -s https://bcnairporttaxi.es/api/health
```

Expect `"status":"ok"`, `"database":"up"`, `"region":"fra1"`, and `"commit"`
matching the merge commit. **Check the commit hash** — a previous deploy in
this project silently kept serving old code, and only the hash revealed it.

If `region` is not `fra1`, `vercel.json` is not being read: confirm it is at
`apps/web/vercel.json`.

### 7. Check the routes

```bash
for p in / /en /en/pricing /en/fleet /en/book /en/faq /en/contact \
         /robots.txt /sitemap.xml /llms.txt; do
  echo "$p -> $(curl -s -o /dev/null -w '%{http_code}' https://bcnairporttaxi.es$p)"
done
```

`/` returns 307 (locale redirect); everything else 200.

Check all ten locales resolve: `/en /es /ca /fr /de /it /nl /pt /ru /zh`.

### 8. Verify booking end to end

1. Open `/en/book`, enter a real pickup and dropoff.
2. Confirm a quote appears with a fare and a booking fee.
3. Complete a booking with a real card, or a SumUp test card if configured.
4. Confirm the confirmation email arrives.
5. Confirm the booking appears in `/en/admin` under **New**.
6. Assign a driver and confirm the driver sees it at `/en/driver`.

This is the check that matters most: it crosses pricing, payment, email,
database and both panels in one pass.

### 9. Verify the database

```bash
npx prisma migrate status   # "Database schema is up to date!"
```

Phase 0 adds no migration. If this reports a pending migration, stop — that is
not from Phase 0.

### 10. Roll back if necessary

Phase 0 changes only how the repository is laid out, so rollback is a Vercel
action, not a database one. **No migration has to be reversed, and no data is
affected.**

**Fastest path — under a minute:**

Vercel → Deployments → the last known-good deployment → **Promote to
Production**. That restores the previous build immediately.

**Then undo the setting**, or the next deploy of `main` will fail again:

1. Vercel → Settings → Root Directory → clear it back to empty.
2. Revert the merge:
   ```bash
   git checkout main
   git revert -m 1 <merge-commit-sha>
   git push origin main
   ```

Order matters: promote first to restore service, then fix the setting, then
revert the code. Reverting the code while the Root Directory still says
`apps/web` produces another failing build.

## What is explicitly not in this deploy

- No API, no `/api/v1` — that is Phase 1
- No mobile app; `@bcn/ui` and `@bcn/api-client` remain empty by design
- No schema change, no migration, no data change
- No UI change: the dark operations panels shipped separately on `main`
