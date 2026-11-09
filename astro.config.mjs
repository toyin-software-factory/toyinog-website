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
      // Left out: styleguide (noindex), 404 and API (not content), and /contact, which is
      // server rendered, so it has no trailing-slash URL that matches its canonical.
      filter: (page) => !/\/(styleguide|404|api|contact)(\/|$)/.test(page),
    }),
  ],
});
