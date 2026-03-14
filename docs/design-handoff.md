# Design Handoff: rohitgarrg.com Redesign

This document contains every design decision for the redesign. When implementing, treat these as final specs, not suggestions.

---

## Design direction

The site should feel like a well-edited magazine column, not a developer portfolio. The content is direct, experienced writing about product leadership and AI tools. The design frames that content with confident, restrained typography, generous space, and just enough personality to be memorable without being distracting.

The aesthetic in one phrase: **editorial restraint with quiet confidence**.

---

## Typography

**Heading font:** Newsreader (Google Fonts, variable)
- Designed by Production Type for reading long-form content on screens
- Variable weight 300-800 gives real hierarchy flexibility
- Excellent italic for pull quotes
- At display sizes (48px+): quiet authority. At card sizes (20px): legible, not ornate.

**Body font:** IBM Plex Sans (Google Fonts)
- Designed for IBM's corporate design system. Clean, professional, screen-optimized.
- Less common than Inter on personal sites and AI-generated pages. Does not trigger the "another Inter site" reflex.
- Humanist quality with double-story "a" and "g" that give character at body sizes.

**Weights to load:**
```
Newsreader: 400, 500, 600, plus italic 400
IBM Plex Sans: 300, 400, 500
```

**Where each weight is used:**
```
Newsreader 600: hero name, page titles (H1)
Newsreader 500: section heads (H2), card titles (H3), article H2/H3
Newsreader 400: article subheads, serif emphasis
Newsreader 400 italic: pull quotes, blockquotes

IBM Plex Sans 500: nav links, labels, metadata emphasis, tag pills
IBM Plex Sans 400: body text, descriptions, article body
IBM Plex Sans 300: role/subtitle text at large sizes (hero subtitle)
```

---

## Type scale

```
                    Desktop (>768px)    Mobile (<768px)
Hero name:          56px / 1.1          36px / 1.15
Page titles (H1):   40px / 1.2          28px / 1.25
Section heads (H2): 26px / 1.3          22px / 1.3
Card titles (H3):   20px / 1.35         18px / 1.35
Body text:          17px / 1.7          16px / 1.65
Nav links:          15px / 1.4          15px / 1.4
Metadata:           13px / 1.5          13px / 1.5
Tags/pills:         12px / 1.4          12px / 1.4
```

**Layout widths:**
- Body text max-width: 680px (optimal reading line length at 17px)
- Cards grid and hero: 1120px
- Outer page: 1200px

---

## Color system

All colors are CSS custom properties. Both light and dark mode are defined.

**Light mode (default):**
```
--text-primary: #1C1917        Stone 900, warm near-black
--text-secondary: #78716C      Stone 500, for descriptions
--text-tertiary: #A8A29E       Stone 400, for dates, least-important metadata
--accent: #B45309              Amber 700, warm and confident
--accent-hover: #92400E        Amber 800
--accent-subtle: #FEF3C7       Amber 100, for tag pill backgrounds
--bg-primary: #FFFFFF           main page background
--bg-secondary: #FAFAF9        Stone 50, card surfaces
--bg-tertiary: #F5F5F4         Stone 100, alternate sections
--border: #E7E5E4              Stone 200
--border-hover: #D6D3D1        Stone 300
```

**Dark mode:**
```
--text-primary: #FAFAF9        Stone 50
--text-secondary: #A8A29E      Stone 400
--text-tertiary: #78716C       Stone 500
--accent: #F59E0B              Amber 500, brighter for dark backgrounds
--accent-hover: #FBBF24        Amber 400
--accent-subtle: #451A03       Amber 950, for tag pill backgrounds
--bg-primary: #1C1917          Stone 900
--bg-secondary: #292524        Stone 800
--bg-tertiary: #1C1917         Stone 900
--border: #44403C              Stone 700
--border-hover: #57534E        Stone 600
```

**Where colors are used:**
- Accent (amber) appears ONLY on: links, active nav item, tag pill text, card hover title shift, "View project →" links. Never on backgrounds or large surfaces.
- Category tags: accent-subtle background + accent text color. Filled pills, not outlined.
- Card backgrounds: bg-secondary. Page backgrounds: bg-primary. Alternating homepage sections: bg-primary / bg-tertiary for rhythm.
- Secondary text for dates/descriptions. Tertiary only for the least important elements (e.g., "min read").

---

## Spacing system

Base unit: 4px. Everything is a multiple.

```
--space-xs:   4px     between tag pills
--space-sm:   8px     between metadata items (date · read time)
--space-md:   16px    between card title and description
--space-lg:   24px    padding inside cards, gap between cards in grid
--space-xl:   40px    between card grid and section heading
--space-2xl:  64px    between major homepage sections (desktop), 40px mobile
--space-3xl:  96px    hero top/bottom padding (desktop), 56px mobile
```

---

## CSS architecture

All custom properties go in a single `:root` block in a global CSS file. Use Astro scoped styles for component-specific overrides. No CSS framework or utility classes.

```css
:root {
  --font-heading: 'Newsreader', Georgia, serif;
  --font-body: 'IBM Plex Sans', -apple-system, sans-serif;

  --text-hero: 56px;
  --text-h1: 40px;
  --text-h2: 26px;
  --text-h3: 20px;
  --text-body: 17px;
  --text-nav: 15px;
  --text-meta: 13px;
  --text-tag: 12px;

  --text-primary: #1C1917;
  --text-secondary: #78716C;
  --text-tertiary: #A8A29E;
  --accent: #B45309;
  --accent-hover: #92400E;
  --accent-subtle: #FEF3C7;
  --bg-primary: #FFFFFF;
  --bg-secondary: #FAFAF9;
  --bg-tertiary: #F5F5F4;
  --border: #E7E5E4;
  --border-hover: #D6D3D1;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 64px;
  --space-3xl: 96px;

  --max-content: 680px;
  --max-page: 1120px;
  --max-outer: 1200px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #FAFAF9;
    --text-secondary: #A8A29E;
    --text-tertiary: #78716C;
    --accent: #F59E0B;
    --accent-hover: #FBBF24;
    --accent-subtle: #451A03;
    --bg-primary: #1C1917;
    --bg-secondary: #292524;
    --bg-tertiary: #1C1917;
    --border: #44403C;
    --border-hover: #57534E;
  }
}

@media (max-width: 768px) {
  :root {
    --text-hero: 36px;
    --text-h1: 28px;
    --text-h2: 22px;
    --space-2xl: 40px;
    --space-3xl: 56px;
  }
}
```

---

## Component specs

### Navigation

Desktop: horizontal bar. "RG" left-aligned in Newsreader 600 at 20px. No background shape or circle, just the letters. Nav links right-aligned: Writing, Projects, Speaking, About in IBM Plex Sans 500 at 15px. Active page gets accent-colored text (no underline, no bold, no background highlight).

Sticky: yes. A 1px bottom border in `var(--border)` that only appears after scroll (add/remove class via JS scroll listener or use `backdrop-filter` with a subtle background).

Mobile: "RG" left, hamburger right. Standard slide-in or dropdown menu.

### Homepage hero

Left-aligned. No image, no graphic, no headshot.

```
[96px top padding on desktop, 56px on mobile]

Rohit Garg                                ← var(--text-hero), Newsreader 600, text-primary
Head of Product & Design, Times of India  ← 20px, IBM Plex Sans 300, text-secondary
                                          ← 16px gap
14 years building products at scale.      ← var(--text-body), IBM Plex Sans 400, text-secondary
Writing about what actually works.
                                          ← 24px gap
LinkedIn   Email                          ← 15px, IBM Plex Sans 500, accent color
                                             text links, underline on hover

[64px bottom padding]
```

### Writing cards: featured (homepage only)

Full content-width card. Used for the most recent post on the homepage only.

```
┌───────────────────────────────────────────────┐
│ [Image: 16:9 aspect-ratio, object-fit: cover] │
│  border-radius: 8px 8px 0 0                   │
├───────────────────────────────────────────────┤
│  padding: 24px                                 │
│                                                │
│  [Tag pill]  ← 12px/500 IBM Plex Sans,        │
│                bg: accent-subtle, color: accent │
│                padding: 4px 10px               │
│                border-radius: 4px              │
│                margin-bottom: 12px             │
│                                                │
│  Card title  ← 26px Newsreader 500            │
│                line-height: 1.3                │
│                margin-bottom: 8px              │
│                                                │
│  Description ← 15px IBM Plex Sans 400         │
│                color: text-secondary           │
│                margin-bottom: 12px             │
│                                                │
│  Jan 31, 2026 · 5 min read                    │
│                ← 13px, text-tertiary           │
└───────────────────────────────────────────────┘
```

Card background: bg-secondary. Border: 0.5px solid var(--border). Border-radius: 8px. Entire card is a link.

### Writing cards: grid

2-column grid on desktop, 1-column on mobile. Gap: 24px.

Same structure as featured but:
- Image aspect ratio: 3:2
- Title: 20px Newsreader 500 (smaller than featured)
- No description text (just tag, title, metadata)

Hover: image zooms to `scale(1.03)` with `overflow: hidden` on the image container. Border color shifts to border-hover. Title color shifts to accent. Transition: 200ms ease. No shadows.

### Project cards

2-column grid on desktop, 1-column on mobile. Gap: 24px.

```
┌──────────────────────────────────┐
│ [Screenshot: 16:9, object-fit]   │
├──────────────────────────────────┤
│  padding: 24px                    │
│                                   │
│  Project Name  ← 20px Newsreader │
│  Description   ← 15px body       │
│                                   │
│  ┌──────┐ ┌─────────┐           │
│  │React │ │Three.js │  ← tech   │
│  └──────┘ └─────────┘    pills  │
│  12px, bg-tertiary, text-secondary│
│  padding: 4px 8px, radius: 4px   │
│                                   │
│  ┌──────────────┐                │
│  │Built with AI │  ← process    │
│  └──────────────┘    pill       │
│  12px, accent-subtle bg, accent   │
│                                   │
│  View project →                   │
│  14px, accent color, text link    │
└──────────────────────────────────┘
```

Separate the tech pills from the "Built with AI" pill visually. Different background color, different row. Whole card is also clickable.

### Speaking page: timeline

```html
<!-- Year header -->
<h2>2025</h2>

<!-- Timeline container with left border -->
<div class="timeline">

  <!-- Entry -->
  <div class="timeline-entry">
    <span class="timeline-month">December</span>
    <div class="timeline-content">
      <h3>IIM Lucknow (Noida Campus)</h3>       <!-- 20px Newsreader 500 -->
      <p class="talk-title">Lessons from 15 Years in Product Management</p>  <!-- 15px, text-secondary -->
      <p class="talk-desc">A session for students on lessons from...</p>      <!-- 13px, text-tertiary -->
      <a href="...">View details →</a>           <!-- 14px, accent -->
    </div>
  </div>

</div>
```

The timeline uses a 2px left border in var(--border) with dots at each entry point. Month label sits to the left of or above the content. Venue/conference name is the primary text (it's what signals credibility). Talk title is secondary.

### About page

Desktop: CSS grid or flexbox, two columns. Left column: headshot image, 240px wide, border-radius 12px. Right column: name, title, body text. Stacks vertically on mobile with headshot at full width.

Mentoring section: separated by a horizontal rule or bg-tertiary background block. Should be visually distinct from the main bio.

Do not change any existing copy on this page.

### Article pages

Max content width: 680px, centered.

```
[Nav]

Writing / Article Title              ← breadcrumb, 13px
                                       "Writing" is accent-colored link

# Article Title                      ← var(--text-h1), Newsreader 600

January 30, 2026 · 7 min read       ← 13px, text-tertiary

[Lead image: max-width 680px, 16:9, border-radius 8px]

Body text at 17px/1.7 line-height...

## Section heading                   ← 24px Newsreader 500
                                       48px top margin, 16px bottom margin

### Sub-heading                      ← 20px Newsreader 500
                                       32px top margin, 12px bottom margin

> Blockquote                         ← left border 3px accent
                                       padding-left 24px
                                       Newsreader 400 italic

[In-body images: full content width, border-radius 8px, 32px vertical margin]

Links: accent color, underline on hover only
Bold: IBM Plex Sans 600
Paragraph spacing: 1.5em margin-bottom
```

### Footer

Minimal. Same across all pages.

```
[hr or border-top]

© 2026 Rohit Garg        LinkedIn · Email

← 13px, text-tertiary. Links in text-secondary.
```

No "Built with Claude Code" badge.

### 404 page

Create `/src/pages/404.astro` (or whatever the Astro convention is).

Content: nav bar, then centered block with "404" in Newsreader at 80px (decorative, text-tertiary), a line of copy ("This page doesn't exist, but these might help:"), and links to Home, Writing, and Projects in accent color.

---

## Image handling

- All card images: enforce aspect ratio via CSS `aspect-ratio` property + `object-fit: cover`
- Featured cards: 16:9
- Grid cards: 3:2
- Project cards: 16:9
- Lead images on articles: max-width 680px, 16:9, border-radius 8px
- In-body article images: max-width 100% of content area, border-radius 8px, 32px vertical margin
- All images need explicit `width` and `height` attributes for CLS prevention
- Below-fold images: `loading="lazy"`

---

## Performance

- Font loading: `font-display: swap` for both families. Preload Newsreader woff2.
- Images: already .webp (keep this). Add `loading="lazy"` for below-fold images.
- Dark mode: `prefers-color-scheme` media query in CSS. No JS toggle needed for v1 (can add later).
- Target: Lighthouse performance > 90. Homepage loads under 2s on fast 3G.
