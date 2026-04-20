// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkInlineCta from './src/plugins/remark-inline-cta.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.rohitgarrg.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkInlineCta],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
