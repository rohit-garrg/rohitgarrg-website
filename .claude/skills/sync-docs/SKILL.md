---
name: sync-docs
description: Sync CLAUDE.md and project docs with the actual current state of the codebase
argument-hint: "[--dry-run]"
allowed-tools: Bash, Read, Glob, Grep, Edit
disable-model-invocation: true
---

# Sync Project Documentation

Scans the codebase and updates CLAUDE.md to reflect the actual current state — file structure, content inventory, categories, schemas, and dev commands.

## Usage

```
/sync-docs            # Update CLAUDE.md in place
/sync-docs --dry-run  # Show what would change without editing
```

## Instructions

### Step 1: Scan the codebase

Gather the actual state of the project by running these searches:

**Content files:**
- Glob `src/content/writing/*.md` — read frontmatter from each (title, category, date, leadImage)
- Glob `src/content/speaking/*.md` — read frontmatter from each
- Glob `src/content/projects/*.md` — read frontmatter from each

**Source files:**
- Glob `src/pages/**/*.astro` — all page routes
- Glob `src/components/*.astro` — all components
- Glob `src/layouts/*.astro` — all layouts
- Glob `src/styles/*` — stylesheets

**Public assets:**
- Glob `public/**/*` — images and assets (exclude `_originals` directories)
- Check existence of key assets: any `headshot.*` in public/images, `og-image.*`, `favicon.*`, `robots.txt`

**Config files:**
- Read `package.json` — extract the `scripts` section
- Read `src/content/config.ts` — extract categories enum and all schema fields
- Glob root config files: `astro.config.*`, `tsconfig.*`, `.gitignore`, `vercel.json`

### Step 2: Read current CLAUDE.md

Read `CLAUDE.md` from the project root. Locate each `##` header section to understand what exists.

### Step 3: Handle --dry-run

If the user passed `--dry-run`:
- For each section that would change, print:
  - Section name
  - Summary of what would be updated (e.g., "Would add 1 new article, remove placeholder text")
- Print any advisory flags (see Step 9)
- **Stop here. Do not edit any files.**

### Step 4: Update Development Commands section

Find the `## Development Commands` section. Replace its content with the actual scripts from `package.json`, formatted like:

```
- `npm run dev` - Start development server (http://localhost:4321)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm install` - Install dependencies
```

Remove any "Project not yet initialized" text or `npm create astro@latest` lines.

### Step 5: Update Project Structure tree

Find the `## Project Structure` section. Regenerate the tree from the Glob results gathered in Step 1.

Rules for the tree:
- Include `src/` with all subdirectories: content (writing, projects, speaking — list actual `.md` files), layouts, pages (show route structure), components, styles
- Include `public/` but summarize image directories — show the directory names under `public/images/writing/` but don't list every individual image file. Show top-level public assets (favicon, robots.txt, etc.)
- Include root config files: `astro.config.mjs`, `package.json`, `tsconfig.json`, `.gitignore`, `CLAUDE.md`, `vercel.json` (if exists)
- Omit: `node_modules/`, `.git/`, `dist/`, `.DS_Store`, `_originals/`, `.claude/`
- Use the same tree formatting style as the existing CLAUDE.md (with `├──`, `└──`, `│` characters)

### Step 6: Update Content Categories

Find the `## Content Categories` section. Read the `z.enum()` array from `src/content/config.ts` and list the categories. Format as a bullet list matching the current style.

### Step 7: Update Article Frontmatter Format

Find the `## Article Frontmatter Format` section. Read the writing schema from `src/content/config.ts` and update the YAML example to include all fields (required and optional). Mark optional fields with a comment.

Format:
```yaml
---
title: "Article Title Here"
description: "One-line description for card preview"
category: "Category Name"
date: 2026-01-15
leadImage: "/images/writing/article-slug/lead.webp"  # optional
canonicalUrl: "https://example.com/original"  # optional
---
```

**Important:** Preserve the note about using today's actual calendar date.

### Step 8: Update Content Status table

Find the `## Content Status` section. Rebuild the table from actual files:

**Writing:** List each article found in `src/content/writing/*.md` with its actual title from frontmatter. Status is ✅ Ready for all existing articles.

**Speaking:** Show count of speaking entries with ✅.

**Projects:** Show count of project pages with ✅ if any exist; otherwise show "Placeholder".

**Assets:** Check for:
- Headshot: ✅ if any `headshot.*` file exists in `public/images/`, otherwise ⏳ User will provide
- OG Image: ✅ if `og-image.*` exists in `public/images/`, otherwise ⏳ Needed
- Favicon: ✅ if `favicon.*` exists in `public/`, otherwise ⏳ Needed

Format as a markdown table matching the existing style.

### Step 9: Flag stale subjective sections (print only, don't edit)

Check for inconsistencies in sections we don't auto-update. Print advisory flags for:

- **Pages to Build:** If it mentions "placeholder" for projects but actual project content files exist in `src/content/projects/`
- **DESIGN-REDESIGN-TODO.md:** If this file exists and contains "NOT STARTED" for phases that appear to have been implemented (based on file existence)
- **Footer description:** Read `src/components/Footer.astro` and compare with the Footer section in CLAUDE.md — flag if the description doesn't match what's actually rendered
- **Build Phases:** If phases described as incomplete appear to be done based on existing files

Print these as advisory notes — do NOT edit these sections.

### Step 10: Print summary

After all updates (or after dry-run analysis), print:

1. **Sections updated** — list each section that was modified
2. **Key changes** — bullet points of notable differences found (e.g., "Added 2 new articles to Content Status", "Removed 'not yet initialized' from Development Commands")
3. **Advisory flags** — any stale subjective sections found in Step 9
4. **Reminder:** "Review the changes before committing. Run `npm run build` to verify nothing broke."
