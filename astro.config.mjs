import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://www.insoftica.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  // Every page is still prerendered to static HTML. The adapter exists only
  // for the contact form endpoint (src/pages/api/contact.ts), which runs on
  // the server so the mail credentials never reach the browser.
  adapter: cloudflare(),
  // Secrets are read from the environment at runtime, never inlined at build.
  // Change the values on the host (or in .env locally); the code stays the same.
  env: {
    schema: {
      SMTP_HOST: envField.string({ context: 'server', access: 'secret', optional: true }),
      SMTP_PORT: envField.number({ context: 'server', access: 'secret', optional: true, default: 587 }),
      SMTP_USER: envField.string({ context: 'server', access: 'secret', optional: true }),
      SMTP_PASS: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
});
