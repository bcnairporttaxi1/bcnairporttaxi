# Current state — captured before the Phase 0 migration

Recorded at commit `e10e8e5`, tagged `pre-phase-0`, immediately before converting
the single-package repository into an npm workspaces monorepo.

This file exists so that "did the migration change anything?" is answerable by
comparison rather than memory. **No secret values appear here — variable names
only.**

## Toolchain

| | Version |
|---|---|
| Node | v24.15.0 |
| npm | 11.12.1 |
| Next.js | 16.3.0 |
| React / React DOM | 19.2.8 |
| TypeScript | 5.9.3 |
| Prisma / @prisma/client | 7.9.1 |
| next-intl | 4.13.5 |
| Tailwind CSS | 4.3.3 |
| Vitest | 4.1.10 |

## Baseline verification

All checks green before any file was moved:

| Check | Result |
|---|---|
| `tsc --noEmit` | PASS |
| `eslint src` | PASS — 0 problems |
| `vitest run` | 95 passed / 95 |
| `prisma validate` | VALID |
| `next build` | PASS |

Route manifest: **102 route entries, 580 static pages generated.**
Live sitemap: **420 URLs.**
Tracked files: **429**, of which **145** under `src/`.

## Git

| | |
|---|---|
| Branch at capture | `main` |
| HEAD | `e10e8e5` |
| Remote | in sync with `origin/main` |
| Working tree | clean |
| Rollback tag | `pre-phase-0` |
| Feature branch | `phase-0-foundation` |

## Scripts (before migration)

```
dev              next dev
build            prisma generate && prisma migrate deploy && next build
build:ci         prisma generate && next build
start            next start
lint             eslint
test             vitest run
db:migrate       prisma migrate dev
db:deploy        prisma migrate deploy
db:seed          tsx prisma/seed.ts
db:studio        prisma studio
admin            tsx scripts/create-admin.ts
admin:reset      tsx --env-file=.env scripts/reset-admin-password.ts
verify:payment   tsx scripts/verify-payment-flow.ts
verify:rides     tsx --env-file=.env scripts/verify-ride-flow.ts
verify:emails    tsx --env-file=.env scripts/verify-emails.ts
seo:audit        tsx scripts/seo-audit.ts
```

`build` and `build:ci` differ deliberately: Vercel applies migrations on deploy,
CI has no database to migrate.

## Vercel configuration

`vercel.json`:

```json
{ "regions": ["fra1"] }
```

Frankfurt is pinned because it was measured, not assumed — the default `iad1`
gave a 664 ms database round trip against Neon in `eu-central-1`; `fra1` gives
4 ms.

`next.config.ts` sets seven security headers, AVIF/WebP image formats, image
qualities `[60, 75]`, and wraps the config in the next-intl plugin. It also
declares headers for `/sw.js`, which does not exist — see Risks in the Phase 0
report.

**NOT CONFIRMED** — Vercel dashboard settings beyond `vercel.json` (root
directory, build command override, function limits, cron) cannot be read from
the repository. The root directory setting matters for this migration and is
flagged in the report.

## Prisma configuration

`prisma.config.ts` points at `prisma/schema.prisma` with migrations in
`prisma/migrations`, and loads `DATABASE_URL` via `dotenv`.

The `datasource` block declares **no url** — Prisma 7 requires a driver adapter,
and `@prisma/adapter-neon` supplies the connection at runtime.

10 models, 9 enums, 5 applied migrations. Schema unchanged by Phase 0.

## Database

Neon PostgreSQL, region `eu-central-1`, accessed through the Neon serverless
driver adapter. One database serving every client — the architecture forbids a
second.

## Environment variables — names only

### Server-side (never reach the browser)

| Name | Purpose |
|---|---|
| `DATABASE_URL` | Neon connection string |
| `AUTH_SECRET` | JWT signing key for session cookies |
| `RESEND_API_KEY` | Transactional email |
| `RESEND_FROM` | Verified sending identity |
| `SUMUP_API_KEY` | Payment checkout creation |
| `SUMUP_MERCHANT_CODE` | Merchant identifier |
| `NOMINATIM_BASE_URL` | Geocoding endpoint override |
| `OSRM_BASE_URL` | Routing endpoint override |
| `GEMINI_API_KEY_1..3` | Build-time image generation only, not runtime |

### Public (compiled into the client bundle by design)

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonicals, sitemap, email links |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Contact CTAs |

### Platform-injected

`VERCEL_GIT_COMMIT_SHA`, `VERCEL_REGION` — read by `/api/health`.
`VERCEL_TOKEN`, `VERCEL_PROJECT_ID` — used by an operational script, not the app.

## Structure before migration

```
bcnairporttaxi/
├── prisma/          schema.prisma, migrations/
├── public/          static assets
├── scripts/         15 operational scripts
├── src/
│   ├── app/         35 pages, 6 API routes, 4 server-action files
│   ├── components/  29 components
│   ├── generated/   Prisma client output (gitignored)
│   ├── i18n/        routing, request config
│   ├── lib/         23 modules — mixed portable and server-only
│   └── messages/    10 locale catalogues
├── package.json     single package, no workspaces
└── vercel.json
```
