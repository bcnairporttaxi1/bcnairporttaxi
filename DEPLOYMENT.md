# Deployment

## What this runs on, and why not Docker

Next.js on Vercel, Postgres on Neon. There is deliberately no Dockerfile and no
Kubernetes manifest: the app compiles to serverless functions plus static
assets, and Vercel's build already produces that artefact. Containerising it
would mean running a Node server we would then have to scale, monitor and patch
ourselves, to get less than the platform gives for free — no preview
deployments, no automatic edge caching, no zero-config rollback.

If the app ever outgrows that (long-running jobs, websockets, sustained CPU),
the honest move is a container platform, not a Dockerfile bolted onto this.

```
Visitor ──▶ Vercel edge ──▶ proxy.ts (locale routing)
                              │
                              ├─▶ static / SSG pages          (cached at edge)
                              └─▶ server components & routes  (eu-west, near Neon)
                                          │
                                          ├─▶ Neon Postgres   (eu-central-1)
                                          ├─▶ SumUp           (payments)
                                          ├─▶ Resend          (email)
                                          └─▶ Nominatim/OSRM  (geocode/route)
```

Functions run in Europe on purpose: the database is in `eu-central-1`, and
every panel page makes several round trips to it. Serving them from the US
would add roughly 100 ms per query, which the ride panel would multiply.

## Deployment flow

1. Push to `main`.
2. GitHub Actions runs types, lint, tests and a build. **A red run does not
   block the Vercel deploy** — Vercel builds from the same push independently.
   Treat a red CI as "roll back", not "it did not ship".
3. Vercel builds: `prisma generate && prisma migrate deploy && next build`.
4. The new deployment goes live once the build succeeds.

Migrations run during the build rather than by hand. Before this, a schema
change would deploy code against the old database and fail at runtime — the
kind of outage that is obvious in hindsight and invisible beforehand.

## Migrations

`prisma migrate dev` is interactive and will not run here. To add one:

```bash
# 1. Edit prisma/schema.prisma, then generate the SQL
mkdir -p prisma/migrations/$(date +%Y%m%d%H%M%S)_your_change
npx prisma migrate diff \
  --from-config-datasource \
  --to-schema prisma/schema.prisma \
  --script -o prisma/migrations/<that folder>/migration.sql

# 2. Read the SQL. Look for DROP, and for NOT NULL added to a populated table.
# 3. Apply
npx prisma migrate deploy
```

Additive changes are safe to deploy before the code that uses them. Destructive
ones need two deploys: stop reading the column, ship, then drop it.

## Monitoring

`GET /api/health` returns 200 with `{status, database, databaseMs, commit,
region}` or **503** when Neon is unreachable. Point an uptime monitor at it and
alert on the status code.

It deliberately does not check SumUp or Resend. A payment provider having a bad
afternoon should not turn our health check red, because an alert that cries
wolf gets muted, and then the real one does too.

Suggested alerts:

| Condition | Meaning |
|---|---|
| `/api/health` returns 503 twice in a row | Database unreachable — the site cannot take bookings |
| `databaseMs` above ~500 ms sustained | Neon under load or a missing index |
| Vercel function error rate above 1% | Check the function logs for the failing route |
| No bookings for an unusual stretch | Silent breakage in the quote or checkout path |

Application errors currently go to `console.error` and land in Vercel's logs,
which are searchable but not alertable. Wiring Sentry is the obvious next step
and is not done.

## Domain

`bcnairporttaxi.es` — registered and DNS-hosted at IONOS (`ui-dns.*`
nameservers). The apex `A` record points to Vercel's `76.76.21.21`; SSL is
issued and renewed by Vercel automatically.

IONOS also runs email on this domain (`mx00/mx01.ionos.es`). **Never move the
nameservers away from IONOS without recreating those MX records first** —
that is where `bookings@` lives.

Sending and receiving are deliberately split:

- **Outbound** goes through Resend, authenticated on the `send.` subdomain
  (`resend._domainkey` TXT, `send` TXT for SPF, `send` MX). None of it touches
  the root, so the mailbox is unaffected.
- **Inbound** stays with IONOS on the root MX records.

Do **not** enable Resend's "Enable Receiving". It adds an MX on `@` at priority
9, which outranks the IONOS records at priority 10 — every message would go to
Resend instead of the mailbox, and nothing in this app reads inbound mail. If
programmatic inbound is ever wanted, put it on a subdomain.

`www.bcnairporttaxi.es` is attached to the project but has no DNS record yet.
To enable it, add at IONOS:

```
Type: CNAME    Host: www    Value: cname.vercel-dns.com
```

Vercel then redirects `www` to the apex on its own.

## Before going live

- [x] `NEXT_PUBLIC_SITE_URL` set to the real domain — canonicals, `og:url`, the
      sitemap and every email link derive from it
- [x] Domain pointed at Vercel and added in the project
- [ ] `AUTH_SECRET` is a real 32-byte random value, not a placeholder
- [x] `RESEND_FROM` on a verified domain, not `onboarding@resend.dev`
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` is the real number
- [ ] SumUp key is live rather than sandbox, merchant code correct
- [ ] `npm run verify:payment` passes against production credentials
- [ ] `npm run verify:rides` passes
- [ ] `npm run seo:audit` clean
- [ ] An admin account exists and its password has been rotated off the
      generated one

## Rolling back

Vercel keeps every deployment. Promote the previous one from the dashboard —
it is instant and needs no rebuild.

**Migrations do not roll back with it.** If the bad deploy included a schema
change, the previous code runs against the new schema. Additive migrations are
fine here, which is the practical reason to prefer them.
