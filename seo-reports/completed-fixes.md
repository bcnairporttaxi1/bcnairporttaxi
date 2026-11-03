# Completed fixes (branch `seo/full-site-optimisation`, 5 commits, nothing deployed)

Every item was verified by the unit/acceptance tests (core 423, web 168, `tsc` clean, `eslint` clean on touched
files), a production build, and a full 461-URL crawl of that build. Items marked (agent) came from a specialist report
and were adjudicated against the code or the live page before being applied.

## Technical
| # | Fix | Evidence it was a real problem | Files |
|---|---|---|---|
| 1 | `og:locale` was `en`/`es`/`zh-Hans` (invalid for Open Graph); now `en_GB`, `es_ES`, `ca_ES`, `fr_FR`, `de_DE`, `it_IT`, `pt_PT`, `nl_NL`, `ru_RU`, `zh_CN` on layout, blog, destination and landing routes; unit-tested for all locales (agent: technical) | live `<meta property="og:locale">` values | `lib/social-card.ts`, 4 route files |
| 2 | `/img/*` and `/icons/*` sent `max-age=0, must-revalidate` (a conditional request per image per visit); now 1 day + 7 days stale-while-revalidate (agent: technical) | live response headers | `next.config.ts` |
| 3 | WhatsApp button was lifted by animating `bottom` (main thread; Lighthouse flagged a non-composited animation); now `transform` (agent: performance) | Lighthouse "1 animated element" = `a.fab` | `globals.css` |
| 4 | Geocode User-Agent quoted a stray `.com` mailbox; now the real `CONTACT_EMAIL` (agent: local) | source | `api/geocode/route.ts` |
| 5 | `/pricing` advertises its Markdown twin via `<link rel="alternate" type="text/markdown">` (agent: geo) | link absent | `pricing/page.tsx` |

## Content and on-page
| # | Fix | Evidence | Files |
|---|---|---|---|
| 6 | The dedicated price page (`/barcelona-airport-taxi-price`, all 10 locales) rendered **no euro amount** in its text. A server-rendered fixed-price table now appears there and on `/airport-to-city`, `/city-to-airport`, `/el-prat-airport-taxi` and `/cruise-port-taxi`; `/pricing` uses the same component (agent: geo; verified 0 -> 6 amounts in the built page) | rendered text of the live page | `components/fixed-price-table.tsx`, `[...slug]/page.tsx`, `pricing/page.tsx` |
| 7 | Home headline/intro said "Regulated fares" and "Real prices from the real tariff" (ES: "Tarifas reguladas", "tarifa real") next to "not the regulated fare" on /pricing. Rewritten as fixed-price wording in all 10 locales; the claims-guard test now fails on those phrases (agents: content, geo) | message catalogue | 10 `messages/*.json`, `landing-claims.test.ts` |
| 8 | **New page `/cruise-port-taxi`** with native copy in 10 locales: the airport/cruise-port route that competitors own with dedicated pages and we had no page for (agent: cluster). Facts come from the tariff and `places.ts` (terminals A-E on the fixed port fare; World Trade Center priced as a city address). Every locale is gated by the length, meta, claims and parity tests | SERP evidence + keyword map | `landing-pages.ts`, 9 `landing-copy/*.ts` |
| 9 | Spanish copy-edit: usted -> tú (31 edits), "precio cerrado" -> "precio fijo" (about 40), "pidenos" -> "pídenos", "pax" -> "plazas" (agent: content) | mixed register in FAQ, pricing, guides | `es.json`, `blog-copy/es.ts`, `destination-copy/es.ts` |
| 10 | Terms said "we do not set fares" and, further down, "the price is set by us". Now consistent (the owner still has to confirm who sets the price) (agent: local) | `legal.ts` | `legal.ts` |
| 11 | Waiting clause: fixed price inside the city (no waiting charge); the meter waiting rate applies only to interurban journeys (owner instruction, 2026-11-01) | owner | `legal.ts` |
| 12 | `pricing.md` did not state our interurban rates (only llms.txt did); it now does, with the Sitges worked example. llms.txt road distance aligned with /pricing (19.6 km) (agent: geo) | the two files disagreed | `pricing.md/route.ts`, `llms.txt/route.ts` |

## Schema
See `schema-validation-report.md` (findings 1, 2, 4 and 5 fixed; 3 partly).

## Internal linking
- Every landing page now links the three guides and the FAQ (they had 1-2 inbound links site-wide; the FAQ had 2).
- `cruise-port-taxi` is linked from the header Services menu and from the related blocks of `airport-to-city`, `city-to-airport`, `el-prat-airport-taxi` and `group-taxi`. It had zero inbound links until fixed; in the final crawl no page is an orphan.
- Crawl comparison: 270 pages gained inbound links; none lost any.

## Already done earlier (2026-10-27/28, live)
hreflang self and return tags, `zh-Hans`, removal of the contradicting HTTP `Link` header, native non-English destination pages / guides / landing pages, `/book-online` 308, `/install` noindex, inline CSS (render-blocking removed), price consistency fixes.
