/**
 * CutToContext section (/cuttocontext/*).
 * isPublic: false → pages are live but noindexed, out of the sitemap, and not in the nav.
 * Flip to true to add the nav link, include them in the sitemap, and drop noindex.
 * Footer link, project entry and blog mentions are separate, manual steps.
 */
export const cuttocontext = {
  isPublic: false,
  email: 'cut2contxt@gmail.com',
  lastUpdated: '25 September 2026',
} as const;
