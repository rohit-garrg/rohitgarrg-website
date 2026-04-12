# Newsletter Feature: Claude Code Prompts

Use these prompts sequentially in Claude Code. Each prompt corresponds to a phase in `newsletter-implementation.md`. Clear context between phases after passing the QC gate.

---

## Pre-work (Complete)

The following manual steps are already done:

1. Buttondown account created (username: rohitgarrg)
2. Double opt-in enabled
3. Custom sending domain: newsletter.rohitgarrg.com (managed DNS)
4. NS records added in GoDaddy, verified in Buttondown
5. Test email confirmed: sender shows as rohitgarrg@newsletter.rohitgarrg.com
6. API key stored in `.env.local` as `BUTTONDOWN_API_KEY`

---

## Prompt 1: Signup Form Component

```
Read CLAUDE.md and docs/newsletter-spec.md for full project context. Then read docs/newsletter-implementation.md for the Phase 2 checklist.

Create a reusable NewsletterSignup.astro component that:

- Collects an email address and submits it to Buttondown's subscriber API
- Includes a hidden honeypot field for spam prevention
- The API endpoint URL must be stored in a single configurable variable at the top of the file, not scattered through the code. This is a design requirement for future provider migration.
- Handles three states: default (form), loading (submitting), success ("Check your inbox to confirm your subscription"), and error (user-friendly failure message)
- Uses client-side JS for the API call (no server-side, this is a static Astro site)
- Styled to match the existing site design system. Pull colors, typography, and spacing from the existing CSS. Do not invent new design tokens.

Place the component:
1. On the blog listing page
2. At the bottom of the individual blog post layout, before the footer

After building, run through every item in the Phase 2 QC gate in newsletter-implementation.md and confirm each passes.
```

---

## Prompt 2: Frontmatter Excerpts and RSS Feed

```
Read CLAUDE.md for project context. Then read docs/newsletter-implementation.md Phase 3 checklist.

Two tasks:

1. Add an `excerpt` field to every existing blog post's frontmatter. Each excerpt should be 1-2 sentences summarizing the post. Read each post's content to write an accurate excerpt. Update the content schema/type definition to include an optional `excerpt` field.

2. Set up an RSS feed:
   - Install @astrojs/rss
   - Create the feed endpoint at src/pages/rss.xml.js
   - Include title, description (use excerpt), pubDate, and full URL for each post
   - Add an RSS autodiscovery link tag to the site's head

After building, run through every item in the Phase 3 QC gate and confirm each passes.
```

---

## Prompt 3: Send Script - Content Reader and Email Composer

```
Read CLAUDE.md for project context, especially the "Provider Abstraction" section. Read docs/newsletter-implementation.md Phase 4 checklist. Read docs/email-template-spec.md for the email design spec.

Build the first two layers of the send script:

1. Content reader module: reads all blog post markdown files from the content directory, parses frontmatter (title, pubDate, excerpt, slug/URL), sorts by date descending, returns the latest post (full content) and the 2 previous posts (excerpt + URL only).

2. Email composer module: takes the output from the content reader and produces a complete email HTML string. This involves:
   - Converting the latest post's markdown body to HTML (use marked or markdown-it)
   - Wrapping everything in the email template from email-template-spec.md
   - Table-based layout, inline styles only, 600px max width
   - Full post content in the main section
   - Two preview cards below with excerpt text and "Read on site" links
   - Footer with unsubscribe placeholder (Buttondown will inject the actual link)

Do NOT build the sender module yet. For now, have the script write the composed email HTML to a temp file (scripts/preview-email.html) so it can be opened in a browser for visual QC.

After building, generate a preview email and verify:
- HTML opens in a browser and looks correct
- Post content renders properly (headings, paragraphs, code blocks, links, images)
- Preview cards show excerpts and links for the two previous posts
- Layout holds at 600px width
- No CSS custom properties, no flexbox, no grid in the output HTML
- All styles are inline
```

---

## Prompt 4: Send Script - Sender Module and Full Integration

```
Read CLAUDE.md for project context, especially the "Provider Abstraction" section. Read docs/newsletter-implementation.md Phase 4 checklist.

Build the sender module and integrate all three layers:

1. Create scripts/providers/buttondown.js:
   - Exports a send function that takes: subject line, HTML body
   - Sends via Buttondown's email API using the API key from .env.local
   - Returns success/failure status
   - This module is the ONLY file in the project that imports or references Buttondown's API

2. Add duplicate send prevention:
   - Before sending, query Buttondown's API for the most recently sent email
   - Compare its subject/content against the current latest post
   - If they match, warn the user and exit without sending

3. Add interactive confirmation:
   - Before sending, display: post title, subscriber count (from Buttondown API), and ask for y/n confirmation
   - Only proceed on explicit "y" input

4. Wire everything together in scripts/send-newsletter.js:
   - Content reader → Email composer → Confirmation prompt → Sender
   - Handle errors at each step with clear messages

5. Subject line format: just the post title (e.g., "Building Planetia: An iOS App with Claude Code")

After building, run through every item in the Phase 4 QC gate. Test by sending to yourself as the only subscriber.
```

---

## Prompt 5: Documentation and Final QC

```
Read docs/newsletter-implementation.md Phase 5 checklist.

1. Add a section to scripts/README.md (or create it) documenting:
   - How to run the send script (command, prerequisites, env vars)
   - What the script does step by step
   - How to preview an email without sending
   - How to swap providers (what files to change, what the new provider module needs to export)

2. Run the full end-to-end flow and confirm:
   - Subscribe via the form on the site
   - Confirm via double opt-in email
   - Run the send script
   - Receive the newsletter email with full post + 2 previews
   - Unsubscribe via the link in the email
   - Verify unsubscribe took effect in Buttondown

3. Confirm the provider abstraction is clean: the ONLY Buttondown-specific code is in scripts/providers/buttondown.js and the form's API endpoint variable. Nothing else in the codebase references Buttondown's API.
```

---

## Notes for All Prompts

- Do not install unnecessary dependencies. Keep the dependency footprint small.
- Do not create separate CSS or JS files for the signup component. Keep it self-contained in the Astro component.
- The email template must use inline styles and table-based layout. This is non-negotiable for email client compatibility.
- The API key is in `.env.local`, not `.env`. Astro loads `.env.local` natively.
- Always check CLAUDE.md before starting work. It contains project-wide conventions that apply to this feature.
