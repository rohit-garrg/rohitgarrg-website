---
name: content-reviewer
description: Review content files for broken links, missing images, and frontmatter completeness before publishing
allowed-tools: Read, Glob, Grep, Bash
---

# Content Reviewer

Review all content files (writing, projects, speaking) for issues that would cause build failures or broken pages.

## Checks to Perform

### 1. Frontmatter Validation

For each markdown file in `src/content/writing/`:
- **Required fields**: title, description, category, date
- **Category values**: Must be one of: `Product Management`, `Leadership / Career`, `AI Tools / Productivity`, `Personal Development`
- **Date format**: Must be a valid YYYY-MM-DD date
- **leadImage**: If set, verify the path exists in `public/`

For each markdown file in `src/content/speaking/`:
- **Required fields**: title, event, date, description, location
- **gallery**: If set, verify each image path exists in `public/`
- **leadImage**: If set, verify the path exists in `public/`

### 2. Image Verification

For each article with a `leadImage` in frontmatter:
- Check that `lead.webp` exists at the specified path
- Check for responsive variants: `lead-medium.webp` and `lead-thumb.webp` in the same directory
- Report missing variants as warnings (not errors)

For all image references in markdown content (both `![alt](path)` syntax and HTML `<img>` tags):
- Verify the referenced file exists in `public/`
- Flag any references to non-existent images

### 3. Internal Link Validation

Search all markdown files for internal links (`](/path` pattern):
- Verify that corresponding pages exist in `src/pages/`
- Flag broken internal links

### 4. Build Verification

Run `npm run build` and report any errors.

## Output Format

Report findings grouped by severity:

**Errors** (will cause build failures or broken pages):
- Missing required frontmatter fields
- Invalid category values
- Referenced images that don't exist

**Warnings** (won't break but should be fixed):
- Missing responsive image variants
- Articles without lead images
- Potential broken internal links

**Summary**:
- Total files checked
- Errors found
- Warnings found
- "Ready to publish" or "Fix errors before publishing"
