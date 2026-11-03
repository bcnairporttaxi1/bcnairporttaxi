# Technical SEO report

Sources: full crawl of 451 production URLs (2026-11-03), the `seo-technical` and `seo-sitemap` agents, and a re-crawl of 461 URLs on a local production build of this branch.

## Confirmed healthy (no action)
- **Status codes**: 451/451 URLs return 200 after following redirects; 11 redirects (10 x `/{locale}/book-online` -> `/book` at 308, `/` -> `/en` at 307); no chain longer than one hop; **0 broken internal links**.
- **Crawlability**: `robots.txt` allows search and AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Bingbot); blocks only `/api/`, `/admin`, `/account`, `/driver`. References the sitemap.
- **Sitemap**: valid XML, 364 URLs (433 KB, limits are 50,000 / 50 MB). Every URL returns 200, is indexable, is self-canonical, and its `xhtml:link` hreflang set equals the on-page set. All 87 crawled-but-unlisted URLs are deliberate (noindex account/booking/install/reviews pages, the `book-online` redirects, non-English legal pages, `/`).
- **Indexability**: 375 indexable, 76 deliberately noindex (`/account`, `/find-booking`, `/install`, `/reviews`, and non-English legal pages). Unknown URLs return 404 + noindex. `?utm=` variants canonicalise to the clean URL.
- **Redirect hygiene**: http -> https, www -> apex and trailing slash all 308.
- **Titles and descriptions**: 0 missing; every non-Chinese title 30-60 characters and description 120-160 (Chinese judged by width); exactly one H1 per page.
- **Hreflang**: 11 tags on 411 pages (10 locales + `x-default`), 2 on the 40 English-only legal pages; `zh-Hans`; no HTTP `Link` hreflang header.
- **Social cards**: `og:image` present on every indexable page.
- **Security headers**: HSTS preload, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy.
- **Rendering**: content is server-rendered (about 10.6k visible characters on `/en`); hashed chunks cached a year.
- **Schema**: 0 parse errors across 451 URLs (see `schema-validation-report.md`).

## Findings
| # | Finding | Severity | Status |
|---|---|---|---|
| 1 | `og:locale` invalid (`en`, `es`, `zh-Hans`) | Medium | **Fixed** (batch 1) |
| 2 | `/img` and `/icons` not cached (`max-age=0`) | Medium | **Fixed** (batch 1) |
| 3 | HTML is heavy: `/en` is 501 KB uncompressed (about 260 KB RSC payload + 118 KB inlined CSS) | Medium | Open (`performance-report.md`) |
| 4 | Mixed-case paths return 200 (`/en/Book`) | Low | Open: canonical is lowercase |
| 5 | CSP allows `unsafe-inline` / `unsafe-eval` | Low | Open (security) |
| 6 | `/` and `/EN` redirect with 307 | Low | Accepted: locale negotiation |
| 7 | `Access-Control-Allow-Origin: *` on HTML | Low | Open |
| 8 | `robots.txt` `Host:` directive ignored by Google | Info | Left |
| 9 | Non-composited animation (WhatsApp button `bottom` transition) | Medium | **Fixed** (batch 2) |
| 10 | The price page had no price in its text | High | **Fixed** (batch 2) |
| 11 | New `cruise-port-taxi` page was an orphan until linked | Medium | **Fixed** (batch 5): 0 orphans in the final crawl |

## Before / after crawl
| | Before (production) | After (branch build) |
|---|---|---|
| URLs crawled | 451 | 461 (+10: the cruise-port page x 10 locales) |
| Indexable pages | 375 | 385 |
| Sitemap URLs | 364 | 374 |
| HTTP 200 | 451 | 461 |
| Broken internal links | 0 | 0 |
| Sitemap pages with 0 inbound links | 0 (+ `/`, a redirect) | 0 (+ `/`, a redirect) |
| Titles / descriptions out of range (non-zh) | 0 / 0 | 0 / 0 |
| Pages without exactly one H1 | 0 | 0 |
| Indexable words (sum) | 302,939 | 313,350 |
| JSON-LD parse errors | 0 | 0 |

The "canonical != self" lines in the after-crawl output are an artefact: the local build's canonicals name `bcnairporttaxi.es`, the crawl host is `localhost`.
`img alt` count of 20 is the decorative hero (`alt=""`, `aria-hidden`) on `/book` in 10 locales, which is correct.
