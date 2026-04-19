/**
 * Site-wide metadata: hero stats, now-strip, currently line, footer signature.
 * Edit this file to update numbers and status without touching components.
 */

export const heroStats = [
  { number: '14+', label: 'years shipping product' },
  { number: '60+', label: 'person team' },
  { number: '38', label: 'books in three years' },
] as const;

export const currentlyLine = 'Shipping Planetia for iPad and drafting essay #43.';

export const nowStrip = [
  { text: 'Head of P&D · Times of India', beadColor: 'peri' as const },
  { text: 'Shipping Planetia on the App Store', beadColor: 'sage' as const },
  { text: 'Reading <em>The Unaccountability Machine</em>', beadColor: 'clay' as const },
] as const;

export const footerSignature =
  'Product and design at scale. Tinkering with AI. Notes from a product leader in Delhi-NCR.';
