# rohitgarrg.com redesign — COMPLETE

Redesign shipped April 2026. All 5 phases plus post-phase work done.

Redesign spec files archived to `docs/archive/redesign/`. Prototype archived to `docs/archive/redesign/prototype/`.

## Sequencing (5 phases) — All complete

- [x] **Phase 1: Foundation** — tokens, fonts, Nav, Footer, base layout, contrast verification
- [x] **Phase 2: Home** — hero, now-strip, writing teaser, projects teaser, newsletter CTA, shared card components
- [x] **Phase 3: Writing** — posts content collection, index with filter/search, post template with sticky TOC, RSS feed
- [x] **Phase 4: Other pages** — Projects, Planetia, Speaking, About
- [x] **Phase 5: Polish** — 404/500, sitemap, robots, OG images, favicons, a11y pass, responsive pass, print styles, Lighthouse

## Post-phase work — Complete

- [x] **BeforeAfter component** — reusable before/after image comparison slider with draggable handle, multi-pair switcher, keyboard nav, mobile stack fallback
- [x] **MDX integration** — `@astrojs/mdx` added, slug regex fixed across 8 files, RSS handles MDX posts
- [x] **Redesign blog post** — "Redesigning rohitgarrg.com with AI" with 2 sliders (old/new + Claude Design/Stitch), cross-links to 2 posts
- [x] **Interlink skill** — `/interlink` for automated internal cross-linking with dry-run review, PostToolUse hook for auto-suggestion
- [x] **Internal links** — 8 cross-links added across 6 posts (from 2 links in 1 post to 10 links in 7 posts)
- [x] **Article spacing** — h2 margin-top reduced from 2.5em to 1.75em

## Decisions resolved

- Analytics: GoatCounter (cookieless, no consent banner)
- OG images: Static per post
- Post URLs: No migration needed
- Planetia em dash: Kept (documented exception)
- RSS: Full-text with lead image (MDX posts use excerpt-only)
- Hero meta: Git-tracked config

## Remaining TODOs (Rohit manual)

- [ ] Sign up at goatcounter.com to activate `rohitgarrg.goatcounter.com`
- [ ] Run Lighthouse on Vercel (Performance/A11y/BP ≥95, SEO=100)
- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools
- [ ] Upload per-post OG images when ready

## Known tech debt

- `.btn-primary`/`.btn-ghost` duplicated across 4 files — extract to global.css
- Focus-visible outline repeated 19 times — candidate for global `:where()` rule
- `speaking/[...slug].astro` and `Lightbox.astro` still use legacy CSS variable aliases
