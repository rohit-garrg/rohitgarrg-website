---
name: seo-qc
description: Run comprehensive SEO technical audit on Astro websites. Checks images, meta tags, schema markup, sitemap, robots.txt, Lighthouse scores, and Core Web Vitals.
argument-hint: "[fix|audit-only]"
allowed-tools: Bash, Read, Glob, Write, Edit, WebFetch, Task
---

# SEO Quality Check (SEO-QC)

Comprehensive SEO technical audit for Astro-based websites. Can run in audit-only mode or fix issues automatically.

## Usage

```
/seo-qc fix          # Audit and fix all issues
/seo-qc audit-only   # Report issues without fixing
/seo-qc              # Default: audit and fix
```

## Audit Checklist

### 1. Image Optimization (Critical)

**Check:**
```bash
# Find all images and their sizes
find public/images -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.webp" \) -exec du -h {} \; | sort -rh | head -20
```

**Criteria:**
- [ ] All images < 200KB
- [ ] Images in WebP format (preferred)
- [ ] Max width 1400px for content images
- [ ] `loading="lazy"` on below-fold images
- [ ] `alt` text on all images

**Fix:** Use `/compress-images all` skill

### 2. Robots.txt (Critical)

**Check:**
```bash
cat public/robots.txt 2>/dev/null || echo "MISSING: robots.txt"
```

**Required content:**
```
User-agent: *
Allow: /
Sitemap: https://[SITE_URL]/sitemap-index.xml
```

### 3. Sitemap (Critical)

**Check:**
```bash
# Check if sitemap integration exists
grep -l "sitemap" astro.config.mjs package.json 2>/dev/null
# Check if sitemap is generated
ls dist/sitemap*.xml 2>/dev/null
```

**Fix if missing:**
```bash
npm install @astrojs/sitemap
```

Update `astro.config.mjs`:
```javascript
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://your-site.com',
  integrations: [sitemap()],
});
```

### 4. Meta Tags (Critical)

**Check in `BaseLayout.astro` or equivalent:**

- [ ] `<title>` - unique per page, 50-60 chars
- [ ] `<meta name="description">` - 150-160 chars
- [ ] `<link rel="canonical">`
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] Twitter tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

**Twitter tags should use `name` not `property`:**
```html
<meta name="twitter:card" content="summary_large_image" />
```

### 5. Favicon & Theme (Important)

**Check:**
```bash
ls public/favicon* public/*.ico public/*.svg 2>/dev/null
```

**Required in `<head>`:**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/favicon.svg" />
<meta name="theme-color" content="#2563eb" />
```

### 6. Structured Data / JSON-LD (Important)

**Required schemas by page type:**

| Page Type | Required Schemas |
|-----------|------------------|
| Homepage | WebSite |
| About | Person, BreadcrumbList |
| Blog posts | Article, BreadcrumbList |
| Speaking/Events | Event, BreadcrumbList |

**Check for JSON-LD:**
```bash
grep -r "application/ld+json" src/
```

**Article schema template:**
```javascript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "image": imageURL,
  "datePublished": date.toISOString(),
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://site.com/about"
  }
};
```

**Embed in Astro:**
```astro
<script type="application/ld+json" set:html={JSON.stringify(articleSchema)} />
```

### 7. OG Image (Important)

**Check:**
```bash
ls public/og-image.* 2>/dev/null || echo "MISSING: og-image"
```

**Requirements:**
- Dimensions: 1200x630px recommended
- Format: WebP or PNG
- Size: < 100KB
- Referenced in BaseLayout default props

### 8. URL Structure (Check)

- [ ] Clean URLs (no special characters, lowercase)
- [ ] Trailing slash consistency
- [ ] No duplicate content (canonical URLs set)

```bash
# Check built URLs
ls -R dist/ | grep "\.html"
```

### 9. Lighthouse Performance Audit (Critical)

**Prerequisites:**
```bash
# Install Lighthouse if not present
which lighthouse || npm install -g lighthouse
```

**Run audit against dev server (ensure `npm run dev` is running):**
```bash
lighthouse http://localhost:4321 --output=json --output-path=./lighthouse-report --chrome-flags="--headless" 2>&1 | tail -5
```

**Parse results:**
```bash
cat lighthouse-report.report.json | python3 -c "
import json, sys
data = json.load(sys.stdin)

print('=== LIGHTHOUSE SCORES ===')
for cat, info in data['categories'].items():
    score = int(info['score'] * 100)
    status = 'PASS' if score >= 90 else 'WARN' if score >= 50 else 'FAIL'
    print(f'{cat}: {score} [{status}]')

print('\n=== CORE WEB VITALS ===')
metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index']
for m in metrics:
    a = data['audits'].get(m, {})
    print(f'{a.get(\"title\", m)}: {a.get(\"displayValue\", \"N/A\")}')

print('\n=== IMAGE ISSUES ===')
audit = data['audits'].get('uses-responsive-images', {})
if audit.get('details', {}).get('items'):
    for item in audit['details']['items'][:5]:
        url = item.get('url', 'N/A').split('/')[-1]
        waste = item.get('wastedBytes', 0) / 1024
        print(f'  {url}: {waste:.0f}KB wasted')
else:
    print('  All images properly sized')
"
```

**Scoring criteria:**
| Category | Target | Minimum |
|----------|--------|---------|
| Performance | 90+ | 50 |
| Accessibility | 95+ | 90 |
| Best Practices | 100 | 90 |
| SEO | 100 | 90 |

**Common fixes:**
- **Low Performance**: Optimize images (use `/compress-images`), enable compression, reduce JS
- **Image issues**: Create responsive srcset with thumb (400w), medium (600w), full (1400w) versions
- **Accessibility**: Add alt text, ensure color contrast, add ARIA labels
- **SEO**: Add meta description, ensure crawlable links

**Cleanup:**
```bash
rm -f lighthouse-report.report.json lighthouse-report.report.html
```

### 10. Build Verification

```bash
npm run build
```

Check for:
- No broken image references
- Sitemap generated
- No build errors

## Audit Report Template

After running checks, generate a report:

```markdown
## SEO Audit Report - [Date]

### Lighthouse Scores
| Category | Score | Status |
|----------|-------|--------|
| Performance | XX | PASS/WARN/FAIL |
| Accessibility | XX | PASS/WARN/FAIL |
| Best Practices | XX | PASS/WARN/FAIL |
| SEO | XX | PASS/WARN/FAIL |

### Critical Issues
- [ ] Issue 1
- [ ] Issue 2

### Important Issues
- [ ] Issue 1

### Passed Checks
- [x] Check 1
- [x] Check 2

### Recommendations
1. ...
2. ...
```

## Fix Mode Actions

When run with `fix` argument:

1. **Images over 200KB** -> Run `/compress-images all`
2. **Missing robots.txt** -> Create with standard content
3. **Missing sitemap** -> Install @astrojs/sitemap
4. **Missing schemas** -> Add JSON-LD to layouts
5. **Wrong Twitter meta syntax** -> Change `property` to `name`
6. **Missing OG image** -> Create from headshot or placeholder

## Validation

After fixes, validate:

1. **Schema markup:** https://validator.schema.org/
2. **Social previews:** https://socialsharepreview.com/
3. **Build:** `npm run build`

## Notes

- This skill is designed for Astro static sites
- Adjust schema templates for your specific site
- Always run `npm run build` after changes
- Test on mobile for responsive checks
