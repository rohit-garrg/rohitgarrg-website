const CTA_HTML = `<div class="inline-cta">
  <div class="inline-cta-icon" aria-hidden="true">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  </div>
  <div class="inline-cta-body">
    <p class="inline-cta-heading"><strong>Enjoying this?</strong></p>
    <p class="inline-cta-sub">Get the next essay in your inbox, most Sundays.</p>
  </div>
  <a href="#newsletter" class="inline-cta-btn">Subscribe</a>
</div>`;

export default function remarkInlineCta() {
  return (tree) => {
    let paragraphCount = 0;
    let insertIndex = -1;

    for (let i = 0; i < tree.children.length; i++) {
      if (tree.children[i].type === 'paragraph') {
        paragraphCount++;
        if (paragraphCount === 5) {
          insertIndex = i + 1;
          break;
        }
      }
    }

    if (insertIndex !== -1) {
      tree.children.splice(insertIndex, 0, {
        type: 'html',
        value: CTA_HTML,
      });
    }
  };
}
