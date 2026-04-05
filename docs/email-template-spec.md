# Email Template Spec: Structure and Visual Design

## General Constraints

- Maximum width: 600px, centered
- Table-based layout only. No CSS grid, no flexbox.
- Inline styles only. No `<style>` blocks (Gmail strips them), no external stylesheets.
- No CSS custom properties (email clients don't support them)
- No web fonts via @font-face (unreliable in email). Use system font stacks with web-safe fallbacks.
- All images use absolute URLs (https://www.rohitgarrg.com/...)
- Background color on the outermost wrapper for email clients that support it

## Font Stacks

These approximate the site's typography (Newsreader + IBM Plex Sans) using web-safe fallbacks:

- **Headings and post title:** Georgia, "Times New Roman", Times, serif (fallback for Newsreader)
- **Body text, UI elements, footer:** -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif (fallback for IBM Plex Sans)

## Color Palette

Pull exact values from the site's existing CSS custom properties file. Map them to inline styles as follows:

- **Background (email body):** use the site's background color from light mode (the subtle off-white or white)
- **Content area background:** white or the site's surface/card color
- **Primary text:** use the site's body text color (likely a near-black)
- **Secondary text (excerpts, meta):** use the site's muted/secondary text color
- **Links and accent:** use the site's primary accent color
- **Dividers:** use the site's border/separator color
- **Footer text:** use the site's muted text color, slightly smaller

If exact values aren't available at build time, use sensible defaults:
- Background: #f9f9f8
- Content area: #ffffff
- Primary text: #1a1a1a
- Secondary text: #6b6b6b
- Accent/links: pull from site (likely a warm tone based on the design system)
- Dividers: #e5e5e5
- Footer text: #999999

## Email Structure (Top to Bottom)

### 1. Header

A simple, editorial-style header. Not a logo banner.

- Site name "rohitgarrg.com" as styled text (not an image). Use the heading font stack, ~18px.
- Tagline beneath it in secondary text color, ~13px: "Product at scale. Built with AI."
- No logo image. Text only. This avoids image-blocking issues in email clients.
- Bottom border: 1px solid divider color
- Padding: 24px top, 16px bottom

### 2. Post Title Section

- Post title in heading font stack, ~24px, primary text color, bold
- Publish date beneath it in secondary text color, ~13px
- Format the date readably: "April 1, 2026" not "2026-04-01"
- Padding: 24px top, 8px bottom

### 3. Full Post Content

- The complete blog post rendered as HTML
- Body text: sans-serif font stack, ~16px, line-height 1.6
- Headings within the post: heading font stack, sized proportionally (h2 ~20px, h3 ~18px)
- Links: accent color, underlined
- Code blocks: monospace font, light gray background (#f5f5f5), 2px padding, slightly smaller font size (~14px). Use `<pre>` and `<code>` tags. Keep it simple.
- Images: max-width 100% of the content area, centered. Use `style="max-width:100%;height:auto;display:block;margin:0 auto;"`
- Blockquotes: left border (3px solid accent color), slight left padding, italic
- Paragraph spacing: 16px margin-bottom

### 4. Divider

- Horizontal rule or spacer
- 1px solid divider color
- 32px margin top and bottom

### 5. Previous Posts Section

- Section label: "Recent posts" in secondary text color, sans-serif, ~13px, uppercase, letter-spacing 1px
- Two preview cards, stacked vertically with 16px gap between them

Each preview card:
- Post title as a link (accent color, heading font stack, ~18px, bold)
- Excerpt text beneath (secondary text color, sans-serif, ~14px, line-height 1.5)
- "Read on site →" link beneath the excerpt (accent color, sans-serif, ~14px)
- No borders or backgrounds on the cards. Keep it minimal. The title link and spacing provide enough visual separation.

### 6. Footer

- 1px solid divider color at top
- 24px padding top
- All text in footer color, sans-serif, ~12px, centered
- Line 1: "You're receiving this because you subscribed at rohitgarrg.com"
- Line 2: "Unsubscribe" link (Buttondown will inject the actual URL via template variable)
- Keep the footer minimal. No social links, no "powered by" badges.

## Overall Spacing

- Outer padding (content area to email edge): 24px on mobile, 40px on desktop
- Section spacing: 24px-32px between major sections
- The content area sits inside a centered 600px table with the content background color

## Responsive Considerations

Email responsive design is limited, but:
- Set the main content table width as `width="600"` with `style="max-width:600px;width:100%"`
- Images include `style="max-width:100%;height:auto"`
- This ensures basic readability on mobile without media queries (which most email clients ignore anyway)

## What This Email Should Feel Like

Clean, editorial, minimal. Think personal blog notification, not marketing blast. The reader should feel like they're reading the blog, just in their inbox. No calls to action beyond reading the post and optionally exploring the previous ones. No social sharing buttons. No "forward to a friend." Just the writing.
