import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SITE_URL } from './constants.js';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/writing');

export function readPosts() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx?$/, '');

    return {
      title: data.title,
      date: new Date(data.date),
      excerpt: data.excerpt || data.description,
      leadImage: data.leadImage ? `${SITE_URL}${data.leadImage}` : null,
      url: data.canonicalUrl || `${SITE_URL}/writing/${slug}`,
      slug,
      body: content,
    };
  });

  posts.sort((a, b) => b.date - a.date);

  return {
    latest: posts[0],
    previous: posts.slice(1, 3),
  };
}
