---
name: new-article
description: Scaffold a new blog article with frontmatter, image directories, and responsive image placeholders
argument-hint: "\"Article Title\" --category \"Category Name\" --description \"One-line description\""
allowed-tools: Bash, Read, Write, Glob, Grep
disable-model-invocation: true
---

# Scaffold New Article

Creates a new article in the writing collection with correct frontmatter, slug, and image directory structure.

## Usage

```
/new-article "My Article Title" --category "Product Management" --description "A brief description for card preview"
```

Arguments:
- **Title** (required): Article title in quotes
- **--category** (required): One of: `Product Management`, `Leadership / Career`, `AI Tools / Productivity`, `Personal Development`
- **--description** (required): One-line description for article cards

If any required arguments are missing, ask the user for them before proceeding.

## Instructions

### Step 1: Parse arguments and generate slug

Extract the title, category, and description from the arguments. Generate a URL-friendly slug from the title:
- Lowercase
- Replace spaces with hyphens
- Remove special characters (quotes, colons, etc.)
- Example: "What Makes Great Products" → `what-makes-great-products`

### Step 2: Validate category

Ensure the category is one of these exact values (case-sensitive):
- `Product Management`
- `Leadership / Career`
- `AI Tools / Productivity`
- `Personal Development`

If invalid, show the valid options and ask the user to pick one.

### Step 3: Check for conflicts

```bash
ls src/content/writing/[SLUG].md 2>/dev/null
```

If the file already exists, warn the user and stop.

### Step 4: Create the markdown file

Create `src/content/writing/[SLUG].md` with this exact frontmatter format:

```markdown
---
title: "[TITLE]"
description: "[DESCRIPTION]"
category: "[CATEGORY]"
date: [TODAY'S DATE in YYYY-MM-DD format]
leadImage: "/images/writing/[SLUG]/lead.webp"
---

Write your article here.
```

**Important:** Use today's actual calendar date for the `date` field.

### Step 5: Create image directory

```bash
mkdir -p public/images/writing/[SLUG]
```

### Step 6: Summary

Tell the user:

1. Created `src/content/writing/[SLUG].md`
2. Created `public/images/writing/[SLUG]/` directory
3. **Next steps:**
   - Write the article content in the markdown file
   - Add lead image variants to `public/images/writing/[SLUG]/`:
     - `lead.webp` (1400px width)
     - `lead-medium.webp` (600px width)
     - `lead-thumb.webp` (400px width)
   - Use `/compress-images public/images/writing/[SLUG]` to process images
