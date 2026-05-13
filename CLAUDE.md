# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Development Commands

- `npm run dev` — Start dev server (http://localhost:4321)
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run send:preview` — Preview newsletter email locally
- `npm run send:dry-run` — Dry-run newsletter send
- `npm run send` — Send newsletter (requires `.env.local`)

## What This Project Is

Personal branding site for Rohit Garg, Head of Product & Design at Times of India. Showcases writing, projects, and speaking. Tagline: "Product at scale. Built with AI."

**Stack:** Astro 5 static site, Tailwind CSS v4 (via `@tailwindcss/vite`), MDX + Markdown content collections, hosted on Vercel (free tier) with one serverless function for newsletter signups. Domains: rohitgarrg.com (primary), rohitgarrg.in (redirect).

## Architecture

- **Content Collections:** Three Zod-validated collections in `src/content/` — `posts`, `projects`, `speaking` (defined in `src/content/config.ts`).
- **MDX Support:** `@astrojs/mdx` integration enabled. Posts can be `.md` or `.mdx`. Slug derivation strips the extension: `post.id.replace(/\.mdx?$/, '')`.
- **Dynamic Routes:** `[...slug].astro` pattern generates pages from content collections at build time.
- **Static Generation:** All pages are statically generated. No client-side JS unless a component explicitly needs interactivity (e.g., `BeforeAfter` slider).
- **Markdown Workflow:** New posts are added by creating a file in `src/content/posts/` with correct frontmatter. No code changes required.
- **Remark Plugin:** `src/plugins/remark-inline-cta.mjs` injects a newsletter subscribe CTA after the 5th paragraph of every post.
- **RSS Feed:** `src/pages/rss.xml.js` generates full-text RSS for `.md` posts, excerpt-only for `.mdx` posts.
- **Office Survivors:** A Phaser.js game whose compiled static output lives in `public/projects/office-survivors/` and is embedded via iframe. Do not mix the Phaser/Vite build with Astro's build.
- **Newsletter Scripts:** `scripts/` contains a standalone Node pipeline (`send-newsletter.js`) that reads posts, converts to email-safe HTML, and sends via provider. Runs with `--env-file=.env.local`.

## Conventions

- **Frontmatter is the source of truth.** Pages read data from frontmatter fields. Never hardcode lists of articles or their attributes in page files.
- **Content tags:** AI, Leadership, Product, Design, Books, Projects (six-value enum, validated by Zod in `src/content/config.ts`).
- **Date field:** When adding a new article, always use today's actual calendar date.
- **Minimal dependencies.** Don't add packages unless genuinely needed.
- **Tailwind CSS v4.** Design tokens defined via `@theme` in `src/styles/global.css`. Scoped Astro component styles for component-specific CSS. Organic radii as CSS custom properties in `:root`.
- **Colour palette:** Periwinkle-accented (`--color-peri-*`), with sage, butter, berry, clay, slate accent colours. Shadows are periwinkle-tinted, never grey.
- **Typography:** Newsreader (serif, body text), Geist (sans, UI), Geist Mono (code). Self-hosted WOFF2 in `/fonts/`.
- **Mobile-first.** Everything must be fully responsive.
- **Tag colours:** Defined in `src/utils/tags.ts` (shared `TAG_COLORS` map used across components).

## Article Frontmatter

```yaml
---
title: "Article Title Here"
date: 2026-01-15
tag: "AI"  # AI | Leadership | Product | Design | Books | Projects
excerpt: "1-2 sentence summary for cards, newsletter, and SEO."
readMin: 7
cover: "/images/writing/article-slug/lead.webp"
nextPosts: ["slug-1", "slug-2"]  # optional, falls back to 2 most recent
series:                          # optional
  name: "Series Name"
  order: 1
ogImage: "/images/writing/article-slug/og.webp"  # optional
seoTitle: "Custom SEO title"     # optional, falls back to title
seoDescription: "Custom meta"   # optional, falls back to excerpt
canonicalUrl: "https://..."      # optional
---
```

## Lead Images

When adding a lead image to an article:

1. Set `cover` in frontmatter (this is the source of truth).
2. Create three responsive variants in `public/images/writing/[slug]/`:
   - `lead.webp` (1400px width)
   - `lead-medium.webp` (600px width)
   - `lead-thumb.webp` (400px width)
3. If the image should also appear inside the article body, add it separately as markdown: `![alt text](/images/writing/slug/lead.webp)`

## Design

Clean, minimal, editorial. Optimized for long-form reading. Redesign completed April 2026 — specs archived to `docs/archive/redesign/`.

Before starting any design work, read `DESIGN-TODO.md` in the project root for current status.

## Analytics and SEO

- Analytics: GoatCounter (cookieless, no consent banner needed) — `rohitgarrg.goatcounter.com`
- Google Search Console: configured for www.rohitgarrg.com
- OG images and meta tags are set per-page via `BaseLayout.astro`
- Sitemap: auto-generated via `@astrojs/sitemap` integration

