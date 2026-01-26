---
name: design-qc
description: Perform a thorough design quality check on all pages of the website. Reviews desktop and mobile viewports, identifies design flaws, and outputs a prioritized to-do list for developers.
argument-hint: "[port] (default: 4321)"
allowed-tools: Bash, Read, Write, Glob, Grep, TodoWrite, mcp__playwright__browser_navigate, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_click, mcp__playwright__browser_resize, mcp__playwright__browser_close, mcp__playwright__browser_snapshot
---

# Design QC Skill

Perform a comprehensive design quality check on a website, acting as a seasoned design professional. This skill reviews all pages on desktop and mobile viewports, identifies design flaws, and produces a prioritized to-do list.

## Usage

```
/design-qc           # Uses default port 4321
/design-qc 3000      # Uses custom port
```

## Pre-flight Checks

1. **Check if dev server is running:**
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT/ 2>/dev/null || echo "not running"
   ```

2. **If not running, start it:**
   ```bash
   npm run dev
   ```
   Run in background and wait 3-5 seconds for server to initialize.

3. **Discover all pages to review** by checking:
   - `src/pages/` directory structure for `.astro` files
   - Look for dynamic routes (`[...slug].astro`, `[slug].astro`)
   - Check `src/content/` for content collections that generate pages

## Review Process

### Step 1: Create Todo List

Use TodoWrite to track progress through all pages. Include:
- Each page type (homepage, listing pages, detail pages, etc.)
- Desktop review
- Mobile review
- Final compilation

### Step 2: Desktop Review (1280x800 viewport)

For EACH page, do the following:

1. **Navigate** to the page using `mcp__playwright__browser_navigate`
2. **Take full-page screenshot** using `mcp__playwright__browser_take_screenshot` with `fullPage: true`
3. **Capture accessibility snapshot** using `mcp__playwright__browser_snapshot` for semantic structure
4. **Document findings** (see evaluation criteria below)

### Step 3: Mobile Review (375x812 viewport - iPhone X)

1. **Resize browser** using `mcp__playwright__browser_resize` to 375x812
2. **Re-visit key pages**: Homepage, a listing page, a detail page, About
3. **Take screenshots** of each
4. **Check for**: Navigation collapse, content overflow, touch target sizes, readability

### Step 4: Compile Findings

Create `DESIGN-QC-TODO.md` in the project root with all findings.

---

## Design Evaluation Criteria

### Visual Hierarchy (Weight: High)
- [ ] Is there a clear focal point on each page?
- [ ] Do headings have proper size/weight differentiation (H1 > H2 > H3)?
- [ ] Is the most important information immediately visible?
- [ ] Does the eye flow naturally through the content?

### Typography (Weight: High)
- [ ] Is body text readable (16px+ on desktop, 14px+ on mobile)?
- [ ] Is line-height comfortable for reading (1.5-1.7 for body text)?
- [ ] Is line length appropriate (50-75 characters for articles)?
- [ ] Are fonts consistent throughout?
- [ ] Is there proper contrast between text and background?

### Spacing & Layout (Weight: High)
- [ ] Is whitespace used intentionally, not accidentally?
- [ ] Are margins and padding consistent across similar elements?
- [ ] Is the grid system followed consistently?
- [ ] Are related elements grouped together?
- [ ] Is there enough breathing room between sections?

### Color & Contrast (Weight: High)
- [ ] Do colors pass WCAG AA contrast requirements?
- [ ] Is the color palette limited and intentional?
- [ ] Are interactive elements clearly distinguishable?
- [ ] Is there consistent use of accent colors?

### Interactive Elements (Weight: Medium)
- [ ] Do buttons look clickable?
- [ ] Are hover/focus states present and visible?
- [ ] Are links distinguishable from regular text?
- [ ] Are form inputs styled consistently?
- [ ] Do interactive cards have appropriate feedback?

### Images & Media (Weight: Medium)
- [ ] Are images appropriately sized (not stretched/squished)?
- [ ] Do images have consistent aspect ratios where expected?
- [ ] Are images properly aligned with content?
- [ ] Do inline images have captions where appropriate?
- [ ] Is there alt text for accessibility?

### Navigation (Weight: High)
- [ ] Is the current page indicated in navigation?
- [ ] Are nav items properly spaced?
- [ ] Does mobile navigation collapse appropriately?
- [ ] Are breadcrumbs or back links present where needed?

### Empty States & Edge Cases (Weight: Medium)
- [ ] Do placeholder/coming soon states look intentional?
- [ ] Are error states designed?
- [ ] Do lists with 1 item look okay? With many items?
- [ ] Are loading states considered?

### Consistency (Weight: High)
- [ ] Are similar components styled the same way?
- [ ] Is the same element never styled two different ways?
- [ ] Are spacing patterns repeated consistently?
- [ ] Is button styling consistent across pages?

### Responsive Behavior (Weight: High)
- [ ] Does content reflow properly at breakpoints?
- [ ] Is there no horizontal scrolling on mobile?
- [ ] Are touch targets large enough (44x44px minimum)?
- [ ] Is text readable without zooming on mobile?
- [ ] Do images scale appropriately?

---

## Page-Specific Checklists

### Homepage
- [ ] Hero makes value proposition clear within 5 seconds
- [ ] Primary CTA is visible without scrolling
- [ ] Social proof or credibility markers are present
- [ ] Navigation to main sections is clear
- [ ] Footer is not overly heavy

### Listing Pages (Writing, Projects, Speaking)
- [ ] Cards have consistent sizing and spacing
- [ ] Filtering/sorting is intuitive (if present)
- [ ] Pagination or "load more" is clear (if applicable)
- [ ] Empty state is handled gracefully
- [ ] Category/tag styling is consistent

### Detail Pages (Articles, Project details, Speaking details)
- [ ] Back navigation is present
- [ ] Meta info (date, read time, category) is styled consistently
- [ ] Content is optimized for reading
- [ ] Images enhance rather than interrupt flow
- [ ] Related content or next steps are suggested

### About Page
- [ ] Photo is appropriately sized and positioned
- [ ] Bio is scannable (not a wall of text)
- [ ] Contact CTAs are prominent
- [ ] Social links are present

---

## Priority Classification

Assign each issue a priority:

| Priority | Criteria | Action |
|----------|----------|--------|
| **P0 - Critical** | Breaks professional appearance, makes site look unfinished | Fix before launch |
| **P1 - High** | Noticeable polish issue, affects user perception | Fix in first sprint |
| **P2 - Medium** | Refinement that improves quality | Fix in second sprint |
| **P3 - Low** | Nice-to-have enhancement | Backlog |

### P0 Triggers (auto-classify as critical):
- Missing hover states on primary CTAs
- Broken visual hierarchy (H1 smaller than H2)
- Horizontal scroll on mobile
- Text unreadable (contrast, size)
- Layout completely breaks at any viewport

### P1 Triggers (auto-classify as high):
- Inconsistent spacing between similar elements
- Navigation doesn't indicate current page
- Images stretched or wrong aspect ratio
- Empty states look unfinished
- Category/tag styling is inconsistent

---

## Output Format

Create `DESIGN-QC-TODO.md` with this structure:

```markdown
# Design QC - Issues & Fixes

**Reviewed by:** Design QC Skill
**Date:** [Current Date]
**URL:** http://localhost:[PORT]
**Status:** Ready for Dev Implementation

---

## Priority Legend
- **P0** - Critical: Breaks professional appearance, fix immediately
- **P1** - High: Noticeable issue affecting polish, fix before launch
- **P2** - Medium: Refinement that improves quality
- **P3** - Low: Nice-to-have enhancement

---

## 1. PAGE NAME

### P0 - Critical
- [ ] **Issue title**: Description and recommended fix

### P1 - High
- [ ] **Issue title**: Description and recommended fix

### P2 - Medium
- [ ] **Issue title**: Description and recommended fix

---

## Summary Statistics

| Priority | Count |
|----------|-------|
| P0 | X |
| P1 | X |
| P2 | X |
| P3 | X |
| **Total** | **X** |

---

## Recommended Fix Order
1. First pass: [P0 issues]
2. Second pass: [P1 layout issues]
3. Third pass: [P1 polish issues]
4. Final pass: [P2 refinements]
```

---

## Screenshots

Save all screenshots to project root with naming convention:
- `qc-{page}-desktop.png` (e.g., `qc-home-desktop.png`)
- `qc-{page}-mobile.png` (e.g., `qc-home-mobile.png`)

Or save to a dedicated directory if preferred: `.playwright-mcp/`

---

## Closing

After completing the review:
1. Close the browser using `mcp__playwright__browser_close`
2. Provide a summary to the user with:
   - Total issues found by priority
   - Top 3-5 critical/high issues
   - Location of the generated to-do file
   - Note that screenshots are available for reference

---

## Tips for Effective QC

1. **Be specific**: "Button is too small" → "CTA button is 32px tall, below 44px touch target minimum"
2. **Provide solutions**: Don't just identify problems, suggest fixes
3. **Group related issues**: If the same problem appears on multiple pages, note it once with "affects: [pages]"
4. **Use visual language**: Reference specific elements by their text content or position
5. **Consider context**: A recruiter should understand value prop in 10 seconds
6. **Check real content**: Don't just check layouts, verify real content looks good
7. **Test interactions**: Click through flows, not just static pages
