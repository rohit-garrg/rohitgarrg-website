# Design QC - Issues & Fixes

**Reviewed by:** Design QC Skill
**Date:** January 31, 2026 (Updated)
**Previous Review:** January 26, 2026
**Status:** Mostly Resolved - Minor Polish Items Remain

---

## January 31, 2026 Update

**New Article Reviewed:** "The Weekend Website: Planning in Claude, Executing in Claude Code"

### Status of Previous Issues

Based on visual review, many P0 and P1 issues from Jan 26 appear **resolved**:
- [x] Hero now has visual impact (tagline in blue, clear hierarchy)
- [x] Category tags now use sentence case (e.g., "AI Tools / Productivity")
- [x] Article subheadings have proper visual hierarchy
- [x] Projects section has improved styling (icon, no dashed border)
- [x] Navigation works well on mobile (no horizontal scroll)

### New Article - Specific Notes

The weekend-website-claude-workflow article looks **clean and professional**:
- Lead image displays correctly with proper responsive sizing
- Inline images (skills-cycle, workflow-checklist) render well
- Typography is readable
- Mobile view works correctly

**Minor items specific to this article:**
- [ ] **P2**: Two images slightly over 200KB target (skills-cycle.webp: 248KB, workflow-checklist.webp: 204KB) - consider recompressing
- [ ] **P3**: Inline images could benefit from figure captions for additional context

---

## Priority Legend
- **P0** - Critical: Breaks professional appearance, fix immediately
- **P1** - High: Noticeable issue affecting polish, fix before launch
- **P2** - Medium: Refinement that improves quality
- **P3** - Low: Nice-to-have enhancement

---

## 1. HOMEPAGE

### P0 - Critical

- [ ] **Hero lacks visual impact**: The name "Rohit Garg" is plain black text with no visual distinction. Consider:
  - Increase font-weight or size for the name
  - Add subtle letter-spacing
  - Consider a gradient or accent color treatment for the tagline

### P1 - High

- [ ] **"Latest Writing" section header alignment**: The "View all →" link floats right but doesn't align cleanly with the section title. Make them sit on the same baseline or give clearer visual grouping.

- [ ] **Projects placeholder is underwhelming**: The current "Coming Soon" box looks unfinished. Options:
  - Add a subtle illustration or icon
  - Use a more engaging empty state pattern
  - Remove the dashed border (looks dated)
  - Consider hiding this section entirely until projects exist

- [ ] **Excessive whitespace above footer**: There's too much empty space between the Projects section and the footer. Reduce bottom margin.

### P2 - Medium

- [ ] **Article card images**: The AI-generated images look generic. Consider:
  - Adding subtle rounded corners to soften them
  - Ensuring consistent aspect ratios (currently slightly inconsistent)
  - Adding a subtle shadow on hover for depth

- [ ] **Category tags are ALL CAPS**: This feels aggressive/shouty. Consider sentence case or title case instead (e.g., "Leadership / Career" instead of "LEADERSHIP / CAREER").

---

## 2. WRITING PAGE

### P1 - High

- [ ] **Filter button spacing**: The filter buttons feel cramped. Add more horizontal padding between them (suggest `gap: 12px` instead of current spacing).

- [ ] **Selected state needs more distinction**: The "All" button (selected) only differs by background color. Consider adding a subtle shadow or border to make selection clearer.

### P2 - Medium

- [ ] **Category tags consistency**: Same ALL CAPS issue as homepage. Convert to sentence/title case.

- [ ] **Page description could be bolder**: "Thoughts on product, leadership, AI tools, and personal growth." feels small. Slight increase in font-size or line-height would help.

---

## 3. ARTICLE PAGES

### P0 - Critical

- [ ] **Subheadings lack visual hierarchy**: The bold section titles ("The fair credit dictum", "The mistake meeting", etc.) appear as regular bold paragraphs, not proper subheadings. Fix:
  - Use proper `<h2>` or `<h3>` tags
  - Increase font-size for subheadings
  - Add more margin-top before subheadings (suggest 2.5rem)
  - Consider a subtle accent (like a left border or different font-weight)

### P1 - High

- [ ] **Too many horizontal rules**: The article uses `<hr>` dividers between every section, which fragments the reading experience. Options:
  - Remove most horizontal rules, keep only 1-2 for major transitions
  - Replace with extra whitespace instead
  - If keeping, make them more subtle (lighter color, shorter width)

- [ ] **Inline images need better treatment**:
  - Images have no captions - add figure/figcaption elements
  - Images should have consistent max-width (suggest 100% of content width)
  - Add subtle rounded corners to match article card images
  - Consider a light border or shadow to separate from content

- [ ] **Hero image is very large**: The featured image at top pushes article content down significantly. Consider:
  - Reducing max-height
  - Using a more cinematic aspect ratio (16:9 instead of current)

### P2 - Medium

- [ ] **Line length on wide screens**: Article text could benefit from a max-width cap to maintain comfortable reading measure (~70-75 characters per line). Currently stretches too wide on large monitors.

- [ ] **Blockquote styling**: Quoted text doesn't have visual distinction. Add left border, background, or italics for quotes.

---

## 4. PROJECTS PAGE

### P1 - High

- [ ] **Empty state needs work**: The placeholder looks like an unfinished page. Improvements:
  - Remove the dashed border
  - Add a more engaging illustration (consider a simple line drawing or icon set)
  - Add more personality to the copy
  - Consider showing this page only when projects exist, or redirect to homepage

### P2 - Medium

- [ ] **Page feels bare**: Even for a placeholder, there's too much emptiness. Consider:
  - Adding "What I'm working on" teaser text
  - Including a newsletter signup or "notify me" option

---

## 5. SPEAKING PAGE

### P1 - High

- [ ] **Inconsistent text styling in cards**: The talk title (e.g., "Lessons from 15 Years in Product Management") appears in blue, while the event name is black. This creates visual confusion about what's clickable vs. just text. Make the hierarchy clearer:
  - Event name: Black, bold
  - Talk title: Could be blue as link indicator, but needs more consistency

- [ ] **"View details" link inconsistency**: Some cards say "View details →" and others say "View details & photos →". Standardize the pattern.

### P2 - Medium

- [ ] **Cards have excessive height**: There's a lot of internal whitespace in each speaking card. Tighten up the padding.

---

## 6. SPEAKING DETAIL PAGE

### P1 - High

- [ ] **Photo grid layout is uneven**: 3 photos display as 2 on top, 1 orphaned below. Fix:
  - Use CSS grid with consistent sizing
  - Consider 3 columns, or 2x2 with different sizing
  - Ensure all photos have the same aspect ratio for clean grid

- [ ] **Button styling inconsistency**: "View presentation" is a solid blue button, "Conference page →" is an outline/ghost button. For a CTA pair, they should have clearer visual hierarchy:
  - Primary action (presentation): Solid button ✓
  - Secondary action (external link): Text link or subtle button
  - Current outline style is fine, but ensure it doesn't compete

### P2 - Medium

- [ ] **Photos lack captions**: Add context about what's happening in each photo.

---

## 7. ABOUT PAGE

### P1 - High

- [ ] **"Get in Touch" buttons are oversized**: The LinkedIn and Email buttons are quite large relative to the content. Scale them down slightly or use text links instead.

### P2 - Medium

- [ ] **Heading "About Me" is generic**: Consider a more distinctive title or removing it entirely (the page is self-evident from navigation).

- [ ] **Photo could be more modern**: The circular crop with shadow is a bit dated. Consider:
  - Square with rounded corners
  - Slightly smaller size
  - Different framing (environmental photo vs. headshot)

---

## 8. MOBILE RESPONSIVENESS

### P1 - High

- [ ] **Navigation should collapse on small screens**: Currently all nav items display inline, which works for 4 items but:
  - Could clip on very small screens (320px width)
  - Consider hamburger menu below 480px breakpoint
  - At minimum, ensure no horizontal scrolling occurs

### P2 - Medium

- [ ] **Mobile article cards could be tighter**: There's good stacking behavior but the cards have generous padding that could be reduced slightly on mobile for more content density.

- [ ] **About page hero on mobile**: Photo + heading stack nicely, but spacing between could be tightened.

---

## 9. GLOBAL / SITE-WIDE

### P1 - High

- [ ] **Category tag styling (ALL CAPS)**: As mentioned multiple times, this appears across homepage, writing page, and article pages. Global CSS change needed to convert to sentence/title case.

- [ ] **Hover states need polish**: Links change color on hover, but interactive elements (cards, buttons) could benefit from:
  - Subtle scale transform on cards
  - Background color shift
  - Smooth transitions (0.2s ease)

- [ ] **Inconsistent link styling**: Some text links are blue, some aren't. Establish clear pattern:
  - In-content links: Blue with underline on hover
  - Navigation links: Current color is fine
  - CTA buttons: Current styling is fine

### P2 - Medium

- [ ] **Footer "Built with Claude Code" text**: This should be more subtle - consider lighter gray text, smaller font-size.

- [ ] **Footer duplicates navigation**: LinkedIn and Email appear in both header (hero) and footer. Consider if footer links are necessary, or differentiate them.

### P3 - Low

- [ ] **Consider dark mode**: Not required for launch, but the clean design would translate well to dark mode.

- [ ] **Add favicon**: Ensure favicon.ico exists and displays correctly.

---

## Summary Statistics

| Priority | Count |
|----------|-------|
| P0 - Critical | 2 |
| P1 - High | 15 |
| P2 - Medium | 14 |
| P3 - Low | 2 |
| **Total** | **33** |

---

## Recommended Fix Order

1. **First pass (P0)**: Hero visual impact, article subheading hierarchy
2. **Second pass (P1 - Layout)**: Projects empty state, photo grid, mobile nav
3. **Third pass (P1 - Polish)**: Category tags, link consistency, hover states
4. **Final pass (P2)**: Spacing refinements, subtle enhancements

---

*This QC was conducted by reviewing all pages on desktop (1280px) and mobile (375px) viewports. Screenshots are available in the `.playwright-mcp/` directory for reference.*
