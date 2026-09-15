/**
 * Site-wide metadata: hero stats, now-strip, currently line, footer signature.
 * Edit this file to update numbers and status without touching components.
 */

export const heroTagline = '14 years in product. 50+ books in three years. Three side projects and counting.';

export const currentlyLine = "Shipping Drops for Android and listening to A Clash of Kings by George RR Martin.";

export const nowStrip = [
  { text: 'Business Head · Indiatimes', beadColor: 'peri' as const },
  { text: 'Shipping Drops for Android', beadColor: 'sage' as const },
  { text: 'Reading <em>The Unaccountability Machine</em>', beadColor: 'clay' as const },
] as const;

export const footerSignature =
  'Product and design at scale. Tinkering with AI. Notes from a product leader in Delhi-NCR.';
