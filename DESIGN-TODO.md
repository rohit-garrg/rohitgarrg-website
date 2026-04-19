# rohitgarrg.com redesign

Living doc for the redesign. Read at the start of every session involving design work. Update checkboxes as phases complete.

## Read first

- `docs/design-spec.md` — voice, tokens, per-screen specs, conventions. Everything about what to build.
- `docs/design-prompts.md` — one prompt per phase. Copy-paste into Claude Code.
- `docs/prototype/` — the HTML prototype. Open `index.html` in a browser for the intended look.
- `docs/prototype/` is layout and visual reference only. `data.jsx` holds prototype placeholder content (posts, projects, speaking, about) used to render the HTML mock. The real post content lives in `src/content/posts/`. Never treat `RG_POSTS` or `RG_POST_BODY` as a migration source. If production copy does not fit a new container, stop and ask rather than rewriting.

## Sequencing (5 phases)

Each phase is one Claude Code session. Clear context between phases. Run the QC check at the end of each phase's prompt before moving on.

- [x] **Phase 1: Foundation** — tokens, fonts, Nav, Footer, base layout, contrast verification
- [x] **Phase 2: Home** — hero, now-strip, writing teaser, projects teaser, newsletter CTA, shared card components
- [x] **Phase 3: Writing** — posts content collection, index with filter/search, post template with sticky TOC, RSS feed
- [x] **Phase 4: Other pages** — Projects, Planetia, Speaking, About
- [ ] **Phase 5: Polish** — 404/500, sitemap, robots, OG images, favicons, a11y pass, responsive pass, print styles, Lighthouse

Estimated: 14–18 engineer-days for first pass, plus 3–4 days for revisions after Rohit reviews.

## Decisions needed before shipping

These are unresolved. Pick one option for each before the phase that needs it.

### Analytics and consent

Swap GA4 for GoatCounter. Free for personal use, cookieless, no consent banner needed under GDPR or DPDP. Remove GA4 script and `G-X6LXZDSYG8` measurement ID. Add GoatCounter script tag to base layout. Update `docs/design-prompts.md` Phase 5 step 8 to reflect the choice.


### OG image strategy

Static per post. Best quality, most effort.

### Post URL migration (needed before Phase 3)

No migration needed.

### Planetia feature-row format (needed before Phase 4)

The prototype uses "**Explore** — Fly through..." The em dash here is a typographic separator in a structured list, not prose. It's a voice-rule edge case.

Keep em-dash separator (documented exception).

### RSS feed content (needed before Phase 3)

Full-text with lead image. Better for RSS-reader audience. Recommended.

### Hero meta numbers (needed before Phase 2)

"14+ years", "60+ person team", "38 books in three years" lives at `src/config/meta.ts`. Git-tracked, editable without component changes. Recommended.

## Resolved (already baked in)

- Newsletter provider: Buttondown. Live with double opt-in, sending domain `rohitgarrg@newsletter.rohitgarrg.com`.
- Tag taxonomy: AI, Leadership, Product, Design, Books, Projects. Six tags, each with a unique accent token.
- Canonical domain: `www.rohitgarrg.com`. Non-www redirects to www at Vercel.
- Planetia URL: `/planetia`. No subdomain.
- Contact: Email + LinkedIn buttons on About. No contact form.
- Analytics ID (if keeping GA4): `G-X6LXZDSYG8`.

## Assets to produce

- [ ] Real lead images for every post. 1600×1200 JPEG source. Astro generates AVIF/WebP at build.
- [ ] Real Planetia iPad screenshots. Five minimum.
- [ ] Real Office Survivors and Solar System Explorer visuals.
- [ ] Favicon set: favicon.ico (32+16), apple-touch-icon (180), favicon-192, favicon-512, site.webmanifest.
- [ ] OG template SVG (if template option picked above).
- [ ] Portrait: confirm existing asset or replace.

## Acceptance criteria

- [ ] All seven screens render correctly at 375, 768, 1024, 1440.
- [ ] `/404` and `/500` work.
- [ ] Newsletter form hits Buttondown and shows all six states (idle, loading, success, already subscribed, error, invalid).
- [ ] Posts authored in MDX appear on index, on home (3 most recent), and in RSS.
- [ ] Tag filter and client-side search on Writing index work with no loading state.
- [ ] Lighthouse on a deployed Vercel build (not localhost): Performance ≥95, Accessibility ≥95, Best Practices ≥95, SEO = 100.
- [ ] Keyboard navigation works. Tab order sensible. Focus rings visible. Skip-to-content link present.
- [ ] `prefers-reduced-motion: reduce` disables hover lifts and transitions. Verified in DevTools emulation.
- [ ] OG images render for `/` and every post.
- [ ] `/rss.xml` and `/sitemap-index.xml` generate correctly.
- [ ] `robots.txt` live.
- [ ] No console errors on any page.
- [ ] No body-text contrast below 4.5:1 (verified with axe).

## Test checklist

- [ ] 80+ char post title doesn't break the card grid.
- [ ] 4,000+ word post: sticky TOC works, overflow-scrolls.
- [ ] 500-word post renders cleanly without awkward whitespace.
- [ ] Post with no tag / no cover / no readMin falls back gracefully without crashing.
- [ ] Post with `series` frontmatter renders the series bar.
- [ ] Empty state for Writing index when a filter matches nothing.
- [ ] Newsletter form: all six states reachable manually.
- [ ] Planetia page works without JS (except the 3D preview).
- [ ] Post at 800px viewport width doesn't break.
- [ ] Post at 1024px (tablet-desktop boundary) renders correctly.
- [ ] Mobile hamburger opens and closes.
- [ ] Skip-to-content link jumps to main content and is visible on keyboard focus.
- [ ] Print a post. The resulting PDF is readable.

## Non-goals (do not do)

- Don't quantise organic radii to a 16px scale. The asymmetry is the character.
- Don't swap Newsreader for a "more readable" serif.
- Don't add hero animations, page transitions, or scroll reveals.
- Don't add ML-based related posts. Static `nextPosts` frontmatter is enough.
- Don't add social share buttons beyond the three on the post page.
- Don't auto-play any media.
- Don't rewrite copy without Rohit's sign-off.
- Don't reintroduce the fabricated "4,280 subscribers" claim or any hardcoded "last updated" date.
- Don't install heavy UI libraries (Material, Chakra, shadcn). Tailwind plus headless primitives is enough.
- Don't ship dark mode tokens. Structure allows it later; don't advertise before tokens exist.
- Don't fetch a JS framework on the home page. Astro islands only where interaction is needed.
