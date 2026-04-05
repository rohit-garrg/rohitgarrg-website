import { marked } from 'marked';
import { SITE_URL } from './constants.js';

const COLORS = {
  bg: '#FAFAF9',
  content: '#FFFFFF',
  text: '#1C1917',
  textSecondary: '#78716C',
  accent: '#B45309',
  border: '#E7E5E4',
  codeBg: '#F5F5F4',
  footer: '#A8A29E',
};

const FONTS = {
  heading: "Georgia, 'Times New Roman', Times, serif",
  body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  mono: "Consolas, Monaco, 'Courier New', monospace",
};

const STYLE_MAP = {
  '<h2': `<h2 style="font-family:${FONTS.heading};font-size:20px;font-weight:600;color:${COLORS.text};margin:32px 0 12px;"`,
  '<h3': `<h3 style="font-family:${FONTS.heading};font-size:18px;font-weight:600;color:${COLORS.text};margin:24px 0 8px;"`,
  '<p': `<p style="margin:0 0 16px;line-height:1.6;"`,
  '<a ': `<a style="color:${COLORS.accent};text-decoration:underline;" `,
  '<blockquote': `<blockquote style="border-left:3px solid ${COLORS.accent};padding-left:16px;margin:16px 0;font-style:italic;color:${COLORS.textSecondary};"`,
  '<pre': `<pre style="background:${COLORS.codeBg};padding:12px;border-radius:4px;overflow-x:auto;margin:0 0 16px;"`,
  '<code': `<code style="background:${COLORS.codeBg};padding:2px 6px;border-radius:3px;font-family:${FONTS.mono};font-size:14px;"`,
  '<ul': `<ul style="margin:0 0 16px;padding-left:24px;"`,
  '<ol': `<ol style="margin:0 0 16px;padding-left:24px;"`,
  '<li': `<li style="margin:0 0 4px;"`,
  '<hr': `<hr style="border:none;border-top:1px solid ${COLORS.border};margin:24px 0;"`,
  '<strong': `<strong style="font-weight:600;"`,
};

const renderer = {
  image({ href, title, text }) {
    const src = href.startsWith('http') ? href : `${SITE_URL}${href}`;
    const alt = text || '';
    const titleAttr = title ? ` title="${title}"` : '';
    return `<img src="${src}" alt="${alt}"${titleAttr} style="max-width:100%;height:auto;display:block;margin:16px auto;">`;
  },
};

marked.use({ renderer });

function inlineStyles(html) {
  const tagPattern = new RegExp(
    Object.keys(STYLE_MAP).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
    'g'
  );
  let styled = html.replace(tagPattern, match => STYLE_MAP[match] ?? match);
  // <code> inside <pre> needs no background/padding — override the generic <code> styles
  styled = styled.replace(
    /(<pre style="[^"]*">)\s*<code style="[^"]*">/g,
    `$1<code style="background:none;padding:0;font-family:${FONTS.mono};font-size:14px;">`
  );
  return styled;
}

export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function renderPreviousPost(post) {
  const imageRow = post.leadImage
    ? `<tr><td style="padding-bottom:8px;">
        <a href="${post.url}" style="text-decoration:none;">
          <img src="${post.leadImage}" alt="${post.title}" style="max-width:100%;height:auto;display:block;border-radius:6px;">
        </a>
      </td></tr>`
    : '';

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${imageRow}
      <tr><td>
        <a href="${post.url}" style="color:${COLORS.accent};text-decoration:none;font-family:${FONTS.heading};font-size:18px;font-weight:700;">${post.title}</a>
      </td></tr>
      <tr><td style="padding-top:4px;">
        <span style="color:${COLORS.textSecondary};font-family:${FONTS.body};font-size:14px;line-height:1.5;">${post.excerpt}</span>
      </td></tr>
      <tr><td style="padding-top:4px;">
        <a href="${post.url}" style="color:${COLORS.accent};font-family:${FONTS.body};font-size:14px;text-decoration:none;">Read on site &rarr;</a>
      </td></tr>
    </table>`;
}

export function composeEmail(latest, previous) {
  const postHtml = inlineStyles(marked.parse(latest.body));
  const previousHtml = previous.map(renderPreviousPost).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${latest.title}</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.bg};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.bg};">
    <tr>
      <td align="center" style="padding:24px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:${COLORS.content};">

          <!-- HEADER -->
          <tr>
            <td style="padding:24px 24px 16px;border-bottom:1px solid ${COLORS.border};">
              <a href="${SITE_URL}" style="text-decoration:none;color:${COLORS.text};font-family:${FONTS.heading};font-size:18px;font-weight:500;">rohitgarrg.com</a>
              <br>
              <span style="color:${COLORS.textSecondary};font-family:${FONTS.body};font-size:13px;">Product at scale. Built with AI.</span>
            </td>
          </tr>

          <!-- POST TITLE -->
          <tr>
            <td style="padding:24px 24px 8px;">
              <h1 style="font-family:${FONTS.heading};font-size:24px;font-weight:700;color:${COLORS.text};margin:0 0 8px;">${latest.title}</h1>
              <span style="color:${COLORS.textSecondary};font-family:${FONTS.body};font-size:13px;">${formatDate(latest.date)}</span>
            </td>
          </tr>

          ${latest.leadImage ? `<!-- LEAD IMAGE -->
          <tr>
            <td style="padding:16px 24px 0;">
              <img src="${latest.leadImage}" alt="${latest.title}" style="max-width:100%;height:auto;display:block;border-radius:8px;">
            </td>
          </tr>` : ''}

          <!-- POST CONTENT -->
          <tr>
            <td style="padding:16px 24px 24px;font-family:${FONTS.body};font-size:16px;line-height:1.6;color:${COLORS.text};">
              ${postHtml}
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:0 24px;">
              <hr style="border:none;border-top:1px solid ${COLORS.border};margin:32px 0;">
            </td>
          </tr>

          <!-- PREVIOUS POSTS -->
          <tr>
            <td style="padding:0 24px 24px;">
              <span style="color:${COLORS.textSecondary};font-family:${FONTS.body};font-size:13px;text-transform:uppercase;letter-spacing:1px;">Recent posts</span>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                <tr><td>
                  ${previousHtml}
                </td></tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:24px;border-top:1px solid ${COLORS.border};text-align:center;">
              <span style="color:${COLORS.footer};font-family:${FONTS.body};font-size:12px;">You're receiving this because you subscribed at rohitgarrg.com</span>
              <br>
              <a href="{{ unsubscribe_url }}" style="color:${COLORS.footer};font-family:${FONTS.body};font-size:12px;">Unsubscribe</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
