# International SEO report

10 locales under `/{locale}/`: en es ca fr de it nl pt ru zh. `localePrefix: 'always'`; `/` redirects 307 to `/en`.

## Verified from the 451-URL crawl (2026-11-03, before this branch)
- Every indexable page carries 11 hreflang tags (10 locales + `x-default` -> `/en`); chinese is `zh-Hans`. The 40 pages with 2 tags are the English-only legal documents (self + `x-default`), by design.
- Self-referencing canonical on every indexable page; `/en/book-online` etc. 308 to `/book` and are absent from the sitemap.
- No HTTP `Link` hreflang header (it contradicted the page before 2026-10-27; `alternateLinks: false`).
- Sitemap `xhtml:link` sets match the on-page sets on all 364 sitemap URLs.
- 0 redirect chains longer than one hop; 0 broken internal links; 0 orphan pages.

## Done on this branch
- `og:locale` was the BCP 47 tag (`en`, `es`, `zh-Hans`), which Open Graph ignores. Now `language_TERRITORY` (`en_GB`, `es_ES`, `ca_ES`, `fr_FR`, `de_DE`, `it_IT`, `pt_PT`, `nl_NL`, `ru_RU`, `zh_CN`) on layout, blog, destination and landing routes; unit-tested.
- New `cruise-port-taxi` page with native copy in all 10 locales (acceptance tests fail if any locale falls back to English).
- Home "Fixed prices" headline/intro rewritten in all 10 locales (the old strings said "Regulated fares" / "real tariff" and contradicted the fixed-price positioning).
- Spanish copy-edit pass (register `tú`, `7,5 %`, typos) — see `completed-fixes.md` for the result.

## Deliberately unchanged
- Legal pages are English-only, `noindex` outside `/en`, canonical to `/en/<page>`: a translated legal text needs human, accountable review.
- All slugs are English under every locale (`/es/pricing`, not `/es/precios`). Localising slugs would be a URL migration with redirects for 364 pages; judged not worth the risk now. Keyword-in-URL for Spanish/Catalan queries is a Medium, not a blocker.

## Open
- `lang`/`inLanguage` and copy quality outside Spanish were audited in the 2026-10-27 pass; a native-speaker read of ca/fr/de/it/nl/pt/ru/zh is still advisable.
- Catalan SERPs are thin and mostly Spanish/English pages (low competition) — a content opportunity, unverified with volume data.
