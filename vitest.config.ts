import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      'cloudflare:email': fileURLToPath(
        new URL('./tests/contact/cloudflare-email-stub.ts', import.meta.url),
      ),
    },
  },
  test: { include: ['tests/contact/**/*.test.ts'] },
});
