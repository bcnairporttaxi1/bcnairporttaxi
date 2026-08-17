# Credential audit

Prepared in Phase 0. **No secret values appear in this document, and none were
printed during the audit.** Variable names, purposes and rotation advice only.

## Repository hygiene — clean

| Check | Result |
|---|---|
| Live credentials in tracked files | **None** |
| `.env` tracked by git | **No** — ignored by `.gitignore:34` (`.env*`) |
| `.env.example` contents | Placeholders and public URLs only |
| Live credentials in git history | **None** |

The only credential-shaped strings anywhere in history are documentation
placeholders (`postgresql://user:password@…`) inside vendored skill files, and
the CI stub `postgresql://ci:ci@localhost:5432/ci`. Neither is real.

**Nothing needs to be purged from git history.**

## Inventory

| Variable | Purpose | Where used | Reaches browser | Rotate |
|---|---|---|---|---|
| `DATABASE_URL` | Neon connection string | `lib/db.ts`, Prisma CLI, scripts | No | **Yes** |
| `AUTH_SECRET` | Signs session JWTs | `lib/auth.ts` | No | **Yes** |
| `RESEND_API_KEY` | Transactional email | `lib/email.ts` | No | **Yes** |
| `RESEND_FROM` | Verified sending identity | `lib/email.ts` | No | No — not a secret |
| `SUMUP_API_KEY` | Creates payment checkouts | `lib/payments/sumup.ts` | No | **Yes** |
| `SUMUP_MERCHANT_CODE` | Merchant identifier | `lib/payments/sumup.ts` | No | No — identifier, not a secret |
| `NOMINATIM_BASE_URL` | Geocoding endpoint | `api/geocode` | No | No |
| `OSRM_BASE_URL` | Routing endpoint | `api/quote`, `api/bookings`, checkout | No | No |
| `GEMINI_API_KEY_1..3` | Build-time image generation | `scripts/` only | No | **Yes** |
| `NEXT_PUBLIC_SITE_URL` | Canonicals, sitemap, email links | Throughout | **Yes, by design** | No |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Contact CTAs | Throughout | **Yes, by design** | No |
| `VERCEL_TOKEN` | Deployment automation | `scripts/sync-vercel-env.ts` | No | **Yes** |
| `VERCEL_PROJECT_ID` | Project identifier | `scripts/sync-vercel-env.ts` | No | No |

## Rotation recommended

Several credentials were **shared in plaintext during development conversation**
while the project was being built. They are not in the repository, but they have
existed outside a secret manager and should be treated as compromised:

| Credential | Reason | Priority |
|---|---|---|
| `DATABASE_URL` (Neon) | Shared in plaintext | **High** — full data access |
| `SUMUP_API_KEY` | Shared in plaintext | **High** — can create charges |
| `AUTH_SECRET` | Shared in plaintext | **High** — forges any session |
| GitHub personal access token | Shared in plaintext | **High** — repository write |
| Vercel tokens | Shared in plaintext | **High** — deployment control |
| `RESEND_API_KEY` (original) | Shared in plaintext; also **superseded** — it belonged to a different Resend account than the verified domain | Medium — already replaced, old key should be revoked |
| `GEMINI_API_KEY_1..3` | Shared in plaintext | Low — build-time only |

### Rotating `AUTH_SECRET` has a user-visible effect

Every existing session cookie is signed with the current value. Changing it
**logs every signed-in user out immediately**. With one admin account and no
customer accounts in production, the cost today is one re-login — which makes
now the cheapest moment this will ever be. It gets more expensive with every
customer who registers.

## Notes for the mobile phases

Two rules that must hold once apps exist, recorded here so they are decided in
advance rather than discovered:

1. **Anything prefixed `EXPO_PUBLIC_` is compiled into the app bundle** and is
   readable by anyone who downloads the app. No API key may ever carry that
   prefix. Geo provider keys stay server-side and are proxied.

2. **Mobile tokens go in `expo-secure-store`** (Keychain / Keystore), never
   `AsyncStorage`, which is unencrypted disk.

## Outstanding, not fixed in Phase 0

- **Admin has no second factor.** One password protects all passenger data,
  account suspension and payout approval.
- **No secret manager.** Values live in the Vercel dashboard and a local `.env`,
  with no rotation schedule or audit trail.
