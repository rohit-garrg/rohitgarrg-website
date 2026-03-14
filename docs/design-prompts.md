# Prompts for the Design Redesign

Use these prompts in Claude Code, one phase at a time. Copy the full prompt for the phase you're working on. After each phase, do the QC check described at the end before moving to the next one.

Before starting: make sure `DESIGN-REDESIGN-TODO.md` is in the project root and `design-handoff.md` is in the `docs/` folder. Claude Code should read both at the start of each session.

---

## Phase 1: Foundation

```
Read DESIGN-REDESIGN-TODO.md in the project root and docs/design-handoff.md.

We're doing Phase 1: Foundation. Here's what needs to happen:

1. Add Google Fonts to the Astro layout. We need two families:
   - Newsreader: variable, weights 400, 500, 600, plus italic 400
   - IBM Plex Sans: weights 300, 400, 500
   Use font-display: swap. Preload the Newsreader woff2 file since it's the heading font and appears above the fold on every page.

2. Create the global design token system as CSS custom properties. The exact values are in docs/design-handoff.md under "CSS architecture." Copy the full :root block including the light mode defaults, the dark mode overrides (@media prefers-color-scheme: dark), and the mobile breakpoint adjustments (@media max-width: 768px). Put this in the site's main/global CSS file.

3. Apply the new fonts site-wide. Every heading element (h1, h2, h3, etc.) should use var(--font-heading). Every body text, nav link, metadata, tag, and UI element should use var(--font-body). Apply the correct font sizes from the type scale custom properties. Apply the correct line heights from docs/design-handoff.md.

4. Apply the color custom properties to existing elements. Replace any hardcoded color values in the existing CSS with the new custom properties. Text should use text-primary, text-secondary, text-tertiary as appropriate. Backgrounds should use bg-primary, bg-secondary, bg-tertiary. Borders should use var(--border).

5. Verify dark mode works. Toggle prefers-color-scheme in the browser and confirm nothing is invisible or broken.

Don't change any layouts or component structures yet. This phase is purely typography, colors, spacing tokens, and dark mode. The site should look noticeably better just from the font and color changes, but the layout stays the same for now.

After you're done, check every page: /, /writing, /projects, /speaking, /about, and at least one article page. Confirm fonts and colors are correct everywhere.
```

---

## Phase 2: Homepage

```
Read DESIGN-REDESIGN-TODO.md and docs/design-handoff.md. We're on Phase 2: Homepage.

The foundation (fonts, colors, spacing tokens, dark mode) is already in place from Phase 1.

1. HERO SECTION: Redesign from centered to left-aligned. The exact structure is in docs/design-handoff.md under "Homepage hero." Key changes:
   - Name: var(--text-hero) size, Newsreader 600 weight, text-primary color
   - Role line: "Head of Product & Design, Times of India" at 20px, IBM Plex Sans 300, text-secondary
   - Bio: two lines: "14 years building products at scale." and "Writing about what actually works." at body size, text-secondary
   - Links: LinkedIn and Email as text links (not buttons) in accent color, underline on hover
   - Remove the old tagline "Product at scale. Built with AI."
   - 96px top padding on desktop (var(--space-3xl)), 56px on mobile
   - The text should take about two-thirds width. The remaining one-third is empty space. The whitespace is intentional.

2. NAV: Update the nav bar.
   - "RG" in Newsreader 600 at 20px. No background shape, circle, or special treatment. Just the letters in the heading font.
   - Nav links: Writing, Projects, Speaking, About in IBM Plex Sans 500 at var(--text-nav)
   - Active page: accent-colored text. No underline, no bold, no background.
   - Make it sticky. Add a 1px bottom border in var(--border) that only appears after the user scrolls (not at top of page). You can use a scroll listener that adds a class, or use a CSS approach with scroll-based states.

3. WRITING CARDS: Implement featured + grid layout.
   - Most recent post gets a featured card: full content-width, 16:9 image (use aspect-ratio CSS property + object-fit: cover), tag pill, 26px Newsreader title, description, and metadata with reading time.
   - Older posts go in a 2-column grid below (1-column on mobile). 3:2 images. 20px titles. No description, just tag + title + metadata.
   - Card hover: image zooms to scale(1.03) with overflow hidden on the container. Border shifts to border-hover. Title shifts to accent color. Transition 200ms ease. No shadows.
   - Tag pills: 12px IBM Plex Sans 500, bg accent-subtle, text accent, padding 4px 10px, border-radius 4px.
   - Metadata format: "Jan 31, 2026 · 5 min read" in 13px text-tertiary.
   - If reading time isn't currently calculated, add a simple word-count-based estimate (average 200 words per minute).

4. PROJECT CARDS: Update the project section.
   - 2-column grid, 1-column on mobile. 16:9 images.
   - Separate tech stack pills (bg-tertiary, text-secondary) from the "Built with AI" pill (accent-subtle bg, accent text). Put them on separate rows.
   - Add an explicit "View project →" link in accent color. The whole card should also be clickable.

5. FOOTER: Clean it up.
   - Remove the "Built with Claude Code" line entirely.
   - Keep: © 2026 Rohit Garg, LinkedIn, Email.
   - Style: 13px, text-tertiary for the copyright, text-secondary for the links.

6. SECTION SPACING: Make sure there's var(--space-2xl) (64px desktop, 40px mobile) between the hero, writing section, and projects section. Section headings ("Latest writing", "Projects") should use var(--text-h2) in Newsreader 500. The "View all" links should be in accent color, 12px.

Check the homepage in both light and dark mode, and at 375px mobile width, before marking this phase done.
```

---

## Phase 3: Content pages

```
Read DESIGN-REDESIGN-TODO.md and docs/design-handoff.md. We're on Phase 3: Content pages.

Fonts, colors, and the homepage are done. Now update the remaining pages.

1. /WRITING PAGE:
   - Remove the category filter tabs entirely. They highlight how few articles exist (4 articles, 3 categories). They can come back when there are 10+ articles.
   - All articles in a 2-column card grid (1-column on mobile), chronological order.
   - Use the same grid card design from the homepage (3:2 image, tag pill, 20px title, metadata with reading time). No featured card treatment on this page.
   - Page title: "Writing" in var(--text-h1) Newsreader 600. Subtitle: "Thoughts on product, leadership, AI tools, and personal growth." in text-secondary. These can stay.

2. /SPEAKING PAGE:
   - Replace the current card-with-floating-date layout with a vertical timeline.
   - Group entries by year. Year is a section header in var(--text-h2).
   - The timeline uses a 2px left border in var(--border).
   - Each entry has: month label, event/venue name as the primary text (20px Newsreader 500), talk title as secondary (15px text-secondary), short description (13px text-tertiary), and a "View details →" link in accent color.
   - The venue/conference name is more prominent than the talk title. This is intentional. Credibility comes from where you spoke, not the talk name.
   - See docs/design-handoff.md for the timeline layout spec and HTML structure.

3. /ABOUT PAGE:
   - Change to a side-by-side layout on desktop: headshot on the left (240px wide, border-radius 12px, NOT circular), text on the right.
   - On mobile: stack vertically, headshot at full width with border-radius 12px.
   - Do NOT change any of the existing copy. The writing is great. Just reframe it.
   - Give the Mentoring section a visual break. Either a horizontal rule above it or a bg-tertiary background section. It should be easy to scan and find.

4. ARTICLE PAGES (/writing/[slug]):
   - Content max-width: 680px, centered.
   - Replace "← Back to Writing" with a breadcrumb: "Writing / Article Title" at the top. "Writing" is a link in accent color. The rest is text-secondary. Use 13px.
   - Lead image: max-width 680px, border-radius 8px. Enforce 16:9 with aspect-ratio if possible.
   - Body text: 17px IBM Plex Sans 400, line-height 1.7.
   - Paragraph spacing: 1.5em margin-bottom.
   - H2 in articles: 24px Newsreader 500, 48px top margin, 16px bottom margin.
   - H3 in articles: 20px Newsreader 500, 32px top margin, 12px bottom margin.
   - Links: accent color, underline only on hover.
   - Bold: IBM Plex Sans 600.
   - Blockquotes: 3px left border in accent color, 24px left padding, text in Newsreader 400 italic.
   - In-body images: full content width, border-radius 8px, 32px vertical margin.
   - Date + reading time below the title: "January 30, 2026 · 7 min read" in 13px text-tertiary.

Test each page at 375px, 768px, and full desktop width. Test dark mode on every page. Fix any issues before moving on.
```

---

## Phase 4: Polish

```
Read DESIGN-REDESIGN-TODO.md and docs/design-handoff.md. We're on Phase 4: Polish.

All pages have been redesigned. Now we're doing fit-and-finish.

1. 404 PAGE: Create a custom 404 page.
   - Use the site's standard nav bar at the top.
   - Center content: "404" in Newsreader at 80px, text-tertiary color. Decorative, not alarming.
   - Below: "This page doesn't exist, but these might help:" in body text.
   - Below: three links in accent color: Home, Writing, Projects.
   - Test by navigating to /some-nonexistent-url.

2. CARD HOVER STATES: Verify all cards across the site have proper hover behavior.
   - Image: zooms to scale(1.03) with overflow hidden on the container. The image container needs overflow: hidden and the img needs transition: transform 200ms ease.
   - Border: shifts from var(--border) to var(--border-hover).
   - Title: shifts to accent color on hover.
   - Transition timing: 200ms ease on all properties.
   - No box-shadow, no elevation change. This is editorial, not e-commerce.

3. RESPONSIVE AUDIT: Test every page at three widths: 375px, 768px, 1200px.
   - No horizontal scrolling anywhere.
   - All touch targets minimum 44x44px (nav links, card tap areas, footer links).
   - Type scale adjusts at 768px breakpoint per the mobile values in docs/design-handoff.md.
   - Cards stack to 1-column on mobile.
   - Hero padding reduces on mobile.
   - About page stacks photo above text on mobile.

4. IMAGE AUDIT:
   - All card images have consistent aspect ratios enforced via CSS aspect-ratio property.
   - Featured cards: aspect-ratio 16/9.
   - Grid cards: aspect-ratio 3/2.
   - Project cards: aspect-ratio 16/9.
   - All images use object-fit: cover.
   - All img tags have explicit width and height attributes.
   - Below-fold images have loading="lazy".
   - No image stretching or squishing anywhere.

5. OG/SOCIAL META:
   - Verify the homepage has a default OG image (1200x630px) with the site name and title. If one doesn't exist, flag it for manual creation.
   - Verify each article page has its own OG image at the correct dimensions.

6. PERFORMANCE:
   - Run a Lighthouse audit on the homepage. Target: Performance score > 90.
   - Check that fonts are being preloaded correctly (no FOUT visible on page load).
   - Check that there are no render-blocking resources from the font loading.

After this phase, update the checkboxes in DESIGN-REDESIGN-TODO.md to mark everything complete.
```

---

## Phase 5: Content improvements (optional, separate session)

```
Read DESIGN-REDESIGN-TODO.md and docs/design-handoff.md. We're on Phase 5: Content improvements.

These are quality-of-life improvements, not structural changes. Do them one at a time.

1. READING TIME: If reading time calculation isn't already working reliably on all article cards and article pages, add it. Simple formula: count words in the article body, divide by 200, round up. Display format on cards and article pages: "Jan 30, 2026 · 7 min read".

2. LEAD IMAGE TEMPLATE (optional): Consider creating a consistent visual template for article lead images. The idea: a solid warm-toned background (using colors from our palette like accent-subtle or a warm amber/stone shade) with the article title overlaid in large Newsreader text. This would replace the current AI-generated illustrations and create brand consistency. If this is feasible as an automated build step (generate an OG image from the article title), explore it. If not, flag it as a manual task.

3. ARTICLE IMAGE CLEANUP (manual, just flag): The AI-generated stock illustrations inside articles (things like "A calm feedback conversation between manager and team member") undermine the authentic writing voice. Flag which articles have these and note that they should be either replaced with real photos or removed entirely, keeping just the lead image.
```

---

## Tips for using these prompts

- Copy the full phase prompt into Claude Code. Don't split a phase across multiple sessions if possible.
- After each phase, do the QC check described at the end of the prompt before starting the next phase.
- If something breaks during a phase, fix it in the same session rather than deferring.
- If Claude Code asks a question about a design decision, point it to the specific section in docs/design-handoff.md.
- Update DESIGN-REDESIGN-TODO.md checkboxes as you go so you have a record of progress.
- Phase 5 items are independent. You can do them in any order or skip them.
