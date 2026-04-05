# Newsletter Feature Spec: Blog Subscription via Buttondown

## Problem Statement

Rohit publishes blog posts on rohitgarrg.com but has no direct channel to notify readers. Distribution depends on social media. A subscribe-and-notify system would let readers opt in via the website and receive new posts by email, creating a direct distribution channel independent of platform algorithms.

## Success Criteria

A visitor can sign up from the blog listing page or any individual post page, confirm via double opt-in, and automatically receive an email containing the full new post plus previews of the two previous posts the next time Rohit publishes. Emails come from rohitgarrg@newsletter.rohitgarrg.com. The system can be migrated away from Buttondown without rewriting more than the API integration layer.

## Architecture Overview

Four pieces:

### 1. Signup Forms on the Site

A reusable Astro component (`NewsletterSignup.astro`) placed on the blog listing page and at the bottom of each blog post. The form collects an email address and submits it to a Vercel serverless function (`api/subscribe.js`), which proxies the request to Buttondown's subscriber API server-side (keeping the API key secure). Buttondown handles the double opt-in confirmation email and all subscriber management (storage, unsubscribes, compliance). No database on Rohit's side.

### 2. Buttondown as the Subscriber and Delivery Backend

Manages the subscriber list, double opt-in flow, unsubscribe handling, CAN-SPAM/GDPR compliance, and email delivery. Free tier covers up to 100 subscribers. Custom sending domain (newsletter.rohitgarrg.com) configured via managed DNS delegation.

### 3. A Send Script in the Repo

A Node script that lives in the website repo. When run, it:

- Reads the Astro content directory
- Identifies the latest post by publish date
- Pulls the full HTML-rendered content
- Generates preview snippets for the two previous posts (using an excerpt frontmatter field or first paragraph)
- Composes the email body from a template
- Sends it via Buttondown's API

Run manually after deploying a new post. One command.

### 4. Custom Sender Domain Setup (Complete)

The sending domain `newsletter.rohitgarrg.com` is delegated to Buttondown via two NS records in GoDaddy pointing to `ns1.onbuttondown.com` and `ns2.onbuttondown.com`. Buttondown manages all email DNS (SPF, DKIM, DMARC) on their side. Emails arrive from rohitgarrg@newsletter.rohitgarrg.com.

### The Flow

Write post → deploy to Vercel as usual → run the send script → subscribers get the email.

## MVP Scope

- Buttondown account setup with double opt-in enabled (done)
- Custom sending domain newsletter.rohitgarrg.com via managed DNS (done)
- Signup form component (reusable across listing and post pages), styled to match current design system
- Add an `excerpt` field to blog post frontmatter for preview generation (fall back to first paragraph if absent)
- Send script with provider abstraction: content reading and email composition separated from the API call layer
- Simple email template (clean, readable, table-based HTML for cross-client compatibility, loosely matching site branding)
- RSS feed via @astrojs/rss (blog hygiene, not required for the send flow but trivial to add)
- Confirmation prompt in the send script to prevent accidental re-sends

## Future Scope (Not in This Build)

- Custom welcome email for new subscribers (currently disabled)
- Analytics on open/click rates (Buttondown paid add-on)
- Automating the send as part of the Vercel build/deploy pipeline
- Archive page on the site showing past emails
- Migration to Brevo if subscriber count exceeds 100 and cost becomes a concern

## Provider Migration Path (Built into MVP)

The send script is structured in three layers:

1. **Content reader:** Reads Astro markdown, extracts latest + 2 previous posts
2. **Email composer:** Converts markdown to email-safe HTML, applies template
3. **Sender:** API call to Buttondown

Only the sender layer is provider-specific. The signup form submits to a Vercel serverless proxy (`api/subscribe.js`), which is the only subscriber-side code that references Buttondown's API. Migrating to Brevo or another provider means replacing the sender module and updating the serverless function. The form component and email composition remain untouched.

This is a design constraint for the build, not a future refactor.

## Constraints

- Astro static site on Vercel with one serverless function (`api/subscribe.js`) for newsletter signups. Send script runs locally from Rohit's machine.
- Buttondown free tier: 100 subscribers. Beyond that, $9/month for up to 1,000.
- Blog content is markdown files in the Astro repo. The send script reads these directly.
- Email HTML must be simple and table-based. No CSS grid, no flexbox, no web fonts in emails. Email rendering across clients (especially Outlook) is unreliable with modern CSS.

## Known Risks and Tricky Parts

**Markdown to email HTML conversion.** Blog posts are markdown. Email clients don't render markdown, and email HTML is a subset of web HTML. The script needs a markdown-to-HTML step, followed by wrapping in an email-safe table layout. Keep the template dead simple. Libraries like `mjml` can help generate cross-client compatible HTML.

**Preventing duplicate sends.** If Rohit runs the script twice for the same post, subscribers get two emails. Mitigation: the script reads the latest sent email via Buttondown's API and compares against the current latest post. If they match, it warns and exits. As a second safeguard, the script always asks for confirmation before sending.

**Preview excerpts for older posts.** Need a consistent way to generate previews. Best approach: add an `excerpt` field to frontmatter. Fallback: extract the first paragraph programmatically. The frontmatter approach is more reliable and gives Rohit editorial control over what appears in the preview.

**Form spam.** Low risk at current traffic levels. A honeypot field (hidden input that bots fill but humans don't) is a lightweight defense. No CAPTCHA needed.

**Brevo migration complexity.** Brevo's API is more verbose than Buttondown's. The subscriber import is straightforward (CSV export from Buttondown, import to Brevo). The API integration swap is small if the abstraction layer is clean. Main friction: Brevo's free tier includes branding on emails. Removing it requires their Starter plan at ~$8/month, which is comparable to Buttondown's $9/month anyway.
