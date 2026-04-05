# CLAUDE.md

Guidance for Claude Code when working in this repository.

---

## Development Commands

- `npm install` — Install dependencies
- `npm run dev` — Start dev server (http://localhost:4321)
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally

## What This Project Is

Personal branding site for Rohit Garg, Head of Product & Design at Times of India. Showcases writing, projects, and speaking. Tagline: "Product at scale. Built with AI."

**Stack:** Astro static site, CSS (no Tailwind), Markdown content with frontmatter, hosted on Vercel (free tier) with one serverless function for newsletter signups. Domains: rohitgarrg.com (primary), rohitgarrg.in (redirect).

## Project Structure

```
rohitgarrg.com/
├── src/
│   ├── content/
│   │   ├── writing/          # Blog posts as markdown
│   │   └── speaking/         # Speaking entries as markdown
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ArticleLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── 404.astro
│   │   ├── writing/
│   │   │   ├── index.astro       # Blog listing with category filter
│   │   │   └── [...slug].astro   # Dynamic article pages
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   ├── office-survivors.astro
│   │   │   └── solar-system.astro
│   │   └── speaking/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   ├── components/           # Header, Footer, ArticleCard, SpeakingEntry, Lightbox, NewsletterSignup
│   └── styles/
│       └── global.css
├── public/
│   ├── images/               # All images: writing/, speaking/, projects/ subdirs
│   ├── projects/
│   │   └── office-survivors/ # Built game files (static, iframe-embedded)
│   ├── presentations/        # PDF slide decks for speaking entries
│   └── planetia/             # Planetia app support/privacy pages
├── api/
│   └── subscribe.js          # Vercel serverless function: newsletter signup proxy
├── astro.config.mjs
├── package.json
└── .gitignore
```

## Architecture

- **Content Collections:** Astro content collections (`src/content/`) for type-safe writing and speaking entries.
- **Dynamic Routes:** `[...slug].astro` pattern generates pages from markdown at build time.
- **Static Generation:** All pages are statically generated. No client-side JS unless a component explicitly needs interactivity.
- **Markdown Workflow:** New posts are added by creating a markdown file in `src/content/writing/` with correct frontmatter. No code changes required.
- **Office Survivors:** A Phaser.js browser game built as a separate project. The compiled static output lives in `public/projects/office-survivors/` and is embedded via iframe on its project page. Do not mix the Phaser/Vite build pipeline with Astro's build.

## Conventions

- **Frontmatter is the source of truth.** Pages read data from frontmatter fields (e.g., `leadImage`, `category`, `date`). Never hardcode lists of articles or their attributes in page files.
- **Content categories:** Product Management, Leadership / Career, AI Tools / Productivity, Personal Development.
- **Date field:** When adding a new article, always use today's actual calendar date.
- **Minimal dependencies.** Don't add packages unless genuinely needed.
- **CSS only.** No Tailwind, no CSS-in-JS. Keep styles in `global.css` and scoped Astro component styles.
- **Mobile-first.** Everything must be fully responsive.

## Article Frontmatter

```yaml
---
title: "Article Title Here"
description: "One-line description for card preview"
category: "Category Name"
date: 2026-01-15
excerpt: "1-2 sentence summary for newsletter previews and SEO. Optional but preferred."
leadImage: "/images/writing/article-slug/lead.webp"  # optional
canonicalUrl: "https://example.com/original"          # optional
---
```

## Lead Images

When adding a lead image to an article:

1. Set `leadImage` in frontmatter (this is the source of truth).
2. Create three responsive variants in `public/images/writing/[slug]/`:
   - `lead.webp` (1400px width)
   - `lead-medium.webp` (600px width)
   - `lead-thumb.webp` (400px width)
3. If the image should also appear inside the article body, add it separately as markdown: `![alt text](/images/writing/slug/lead.webp)`

## Design

Clean, minimal, editorial. Optimized for long-form reading.

A comprehensive redesign spec exists in `docs/design-handoff.md` covering typography (Newsreader + IBM Plex Sans), full CSS custom properties system with light/dark mode, spacing, and component specs. Refer to that file for all design decisions during implementation.

## Newsletter Feature

Spec files for a blog subscription feature (Buttondown backend):
- `docs/newsletter-spec.md` — Full feature spec
- `docs/newsletter-implementation.md` — Phased implementation checklist
- `docs/email-template-spec.md` — Email template design spec

Key architecture: signup form component on blog pages → Vercel serverless proxy (`api/subscribe.js`) → Buttondown API. A Node send script with provider abstraction (content reader → email composer → sender module), custom domain newsletter@rohitgarrg.com. Provider-specific code is isolated to `api/subscribe.js` (signups) and `scripts/providers/buttondown.js` (send script).

**Email HTML constraints (non-negotiable):** Table-based layout only. Inline styles only (Gmail strips `<style>` blocks). No CSS grid, flexbox, or custom properties. No web fonts. 600px max width. All images use absolute URLs. See `docs/email-template-spec.md` for the full template design.

## Analytics and SEO

- Google Analytics: GA4, measurement ID `G-X6LXZDSYG8`
- Google Search Console: configured for www.rohitgarrg.com
- OG images and meta tags are set per-page via BaseLayout