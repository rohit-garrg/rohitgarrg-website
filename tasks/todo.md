# CutToContext section

- [x] `src/config/cuttocontext.ts` — `isPublic` flag, email, last-updated date
- [x] `BaseLayout.astro` — `noindex` prop → `<meta name="robots" content="noindex, nofollow">`
- [x] `Nav.astro` — CutToContext link only when `isPublic`
- [x] `astro.config.mjs` — sitemap filter on `/cuttocontext` pathname prefix unless `isPublic`
- [x] `CutToContextLayout.astro` — shared header, prose styles, Overview · Privacy · Terms strip
- [x] `/cuttocontext` — overview, AI disclosure, video grid slot (empty), upload tool, contact
- [x] `/cuttocontext/privacy` — incl. Google Limited Use, YouTube ToS, `#data-deletion`
- [x] `/cuttocontext/terms`
- [x] CLAUDE.md convention line
- [x] Build + grep checks (sitemap, noindex, no leaks, anchors, title)
- [x] Flip test (`isPublic: true` → nav + sitemap + no noindex; flipped back)
- [ ] Visual check at desktop and 375px
- [ ] After deploy: `curl -sI` all three production URLs → 200; `#data-deletion` opens to the section

## At flip time (manual)
- [ ] Set `isPublic: true`
- [ ] Add video grid on the overview page
- [ ] Footer link / project entry / blog mention if wanted
