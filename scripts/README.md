# Newsletter Send Script

Sends a newsletter email containing the latest blog post to all Buttondown subscribers.

## Prerequisites

- Node.js 20.6+ (uses `--env-file` flag)
- `.env.local` in the project root with `BUTTONDOWN_API_KEY=your_key`
- At least one confirmed subscriber in Buttondown

## Commands

### Preview (no email sent)

```bash
npm run send:preview
```

Generates the email HTML and writes it to `scripts/preview-email.html`. Open in a browser to check layout and content before sending. No API key required.

### Dry run (full flow, no email sent)

```bash
npm run send:dry-run
```

Runs the full pipeline — reads content, composes email, checks for duplicates, shows subscriber count, asks for confirmation — but skips the actual send. Useful for verifying the flow works without emailing subscribers.

### Send

```bash
npm run send
```

Sends the latest blog post as a newsletter to all active subscribers. The script:

1. Reads all posts from `src/content/writing/`, picks the latest by date
2. Composes a full HTML email with the post content + previews of the 2 previous posts
3. Writes a preview file to `scripts/preview-email.html`
4. Checks if this post was already sent (compares subject against the last sent email in Buttondown)
5. Shows the post title and subscriber count, asks for `y/n` confirmation
6. Sends via Buttondown's API

The subject line is the post title (e.g., "From a Kid's Question to the App Store").

## Architecture

```
scripts/
  send-newsletter.js        # Orchestrator: reads → composes → confirms → sends
  content-reader.js          # Reads markdown from src/content/writing/, returns latest + 2 previous
  email-composer.js          # Markdown → email-safe HTML (table layout, inline styles)
  constants.js               # SITE_URL constant
  preview-email.html         # Generated preview (gitignored)
  providers/
    buttondown.js            # Buttondown API: send, getLastSentEmail, getSubscriberCount
```

The content reader and email composer are provider-agnostic. Only `scripts/providers/buttondown.js` and `api/subscribe.js` reference Buttondown's API.

## Swapping Providers

To migrate from Buttondown to another provider (e.g., Brevo):

### Send script

1. Create `scripts/providers/brevo.js` exporting the same three functions:
   - `send(subject, html)` — returns `{ ok: true }` or `{ ok: false, error: string }`
   - `getLastSentEmail()` — returns `{ subject }` or `null`
   - `getSubscriberCount()` — returns a number or `null`
2. Update the import in `scripts/send-newsletter.js`:
   ```js
   // Change this line:
   import { send, getLastSentEmail, getSubscriberCount } from './providers/buttondown.js';
   // To:
   import { send, getLastSentEmail, getSubscriberCount } from './providers/brevo.js';
   ```
3. Update the env var name if the new provider uses a different key

### Signup form

1. Update `api/subscribe.js` to call the new provider's subscriber API
2. No changes needed to `src/components/NewsletterSignup.astro` — it calls `/api/subscribe` and doesn't know which provider is behind it

### What stays the same

- `scripts/content-reader.js` — reads markdown, no provider dependency
- `scripts/email-composer.js` — generates HTML, no provider dependency
- `src/components/NewsletterSignup.astro` — form UI and client-side logic
- All frontmatter, RSS feed, and site pages
