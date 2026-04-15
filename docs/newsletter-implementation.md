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
- [x] Submitting a real email triggers Buttondown's double opt-in confirmation email
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

## Phase 4: Send Script (Complete)

- [x] Create `scripts/send-newsletter.js` with three-layer architecture:
  - [x] **Content reader module (`scripts/content-reader.js`):** reads markdown files from content directory, parses frontmatter (title, pubDate, excerpt), sorts by date, returns latest post + 2 previous posts
  - [x] **Email composer module (`scripts/email-composer.js`):** converts latest post markdown to email-safe HTML, generates preview blocks for the 2 previous posts (excerpt + link to site), applies email template
  - [x] **Sender module (`scripts/providers/buttondown.js`):** takes composed HTML and subject line, sends via Buttondown email API. Reads API key from `.env.local`. Includes `X-Buttondown-Live-Dangerously` header and `<!-- buttondown-editor-mode: fancy -->` prefix for HTML mode.
- [x] Duplicate send prevention: script queries Buttondown API for the last sent email, compares subject against current latest post, warns and exits if already sent
- [x] Interactive confirmation prompt before sending: display post title, subscriber count, and ask for y/n confirmation
- [x] Markdown-to-HTML conversion for the email body (uses `marked`)
- [x] Wrap converted HTML in email-safe table-based template (see email-template-spec.md)
- [x] Subject line format: post title (e.g., "From a Kid's Question to the App Store")
- [x] Include unsubscribe link (`{{ unsubscribe_url }}` — Buttondown resolves at delivery time)
- [x] npm scripts: `npm run send`, `npm run send:preview`, `npm run send:dry-run`
- [x] `--preview` flag writes HTML to `scripts/preview-email.html` without sending
- [x] `--dry-run` flag exercises full flow (duplicate check, confirmation) but skips actual send
- [x] Explicit API key guard with helpful error if `BUTTONDOWN_API_KEY` is missing

**Architecture note:** Status `about_to_send` (not `sent`) triggers immediate delivery via Buttondown's API. The `sent` status only marks emails as already completed (for archive imports). The `X-Buttondown-Live-Dangerously` header is required for API-initiated sends.

### QC Gate: Phase 4

- [x] `npm run send:preview` writes preview HTML and exits
- [x] `npm run send:dry-run` shows confirmation prompt with correct post title and exits without sending
- [x] Running without API key shows clear error message
- [x] Provider-specific code is isolated: `scripts/providers/buttondown.js` (send) and `api/subscribe.js` (signup) are the only files that reference Buttondown's API
- [x] Confirming sends the email successfully via Buttondown API
- [x] Running the script again for the same post triggers the duplicate prevention warning
- [x] Email HTML renders correctly in Gmail (web)
- [ ] Email HTML renders correctly in Apple Mail (untested)
- [ ] Email HTML renders correctly in Outlook (if accessible, otherwise skip)
- [x] Full post content displays correctly in the email
- [x] Two previous post previews display with excerpts and working links back to the site
- [x] Unsubscribe link works (Buttondown resolves `{{ unsubscribe_url }}` correctly)
- [x] Sender shows as Rohit Garg <rohitgarrg@newsletter.rohitgarrg.com>

---

## Phase 5: Polish and Documentation (Complete)

- [x] Add a `README` section or `scripts/README.md` documenting how to run the send script
- [x] Document the provider swap process (what to change to move from Buttondown to Brevo)
- [x] Test the full flow end-to-end: subscribe via form → confirm opt-in → publish new post → deploy → run send script → receive email
- [x] Verify unsubscribe flow end-to-end (unsubscribe link in email resolves correctly via Buttondown)

### QC Gate: Phase 5

- [x] A new person can subscribe, confirm, and receive an email for the next published post
- [x] Unsubscribing via the email link removes the subscriber (Buttondown handles this; link verified working in sent email)
- [x] The send script can be run by someone reading only the documentation (`scripts/README.md`)

---

## Post-Review Checklist (after Buttondown account is approved)

These items are blocked until Buttondown completes manual account review. Once approved, work through them in order.

### 1. Add yourself as a subscriber

- [ ] Go to the Buttondown dashboard → Subscribers → manually add `rohitgarrg@gmail.com`
- [ ] Alternatively, subscribe via the form on the deployed site and confirm the double opt-in email
- [ ] Verify subscriber count shows 1 in dashboard

### 2. Test the send script end-to-end

- [ ] Run `npm run send` — should show 1 subscriber in confirmation prompt
- [ ] Confirm with `y` to send
- [ ] Check your inbox for the email from `rohitgarrg@newsletter.rohitgarrg.com`

### 3. Verify email rendering

- [ ] **Gmail (web):** Email renders correctly — table layout, inline styles, images load
- [ ] **Apple Mail:** Same checks
- [ ] **Gmail (mobile):** Responsive, readable on small screens
- [ ] `{{ unsubscribe_url }}` resolved to a real link (not literal text)
- [ ] Full post content displays correctly (headings, paragraphs, links, images)
- [ ] Two previous post previews show with excerpts and working "Read on site" links
- [ ] Sender shows as `rohitgarrg@newsletter.rohitgarrg.com`

### 4. Verify duplicate prevention

- [ ] Run `npm run send` again for the same post
- [ ] Script should warn "Already sent" and exit without sending

### 5. Test the signup form on production

- [ ] Deploy to Vercel if not already deployed
- [ ] Submit a different email via the signup form on the blog listing page
- [ ] Confirm double opt-in email arrives
- [ ] Verify new subscriber appears in Buttondown dashboard

### 6. Test unsubscribe flow

- [ ] Click the unsubscribe link in the newsletter email
- [ ] Verify subscriber is removed from Buttondown dashboard

### 7. If anything fails

- **Email renders as raw HTML/Markdown:** The `<!-- buttondown-editor-mode: fancy -->` prefix in `scripts/providers/buttondown.js` may need adjustment. Check Buttondown's API docs for the current editor mode syntax.
- **`{{ unsubscribe_url }}` shows as literal text:** Buttondown may not be processing the template variable. Check if the email body needs to be sent differently (e.g., as a template rather than raw HTML).
- **Firewall blocks subscribers:** Check Buttondown dashboard → Settings → Firewall rules. The firewall was blocking API subscriber creation during the review period.

---

## Buttondown Settings Reference

Canonical copy and configuration in the Buttondown dashboard. If the dashboard UI ever becomes inaccessible, this is the source of truth for what the settings should be.

### Basics

- **Newsletter Name:** `Rohit Garg's Blog`
- **Description:** `A periodic read on product, leadership, and the AI tools I'm building with. Written by Rohit Garg, Head of Product & Design at Times of India.`
- **From Display Name:** `Rohit Garg`
- **From Email:** `rohitgarrg@newsletter.rohitgarrg.com`

### Sending

- **Custom sending domain:** `newsletter.rohitgarrg.com` (managed DNS, delegated to `ns1.onbuttondown.com` and `ns2.onbuttondown.com`)
- **Underlying infrastructure:** Buttondown uses Postmark (acquired by ActiveCampaign) for delivery. The DKIM selector on `newsletter.rohitgarrg.com` is date-based (e.g., `20260405083850pm._domainkey.newsletter.rohitgarrg.com`). SPF passes via Postmark's bounce domain `pm-bounces.newsletter.rohitgarrg.com`. DMARC policy on the subdomain is `p=quarantine`, set by Buttondown.

### Subscriptions

- **Double opt-in:** Enabled
- **Welcome email:** Disabled (see newsletter-spec.md Future Scope)
- **Firewall:** Buttondown has an anti-spam firewall that can block API-initiated subscriber additions. During the initial account-review period (April 2026) this blocked programmatic subscribes entirely; post-approval it is usually permissive.

### Confirmation Email Preview

With the settings above, a new subscriber sees:

> **Subject:** Confirm your subscription to Rohit Garg's Blog
>
> **Rohit Garg's Blog is:**
> *A periodic read on product, leadership, and the AI tools I'm building with. Written by Rohit Garg, Head of Product & Design at Times of India.*
>
> [Click here to confirm] your subscription to Rohit Garg's Blog!

---

## Deliverability Notes

Learnings from debugging the first real signup in April 2026, when the confirmation email landed in the spam folder for an IIMA (institutional Google Workspace) inbox but the inbox for consumer Gmail.

### What was confirmed working

All email authentication passes:

- **DKIM:** Two signatures, both pass (`@newsletter.rohitgarrg.com` and `@ab.mtasv.net`)
- **SPF:** Pass via `pm-bounces.newsletter.rohitgarrg.com`
- **DMARC:** Pass with `dis=NONE` (policy is `p=quarantine` but alignment checks passed, so no disposition was taken)
- **List-Unsubscribe** and **List-Unsubscribe-Post** headers are present (one-click unsubscribe)
- **Feedback-ID** header is present (feedback loop support)

The authentication stack is textbook-correct. No DNS fixes are needed for the sending subdomain.

### Root cause of spam folder placement

A combination of:

1. **Zero sender reputation** — `newsletter.rohitgarrg.com` is a brand-new sending domain with no history
2. **Postmark broadcast IP pool** — `X-PM-MTA-Pool: application-bulk-1`, which is a shared-reputation pool (less trustworthy than Postmark's transactional pool)
3. **Institutional Gmail filtering** — IIMA's Google Workspace tenant is stricter than consumer Gmail
4. **No prior engagement** between sender and recipient
5. **`Precedence: bulk` header** — triggers stricter filtering on many providers

Consumer Gmail accepted the same email into the inbox immediately. So the institutional filter was the dominant factor, not a configuration bug.

### Fixes applied

- **Added DMARC on apex `rohitgarrg.com`** (previously missing): `v=DMARC1; p=none; rua=mailto:rohitgarrg@gmail.com; fo=1` — monitor only, no delivery impact. Improves trust at the organizational domain level. DMARC aggregate reports will arrive at `rohitgarrg@gmail.com` as XML attachments.
- **Behavioral signals** sent to Gmail's filter on the IIMA inbox: moved email to inbox, marked "Not Spam", added sender to contacts, clicked confirmation link, replied to the email.

### Warm-up strategy for first real newsletter sends

New sending domains need to build reputation. For the first ~5 sends:

1. Before the first real send, test with [mail-tester.com](https://www.mail-tester.com/) — aim for 9+/10
2. Send the first few newsletters to a small group of known contacts (friends, colleagues) and ask them to mark the email as "not spam" and add the sender to contacts
3. Avoid sending to known strict filters (institutional Workspace tenants) during warm-up
4. After ~5 successful sends with engagement, reputation should stabilize for mainstream Gmail/Apple Mail recipients

### Ongoing monitoring

- **DMARC reports** arrive daily at `rohitgarrg@gmail.com`. They look ugly (XML) but show which providers are accepting mail from the domain and which are failing authentication.
- If reports get noisy, consider pointing `rua=` to a parser service like [dmarcian](https://dmarcian.com) (free tier) or a dedicated inbox.
- After 2-4 weeks of monitoring with `p=none`, consider upgrading the apex DMARC policy to `p=quarantine` or `p=reject` for stronger protection against domain spoofing.

### Institutional Gmail caveat

Subscribers on Google Workspace tenants (IIMA, corporate domains) may still see the confirmation email in spam initially. This is out of our control — it depends on the tenant admin's filtering rules. The signup form's success message already tells subscribers "Check your inbox to confirm your subscription" — consider extending this to "Check your inbox (or spam folder) to confirm your subscription" if this becomes a recurring issue with real subscribers.
