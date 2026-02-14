# Design QC - Issues & Fixes

**Reviewed by:** Design QC Skill
**Date:** February 2, 2026
**Previous Reviews:** January 26, 2026; January 31, 2026
**Status:** Production Ready - Polish Items Only

---

## February 2, 2026 Review Summary

### Major Improvements Since Last Review

The site has seen significant improvements. Most P0 and P1 issues from previous reviews have been **resolved**:

- [x] Hero now has clear visual hierarchy (name bold, tagline in accent color)
- [x] Category tags use proper sentence case ("AI Tools / Productivity")
- [x] Article cards have excellent hover states (shadow, lift, image zoom)
- [x] Projects placeholder has clean styling (icon, no dashed border)
- [x] Navigation works well across all viewport sizes
- [x] Filter buttons have proper active/hover states with shadow
- [x] Article subheadings have proper visual hierarchy
- [x] Speaking page cards are consistent
- [x] Mobile responsive - no horizontal scrolling

---

## Priority Legend
- **P0** - Critical: Breaks professional appearance, fix immediately
- **P1** - High: Noticeable issue affecting polish, fix before launch
- **P2** - Medium: Refinement that improves quality
- **P3** - Low: Nice-to-have enhancement

---

## Overall Assessment

**The website is well-designed and production-ready.** It follows a clean, minimal aesthetic with good typography, consistent spacing, and professional appearance. The responsive design works well across desktop and mobile viewports.

### Design Strengths
- Clean, minimal design with intentional whitespace
- Consistent card components across Writing and Speaking pages
- Good typography hierarchy (H1 > H2 > H3 properly sized)
- Navigation clearly indicates current page (blue accent)
- Article cards have polished hover states (shadow, lift, subtle background, image zoom)
- Filter buttons have proper active/hover states with shadow
- Mobile responsive without horizontal scrolling
- Professional sticky header
- Appropriate footer elements

---

## Remaining Issues

### P0 - Critical
**None.** The site meets professional standards.

---

### P1 - High

#### Speaking Page
- [ ] **Date format inconsistency with Writing page**: Speaking cards show "December 2025" format while Writing cards show "Jan 30, 2026". Consider standardizing: "Month YYYY" for events, "Mon DD, YYYY" for articles.

---

### P2 - Medium

#### Global
- [ ] **System font stack could be more distinctive**: Currently using system fonts (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`). Consider adding a distinctive body font like `'Source Sans Pro'`, `'DM Sans'`, or `'Libre Franklin'` for brand differentiation with system fonts as fallback.

#### Homepage
- [ ] **Hero tagline could be slightly more prominent**: The tagline "Product at scale. Built with AI." is good but could benefit from slightly larger font-size or subtle visual treatment.

- [ ] **Social links in hero could have icons**: LinkedIn and Email are text-only. Adding small icons (like on About page) would improve visual consistency.

#### Writing Page
- [ ] **Filter button touch targets on mobile**: Currently ~32px height. Consider 40px+ for easier mobile tapping while maintaining pill aesthetic.

#### Article Pages
- [ ] **Inline images are full-width**: Article images stretch to full content width. Consider max-width of ~90% with centered alignment, or subtle border-radius.

- [ ] **No "Next/Previous" article navigation**: After reading, users must use back button or header nav. Adding article navigation at bottom improves reading flow.

#### Speaking Page
- [ ] **"View details" link could be more prominent**: Currently just blue text. Consider styled button or clearer visual CTA.

#### About Page
- [ ] **Headshot could be slightly larger on desktop**: Currently adequate but a bit small for hero treatment. Consider 150-180px width.

#### Mobile
- [ ] **Nav items slightly tight on 375px width**: Currently functional but could benefit from hamburger menu at very small widths (<360px) or slightly shortened labels.

---

### P3 - Low

#### Global
- [ ] **No dark mode**: Optional enhancement. Add CSS custom properties toggle for `prefers-color-scheme: dark`.

#### Article Pages
- [ ] **Bold text used for section headers**: The pattern `**Section Title**` creates pseudo-headers. Using actual `### H3` tags provides better semantic structure.

- [ ] **Horizontal rules could be styled**: Default browser styling. Consider shorter width or subtle color.

#### Writing Page
- [ ] **No empty state for filtered results**: If filtering results in no articles, list appears empty. Consider "No articles in this category yet" message.

#### Footer
- [ ] **Footer links could have larger touch targets on mobile**: LinkedIn and Email are small text links.

---

## Summary Statistics

| Priority | Count |
|----------|-------|
| P0 - Critical | 0 |
| P1 - High | 1 |
| P2 - Medium | 9 |
| P3 - Low | 5 |
| **Total** | **15** |

---

## Verdict

**The site is ready for launch.** There are no critical (P0) issues. The single P1 issue (date format inconsistency) is minor and doesn't break professional appearance.

P2 items are refinements that would elevate the design but aren't blockers. P3 items are nice-to-haves for future iterations.

### Recommended Fix Order

1. **Pre-launch (optional)**: Fix P1 date format consistency
2. **First iteration**: Address P2 typography and spacing refinements
3. **Future**: Dark mode, article navigation, mobile hamburger menu

---

## Screenshots Reference

Desktop screenshots (1280x800) saved to `.playwright-mcp/`:
- `qc-home-desktop-full.png`
- `qc-about-desktop-full.png`
- `qc-writing-desktop-full.png`
- `qc-article-desktop-full.png`
- `qc-speaking-desktop-full.png`
- `qc-projects-desktop-full.png`

Mobile screenshots (375x812):
- `qc-home-mobile-full.png`
- `qc-writing-mobile-full.png`
- `qc-article-mobile-full.png`
- `qc-about-mobile-full.png`

---

*This QC was conducted by reviewing all pages on desktop (1280px) and mobile (375px) viewports using Playwright automation.*
