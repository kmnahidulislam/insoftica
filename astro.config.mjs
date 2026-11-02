import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.insoftica.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
});
