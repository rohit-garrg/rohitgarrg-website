---
name: interlink
description: >
  Find and insert internal cross-links between blog posts to increase link density.
  Run after publishing a new post. Shows proposed links for review before writing.
  Accepts optional slug argument; defaults to newest post by date.
argument-hint: "[slug]"
allowed-tools: Read, Edit, Glob, Grep, Bash
---

# Internal Interlinking

Scan all blog posts, find natural cross-linking opportunities, propose them for review, and apply only after author approval.

## Step 1: Read the corpus

1. Glob `src/content/posts/*.{md,mdx}` to list all posts.
2. Read every post file. For each, extract:
   - **Slug**: filename without extension (strip `.md` or `.mdx`)
   - **Title**: from frontmatter `title` field
   - **Tag**: from frontmatter `tag` field
   - **Excerpt**: from frontmatter `excerpt` field
   - **Headings**: all H2 and H3 text in the body
   - **Existing internal links**: scan for markdown links matching `/writing/` (e.g., `[text](/writing/slug)`)
3. Identify the **target post**:
   - If the user passed a slug argument, use that
   - Otherwise, use the post with the most recent `date` in frontmatter

## Step 2: Propose outbound links (target → older posts)

For each older post, assess its relevance to the target post:
- Read the target's body and each candidate's title + excerpt
- Judge thematic overlap: do they discuss related topics, tools, workflows, or ideas?
- Shared or adjacent tags increase relevance

For relevant posts (aim for 3-4), scan the target post's body for **existing phrases** that naturally describe the older post's topic. Look for phrases where wrapping in a link would feel editorial, not forced.

Propose each as: `[existing phrase](/writing/older-slug)`

**Rules:**
- Only link the **first occurrence** of a natural phrase per target post
- Max **1 link per older post** in the target (don't link the same slug twice)
- Cap at **3-4 outbound links total** — prefer variety across different posts
- If no natural phrase exists for a relevant post, skip it silently

## Step 3: Propose inbound links (older posts → target)

For each older post that does **not** already contain a link to the target:
1. Read the older post's body
2. Find a phrase that naturally relates to the target post's topic
3. Propose one link per older post: `[phrase](/writing/target-slug)`

Skip any older post that already links to the target.

## Step 4: Display dry-run table

Present ALL proposed links in a numbered table for the author to review:

```
#   Direction   Source post                     → Target post                     Anchor text                Line
1   outbound    redesigning-rohitgarrg-com...   → how-i-actually-use-claude       "adversarial review"       37
2   outbound    redesigning-rohitgarrg-com...   → weekend-website-claude-workflow  "Claude Code"              25
3   inbound     how-i-actually-use-claude       → redesigning-rohitgarrg-com...   "redesigned the site"      85
4   inbound     weekend-website-claude-wor...   → redesigning-rohitgarrg-com...   "full visual redesign"     42
```

Then ask: **"Apply all, select specific numbers (e.g., 1,3,4), or cancel?"**

Do NOT write any files until the author responds.

## Step 5: Apply approved links

For each approved link:
1. Use the Edit tool to wrap the phrase in a markdown link
2. Only change the specific phrase — do not alter surrounding text

After all edits, report:
- **Applied**: X links across Y files
- **Skipped**: Z proposals declined

## Safety constraints — NEVER violate these

- **Never rewrite prose.** Only wrap existing phrases in `[phrase](/writing/slug)` links.
- **Never link inside any of these contexts:**
  - Headings (`#`, `##`, `###`, etc.)
  - Code blocks (fenced ``` or indented 4+ spaces)
  - Frontmatter (between `---` delimiters)
  - Existing markdown links (`[already linked](url)`)
  - MDX import lines (`import ... from ...`)
  - JSX component blocks (`<Component ... />` or `<Component>...</Component>`)
  - HTML comments (`<!-- ... -->`)
- **Never link a post to itself.**
- **Max 1 link per target slug per source post.** Don't link the same destination twice in one file.
- **First occurrence only.** Link the first natural instance, not every mention.
- **Skip `nextPosts` frontmatter.** That's a separate navigation mechanism, not an inline link.
- **If no natural anchor phrase exists, skip silently.** Never force a link by rewriting text or inserting unnatural phrases.
