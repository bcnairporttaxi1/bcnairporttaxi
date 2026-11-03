# Complete website audit: bcnairporttaxi.es

Date: 2026-11-03. Scope: whole site, 10 languages. Business type: local service (airport / cruise-port taxi booking, an intermediary, fixed prepaid prices).

## How the audit was run
1. Full crawl: sitemap + link discovery, 451 production URLs, one record each (`page-by-page-audit.csv`).
2. Eleven specialist agents from the installed Universal SEO skill, run in parallel and read-only: `seo-technical`, `seo-content`, `seo-schema`, `seo-sitemap`, `seo-geo` (with the `ai-seo` guidance), `seo-performance`, `seo-local`, `seo-backlinks`, `seo-cluster`, `seo-sxo`, `seo-flow`. The `/seo hreflang` skill and the crawl covered international SEO.
3. Not run, and why: `seo-google` (no Google API credentials), `seo-maps` and `seo-dataforseo` (no DataForSEO MCP), `seo-ecommerce` (not an e-commerce site), `seo-visual` and `seo-drift` (no baseline target needed once the crawl existed; the crawl JSONL is the baseline), `seo-image-gen` (not requested). `/seo programmatic`, `competitor-pages` and the other marketing sub-skills were not applicable to the fixes made.
4. Every agent finding was checked against the code or the live page before being acted on. Several were wrong or imprecise and were dropped or corrected (for example "the hero image has no alt text" is a decorative `alt=""` hero; "Spanish pages are usted-only" was half true).
5. Fixes were made on branch `seo/full-site-optimisation`, tested after each batch, and verified by re-crawling a local production build.

## Limits (stated plainly)
- **No Search Console, GA4, CrUX or PageSpeed API access.** All performance numbers are lab data; no ranking, click or conversion data was available beyond the owner's 2026-10-24 export (13 clicks, about 3,300 impressions, Spanish pages 55% of impressions at average position about 80).
- **No keyword volumes and no backlink counts.** Neither is shown or estimated.
- SERP evidence is from web-search snippets (US index), so it is directional.
- The after-crawl is a local production build of the branch, not a deployed site.
- I did not make bookings or payments and did not touch checkout, SumUp, email, WhatsApp, analytics or tracking code.

## Findings summary
The technical foundation is sound: 0 broken links, 0 orphans, complete hreflang, valid sitemap, in-range metadata, correct noindex handling, server-rendered content. The remaining ranking gap is not technical. A domain first indexed on 2026-09-03 competes for head terms against marketplaces and guide sites with years of authority. What the audit found fixable on-site is in `completed-fixes.md`; what needs the owner is in `outstanding-issues.md`.

Highest-impact on-site items found and fixed:
1. The page meant to own price searches had no price in its text (fixed, five pages).
2. The home page called the price "regulated fares" / "the real tariff", contradicting the product and /pricing (fixed, 10 locales).
3. No page for the airport <-> cruise-port route that competitors rank with (new page, 10 locales).
4. Invalid `og:locale`, duplicate/misleading Service schema on destination pages, uncached images.
5. Guides and FAQ nearly unlinked from the rest of the site (fixed).

Highest-impact items that cannot be fixed in code: legal entity and Google Business Profile, real reviews, backlinks, Google API access (`outstanding-issues.md`, `backlink-opportunities.md`).

## Reports in this folder
`technical-seo-report.md`, `page-by-page-audit.csv`, `keyword-mapping.csv`, `content-improvements.csv`, `international-seo-report.md`, `schema-validation-report.md`, `internal-linking-report.csv`, `backlink-opportunities.md`, `performance-report.md`, `completed-fixes.md`, `outstanding-issues.md`, `before-and-after-summary.md`.
