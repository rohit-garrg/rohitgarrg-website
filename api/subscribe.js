/**
 * Vercel serverless function: newsletter subscription proxy.
 * Receives an email from the client, subscribes via Buttondown's API.
 * The API key stays server-side. To migrate providers, replace this file.
 */

const BUTTONDOWN_API_URL = 'https://api.buttondown.com/v1/subscribers';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    console.error('BUTTONDOWN_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const response = await fetch(BUTTONDOWN_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    }

    const data = await response.json().catch(() => null);

    if (response.status === 409 || (data && JSON.stringify(data).toLowerCase().includes('already'))) {
      return res.status(409).json({ error: 'This email is already subscribed.' });
    }

    const message = (data?.email?.[0]) || data?.detail || 'Subscription failed. Please try again.';
    return res.status(response.status).json({ error: message });
  } catch (err) {
    console.error('Buttondown API error:', err);
    return res.status(502).json({ error: 'Could not reach the subscription service. Please try again.' });
  }
}
