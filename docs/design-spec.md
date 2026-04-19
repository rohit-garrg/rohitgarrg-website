# Design spec — rohitgarrg.com

## §1 Brief

### What this site is

A working notebook and portfolio for Rohit Garg, Head of Product & Design at Times of India. Essays sit alongside side projects and talks. The site should read as a smart person's notebook, well-lit. Not a resume. Not a content marketing machine. Not a designer portfolio.

### Who visits it

1. **Product and design peers.** Senior ICs and managers arriving from a Slack link, reading an essay, ideally subscribing. Highest-volume visitor. The site optimises for their experience.
2. **Recruiters and potential collaborators.** Checking credibility before a meeting. They need About and Projects to load fast and answer "is this the right person?"
3. **Students and juniors.** Arriving from a conference talk or a mentoring DM, looking for writing on the craft.
4. **Parents and App Store visitors.** Specifically landing on `/planetia` from a press link or App Store listing. A distinct audience with a distinct layout.

### Positioning

A senior product leader writing plainly about product, AI, leadership, and the occasional book review. The site must not feel like personal branding. It must not feel like a resume. It must feel like a well-organised notebook.

### Voice rules

These are non-negotiable. An earlier draft of the specs violated most of them; reinforcing them here.

- **Plain, direct, slightly wry.** Short sentences mixed with longer ones. Contractions. First person for personal work, "we" for team work.
- **Specific over abstract.** Use real numbers and names: "240M monthly readers", "team of 60+", "38 books in three years". Cut vague claims: impact, thought leadership, at scale, in today's landscape.
- **No em dashes anywhere.** Not in essay copy, not in UI microcopy, not in the site's chrome. Use a comma, a period, or split the sentence. This is a hard rule, not a preference.
- **No "dash-aside-dash" parenthetical patterns.** Even with parentheses or commas. If the aside is worth saying, make it its own sentence.
- **No "it's not X, it's Y" constructions.** State what it is.
- **No participial phrases after commas** ("he shipped the feature, breaking production"). Use two sentences.
- **No slop phrases:** unlock, leverage, at the end of the day, in today's fast-paced world, thought leadership, impact (as a verb), robust, seamless, navigate, delve, dive in.
- **No emoji** in UI copy.
- **American spelling throughout the site.** Previous drafts mixed British and American. Default to American for consistency with the typography (Newsreader is an American-leaning serif). "Color", "customize", "favorite". This is a convention, not an identity claim.
- **When in doubt about new copy, leave a `TODO(rohit)` flag instead of inventing.**

### Content principles

The writing is a gamut. Product, AI, leadership, book reviews, projects. Never describe the site or the essays as "on product" or "on leading product at scale". Use language like "essays on product, AI, leadership, and the occasional book review" or "notes and essays". This was the single most-corrected phrase during the design process.

Every blog card has a lead image. On home and on the index. A card without an image is unfinished.

The newsletter is the primary conversion. Not a contact form. Treat it as the hero CTA.

Show the work, don't describe it. Projects prioritise real screenshots over prose.

### Non-goals

No hero video, parallax, or scroll-jacking.

No dark mode at launch. Tokens are structured to allow it later, but dark variants are not defined yet.

No blog comments, reactions, share counters, or social share buttons beyond the three on the post page.

No subscribe pop-ups, exit-intent prompts, or interstitials.

No auto-play media of any kind.

### Visual direction

Warm-cool and tactile. Periwinkle, sage, butter, berry, clay, and slate on off-white paper. Newsreader for display and article body, Geist for UI, Geist Mono for small caps and metadata. Organic radii on hero surfaces. No perfectly symmetric roundings. Shadows are soft and periwinkle-tinted. No grey drop shadows anywhere.

The visual reference is a well-bound notebook on a warm wooden desk in soft daylight. Not a SaaS landing page. Not a Medium blog. Not a designer portfolio on Awwwards.

---

## §2 Tokens

Paste these into `tailwind.config.js` or a `tokens.css` file. Colour values are oklch. Generate hex fallbacks once with a converter and commit both — Safari pre-15.4 and some build chains still choke on oklch.

### Colour — neutrals

| Token | oklch | Use |
|---|---|---|
| `--ink` | `oklch(0.22 0.02 250)` | Primary text, headings, ink-pill buttons |
| `--ink-2` | `oklch(0.34 0.02 250)` | Secondary text, excerpts, article body |
| `--mute` | `oklch(0.52 0.015 250)` | Metadata, eyebrow small-caps |
| `--line` | `oklch(0.90 0.01 245)` | Hairlines, card borders |
| `--paper` | `oklch(0.985 0.005 245)` | Page background |
| `--paper-2` | `oklch(0.965 0.008 245)` | Card backgrounds, fill surfaces |
| `--paper-3` | `oklch(0.94 0.01 245)` | Strip backgrounds |

### Colour — accents

| Token | oklch | Use |
|---|---|---|
| `--peri` | `oklch(0.68 0.13 270)` | Primary accent, periwinkle |
| `--peri-ink` | `oklch(0.45 0.15 270)` | Links, italic display highlights |
| `--peri-pale` | `oklch(0.94 0.03 270)` | Blob backgrounds, inline CTA fill |
| `--sage` | `oklch(0.78 0.08 160)` | Secondary accent, AI tag, sage bead |
| `--sage-pale` | `oklch(0.95 0.02 165)` | Mentoring block, newsletter gradient |
| `--butter` | `oklch(0.92 0.06 90)` | Product tag, Planetia sun |
| `--berry` | `oklch(0.70 0.12 15)` | Design tag, sparing highlight |
| `--clay` | `oklch(0.72 0.09 55)` | Books tag |
| `--slate` | `oklch(0.65 0.04 230)` | Projects tag |

### Tag colour mapping

| Tag | Token | Rationale |
|---|---|---|
| AI | `--sage` | Calm, natural |
| Leadership | `--peri` | Primary accent, most-used tag |
| Product | `--butter` | Warm, approachable |
| Design | `--berry` | Vivid, visible |
| Books | `--clay` | Warm paper tone |
| Projects | `--slate` | Cool, utilitarian |

Every tag has a unique accent. The earlier spec collided Leadership with Projects and Books with Design. Don't reintroduce collisions.

### Contrast verification

All body text and UI combinations must hit WCAG AA (4.5:1 for body, 3:1 for large text). Verified pairings:

| Foreground | Background | Ratio | Use |
|---|---|---|---|
| `--ink` | `--paper` | 11.8:1 | Headings, buttons |
| `--ink-2` | `--paper` | 7.2:1 | Body copy |
| `--ink-2` | `--paper-2` | 6.8:1 | Card body |
| `--mute` | `--paper` | 4.6:1 | Metadata only, never body |
| `--peri-ink` | `--paper` | 5.9:1 | Links |
| `--peri-ink` | `--peri-pale` | 4.8:1 | Inline CTA, italic highlights |
| `--peri-ink` | `--sage-pale` | 5.2:1 | Mentoring block link |
| `--ink` | `--butter` | 9.1:1 | Text over tag bead |
| `--ink` | `--berry` | 4.6:1 | Text over tag bead (borderline, use large only) |

Rerun contrast checks if any oklch value changes. Don't ship with ratios under 4.5:1 for body text.

### Typography

Three families. Subset before shipping.

| Family | Weights to ship | Use |
|---|---|---|
| Newsreader | 400 italic, 400 roman, 500 roman | Display, H1-H3, article body, pull-quotes |
| Geist | 400, 500 | UI, navigation, buttons, captions |
| Geist Mono | 400, 500 | Eyebrow small caps, metadata, dates, tags |

**Loading strategy.** Self-host WOFF2 with `font-display: swap`. Preload only the roman 400 and 500 of Newsreader and Geist. Italic Newsreader and all Geist Mono load normally. Subset to Latin-extended; skip Cyrillic and Greek. Target: under 90KB total font payload over the wire.

**Do not ship.** JetBrains Mono, Lora, Fraunces. These were pulled in by abandoned direction explorations and are currently in the prototype's Google Fonts URL. Remove from the final `<head>`.

**Type scale (desktop):**

| Token | Size / line-height / letter-spacing | Family |
|---|---|---|
| `display-xl` | `clamp(44px, 5.4vw, 72px) / 1.02 / -0.025em` | Newsreader 500 |
| `display-lg` | `60px / 1.02 / -0.025em` | Newsreader 500 |
| `display-md` | `46px / 1.05 / -0.02em` | Newsreader 500 |
| `h2` | `40px / 1.1 / -0.02em` | Newsreader 500 |
| `h3` | `24px / 1.15 / -0.012em` | Newsreader 500 |
| `body-lg` | `20px / 1.62 / normal` | Newsreader 400, article only |
| `body-md` | `17px / 1.55 / normal` | Geist 400 |
| `body-sm` | `14.5px / 1.5 / normal` | Geist 400 |
| `caption` | `13px / 1.4 / normal` | Geist 400 |
| `mono-xs` | `11px / 1 / 0.1em uppercase` | Geist Mono 400 |
| `mono-xxs` | `10.5px / 1 / 0.14em uppercase` | Geist Mono 500 |

**Mobile scale.** Scale display tokens down by ~30%. `body-lg` → 17px. `body-md` → 15px. Test `display-xl` at 375px width specifically; it should not overflow the viewport or break onto three lines.

### Radii

Organic by design. Do not quantise to a 4/8/16 scale. The asymmetry is the character.

| Token | Value | Use |
|---|---|---|
| `radius-pill` | `999px` | Buttons, chips, search |
| `radius-sm` | `14px` | Small cards, monitor frames (App Store button) |
| `radius-md` | `20px` | Tag bubble on portrait, inner cards |
| `radius-lg` | `22px` | Writing cards, project cards |
| `radius-xl` | `28px` | Big project cards, CTA cards |
| `radius-organic-portrait` | `46% 54% 48% 52% / 40% 58% 42% 60%` | Hero portrait frame |
| `radius-organic-a` | `40px 48px 44px 52px / 44px 52px 40px 48px` | Newsletter, post-end CTA |
| `radius-organic-b` | `30px 40px 32px 44px / 40px 32px 44px 30px` | Index featured cover |
| `radius-organic-bead` | `40% 60% 50% 50% / 55% 45% 55% 45%` | Tag beads, small pebbles |
| `radius-organic-chip` | `40% 60% 55% 45% / 55% 45% 60% 40%` | Feature chips, blob icons |

### Spacing

Document-scale padding uses a 24/40/80 rhythm. Component padding uses 10/14/18/22/28/36/60/80.

| Token | Value | Use |
|---|---|---|
| `space-page-x-desktop` | `80px` | Section horizontal padding |
| `space-page-x-tablet` | `48px` | Section horizontal padding at 768-1023 |
| `space-page-x-mobile` | `24px` | Section horizontal padding at ≤767 |
| `space-section-y` | `90px` | Vertical rhythm between sections |
| `space-section-y-tablet` | `70px` | Tablet |
| `space-section-y-mobile` | `56px` | Mobile |
| `space-card-p` | `22px` | Card inner padding |
| `space-cta-p` | `56px 60px` | Newsletter and CTA inner padding |

### Shadows

All periwinkle-tinted. No grey drop shadows on this site. Fixed from the earlier spec, which defined `shadow-card-hover` as a grey shadow despite the rule.

| Token | Value | Use |
|---|---|---|
| `shadow-card-hover` | `0 20px 40px -28px oklch(0.45 0.15 270 / 0.28)` | Writing card hover |
| `shadow-portrait` | `0 30px 60px -30px oklch(0.45 0.15 270 / 0.35)` | Hero portrait |
| `shadow-cta` | `0 20px 40px -24px oklch(0.45 0.15 270 / 0.4)` | Newsletter form |

### Motion

Hover lift: `transform: translateY(-2px)` plus a fade to `shadow-card-hover`, with `transition: transform 200ms ease, box-shadow 200ms`. On mobile, skip the hover lift entirely.

No page-scroll animations. No parallax. No intro splash. No scroll-reveal.

All motion wraps in a reduced-motion query:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition: none !important;
    animation: none !important;
  }
  .writing-card:hover { transform: none !important; }
}
```

### Iconography

Stroke-based line icons, 1.5px stroke, 14-16px nominal size. Use Lucide or Iconoir as the source. Don't ship custom SVG icons unless a specific glyph is unavailable.

### Dark mode

Not shipping at launch. No dark tokens are defined yet. The neutrals are light-only. When dark mode is built, it will need a full second pass on all tokens (ink, paper, accents, shadows). Don't advertise dark mode in the UI before the tokens exist.

---

## §3 Stack and data model

### Stack

Astro plus Tailwind (tokens pasted into `tailwind.config.js`) plus MDX plus Vercel. The current site is Astro. Stay there.

### Data model

| Type | Source | Frontmatter |
|---|---|---|
| Posts | MDX in `src/content/posts/` | `title, date, tag, excerpt, readMin, cover, nextPosts?, series?, seoTitle?, seoDescription?` |
| Projects | MDX in `src/content/projects/` | `name, kind, year, blurb, stack[], stat, visual, url, order` |
| Speaking | JSON in `src/content/speaking.json` | Array of `{year, month, date, venue, title, blurb, link?}` |
| Planetia | MDX in `src/content/planetia.mdx` | `title, tagline, lede, features[], screenshots[], appStoreUrl` |
| About | MDX in `src/content/about.mdx` | Paragraphs plus mentoring plus contact |
| Config | `src/config/meta.ts` | Hero stats, now-strip items, footer strings |

`src/config/meta.ts` exists specifically so Rohit can update hero stats ("14+ years", "38 books") without editing components.

---

## §4 Conventions

### File conventions

- Pages in `src/pages/`.
- Shared UI components in `src/components/`. One component per file.
- Content collections in `src/content/`:
  - `posts/` — MDX with frontmatter `{ title, date, tag, excerpt, readMin, cover, nextPosts?, series?, seoTitle?, seoDescription? }`
  - `projects/` — MDX with frontmatter `{ name, kind, year, blurb, stack, stat, visual, url, order }`
  - `speaking.json` — array
  - `planetia.mdx` — single file
  - `about.mdx` — single file
- Site config in `src/config/meta.ts` for hero stats, now-strip items, footer strings. This is where "14+ years", "38 books", and similar stats live so they can be updated without editing components.
- Images in `public/images/` for static assets. Processed images in `src/assets/` when Astro's image pipeline is in play.
- Tailwind classes preferred. One-off CSS only when Tailwind can't express the value (organic radii, for example).

### Accessibility (non-negotiable)

- Colour contrast: body text ≥ 4.5:1, large text ≥ 3:1. Ratios are pre-computed in `design_tokens.md`. Verify with axe if you touch a token.
- Focus rings: visible, use `outline: 2px solid var(--peri-ink); outline-offset: 2px`. Never `outline: none` without a replacement.
- Tab order: top-to-bottom, left-to-right through the visual hierarchy.
- Alt text on every image. Decorative images get `alt=""`.
- Headings: one H1 per page. Don't skip levels.
- Forms: every input has a `<label>`, visually-hidden is fine.
- Skip-to-content link at the top of every page. Visible on keyboard focus.

### Performance budget

- LCP under 2.5s on slow 3G.
- Total JS under 40KB per route. Astro makes this easy.
- Font payload under 90KB over the wire. Self-host WOFF2 with `font-display: swap`. Subset to Latin-extended. Preload Newsreader 400/500 and Geist 400/500 roman only.
- Lead images: responsive with `srcset`, AVIF primary with WebP and JPEG fallbacks. Source files are 1600×1200.
- No font families beyond the three specified. The prototype HTML includes extra fonts from abandoned directions. Remove before shipping.

### Nav active state

- On `/`: no nav link is active. User is home.
- On `/writing` and `/writing/[slug]`: Writing is active.
- On `/projects` and `/projects/[slug]`: Projects is active.
- On `/planetia`: Planetia is active.
- On `/speaking`: Speaking is active.
- On `/about`: About is active.

Earlier guidance made Writing active on Home. That was a bug.

### Voice and copy rules

These are strict. Previous drafts violated most of them.

- **No em dashes anywhere in site copy.** Not in essay body, not in UI microcopy, not in nav, not in footer. Use commas, periods, or split the sentence.
- **No "dash-aside-dash" parenthetical patterns.** Even if you write them with commas or parens. If the aside matters, make it its own sentence.
- **No "it's not X, it's Y" constructions.** State what it is.
- **No participial phrases after commas.** Use two sentences.
- **No slop phrases.** Not a complete list, but starting points: unlock, leverage, at the end of the day, in today's fast-paced world, thought leadership, impact (as a verb), robust, seamless, navigate, delve, dive in.
- **No emoji** in UI copy.
- **American spelling throughout** for consistency. Color, customize, favorite. Not colour, customise, favourite.
- The writing is a gamut. Product, AI, leadership, book reviews, projects. Never describe the site as "on product" or "on leading product at scale". Use "essays on product, AI, leadership, and the occasional book review" or "notes and essays".
- Specific over abstract. If you're writing new copy, find a specific number, name, or detail.
- First person, contractions. Plain, dry, slightly wry.
- When in doubt about copy, leave it empty with a `TODO(rohit)` flag. Don't invent.

### Visual rules

- Palette is locked: periwinkle, sage, butter, berry, clay, slate on paper neutrals. See `design_tokens.md`. Don't introduce new hues without updating the tokens file and checking contrast ratios.
- Each of the six tags has a unique accent. Don't reintroduce collisions.
- Organic radii on hero surfaces (portrait, newsletter CTA, post-end CTA). Don't quantise them to a uniform scale. The asymmetry is the character.
- **All shadows are periwinkle-tinted.** Never grey. An earlier tokens file defined a grey shadow as the card-hover default; that was a contradiction and has been fixed.
- Newsreader for display and article body. Geist for UI. Geist Mono for small-caps metadata. Don't swap fonts.
- No hero animations, scroll-reveals, or page transitions.
- Hover affordance on cards: `translateY(-2px)` plus coloured shadow. Nothing more. Disabled on touch devices.
- Always respect `prefers-reduced-motion: reduce`. See `design_tokens.md` for the implementation pattern.

### Things to avoid

- Don't add dark mode UI until Rohit asks. Tokens are not defined for dark yet.
- Don't ship without a decision on analytics consent.
- Don't reintroduce the fabricated "4,280 subscribers" claim. Any social proof needs to be real and current.
- Don't hardcode a "last updated" date anywhere. It rots.
- Don't add OG-image generation from random templates. If template-based, use the site's palette and typography. If static, use Rohit's uploads.
- Don't install heavy UI libraries (Material, Chakra, shadcn). Tailwind plus a few headless primitives is enough.
- Don't fetch a JS framework on the homepage. Astro islands only where interaction is needed (search, filter, newsletter form).

---

## §5 Per-screen specs

Read `design_brief.md` and `design_tokens.md` first. Open `prototypes/index.html` alongside. Every section here maps to a screen in the prototype. Copy in this doc is final. Lift it verbatim unless Rohit revises it.

The copy in this version has been cleaned of em dashes and parenthetical aside patterns. Earlier drafts violated the brief's voice rules. Do not reintroduce them.

---

### Global

#### Breakpoints

Three breakpoints, not two. The earlier spec only defined 768px and produced a broken mid-range.

| Range | Name | Notes |
|---|---|---|
| ≥1024px | Desktop | Full grid layouts |
| 768-1023px | Tablet | Reduced padding, post article drops to two-column, card grids become two-up |
| ≤767px | Mobile | Single column, collapsed nav, reduced typography |

Container max-width: 1440px centred. Content never goes edge-to-edge on desktop.

#### Navigation (sticky top)

Left: brand mark plus "Rohit Garg". Mark is a 28×28 blob (`radius: 10px 14px 10px 14px`) with periwinkle-to-sage linear gradient at 135°, lowercase italic "r" in Newsreader 14px, white. The brand mark and name together link to `/`.

Centre: text links for **Writing, Projects, Planetia, Speaking, About**. Font: Geist 14px. Inactive state uses `var(--ink-2)`. Active state uses `var(--peri-ink)` with a 6px-tall sage underline bar (opacity 0.55, `radius: 4px`) positioned 6px below baseline.

Right: "Subscribe" pill button. `var(--ink)` background, paper text, Mail icon 14px, 10×16 padding, `radius: 999px`.

Height ~70px. 22×40 padding. Background: `color-mix(in oklch, var(--paper) 88%, transparent)` with `backdrop-filter: blur(10px)`. Border-bottom 1px `var(--line)`.

**Active state rules.** On `/` (home), no nav link is active. The user is home. On `/writing` and `/writing/[slug]`, Writing is active. On `/projects`, Projects is active. And so on. Earlier specs made Writing active on home, which confused the signal.

#### Footer

Four columns: Signature (spans 1.4fr), Writing, Projects, Elsewhere. Meta row below, full width, `border-top: 1px var(--line)`, Geist Mono 12px `var(--mute)`.

- Signature: Newsreader 20px/1.3, max 34ch. Copy: "Product and design at scale. Tinkering with AI. Notes from a product leader in Delhi-NCR."
- Writing column: All essays · AI · Leadership · Books
- Projects column: Planetia · Office Survivors · Solar System Explorer
- Elsewhere column: LinkedIn · Twitter / X · RSS · hello@rohitgarrg.com
- Meta row left: `© 2026 Rohit Garg · Delhi-NCR`. Meta row right: `Built with Astro on Vercel`. The "last updated" date has been removed; it was hardcoded and would rot.

#### Responsive behaviour

At 768-1023px: nav links show, horizontal padding 48px, card grids drop to two columns, hero becomes single column with portrait above text.

At ≤767px: nav links collapse into a hamburger that opens a full-screen overlay. Horizontal padding 24px. Vertical padding 56px. All multi-column layouts stack.

---

### 1. Home

#### Hero

Two-column grid (1.2fr / 0.9fr), 60px gap, 80/80/90/80 padding.

**Left column:**
- Eyebrow (mono-xs, `var(--peri-ink)`): 8px periwinkle dot, followed by "Head of Product & Design · Times of India".
- H1 (display-xl, Newsreader 500). Copy: `Building <blob><em>products</em></blob> for 240M readers. Tinkering with AI at night.` The word "products" is italic, wrapped in a pseudo-element blob (`radius: 60% 70% 50% 80% / 60% 55% 70% 50%`, `-10px/-14px` inset, `var(--peri-pale)` background, `z-index: -1`).
- Lede (body-lg, max 46ch, `var(--ink-2)`). Copy: "I'm Rohit. I lead Product and Design at Times of India, India's largest digital news publisher, with a team of 60+. On the side I build little things, read a lot, and write here about what actually happens inside a product org at scale."
- Meta row: three spans separated by 26px. "14+ years shipping product", "60+ person team", "38 books in three years". Numbers use `var(--ink)` 500; labels use `var(--mute)`. These numbers must be editable from a single config file (`src/config/meta.ts`); do not hardcode into the component.
- Actions: `[Read the writing]` (primary ink pill) plus `[See Planetia]` (ghost pill, 1px `var(--line)` border).

**Right column, portrait:**
- Frame: aspect 4/5, `radius: 46% 54% 48% 52% / 40% 58% 42% 60%`, `shadow-portrait`. Image: `/images/rohit-portrait.webp` with AVIF source and JPEG fallback. `object-position: 50% 15%`.
- Floating tag card: absolute, `left: -22px, bottom: 22px`. Paper background, `var(--line)` border, `radius: 20px`, 12×16 padding. Contents: 34×34 sage blob icon with Spark glyph, then two lines. Small eyebrow "Currently". Then: "Shipping Planetia for iPad and drafting essay #43." This copy lives in the same `meta.ts` config so it can change without a code edit.

**Background decor:** two absolute-positioned blobs behind content. Sage-pale blob top-left (280×280, opacity 0.7). Peri-pale blob bottom-right (200×200, opacity 0.8). Both `z-index: -1`.

#### Now-strip

Full-width strip, `var(--paper-2)` background, border top and bottom. 22×80 padding, Geist 13px.

Contents:
- Mono label "Currently"
- "Head of P&D · Times of India" with periwinkle bead
- "Shipping Planetia on the App Store" with sage bead
- "Reading The Unaccountability Machine" with clay bead. Book title in italic.

Beads are 22×22 with `radius-organic-bead`. Inline separators are 4×4 dots of `var(--line)`.

#### Writing teaser section

Section header:
- Eyebrow: 10px periwinkle pebble, then "Writing" (mono-xxs).
- H2 (Newsreader 40px): "Essays on product, AI, leadership, and the occasional book review."
- Right-side CTA: pill "See all writing →".

Three-column grid 1.3fr / 1fr / 1fr, 24px gap. First card is featured. Wider aspect cover (16/11), H3 at 28px. Other two cards use 5/4 aspect covers, H3 at 22px, body copy 13.5px.

**Writing card structure:**
- Cover: lead image per post. 1600×1200 source, AVIF primary with WebP fallback, JPEG as last resort. Cover is cropped by the card using `object-fit: cover` and a defined `aspect-ratio`. Writers upload one image per post; the site handles crops.
- Body: meta (mono-xs `var(--mute)`, "Apr 09, 2026 · 9 min read"), H3 title, excerpt, tag chip at bottom (pebble bead plus label, `var(--paper-2)` background, pill border).
- Card: `radius: 22px`, `border: 1px var(--line)`, hover `translateY(-2px)` plus `shadow-card-hover`. On touch devices, hover lift is disabled.

Populate with the top three posts: `ai-coworker` (featured), `38-books`, `scaling-intuition`.

#### Projects teaser section

Same header pattern. Sage pebble and "Projects" eyebrow. H2: "Side projects, experiments, and things I'm tinkering with."

Three-column equal grid. Each card:
- Visual block, aspect 5/3. Three visuals: `planetia`, `office`, `explorer`.
- Body: H3 (shortened name), paragraph, stack pills row (Geist Mono 11.5px, paper-2 background).

#### Newsletter CTA

Full-bleed-but-inset block. 30/80/100/80 margin. `radius-organic-a`. Gradient background (145°, peri-pale 0% to sage-pale 120%). 1px border `oklch(0.90 0.04 260)`. 70px inner padding. Two absolute accent blobs inside (periwinkle top-right, sage bottom-left; low opacity).

Content (max-width 760px):
- Eyebrow: Mail icon plus "The newsletter" (mono-xs `var(--peri-ink)`).
- H2 (Newsreader 46px): "A short note in your inbox most _Sundays_." Italic emphasis on Sundays, `var(--peri-ink)`.
- Body: "One essay, roughly weekly. Product, AI, leadership, and the occasional book I could not shut up about. No ads, no course funnels, no five-part email sequences. Unsubscribe with one click."
- Form: pill-shaped (`radius: 999px`, paper background, 6px padding, `shadow-cta`). Input placeholder "you@work.com". Button: ink pill, "Subscribe →".
- Proof row: "Free forever. One click to unsubscribe." No subscriber count. The earlier spec claimed "4,280 product & design folks"; this was fabricated. When the list grows large enough to mention honestly, Rohit can update this line.

#### Newsletter form states

- Idle: placeholder "you@work.com", enabled submit.
- Loading: input disabled, button shows spinner, "Subscribing..." text.
- Success: form replaced with a compact confirmation. Copy: "Check your inbox. Buttondown sent a confirmation link." Peri-pale background, `radius-md`.
- Already subscribed: "You're already on the list. Check your inbox for the latest." Peri-pale background.
- Error: inline error under the input. Copy: "Something went wrong. Try again in a moment." Berry text.
- Invalid email: same pattern, inline. Copy: "That doesn't look like a valid email."

---

### 2. Writing (index)

Standard page header: H1 display-lg "Notes on _product_, AI, leadership, and the occasional book review." Sub: "Roughly weekly essays. A mix of the craft of product management, AI as a coworker, and whatever audiobook I finished that week."

#### Filter bar

Horizontal, border top and bottom. Left: chip group. `All writing`, `AI`, `Leadership`, `Product`, `Books`, `Design`, `Projects`. Active chip is ink background. Non-active chips show count (`· 03`) in opacity-60 11px.

Right: search pill (paper-2 background, `var(--line)` border, Search icon plus input "Search essays…").

Search runs client-side over a JSON index generated at build time. At 200+ posts, revisit this.

#### Featured block

Two-column 1.2fr / 1fr, 40px gap, border-bottom. Left: large cover (aspect 5/4, `radius-organic-b`). Right: eyebrow "Featured · AI · Apr 09, 2026", H2 display-md, paragraph, `[Read the essay →]` ink pill.

#### Year groupings

Each year: mono-xxs uppercase header ("2026 · 5 essays"), then a two-column grid of writing cards (same card as home, without the featured variant). Years sorted descending.

#### Filter and search states

- No filter, no query: all posts grouped by year.
- Filter active: "12 essays tagged AI" label above the grid.
- Query active, results: "4 essays matching 'scale'". Bold the query in result excerpts.
- Query active, no results: centred empty state. Copy: "No essays matching that. Try a broader term, or browse all essays." Link back to the default view.
- Filter and query both active: combine, same structure.

---

### 3. Post (article template)

#### Post hero

Two-column 1fr / 1fr, 60px gap, 70/80/40/80 padding, border-bottom.

- Left: meta row (Dot icon plus "AI · Apr 09, 2026 · 9 min read", mono-xs peri-ink). H1 (Newsreader 56px/1.03). Standfirst (18px `var(--ink-2)`, max 44ch). By-line (42×42 organic-bead avatar from portrait, plus name and role).
- Right: cover aspect 4/5, `radius-organic-portrait`, `shadow-portrait`. Falls back to `var(--peri-pale)` if the post has no cover.

#### Article body

Desktop (≥1024px): three-column grid `minmax(160px, 200px) minmax(560px, 680px) minmax(160px, 200px)`, 40px gap, 60/80 padding. Centre justified. The three columns use `min` constraints so they don't break at narrow desktop widths.

Tablet (768-1023px): two-column grid. TOC on the left (collapses to an accordion on scroll), article body on the right. Share column is hidden; share lives at the end of the post instead.

Mobile (≤767px): single column. TOC renders inline at the top as a collapsible "On this page" accordion. Share column is hidden; share appears at the end of the post.

**Centre column body:**
- Newsreader 20px/1.62, max-width 680px.
- Lede paragraph 24px/1.48.
- H2: Newsreader 30px.
- Bulleted lists: 20px left padding.
- Pull-quote: italic 28px/1.3 `var(--peri-ink)`, 3px left border `var(--peri)`, 24px left padding, 2em vertical margin.

**Left column (sticky TOC on desktop):** mono-xxs labels, grouped lists. "On this page" with anchor links (active link peri-ink). "Reading time" with count.

TOC behaviour: on desktop it's sticky with `top: 90px`. If the TOC content exceeds viewport height, it scrolls internally (`overflow-y: auto`, max-height `calc(100vh - 140px)`). On tablet it's inline at the top as an accordion. On mobile the same.

**Right column (sticky share on desktop):** three 40×40 organic-bead buttons. Copy link, RSS, bookmark. Paper-2 background, `var(--line)` border.

**Inline CTA** (placed after five paragraphs): `radius: 26px`, peri-pale background, `oklch(0.88 0.05 270)` border, 28×32 padding. Layout: 44×44 periwinkle blob icon with Mail glyph, then "Enjoying this?" (bold) and "Get the next essay in your inbox, most Sundays." (13.5 ink-2). Ink pill "Subscribe" pushed right.

#### Post-end block

Two-column 1fr / 1fr, 56×60 padding, `radius-organic-a`, `var(--paper-2)` background, 1px border.

- Left: eyebrow "Before you go" (mono-xs peri-ink), H3 (Newsreader 36px) "One essay like this. Most Sundays. Nothing else." Signature row below (avatar plus text).
- Right: same pill-shaped subscribe form as home newsletter. Same state handling.

#### Next-up

Two-column grid of "keep reading" cards. Each card: paper-2 background, `radius: 26px`, 1px border, 28px padding. Mono-xs meta, Newsreader 24px title.

Selection rule: static "keep reading" from the post's frontmatter `nextPosts: [slug, slug]`. Do not do ML similarity matching. If frontmatter is empty, fall back to the two most recent posts excluding the current.

#### Series support

Some posts belong to a series (the book review series, for example). Add optional frontmatter:

```yaml
series:
  name: "Book reviews"
  order: 1
```

When present, render a series bar above the post H1: "Book reviews · Part 1 of 3" with links to previous and next parts in the series. If only one part exists so far, render "Part 1 of an ongoing series" with no links.

---

### 4. Projects

Standard page header: H1 "_Projects_" (display-lg, italic). Sub: "Side projects, experiments, and things I'm tinkering with. Mostly built in evenings and weekends, most with an AI coworker over my shoulder."

#### Project cards (full-width list)

Each card is a two-column split (1.1fr / 1fr), `radius: 28px`, 1px border, paper background. Visual on left (aspect 16/11). Body on right (36×40 padding, centred vertically):

- Mono-xs meta: "iPad app · 2026"
- H2 (Newsreader 34px): full name
- Paragraph (15.5px `var(--ink-2)`)
- Stack pills (Geist Mono 12px, paper-2 background, pill border)
- Actions: primary pill ("On the App Store →" or "Play free" depending on project), ghost pill "Read the story"

Three projects:

1. **Planetia, Solar System for Kids** (iPad app, 2026). Stack: RealityKit, SwiftUI, Built with AI.
2. **Office Survivors** (Browser game, 2025). Stack: Phaser 3, Built with AI.
3. **Solar System Explorer** (Web toy, 2024). Stack: React + Three.js, Built with AI.

---

### 5. Planetia

#### Hero (centred)

Centred H1 (Newsreader 60px, max 20ch): "Planetia, Solar System for Kids".

Sub (18px `var(--ink-2)`, max 56ch): "An interactive 3D solar system for curious kids and the parents who can't answer all their space questions."

Lede block: 15.5px text in a `var(--paper-2)` rounded panel (20px radius, 1px border), max 60ch. Copy: "Planetia is an iPad app for children ages 5 to 9. Six modes to explore, compare, quiz, customize, and build their own solar systems. 3D planets rendered with RealityKit. No ads. No in-app purchases. No data collection. Just space."

App Store button: ink background, 14px radius, 14×22 padding, Apple glyph plus "Download on the App Store".

#### Screenshots grid

Three-up row (aspect 4/3, radius 20px). Use real iPad screenshots, not placeholders. Two-up row below for variety.

#### Features grid

H2 "What kids can do" (Newsreader 36px). Then 2×3 grid on desktop, 1×6 on mobile. Each item: 42×42 chip (peri-pale background, peri-ink letter A to F), H3 label, paragraph.

Feature copy (lift verbatim):

1. **Explore** — "Fly through an interactive 3D solar system. Tap any planet to see facts, stats, and details written for kids who ask 'but why?' a lot." *(Note: the em dash after the feature name is acceptable here because it's a typographic separator in a structured list, not prose. If this feels inconsistent, swap to a colon.)*
2. **Compare** — "See all the planets lined up by size, or spread out by distance from the Sun. The kind of visual that makes Jupiter's scale actually click."
3. **Quiz** — "True or false, multiple choice, find-the-planet, and put-them-in-order challenges. Kids earn badges and climb ranks from Space Cadet to Admiral. A daily question builds a streak."
4. **Customize** — "Pick colors and paint any planet. Add stripes, polka dots, hearts, stars. Make Mars purple. Creative play meets space science."
5. **What If** — "What happens if Jupiter disappears? What if Earth had two suns? Kids change the rules and watch what happens to the orbits. Real gravitational physics, made playful."
6. **Build Your Own** — "Place stars, planets, and moons wherever you want. Set colors, sizes, orbit speeds. Then switch to gravity mode and see if your creation survives real physics."

If you're strict about the em dash rule, change feature rows to `**Explore.** Fly through...` (full stop after bold label). Rohit to decide.

---

### 6. Speaking

Standard page header: H1 "_Speaking_". Sub: "Talks and presentations at industry events and institutions. Usually about product, AI at scale, or news distribution."

#### Timeline

Group by year, descending. 2026 top. Year label is Newsreader 34px.

Timeline: 1px line at `x=12px` from left, full-height of group. Each event:
- 10px pebble marker on the line (periwinkle, `radius-organic-bead`)
- When: mono-xs "December · Dec 01, 2025"
- Venue: Newsreader 26px
- Title: 16px peri-ink bold
- Blurb: 15px `var(--ink-2)`, max 64ch
- Optional "View details →" link

Seed with four events from 2024 and 2025.

#### Empty year

If a year has no events, skip it entirely. Don't render an empty year header.

---

### 7. About

Header: two-column split (220px portrait, 1fr text), 36px gap, border-bottom.

- Portrait: 220px square, `radius: 44% 56% 50% 50% / 50% 45% 55% 50%`. `object-position: 50% 15%`.
- Right: H1 "About" (display-lg). Sub: "Head of Product & Design at Times of India" (18px `var(--ink-2)`).

#### Body (max 68ch)

Newsreader 19px/1.62. Four paragraphs (cleaned of em dashes):

1. "I lead Product and Design at Times of India, India's largest digital news publisher. My team of 60+ handles everything from the core reading experience to the ad platform to the puzzle games you might be playing during your commute."

2. "The work I find most interesting sits at the intersection of three things. Building products that genuinely help users. Making the math work for the business. Doing both with a team that's growing and learning along the way. I've been doing this for 14+ years across media, travel, and real estate. The constants have stayed the same. Understand the user. Ship things. Measure what matters. Iterate."

3. "These days I'm especially interested in how AI is reshaping product development. Not the hype, the practical stuff. How it changes what's possible to build, how fast you can move, what new capabilities become table stakes. This site is partly an excuse to keep experimenting."

4. "Outside work, I'm based in Delhi-NCR, usually stuck in traffic between Gurgaon and Noida. I have twin toddlers, which means my reading happens via audiobooks during that commute. <span class='hl'>38 books in the last three years.</span> I wrote about it. When I'm not doing any of that, I'm probably tinkering with some side project that may or may not go anywhere."

#### Mentoring block

`radius: 28px`, sage-pale background, 1px `oklch(0.88 0.04 160)` border, 28×32 padding. H3 "Mentoring". Paragraph: "I'm open to mentoring folks earlier in their product careers, especially those figuring out the craft, not just the job hunt. If you're working through a real problem and want a sounding board, feel free to reach out. I can't help with referrals or hiring at my current organisation, but I'm happy to talk shop."

#### Contact

Border-top. H3 "Get in touch". Paragraph: "Always happy to connect with fellow product people, discuss ideas, or explore collaboration opportunities."

Actions: ink-pill LinkedIn (with inline SVG) plus ghost-pill Email.

---

### 404 and error pages

#### 404

Same Nav and Footer as the rest of the site. Centre body, 60vh minimum. Newsreader 72px "404". Sub (18px `var(--ink-2)`): "That page doesn't exist, or it moved."

Two actions: primary pill "Back to writing", ghost pill "Home". Below, a `var(--paper-2)` panel with three recent posts as suggestions. Title: "While you're here". Uses the standard writing card, reduced to three across on desktop.

#### 500

Similar structure. Copy: "Something broke on our end." Primary pill "Back to writing". No post suggestions (the data might be the thing that broke). Include an error reference code the user can send to Rohit.

#### Empty states

- Writing index with zero results: described above in the filter section.
- Projects with zero: not applicable, there will always be projects.
- Speaking with zero events in a year: skip the year header entirely.

---

### Mobile overrides

Most of these are already specced inline above. Summary:

- Section horizontal padding: 80 → 48 → 24
- Section vertical padding: 90 → 70 → 56
- Nav links collapse into a hamburger drawer
- All multi-column grids stack
- H1 display-xl → 40px
- Post hero stacks, cover first
- Post article single column, TOC inline accordion at top, share at post end
- Newsletter form stacks vertically, input and button full-width with pill radius
- Speaking timeline indents less but keeps the marker line
- About header portrait shrinks to 140px and stacks above heading
