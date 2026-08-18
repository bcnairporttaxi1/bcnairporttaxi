# Environments

Prepared in Phase 0 as a specification. **Nothing was provisioned and production
was not touched.** Today there is exactly one environment — production — which
is why verification scripts have been run against live data.

## Why this has to change before mobile

A web fix is deployed and rolled back in minutes. A mobile build takes ~20
minutes and store review can take days, so "test it in production" stops being
a shortcut and becomes the only path. Without staging, that means test bookings,
test charges and test push notifications landing in real customer data.

Neon's database branching makes the database side of this genuinely cheap.

## Development

| | |
|---|---|
| Database | Neon branch `dev`, branched from `main` |
| Web | `localhost:3000` via `npm run dev` |
| Payments | SumUp stub — `createCheckout` already falls back when keys are absent |
| Email | Console logging, or Resend to a personal inbox |
| Push | Expo Go, development tokens |
| Secrets | Root `.env`, gitignored |

## Staging

| | |
|---|---|
| Database | Neon branch `staging` — schema identical to production, data disposable |
| Web | `staging.bcnairporttaxi.es` (Vercel preview or a second project) |
| Payments | SumUp **sandbox** credentials |
| Email | Resend, restricted to an internal test inbox |
| Push | EAS `preview` builds, TestFlight and Play internal testing |
| Secrets | Vercel environment scoped to preview |
| Indexing | `robots.txt` must disallow everything — a staging copy of a ten-locale SEO site is a duplicate-content problem |

## Production

| | |
|---|---|
| Database | Neon `main`, `eu-central-1` |
| Web | `bcnairporttaxi.es`, Vercel, `fra1` |
| Payments | SumUp live — merchant `MC9KDVYQ` |
| Email | Resend from `bookings@bcnairporttaxi.es` |
| Push | EAS `production`, App Store and Play releases |
| Secrets | Vercel production environment |

## Promotion path

```
feature branch ──▶ Vercel preview ──▶ staging ──▶ production
                   (per PR)           (manual)     (merge to main)
```

Migrations run automatically on deploy in every environment. Because mobile
clients cannot be force-updated, **every migration must stay backward-compatible
with app versions still in the wild** — additive changes only, and anything
destructive split across two releases.

## Not provisioned yet

Setting up staging is Phase 2 work, deliberately deferred so Phase 0 changes
nothing operational. What it needs:

- A Neon `staging` branch
- A Vercel project or environment pointed at it
- SumUp sandbox credentials
- A DNS record for `staging.bcnairporttaxi.es`
- A `robots.txt` rule blocking indexing on that host

**NOT CONFIRMED — needs verification:** whether the Neon plan includes database
branching at the current tier, and whether SumUp issues sandbox credentials for
this merchant account.
