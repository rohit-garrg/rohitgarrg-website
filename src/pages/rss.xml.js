import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { marked } from 'marked';

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function GET(context) {
  const posts = await getCollection('posts');
  const sortedPosts = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Rohit Garg — Writing',
    description: 'Essays on product, AI, leadership, and the occasional book review.',
    site: context.site,
    xmlns: {
      media: 'http://search.yahoo.com/mrss/',
    },
    items: sortedPosts.map(post => {
      const slug = post.id.replace(/\.md$/, '');
      const coverUrl = new URL(post.data.cover, context.site).href;
      const bodyHtml = marked.parse(post.body || '');
      const contentHtml = `<img src="${coverUrl}" alt="${escapeHtml(post.data.title)}" />\n${bodyHtml}`;

      return {
        title: post.data.title,
        description: post.data.excerpt,
        pubDate: post.data.date,
        link: `/writing/${slug}`,
        content: contentHtml,
        customData: `<media:content url="${coverUrl}" medium="image" />`,
      };
    }),
  });
}
