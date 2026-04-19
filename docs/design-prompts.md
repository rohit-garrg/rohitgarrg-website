# Design prompts — rohitgarrg.com redesign

Copy-paste prompts for Claude Code, one per phase. Five phases total. Each is a self-contained Claude Code session.

## How to use

Open Claude Code in the repo root. For each phase:

1. Check `DESIGN-TODO.md` and resolve any decisions marked "needed before Phase N".
2. Start a fresh Claude Code session. Clear context if reusing a terminal.
3. Paste the full phase prompt.
4. Let Claude Code build. Answer its questions by pointing to specific sections in `docs/design-spec.md`.
5. Run the QC checklist at the end of each phase prompt before moving on.
6. Tick checkboxes in `DESIGN-TODO.md` when the phase is complete.
7. Run `/simplify` and `sync-docs` before clearing context for the next phase.

For high-stakes phases (Phase 1, Phase 3), consider adversarial plan review before implementation: ask an Opus subagent and a Gemini subagent (via MCP) in plan mode to find the three weakest decisions and propose alternatives. Claude Code is decision-maker.

## Content sourcing rule (applies to every phase)

The `docs/prototype/` folder is a visual reference for layout, component structure, and design language. Nothing more. `data.jsx` contains placeholder copy (`RG_POSTS`, `RG_PROJECTS`, `RG_SPEAKING`, `RG_PLANETIA`, `RG_ABOUT`) used only to render the HTML mock.

Production content lives in `src/content/` (posts, projects, planetia, about) and `src/config/` (site meta, hero stats). When this file instructs you to use `RG_*` data for posts, projects, speaking entries, Planetia copy, or About paragraphs, treat it as a reference for shape and field names only. The actual strings must come from the existing production content in the repo.

If a piece of existing production copy doesn't fit the new container (too long for the new card, too short for a redesigned hero, wrong tone for a new component), do not trim, expand, or rewrite it silently. Stop and ask Rohit. In the question, include: (a) the specific container and its copy constraints, (b) the current production copy that doesn't fit, (c) two or three concrete suggestions for what could fit, each labelled with its tradeoff (shorter and punchier / longer with more detail / reframed for the new context). Wait for a decision before proceeding.

## Pre-work before Phase 1

- [ ] `docs/design-spec.md` is in the repo.
- [ ] `docs/design-prompts.md` (this file) is in the repo.
- [ ] `docs/prototype/` contains `index.html`, `data.jsx`, `icons.jsx`, `soft.jsx`.
- [ ] `DESIGN-TODO.md` is at the repo root.
- [ ] The existing `CLAUDE.md` at repo root has a line pointing to `DESIGN-TODO.md` and `docs/design-spec.md`.
- [ ] Decisions tagged "needed before Phase 2" in `DESIGN-TODO.md` are resolved.

---

## Phase 1 — Foundation

Goal: tokens, fonts, global chrome, base layout. No page-specific work.

```
Read these files before starting:
- DESIGN-TODO.md at repo root
- docs/design-spec.md, sections: §1 Brief, §2 Tokens, §3 Stack and conventions, §5 Global (Nav, Footer, Breakpoints)
- docs/prototype/index.html, opened in a browser, for the intended look and feel

Goal: land the design foundation that every page will inherit. Build these and only these.

1. Paste every token from §2 into tailwind.config.js (colors as oklch + hex fallbacks, font families, radii-pill/sm/md/lg/xl, spacing scale, shadows). Put organic-radius values (the multi-value percent strings) into src/styles/tokens.css since Tailwind can't express them.

2. Set up font loading. Self-host WOFF2 for:
   - Newsreader 400 roman, 500 roman, 400 italic
   - Geist 400, 500
   - Geist Mono 400, 500
   Subset to Latin-extended. Preload only Newsreader 400/500 roman and Geist 400/500 roman in the <head>. Rest load normally with font-display: swap. Target under 90KB font payload.

3. Remove any stale fonts if you find them (JetBrains Mono, Lora, Fraunces were pulled in by abandoned directions).

4. Build src/layouts/BaseLayout.astro with:
   - Site meta, OG defaults, favicon links
   - Font preload links
   - Skip-to-content link at the top
   - <main> wrapper with id="main"
   - <Nav /> and <Footer /> slots

5. Build src/components/Nav.astro per §5 Nav. Active-state rules: no active link on /. Writing active on /writing and /writing/[slug]. Projects active on /projects. And so on. Do not make Writing active on home.

6. Build src/components/Footer.astro per §5 Footer. No fabricated subscriber count. No hardcoded "last updated" date. Signature copy: "Product and design at scale. Tinkering with AI. Notes from a product leader in Delhi-NCR."

7. Build global typography CSS per §2 type scale. Newsreader for display and article body, Geist for UI, Geist Mono for small caps and metadata.

8. Verify every color pairing in the §2 contrast table hits 4.5:1 for body and 3:1 for large text. If any pairing fails, stop and surface it before continuing.

Constraints:
- All shadows are periwinkle-tinted. Never grey. If you find a grey shadow in any token, flag it as a bug.
- No emoji in UI copy.
- No em dashes anywhere in UI copy, nav labels, or microcopy.
- No dark-mode tokens.
- Astro islands only where interaction is needed. No React or Vue on static pages.

QC before moving to Phase 2:
- Build runs without errors.
- A scratch page at src/pages/_test.astro renders every color swatch, each font family at every shipped weight, all pill and ghost buttons, the Nav, and the Footer.
- Run axe on the scratch page. Zero color-contrast failures.
- Lighthouse on a Vercel preview of the scratch page: Performance ≥95, Accessibility = 100.
- No console errors.
- Tick Phase 1 checkboxes in DESIGN-TODO.md.

When complete, delete src/pages/_test.astro and report what you built.
```

---

## Phase 2 — Home

Goal: the home page, with reusable components other phases will lean on.

```
Read these files before starting:
- DESIGN-TODO.md at repo root
- docs/design-spec.md, sections: §5 Global and §5 Home
- docs/prototype/data.jsx — reference for card field shape only. Actual posts and projects come from src/content/posts/ and src/content/projects/.
- docs/prototype/index.html open in a browser for the intended look

Goal: ship the home page. Build reusable components first.

Shared components:

1. src/components/WritingCard.astro — lead image, meta (date · read time), title (Newsreader 500), excerpt, tag chip at bottom. Two variants via a `featured` prop: featured uses a 16/11 cover and H3 at 28px; default uses 5/4 cover and H3 at 22px. Card has a 22px radius, 1px var(--line) border, hover translateY(-2px) plus shadow-card-hover on desktop only.

2. src/components/ProjectCard.astro — visual block aspect 5/3, name (shortened; split on comma if present), blurb, stack pills (Geist Mono 11.5px).

3. src/components/NewsletterForm.astro — pill-shaped form. Six states: idle, loading, success, already subscribed, error, invalid. Post to Buttondown's form endpoint (existing integration; the abstraction layer for a future Brevo move is already in place — don't rebuild it). State copy lifted verbatim from spec §5 Home newsletter form states.

4. src/components/HeroBlock.astro — left text column (eyebrow, H1 with italic "products" wrapped in a peri-pale blob, lede, meta numbers, actions), right portrait (frame with organic radius, floating tag card absolute-positioned).

Config file:

5. src/config/meta.ts — export the hero numbers (`years`, `teamSize`, `booksCount`), the now-strip items, the footer signature, and the "Currently" line. Hero and Nav both import from here. Do not hardcode these into components.

Page:

6. src/pages/index.astro — sections in order:
   - HeroBlock
   - Now-strip (full-width, paper-2 bg, mono label + three items with colored beads)
   - Writing teaser: section header ("Writing" eyebrow, H2 "Essays on product, AI, leadership, and the occasional book review.", "See all writing →" CTA) + three-card grid (1.3fr / 1fr / 1fr, featured is first)
   - Projects teaser: section header ("Projects" eyebrow, H2 "Side projects, experiments, and things I'm tinkering with.", "All projects →") + three-up equal grid
   - Newsletter CTA: full-bleed-but-inset, radius-organic-a, gradient bg, decor blobs, form

Use the three most recent published posts from src/content/posts/ (most recent as featured). Use the three projects currently live on the site from src/content/projects/, ordered by their `order` field. If fewer than three exist, render what exists and flag the gap.

Portrait: place src/assets/rohit-portrait.jpg (source exists). Astro handles AVIF/WebP. object-position: 50% 15%.

Constraints:
- Don't quantise organic radii.
- Card hover lifts are desktop-only. Skip on touch.
- Respect prefers-reduced-motion per the tokens spec.
- No fabricated social proof in the newsletter CTA. Proof line: "Free forever. One click to unsubscribe."

QC before moving to Phase 3:
- Home renders at 375, 768, 1024, 1440 without breaks.
- No console errors.
- Newsletter form submits to Buttondown in dev. Manually trigger each of the six states (use a junk email, a known-subscribed email, disconnect to trigger error, submit invalid).
- Tab through the entire page. Focus rings visible. Tab order: brand → nav → subscribe pill → hero CTAs → newsletter form.
- Mobile at 375: hamburger opens, hero stacks, all cards stack, newsletter form stacks vertically.
- Tick Phase 2 checkboxes in DESIGN-TODO.md.
```

---

## Phase 3 — Writing system

Goal: posts as a content collection, Writing index, post template, RSS feed.

```
Read these files before starting:
- DESIGN-TODO.md at repo root
- docs/design-spec.md, sections: §5 Writing index, §5 Post template
- docs/prototype/data.jsx — RG_POSTS for frontmatter, RG_POST_BODY for a sample article body

Goal: full writing system.

1. Content collection src/content/posts/ with this Zod schema:
   ```
   {
     title: string,
     date: date,
     tag: enum('AI', 'Leadership', 'Product', 'Design', 'Books', 'Projects'),
     excerpt: string,
     readMin: number,
     cover: string,  // path to lead image
     nextPosts: array(string).optional(),
     series: object({ name: string, order: number }).optional(),
     seoTitle: string.optional(),
     seoDescription: string.optional()
   }
   ```
   Reject any tag outside the enum.

2. Preserve the existing MDX posts in `src/content/posts/` as the source of truth. `RG_POSTS` and `RG_POST_BODY` in `data.jsx` are prototype placeholder content for layout and card rendering only. Do not create new MDX files from them, and do not treat them as a migration source. If an existing post's frontmatter is missing fields required by the new Zod schema, add them without rewriting the body. Flag any post whose tag is not in the six-tag enum.

3. src/pages/writing/index.astro:
   - Page header: H1 display-lg with italic "product", sub copy from spec
   - Filter bar: All writing + six tag chips with counts, search pill on the right
   - Featured block: top post with radius-organic-b cover
   - Year groupings: 2026 then 2025, mono label with count, two-column card grid
   - Empty states per spec when a filter or query returns nothing

   Client-side filter/search: generate a JSON search index at build time, load on page, filter/search in-memory. No loading state. If posts grow past ~200, revisit.

4. src/pages/writing/[slug].astro — post template:
   - Post hero: two-column 1fr/1fr, 60px gap, 70/80/40/80 padding, border-bottom. Left: meta, H1 Newsreader 56px, standfirst 18px, by-line with organic-bead avatar. Right: cover with radius-organic-portrait and shadow-portrait.
   - Article grid:
     - Desktop (≥1024px): three-column `minmax(160px, 200px) minmax(560px, 680px) minmax(160px, 200px)`, 40px gap, 60/80 padding. Use minmax so the grid doesn't break between 1024 and ~1160. Sticky TOC left with overflow-y: auto and max-height calc(100vh - 140px). Sticky share right with three organic-bead buttons.
     - Tablet (768-1023px): two columns. TOC inline at top as a collapsible "On this page" accordion. Share hidden here; share appears at the end of the post.
     - Mobile (≤767px): single column. TOC inline accordion at top. Share at post end.
   - Body typography: Newsreader 20px/1.62, max-width 680px. Lede 24px/1.48. H2 Newsreader 30px. Pull-quote italic 28px peri-ink with 3px peri left border.
   - Inline CTA after paragraph 5: peri-pale bg, radius 26px, 44×44 periwinkle blob icon, "Enjoying this?" bold + subline, ink pill "Subscribe".
   - Post-end CTA: two-column, radius-organic-a, paper-2 bg. Left: eyebrow + H3 + signature. Right: newsletter form.
   - Next-up: two cards from `nextPosts` frontmatter. If empty, fall back to the two most recent posts excluding the current.

5. Series support: if frontmatter has `series`, render a series bar above the H1 showing "Series name · Part N of M" with links to prev/next parts in the series. If only one part exists, render "Part 1 of an ongoing series" with no links.

6. RSS feed:
   - Add @astrojs/rss.
   - Output at /rss.xml.
   - Full-text feed with the post cover image (per decision in DESIGN-TODO.md; swap to excerpt if decision was excerpt).
   - Link from Footer and from <link rel="alternate" type="application/rss+xml"> in every post's <head>.

Constraints:
- No em dashes in any migrated copy. If you hit one during migration, flag with `TODO(rohit): em dash here` and move on.
- Pull-quote style: italic peri-ink, 3px peri left border, 24px padding-left. Don't use the default blockquote styling.
- TOC active-link highlight uses peri-ink. Use IntersectionObserver for scroll-spy; don't ship a scroll event listener.

QC before moving to Phase 4:
- Test with a long post (create a 3,000-word stub if needed): sticky TOC works, overflow-scrolls internally when content exceeds viewport height.
- Test with a short post (500 words): renders cleanly without awkward whitespace.
- Post at 800px viewport width doesn't break.
- Post at 1024px (tablet/desktop boundary) renders correctly.
- Filter + search combinations work client-side with no network requests after initial load.
- /rss.xml validates in NetNewsWire or Feedly (check in a real reader, not a validator).
- No console errors on any post page.
- Tick Phase 3 checkboxes in DESIGN-TODO.md.
```

---

## Phase 4 — Other pages

Goal: Projects, Planetia, Speaking, About.

```
Read these files before starting:
- DESIGN-TODO.md at repo root
- docs/design-spec.md, sections: §5 Projects, §5 Planetia, §5 Speaking, §5 About
- docs/prototype/data.jsx — RG_PROJECTS, RG_SPEAKING, RG_PLANETIA, RG_ABOUT

Goal: four pages. Use existing production content from src/content/ throughout.

0. Inventory existing content sources. If copy is baked into page components rather than content collections, extract it first, put it into content collections, and confirm with Rohit before proceeding with layout work.

1. Projects:
   - Confirm the content collection schema matches the new design: { name, kind, year, blurb, stack (array), stat, visual, url, order }. If the existing collection has different field names, migrate fields in place. Do not overwrite blurbs or stats with prototype copy.
   - src/pages/projects.astro — page header + full-list cards (two-column split 1.1fr/1fr, visual left, body right 36×40 padding, stack pills, primary + ghost action pills). Pull all projects from src/content/projects/ ordered by `order`.

2. Planetia:
   - Use the existing src/content/planetia.mdx (or equivalent) as source of truth. If frontmatter fields are missing for the new layout (tagline, lede, appStoreUrl, features array), add them without changing existing strings. Flag any new field that has no production value yet.
   - src/pages/planetia.astro — centred hero with H1 Newsreader 60px, tagline, lede in paper-2 panel, App Store button (ink bg, 14px radius). Screenshots grid 3-up (aspect 4/3, radius 20px), then 2-up. Features grid 2×3 on desktop, 1×6 on mobile. Each feature: 42×42 peri-pale chip with letter A-F, H3 label, paragraph.
   - Feature-row format: follow the decision in DESIGN-TODO.md. Default is "**Explore.** Fly through..." (compliant). If decision is to keep em-dash separator, implement "**Explore** — Fly through...".
   - Placeholder screenshots: use the prototype's ProjectVisual render for now. Flag under "Assets to produce" in DESIGN-TODO.md that real iPad screenshots are needed.

3. Speaking:
   - Use the existing src/content/speaking.json (or equivalent) as source of truth. If any entries are missing fields the new layout needs (link, blurb), leave them empty rather than inventing copy.
   - src/pages/speaking.astro — page header + grouped timeline. Group events by year, descending. Year label Newsreader 34px. Timeline: 1px vertical line at x=12px from left, 10px periwinkle pebble markers. Each event: mono-xs when, Newsreader 26px venue, 16px peri-ink title, 15px blurb, optional "View details →" link.
   - Skip empty years entirely.

4. About:
   - Use the existing src/content/about.mdx as source of truth. The four-paragraph structure assumed by the new layout is a design constraint, not a content rewrite. If the production About has fewer or more paragraphs, stop and ask before restructuring.
   - src/pages/about.astro — header (220px portrait left with organic radius, title block right), body Newsreader 19px/1.62 max 68ch, paragraphs with the highlighted "38 books in the last three years" span using class `hl` (peri-ink color) applied to whichever paragraph contains that phrase in production. Mentoring block (sage-pale bg, radius 28px), contact block with LinkedIn and Email buttons. No contact form.

Constraints:
- Use production copy verbatim. Do not rewrite.
- If production copy doesn't fit a new container, follow the content sourcing rule at the top of this file: stop, surface the mismatch, propose options, wait.
- No fabricated stats.
- No em dashes in copy.
- Tag chips on project cards use the correct accent token per the §2 Tag color mapping.

QC before Phase 5:
- All four pages render at 375, 768, 1024, 1440.
- Speaking timeline line renders at the correct x offset across viewport sizes.
- Mentoring block has sage-pale bg + oklch(0.88 0.04 160) border.
- About portrait uses radius 44% 56% 50% 50% / 50% 45% 55% 50%.
- No console errors.
- Tick Phase 4 checkboxes in DESIGN-TODO.md.
```

---

## Phase 5 — Polish and launch

Goal: 404/500, sitemap, robots, OG, favicons, a11y pass, responsive pass, print styles, Lighthouse audit.

```
Read these files before starting:
- DESIGN-TODO.md at repo root (decisions on analytics, OG strategy, and RSS must be resolved)
- docs/design-spec.md, sections: §4 Conventions (accessibility, performance), §5 404 and 500, §5 Mobile overrides

Goal: production-ready site.

1. src/pages/404.astro — centred body, Newsreader 72px "404", sub copy, "Back to writing" primary pill + "Home" ghost pill. Below: paper-2 panel with three recent-post suggestions ("While you're here" title) using the standard WritingCard.

2. src/pages/500.astro — similar layout. Copy: "Something broke on our end." Primary pill "Back to writing". No post suggestions. Include a visible error reference code the user can send to Rohit.

3. Sitemap: add @astrojs/sitemap integration. Configure to auto-generate /sitemap-index.xml at build time including all pages and posts.

4. public/robots.txt:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://www.rohitgarrg.com/sitemap-index.xml
   ```

5. Favicons: ship favicon.ico (32 and 16 multi-res), apple-touch-icon.png (180), favicon-192.png, favicon-512.png, site.webmanifest for PWA-style behaviour. Link correctly from BaseLayout <head>.

6. OG and Twitter meta: every page gets og:title, og:description, og:image, og:type, og:url, twitter:card="summary_large_image", twitter:creator="@rohitgarrg". Posts use seoTitle/seoDescription from frontmatter when present, falling back to title/excerpt.

7. OG image strategy — follow the decision in DESIGN-TODO.md:
   - If static per post: expect images at public/og/[slug].png. Link from frontmatter.
   - If template via @vercel/og: build src/pages/og/[slug].png.ts using site palette and typography. Input: post title + tag.
   - If site-wide: public/og/default.png linked from every page.

8. Analytics — Decision is swap to cookieless. Remove GA4 script and measurement ID `G-X6LXZDSYG8` from the base layout. Install GoatCounter: sign up at goatcounter.com, add the single script tag (`<script data-goatcounter="https://rohitgarrg.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`) to the base layout before `</body>`. No consent banner needed. Verify tracking fires on a deployed Vercel preview before ticking Phase 5.

9. Print styles — a @media print block in global CSS:
   - Hide Nav, Footer, TOC, share column, all CTAs.
   - Article body ink-on-paper, full width.
   - Add the site URL at the bottom of the printed page.

10. Responsive pass: click through every page at 375, 768, 1024, 1440, 1920. Fix any breaks. Pay special attention to:
    - Article grid at 1024px boundary.
    - Post at 800px (between breakpoints).
    - Mobile hamburger at 375px.
    - Speaking timeline indentation on mobile.

11. Accessibility pass:
    - One H1 per page. No skipped heading levels.
    - Alt text on every image. Decorative images get alt="".
    - Every form input has a <label> (visually-hidden is fine).
    - Focus rings: 2px solid var(--peri-ink), 2px offset. Never outline: none without a replacement.
    - Skip-to-content link at top of every page, visible on keyboard focus.
    - Run axe on every page type (home, writing index, post, projects, planetia, speaking, about, 404). Zero contrast or semantic errors.

12. Reduced-motion pass: in DevTools emulate "prefers-reduced-motion: reduce". Verify all hover lifts and transitions are disabled.

13. Lighthouse audit on a deployed Vercel preview (not localhost). Targets per page:
    - Performance ≥ 95
    - Accessibility ≥ 95
    - Best Practices ≥ 95
    - SEO = 100

Fix any failure. Common culprits: unused fonts still loading, images not responsive, missing alt text, missing meta description.

14. Launch verification:
    - Non-www redirects to www at Vercel.
    - /rss.xml valid.
    - /sitemap-index.xml valid and submitted to Google Search Console (Rohit to do manually post-launch).
    - robots.txt live.
    - All six newsletter form states reachable on a deployed build.
    - No console errors on any page.
    - No body-text contrast below 4.5:1.

Tick Phase 5 checkboxes in DESIGN-TODO.md. Mark the redesign as ready to ship.
```

---

## After Phase 5

Before flipping DNS to production:

- Run an adversarial review: give a Gemini subagent (via MCP) and an Opus subagent access to the deployed preview plus `docs/design-spec.md`. Ask each to find the three weakest decisions (visual or implementation). Act on any that survive both reviews.
- Submit sitemap to Google Search Console and Bing Webmaster Tools.
- Verify GA4 or the alternative analytics is firing correctly (if kept).
- Do one final manual click-through on a real mobile device.

Flip DNS or redeploy to production.
