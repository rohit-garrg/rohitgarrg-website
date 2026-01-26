# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# Project Reference for rohitgarrg.com

## Development Commands

**Project not yet initialized.** Once Astro is set up, common commands will be:
- `npm create astro@latest` - Initialize the project
- `npm install` - Install dependencies
- `npm run dev` - Start development server (typically http://localhost:4321)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Overview

Building a personal branding website for Rohit Garg, Head of Product & Design at Times of India. The site showcases expertise through writing, demonstrates AI-assisted development ("vibe coding"), and serves as a professional home base for career advancement.

**Tagline:** "Product at scale. Built with AI."

## Technical Stack

- **Framework:** Astro (content-first, good for static sites)
- **Hosting:** Vercel (free tier)
- **Content:** Markdown files with frontmatter
- **Styling:** CSS (clean, minimal, mobile-responsive)
- **Domains:** rohitgarrg.com (primary), rohitgarrg.in (redirect)

## Project Structure

```
rohitgarrg.com/
├── src/
│   ├── content/
│   │   ├── writing/
│   │   │   ├── exceptional-managers.md
│   │   │   ├── presentation-hack-notebooklm-gamma.md
│   │   │   └── audiobook-commute-reading-habit.md
│   │   ├── projects/
│   │   │   └── (placeholder)
│   │   └── speaking/
│   │       ├── inma-mumbai-2025.md
│   │       ├── wan-ifra-2025.md
│   │       └── iim-lucknow-2025.md
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ArticleLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── writing/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── projects/
│   │   │   └── index.astro
│   │   └── speaking/
│   │       └── index.astro
│   │
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ArticleCard.astro
│   │   ├── ProjectCard.astro
│   │   └── SpeakingEntry.astro
│   │
│   └── styles/
│       └── global.css
│
├── public/
│   ├── images/
│   │   ├── headshot.jpg
│   │   └── og-image.png
│   └── favicon.ico
│
├── astro.config.mjs
├── package.json
└── README.md
```

## Pages to Build

### 1. Home (/)
- Hero: Name + Tagline + One-liner about role at TOI
- Latest Writing: 3 most recent article cards
- Projects: 2-3 cards (placeholder for now)
- Social links: LinkedIn, Email

### 2. Writing (/writing)
- List of all articles as cards
- Filterable by category
- Each card shows: title, description, category, date

### 3. Individual Article (/writing/[slug])
- Full article with good typography
- Category tag, date, estimated read time
- Back link to /writing

### 4. Projects (/projects)
- Grid of hobby builds
- Placeholder state for launch

### 5. Speaking (/speaking)
- Reverse chronological list
- Each entry: event name, date, description, external link

### 6. About (/about)
- Photo (headshot.jpg)
- Career narrative
- Mentoring note
- Contact: LinkedIn + Email

## Design Guidelines

- **Aesthetic:** Clean, minimal, professional. Subtle, not flashy.
- **Typography:** Readable for long-form articles. Good hierarchy.
- **Mobile:** Fully responsive. Test on phone screens.
- **Dark mode:** Nice to have, not required for launch.
- **No excessive styling:** Avoid gradients, shadows, animations unless they serve a purpose.

## Content Categories

Articles are tagged with one of these:
- Product Management
- Leadership / Career
- AI Tools / Productivity
- Personal Development

## Article Frontmatter Format

```yaml
---
title: "Article Title Here"
slug: article-slug-here
category: "Category Name"
description: "One-line description for card preview"
date: 2026-01-15
---
```

**Important:** When adding a new article, always use today's actual calendar date for the `date` field.

## Footer

- © Rohit Garg 2025
- Social links (LinkedIn, Email)
- "Built with Claude Code" (small text)

## Success Criteria

- [ ] Recruiter understands value prop within 10 seconds of landing
- [ ] Site looks professional and adds credibility
- [ ] Can publish new blog posts by adding markdown files (no code changes)
- [ ] Site loads fast (<3 seconds)
- [ ] Fully responsive on mobile
- [ ] rohitgarrg.in redirects to rohitgarrg.com

## Content Status

| Content | Status |
|---------|--------|
| Article 1: Exceptional Managers | ✅ Ready |
| Article 2: Presentation Hack | ✅ Ready |
| Article 3: Audiobook Journey | ✅ Ready |
| About page narrative | ✅ Ready |
| Speaking entries | ✅ Ready |
| Headshot | ⏳ User will provide |
| Projects | Placeholder for now |

## Build Phases

1. **Scaffolding:** Base layout, header, footer, global styles
2. **Home + Writing list:** Hero section, article cards, category filter
3. **Articles:** Add all three articles as markdown, create article template
4. **About + Speaking:** Static pages with provided content
5. **Projects:** Placeholder page
6. **Polish:** Mobile testing, dark mode (optional)
7. **Deploy:** Vercel setup, custom domain configuration

## Notes

- Keep dependencies minimal
- Prefer CSS over Tailwind for this project (simpler)
- Articles are the main attraction — optimize for reading experience
- Projects section can be sparse at launch; better to ship than wait

## Architecture Notes

- **Content Collections:** Astro's content collections (`src/content/`) provide type-safe content management for writing, projects, and speaking entries
- **Dynamic Routes:** Use `[...slug].astro` pattern for dynamic article pages that pull from markdown content
- **Static Generation:** All pages are statically generated at build time for optimal performance and SEO
- **Content-First:** Astro is optimized for content-heavy sites with minimal JavaScript; only hydrate components that need interactivity
- **Markdown Workflow:** New blog posts are added by creating markdown files in `src/content/writing/` with proper frontmatter—no code changes required
