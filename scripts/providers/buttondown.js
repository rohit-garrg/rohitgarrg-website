/**
 * Buttondown provider module.
 * This is the ONLY file in the send script that references Buttondown's API.
 * To migrate providers, create a new file with the same three exports.
 */

const BASE_URL = 'https://api.buttondown.com/v1';

function headers() {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    throw new Error('BUTTONDOWN_API_KEY is not set. Run via: npm run send');
  }
  return {
    'Authorization': `Token ${apiKey}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Send a newsletter email to all subscribers.
 * @param {string} subject - Email subject line
 * @param {string} html - Complete HTML email body
 * @returns {{ ok: boolean, error?: string }}
 */
export async function send(subject, html) {
  try {
    const response = await fetch(`${BASE_URL}/emails`, {
      method: 'POST',
      headers: {
        ...headers(),
        'X-Buttondown-Live-Dangerously': 'true',
      },
      body: JSON.stringify({
        subject,
        body: '<!-- buttondown-editor-mode: fancy -->' + html,
        status: 'about_to_send',
      }),
    });

    if (response.ok) {
      return { ok: true };
    }

    const data = await response.json().catch(() => null);
    const detail = data?.detail;
    const message = typeof detail === 'string'
      ? detail
      : Array.isArray(detail) ? detail[0]?.msg : null;

    return { ok: false, error: message || `API returned ${response.status}` };
  } catch (err) {
    return { ok: false, error: `Could not reach Buttondown API: ${err.message}` };
  }
}

/**
 * Get the most recently sent email from Buttondown.
 * @returns {{ subject: string } | null}
 */
export async function getLastSentEmail() {
  const response = await fetch(
    `${BASE_URL}/emails?status=sent&ordering=-publish_date&page_size=1`,
    { headers: headers() }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch sent emails: ${response.status}`);
  }

  const data = await response.json();
  return data.results?.[0] || null;
}

/**
 * Get the number of active subscribers.
 * @returns {number | null} - Count, or null if the API call fails
 */
export async function getSubscriberCount() {
  try {
    const response = await fetch(
      `${BASE_URL}/subscribers?type=regular`,
      { headers: headers() }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.count ?? null;
  } catch {
    return null;
  }
}
