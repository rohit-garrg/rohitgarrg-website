import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('writing');
  const sortedPosts = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Rohit Garg — Writing',
    description: 'Articles on product management, leadership, AI tools, and personal development.',
    site: context.site,
    items: sortedPosts.map(post => ({
      title: post.data.title,
      description: post.data.excerpt || post.data.description,
      pubDate: post.data.date,
      link: `/writing/${post.id.replace(/\.md$/, '')}`,
    })),
  });
}
