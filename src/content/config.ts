import { defineCollection, z } from 'astro:content';

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'Product Management',
      'Leadership / Career',
      'AI Tools / Productivity',
      'Personal Development',
      'Reading / Reviews'
    ]),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    leadImage: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
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

export const collections = { writing, projects, speaking };
