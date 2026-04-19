// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkInlineCta from './src/plugins/remark-inline-cta.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.rohitgarrg.com',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkInlineCta],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
