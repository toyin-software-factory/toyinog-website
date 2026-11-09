// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// Static output by default; individual routes opt in to SSR with `export const prerender = false`.
export default defineConfig({
  site: 'https://toyinog.com',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    sitemap({
      // Internal pages: the styleguide is noindex, the 404 and API are not content.
      filter: (page) => !/\/(styleguide|404|api)(\/|$)/.test(page),
    }),
  ],
});
