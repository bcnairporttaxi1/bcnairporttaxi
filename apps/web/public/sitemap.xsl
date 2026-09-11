<?xml version="1.0" encoding="UTF-8"?>
<!--
  Human-readable view of /sitemap.xml.

  A sitemap is written for crawlers, and a browser opening one with no
  stylesheet strips the tags and shows every URL, date and priority as one
  unbroken paragraph. This transform turns the same bytes into a grouped,
  readable page. Crawlers ignore it entirely — it is a processing instruction,
  not content, and the XML underneath is untouched.

  XSLT 1.0, because that is what browsers implement. No JavaScript, no web
  fonts, no network requests: the whole thing is this one file. Grouping uses
  the Muenchian method (xsl:key + generate-id), since 1.0 has no
  for-each-group.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sm xhtml">

  <xsl:output method="html" indent="yes" encoding="UTF-8"
    doctype-system="about:legacy-compat"/>

  <!--
    Group by locale: the first path segment after the origin.

    Three nested substring-after calls strip "https:", "" and the host, leaving
    "en/pricing" or bare "en" for a home page. Appending a slash before
    substring-before is what makes the bare case work — without it the home
    page of every language falls into an empty group.
  -->
  <xsl:key name="by-locale" match="sm:url"
    use="substring-before(concat(substring-after(substring-after(substring-after(sm:loc,'/'),'/'),'/'),'/'),'/')"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <!-- This page is a convenience for humans; it must never compete with
             the real pages in an index. -->
        <meta name="robots" content="noindex, follow"/>
        <title>XML Sitemap · BCNAirportTaxi</title>
        <style>
          :root {
            --void: #050505;
            --pane: #0b0b0d;
            --raise: #131316;
            --raise-2: #1a1a1e;
            --line: rgba(255, 255, 255, 0.07);
            --line-2: rgba(255, 255, 255, 0.12);
            --ice: #f4f2ed;
            --dim: #9a9aa4;
            --ghost: #85858f;
            --gold: #f0b429;
            --gold-lo: #c4901a;
            --jade: #39d98a;
            --ease: cubic-bezier(0.32, 0.72, 0, 1);
            color-scheme: dark;
          }

          * { box-sizing: border-box; }

          body {
            margin: 0;
            padding: 0 16px 72px;
            background: var(--void);
            color: var(--ice);
            font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
              Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 15px;
            line-height: 1.5;
            -webkit-text-size-adjust: 100%;
          }

          .wrap { max-width: 1080px; margin: 0 auto; }

          /* ── Header ─────────────────────────────────────────────────── */
          header {
            padding-block: 48px 28px;
            border-bottom: 1px solid var(--line);
          }

          .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 6px 14px;
            border: 1px solid rgba(240, 180, 41, 0.2);
            background: rgba(240, 180, 41, 0.07);
            border-radius: 999px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 10px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: var(--gold);
          }

          .led {
            width: 5px; height: 5px;
            border-radius: 999px;
            background: var(--jade);
          }

          h1 {
            margin: 18px 0 0;
            font-size: clamp(28px, 5vw, 42px);
            font-weight: 800;
            letter-spacing: -0.032em;
            line-height: 1.08;
          }

          .lede {
            margin: 12px 0 0;
            max-width: 58ch;
            color: var(--dim);
          }

          /* ── Stats ──────────────────────────────────────────────────── */
          .stats {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 24px;
          }

          .stat {
            flex: 1 1 150px;
            padding: 14px 16px;
            border: 1px solid var(--line);
            border-radius: 14px;
            background: var(--raise);
          }

          .stat dt {
            margin: 0;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 10px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--ghost);
          }

          .stat dd {
            margin: 6px 0 0;
            font-size: 24px;
            font-weight: 700;
            font-variant-numeric: tabular-nums;
            letter-spacing: -0.02em;
            color: var(--gold);
          }

          /* ── Locale groups ──────────────────────────────────────────── */
          .group {
            margin-top: 12px;
            border: 1px solid var(--line);
            border-radius: 16px;
            background: var(--raise);
            overflow: hidden;
          }

          .group + .group { margin-top: 10px; }

          summary {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 16px 18px;
            cursor: pointer;
            list-style: none;
            transition: background 0.4s var(--ease);
          }

          summary::-webkit-details-marker { display: none; }
          summary:hover { background: rgba(255, 255, 255, 0.035); }

          summary:focus-visible {
            outline: 3px solid var(--gold);
            outline-offset: -3px;
          }

          .chev {
            flex: none;
            width: 16px; height: 16px;
            fill: none;
            stroke: var(--ghost);
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            transition: transform 0.4s var(--ease), stroke 0.4s var(--ease);
          }

          details[open] .chev { transform: rotate(90deg); stroke: var(--gold); }

          .code {
            flex: none;
            display: grid;
            place-items: center;
            min-width: 40px;
            padding: 4px 10px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.06);
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 11px;
            font-weight: 700;
            color: var(--dim);
          }

          details[open] .code { background: var(--gold); color: var(--void); }

          .lang { flex: 1; font-weight: 600; letter-spacing: -0.01em; }

          .count {
            flex: none;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 12px;
            color: var(--ghost);
          }

          /* ── Table ──────────────────────────────────────────────────── */
          /* Wide tables scroll inside their own container, never the page. */
          .scroll {
            overflow-x: auto;
            border-top: 1px solid var(--line);
            -webkit-overflow-scrolling: touch;
          }

          table {
            width: 100%;
            min-width: 560px;
            border-collapse: collapse;
            text-align: left;
          }

          th {
            padding: 11px 18px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--ghost);
            border-bottom: 1px solid var(--line);
            white-space: nowrap;
          }

          td {
            padding: 11px 18px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.045);
            vertical-align: middle;
          }

          tr:last-child td { border-bottom: 0; }
          tbody tr { transition: background 0.3s var(--ease); }
          tbody tr:hover { background: rgba(255, 255, 255, 0.028); }

          td a {
            color: var(--ice);
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: color 0.3s var(--ease), border-color 0.3s var(--ease);
          }

          td a:hover { color: var(--gold); border-bottom-color: var(--gold-lo); }
          td a:focus-visible { outline: 3px solid var(--gold); outline-offset: 2px; }

          .path {
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 13px;
          }

          .num {
            text-align: right;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            font-size: 12.5px;
            font-variant-numeric: tabular-nums;
            color: var(--dim);
            white-space: nowrap;
          }

          .pri {
            display: inline-block;
            min-width: 34px;
            padding: 2px 8px;
            border-radius: 999px;
            background: rgba(240, 180, 41, 0.1);
            color: var(--gold);
            font-weight: 600;
            text-align: center;
          }

          .alts { color: var(--ghost); }

          /* ── Notice + footer ────────────────────────────────────────── */
          .notice {
            display: flex;
            gap: 12px;
            margin-top: 28px;
            padding: 14px 16px;
            border: 1px solid var(--line);
            border-left: 2px solid var(--gold);
            border-radius: 12px;
            background: var(--pane);
            color: var(--dim);
            font-size: 13.5px;
            line-height: 1.6;
          }

          .notice svg { flex: none; margin-top: 2px; }

          footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid var(--line);
            color: var(--ghost);
            font-size: 12.5px;
          }

          footer a { color: var(--dim); }

          /* ── Motion ─────────────────────────────────────────────────── */
          @keyframes rise {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: none; }
          }

          .wrap > * { animation: rise 0.6s var(--ease) both; }
          .wrap > *:nth-child(2) { animation-delay: 0.06s; }
          .wrap > *:nth-child(3) { animation-delay: 0.1s; }

          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              transition-duration: 0.01ms !important;
            }
          }

          @media (max-width: 600px) {
            header { padding-block: 32px 22px; }
            summary { padding: 14px; gap: 10px; }
            .lang { font-size: 14px; }
          }
        </style>
      </head>

      <body>
        <div class="wrap">
          <header>
            <p class="eyebrow"><span class="led"></span>XML Sitemap</p>
            <h1>Every page, in every language</h1>
            <p class="lede">
              This is the file search engines read to discover the site. It is
              shown here in a readable form — the underlying XML is unchanged.
            </p>

            <dl class="stats">
              <div class="stat">
                <dt>URLs</dt>
                <dd><xsl:value-of select="count(sm:urlset/sm:url)"/></dd>
              </div>
              <div class="stat">
                <dt>Languages</dt>
                <dd>
                  <xsl:value-of select="count(sm:urlset/sm:url[generate-id() = generate-id(key('by-locale', substring-before(concat(substring-after(substring-after(substring-after(sm:loc,'/'),'/'),'/'),'/'),'/'))[1])])"/>
                </dd>
              </div>
              <div class="stat">
                <dt>Last updated</dt>
                <dd style="font-size:15px">
                  <xsl:value-of select="substring(sm:urlset/sm:url[1]/sm:lastmod, 1, 10)"/>
                </dd>
              </div>
            </dl>
          </header>

          <main>
            <!-- One collapsible group per locale. -->
            <xsl:for-each select="sm:urlset/sm:url[generate-id() = generate-id(key('by-locale', substring-before(concat(substring-after(substring-after(substring-after(sm:loc,'/'),'/'),'/'),'/'),'/'))[1])]">
              <xsl:sort select="substring-before(concat(substring-after(substring-after(substring-after(sm:loc,'/'),'/'),'/'),'/'),'/')"/>

              <xsl:variable name="code"
                select="substring-before(concat(substring-after(substring-after(substring-after(sm:loc,'/'),'/'),'/'),'/'),'/')"/>

              <details class="group">
                <!-- English opens by default; the rest stay folded so the page
                     starts as a ten-line index rather than 420 rows. -->
                <xsl:if test="$code = 'en'">
                  <xsl:attribute name="open">open</xsl:attribute>
                </xsl:if>

                <summary>
                  <svg class="chev" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 6l6 6-6 6"/>
                  </svg>
                  <span class="code"><xsl:value-of select="translate($code,'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/></span>
                  <span class="lang">
                    <xsl:choose>
                      <xsl:when test="$code = 'en'">English</xsl:when>
                      <xsl:when test="$code = 'es'">Español</xsl:when>
                      <xsl:when test="$code = 'ca'">Català</xsl:when>
                      <xsl:when test="$code = 'fr'">Français</xsl:when>
                      <xsl:when test="$code = 'de'">Deutsch</xsl:when>
                      <xsl:when test="$code = 'it'">Italiano</xsl:when>
                      <xsl:when test="$code = 'pt'">Português</xsl:when>
                      <xsl:when test="$code = 'nl'">Nederlands</xsl:when>
                      <xsl:when test="$code = 'ru'">Русский</xsl:when>
                      <xsl:when test="$code = 'zh'">中文</xsl:when>
                      <xsl:otherwise><xsl:value-of select="$code"/></xsl:otherwise>
                    </xsl:choose>
                  </span>
                  <span class="count"><xsl:value-of select="count(key('by-locale', $code))"/> pages</span>
                </summary>

                <div class="scroll">
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Page</th>
                        <th scope="col" class="num">Priority</th>
                        <th scope="col" class="num">Changes</th>
                        <th scope="col" class="num">Alternates</th>
                      </tr>
                    </thead>
                    <tbody>
                      <xsl:for-each select="key('by-locale', $code)">
                        <xsl:sort select="sm:priority" order="descending"/>
                        <xsl:sort select="sm:loc"/>
                        <tr>
                          <td>
                            <a href="{sm:loc}" class="path">
                              <xsl:variable name="rest"
                                select="substring-after(substring-after(substring-after(substring-after(sm:loc,'/'),'/'),'/'),'/')"/>
                              <xsl:choose>
                                <xsl:when test="$rest = ''">/ <span class="alts">(home)</span></xsl:when>
                                <xsl:otherwise>/<xsl:value-of select="$rest"/></xsl:otherwise>
                              </xsl:choose>
                            </a>
                          </td>
                          <td class="num"><span class="pri"><xsl:value-of select="sm:priority"/></span></td>
                          <td class="num"><xsl:value-of select="sm:changefreq"/></td>
                          <td class="num alts"><xsl:value-of select="count(xhtml:link)"/></td>
                        </tr>
                      </xsl:for-each>
                    </tbody>
                  </table>
                </div>
              </details>
            </xsl:for-each>

            <p class="notice">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#f0b429" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <path d="M12 16v-5M12 8h.01"/>
              </svg>
              <span>
                Each URL also carries <strong>hreflang</strong> annotations for all
                ten languages plus <code>x-default</code>, which is how search
                engines know these pages are translations of one another rather
                than duplicates.
              </span>
            </p>
          </main>

          <footer>
            <a href="/en">BCNAirportTaxi</a> · Licensed Barcelona airport taxi
            transfers · <a href="/robots.txt">robots.txt</a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
