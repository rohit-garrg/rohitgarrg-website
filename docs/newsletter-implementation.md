# Newsletter Feature: Implementation Checklist

## Phase 1: Buttondown Account and DNS Setup (Complete)

- [x] Create Buttondown account at buttondown.com
- [x] Enable double opt-in in Buttondown settings
- [x] Enable custom sending domain (newsletter.rohitgarrg.com) in Buttondown settings
- [x] Use managed DNS setup: two NS records delegating newsletter subdomain to Buttondown
- [x] Add NS records in GoDaddy DNS Management for rohitgarrg.com (newsletter → ns1.onbuttondown.com, newsletter → ns2.onbuttondown.com)
- [x] Verify custom domain in Buttondown dashboard
- [x] Send a test email from Buttondown confirming rohitgarrg@newsletter.rohitgarrg.com appears as sender
- [x] Store Buttondown API key in `.env.local` as `BUTTONDOWN_API_KEY`
- [x] `.env.local` is in `.gitignore`

---

## Phase 2: Signup Form Component (Complete)

- [x] Create `src/components/NewsletterSignup.astro` as a reusable component
- [x] Form fields: email input, hidden honeypot field, submit button
- [x] Create Vercel serverless proxy (`api/subscribe.js`) that calls Buttondown's API server-side
- [x] API endpoint URL stored in a single configurable variable (for future provider swap)
- [x] Style the form to match the current site design system (colors, typography, spacing from existing CSS)
- [x] Add loading state on submit
- [x] Add success message: "Check your inbox to confirm your subscription" (double opt-in reminder)
- [x] Add error handling: display user-friendly message on API failure
- [x] Place the component on the blog listing page
- [x] Place the component at the bottom of the individual blog post layout

**Architecture note:** The original spec called for direct client-side submission to Buttondown's embed endpoint, but Buttondown added Cloudflare Turnstile verification to that endpoint, blocking fetch-based submissions. The serverless proxy approach keeps the API key server-side, avoids third-party CAPTCHA scripts, and is more resilient to future Buttondown API changes.

### QC Gate: Phase 2

- [x] Form renders correctly on blog listing page
- [x] Form renders correctly on individual post pages
- [ ] Submitting a real email triggers Buttondown's double opt-in confirmation email (requires deploy to Vercel)
- [x] Honeypot field is hidden from users but present in HTML
- [x] Success and error states display correctly
- [x] Form styling is consistent with site design system
- [x] Form works on mobile
- [x] Component uses a single configurable API endpoint (not hardcoded Buttondown URL scattered through the code)

---

## Phase 3: Frontmatter and RSS (Complete)

- [x] Add `excerpt` field to all existing blog post frontmatter (1-2 sentence summaries)
- [x] Update any blog post content schema/type definitions to include optional `excerpt` field
- [x] Install `@astrojs/rss` package
- [x] Create RSS feed endpoint at `src/pages/rss.xml.js`
- [x] RSS feed includes title, description, pubDate, and link for each post
- [x] Add RSS `<link>` tag to site head for autodiscovery

### QC Gate: Phase 3

- [x] Every existing blog post has an `excerpt` in frontmatter
- [x] RSS feed accessible at /rss.xml
- [x] RSS feed validates (valid RSS 2.0 XML with all required elements)
- [x] RSS autodiscovery `<link>` added to BaseLayout `<head>` with absolute URL

---

## Phase 4: Send Script

- [ ] Create `scripts/send-newsletter.js` with three-layer architecture:
  - [ ] **Content reader module:** reads markdown files from content directory, parses frontmatter (title, pubDate, excerpt), sorts by date, returns latest post + 2 previous posts
  - [ ] **Email composer module:** converts latest post markdown to email-safe HTML, generates preview blocks for the 2 previous posts (excerpt + link to site), applies email template
  - [ ] **Sender module (`scripts/providers/buttondown.js`):** takes composed HTML and subject line, sends via Buttondown email API. Reads API key from `.env.local`.
- [ ] Duplicate send prevention: script queries Buttondown API for the last sent email, compares against current latest post, warns and exits if already sent
- [ ] Interactive confirmation prompt before sending: display post title, subscriber count, and ask for y/n confirmation
- [ ] Markdown-to-HTML conversion for the email body (use a library like `marked` or `markdown-it`)
- [ ] Wrap converted HTML in email-safe table-based template (see email-template-spec.md)
- [ ] Subject line format: post title (e.g., "Building Planetia: An iOS App with Claude Code")
- [ ] Include unsubscribe link (Buttondown handles this via their API/template variables)

### QC Gate: Phase 4

- [ ] Running the script with no new post shows a "no new post to send" message
- [ ] Running the script with a new post shows the confirmation prompt with correct post title
- [ ] Confirming sends the email successfully via Buttondown API
- [ ] Running the script again for the same post triggers the duplicate prevention warning
- [ ] Email HTML renders correctly in Gmail (web)
- [ ] Email HTML renders correctly in Apple Mail
- [ ] Email HTML renders correctly in Outlook (if accessible, otherwise skip)
- [ ] Full post content displays correctly in the email
- [ ] Two previous post previews display with excerpts and working links back to the site
- [ ] Unsubscribe link works
- [ ] Sender shows as rohitgarrg@newsletter.rohitgarrg.com
- [ ] Provider-specific code is isolated: `scripts/providers/buttondown.js` (send) and `api/subscribe.js` (signup) are the only files that reference Buttondown's API

---

## Phase 5: Polish and Documentation

- [ ] Add a `README` section or `scripts/README.md` documenting how to run the send script
- [ ] Document the provider swap process (what to change to move from Buttondown to Brevo)
- [ ] Test the full flow end-to-end: subscribe via form → confirm opt-in → publish new post → deploy → run send script → receive email
- [ ] Verify unsubscribe flow end-to-end

### QC Gate: Phase 5

- [ ] A new person can subscribe, confirm, and receive an email for the next published post
- [ ] Unsubscribing via the email link removes the subscriber
- [ ] The send script can be run by someone reading only the documentation
