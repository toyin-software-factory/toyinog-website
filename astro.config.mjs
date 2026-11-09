// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Static output by default; individual routes opt in to SSR with `export const prerender = false`.
export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
});
