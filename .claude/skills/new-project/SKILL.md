---
name: new-project
description: Scaffold a new project page with Astro template, image directory, and OG image placeholder
argument-hint: "\"Project Name\" --description \"Brief description\""
allowed-tools: Bash, Read, Write, Glob, Grep
disable-model-invocation: true
---

# Scaffold New Project

Creates a new project page following the existing pattern (standalone Astro page + public assets + OG image).

## Usage

```
/new-project "My Project" --description "A brief description of the project"
```

Arguments:
- **Name** (required): Project name in quotes
- **--description** (required): One-line description

If any required arguments are missing, ask the user for them before proceeding.

## Instructions

### Step 1: Parse arguments and generate slug

Extract the name and description. Generate a URL-friendly slug:
- Lowercase
- Replace spaces with hyphens
- Remove special characters
- Example: "Solar System Explorer" → `solar-system`

### Step 2: Check for conflicts

```bash
ls src/pages/projects/[SLUG].astro 2>/dev/null
```

If the file already exists, warn the user and stop.

### Step 3: Create the project page

Read an existing project page (e.g., `src/pages/projects/solar-system.astro`) to match the current pattern and style.

Create `src/pages/projects/[SLUG].astro` following the same structure:
- Import `BaseLayout`
- Set appropriate title, description, and ogImage
- Include the `project-page` article wrapper
- Add an h1, subtitle paragraph, and placeholder content section

### Step 4: Create image directory and OG image placeholder

```bash
mkdir -p public/images/projects/
```

Remind user they need to add:
- `public/images/projects/[SLUG]-og.webp` (OG image, 1200x630)
- Any project-specific assets in `public/projects/[SLUG]/` if needed

### Step 5: Update projects index

Read `src/pages/projects/index.astro` and add the new project card to the grid, following the existing card pattern.

### Step 6: Summary

Tell the user:

1. Created `src/pages/projects/[SLUG].astro`
2. Updated `src/pages/projects/index.astro` with new card
3. **Next steps:**
   - Flesh out the project page content
   - Add OG image at `public/images/projects/[SLUG]-og.webp`
   - Add project thumbnail to the index if using images
