# Design Redesign: rohitgarrg.com

Read this file at the start of every session involving design work. It tracks what's been done and what's next.

Read `docs/design-handoff.md` before starting any work. It contains the design decisions and specs you need.

## Current status

Phase: Phase 4 complete (pending OG image). Phases 1–4 done except noted gaps.

## Phase 1: Foundation

- [~] Add Google Fonts to the Astro layout: Newsreader (variable, weights 300-600, italic) and IBM Plex Sans (weights 300, 400, 500). Use `font-display: swap`. Preload the Newsreader woff2 since it's above the fold.
  - **Done:** Fonts loaded via Google Fonts in `BaseLayout.astro` with `display=swap`. Newsreader 400/500/600 + italic 400 and IBM Plex Sans 300/400/500/600 loaded.
  - **Remaining:** Add `<link rel="preload">` for Newsreader woff2 (above-the-fold font). Remove extra weight 600 from IBM Plex Sans (spec says 300/400/500 only).
- [x] Create or update the global CSS file with the full design token system (custom properties for typography, colors, spacing, layout). The exact values are in `docs/design-handoff.md` under "CSS Architecture." Copy them as-is. This includes light mode defaults and dark mode overrides via `prefers-color-scheme`, plus mobile breakpoint adjustments at 768px.
- [x] Apply the new font families site-wide: all headings use `var(--font-heading)` (Newsreader), all body/UI text uses `var(--font-body)` (IBM Plex Sans). Apply the type scale from the custom properties. No element should still be using the old fonts after this step.
- [ ] Verify dark mode works across the site. Every text element should remain legible when system preference is dark. Test by toggling in browser dev tools.

**QC before moving on:** Open every page (/, /writing, /projects, /speaking, /about, any article page). Confirm: (a) Newsreader appears on all headings, (b) IBM Plex Sans on all body text, (c) dark mode doesn't break anything, (d) spacing feels more generous than before.

## Phase 2: Homepage

- [x] Redesign the hero section. Change from centered to left-aligned. New structure: name at 56px/Newsreader 600, role at 20px/IBM Plex Sans 300, two-line bio ("14 years building products at scale. / Writing about what actually works."), LinkedIn and Email as accent-colored text links. Remove the old tagline ("Product at scale. Built with AI."). See `docs/design-handoff.md` for the exact layout spec.
- [x] Implement the "Latest Writing" section with a featured card for the most recent post (full-width, 16:9 image, larger title) and a 2-column grid for older posts (3:2 images, smaller titles). Add reading time estimates to card metadata (format: "Jan 31, 2026 · 5 min read"). See `docs/design-handoff.md` for card structure details.
- [x] Update project cards: 2-column grid, 16:9 images, separate "Built with AI" pill from tech stack pills (different styling), add explicit "View project →" link in accent color. Whole card should also be clickable.
- [x] Clean up the footer. Remove the "Built with Claude Code" line entirely. Footer should contain only: © 2026 Rohit Garg, LinkedIn link, Email link.
- [x] Update the nav: "RG" in Newsreader 600 at 20px (no background shape). Nav links in IBM Plex Sans 500 at 15px. Active page indicated by accent-colored text. Sticky nav with a 1px bottom border that only appears on scroll.

**QC before moving on:** Homepage should look distinctly different from before. Hero is left-aligned with clear hierarchy. Cards have editorial treatment with featured/grid distinction. Footer is clean. Nav feels considered.

## Phase 3: Content pages

- [x] **/writing page:** Remove the category filter tabs. All articles in a 2-column card grid, chronological order. Same card design as the homepage grid cards (not the featured card). No featured treatment here.
- [x] **/speaking page:** Replace the current card layout with a vertical timeline. Year as section header. Each entry shows: month, event/venue name (primary, bold), talk title (secondary), short description, "View details →" link. See `docs/design-handoff.md` for the timeline layout spec.
- [x] **/about page:** Side-by-side layout on desktop (headshot left, text right), stacked on mobile. Headshot: 240px wide, border-radius 12px (not circular). Give the Mentoring section a visual break (hr or bg-tertiary background). Don't change any of the existing copy.
- [x] **Article pages (/writing/[slug]):** Update typography and spacing per the spec in `docs/design-handoff.md`. Key changes: lead image at max 680px with 8px border-radius, body at 17px/1.7 line-height, H2 at 24px Newsreader with 48px top margin, blockquotes with left border in accent color, links accent-colored with underline on hover only. Replace "← Back to Writing" with a breadcrumb: "Writing / Article Title" where "Writing" is a link.

**QC before moving on:** Visit each page. Check that typography is consistent, layouts match the spec, and nothing is broken on mobile (375px viewport).

## Phase 4: Polish

- [x] Create a custom 404 page: nav bar, large "404" in Newsreader, helpful copy, links to Home, Writing, and About. Test by visiting /nonexistent-page.
- [x] Verify all card hover states work: image zoom to 1.03x with overflow hidden, border color shift, title color shifts to accent. Transition: 200ms ease. No shadow lift. Fixed projects page to match homepage/writing patterns.
- [x] Responsive audit: nav and footer touch targets fixed to 44px minimum at mobile. Cards already stack correctly at all breakpoints.
- [x] Image audit: all card images have consistent aspect ratios (16:9 with object-fit: cover). Width/height attributes added to project page images and about page headshot.
- [~] OG/social meta: BaseLayout has full OG meta. **BLOCKER:** Default OG image (`/public/og-image.webp`) is 505x630px — needs to be 1200x630px. Requires manual creation.

**QC before moving on:** Lighthouse audit. Target: Performance > 90. Test on fast 3G throttling, homepage should load in under 2 seconds.

## Phase 5: Content (separate sessions, not blocking)

- [ ] Add reading time calculation if not already present. Display on cards and article pages.
- [ ] Consider replacing AI-generated article illustrations with simpler alternatives (solid colored backgrounds with title text, or no in-body images at all, keeping just the lead image).
- [ ] Consider creating a consistent lead image template: warm-toned solid background + article title in Newsreader. This creates brand consistency.

## Rules for this project

- Do not add any new npm dependencies unless absolutely necessary. The design changes are CSS and HTML.
- Use Astro's built-in scoped styles for component-specific CSS. Global tokens live in one file.
- Do not create a CSS framework or utility class system. The site isn't complex enough.
- All colors must use CSS custom properties. No hardcoded hex values in component styles.
- Test dark mode after every visual change. If it breaks, fix it before moving on.
- When in doubt about a design decision, refer to `docs/design-handoff.md`. If it's not covered there, ask.
