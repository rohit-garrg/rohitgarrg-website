import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.enum(['AI', 'Leadership', 'Product', 'Design', 'Books', 'Projects']),
    excerpt: z.string(),
    readMin: z.number(),
    cover: z.string(),
    nextPosts: z.array(z.string()).optional(),
    series: z.object({ name: z.string(), order: z.number() }).optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    ogImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().optional(),
    image: z.string().optional(),
    name: z.string().optional(),
    kind: z.string().optional(),
    year: z.coerce.number().optional(),
    blurb: z.string().optional(),
    stack: z.array(z.string()).optional(),
    stat: z.string().optional(),
    order: z.number().optional(),
  }),
});

const speaking = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    location: z.string(),
    url: z.string().optional(),
    conferenceUrl: z.string().optional(),
    leadImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
  }),
});

export const collections = { posts, projects, speaking };
