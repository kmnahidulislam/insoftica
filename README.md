# Insoftica website

The official website of Insoftica Ltd — https://www.insoftica.com

Built with [Astro](https://astro.build) as a fully static site. No client-side framework; the only JavaScript shipped is the mobile menu, scroll reveal and contact-form helper.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the built site
```

## Structure

```
src/
  data/site.ts        company details, nav, contact email, form endpoint
  data/products.ts    product portfolio (add products here)
  layouts/Base.astro  <head>, SEO, JSON-LD, header, footer
  components/         Header, Footer, Logo, Icon, PageHero, HeroVisual, ContactCta
  pages/              one file per page
  styles/global.css   design tokens and shared components
public/
  brand/              logo files
  favicon/            favicons
  CNAME               custom domain (www.insoftica.com)
docs/brand-strategy.md  positioning, messaging and visual identity decisions
```

## Adding a product

Edit `src/data/products.ts` and append an entry:

```ts
{
  slug: 'example',
  name: 'Example',
  summary: 'One or two sentences on what it does and who it is for.',
  status: 'in-development', // 'early-access' | 'available'
  url: 'https://example.insoftica.com', // optional, once live
}
```

The Products page and the home page product section update automatically. For a dedicated product page, add `src/pages/products/<slug>.astro` using `Base.astro` and `PageHero.astro`.

## Contact form

The form posts to `/api/contact` (set in `site.formEndpoint` in `src/data/site.ts`), a server endpoint in `src/pages/api/contact.ts` that emails the message through SMTP. See the deployment section for the environment variables it needs. If `formEndpoint` is emptied, the form falls back to opening the visitor's email app with the message pre-filled.

## Deployment

The site is deployed as a Cloudflare Worker with static assets. `npm run build` prerenders every page to static HTML in `dist/` and produces a tiny Worker (`dist/server/`) that serves those files and handles the contact form (`POST /api/contact`). Deploy with `npm run deploy`, or let Cloudflare build from the repository: Build command `npm run build`, Deploy command `npm run deploy`. No GitHub Actions workflow is used.

Moving to another host later only means swapping the Astro adapter in `astro.config.mjs` and the SMTP client in `src/pages/api/contact.ts`; the pages and the environment variables stay the same.

### Contact form email

The form sends through plain SMTP, so any provider works (Mailgun, Postmark, SES, Zoho, ...). Set these environment variables on the host (Cloudflare: Settings, Variables and secrets, type **Secret**) and in a local `.env`, which is git-ignored, for development. See `.env.example`. Changing provider means changing these values only.

| Variable | Meaning |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT` | Mail server and port. Use `587` (STARTTLS) or `465` (TLS); Cloudflare blocks port 25 |
| `SMTP_USER`, `SMTP_PASS` | SMTP login |
| `CONTACT_TO` | Inbox that receives messages (defaults to the site email) |
| `CONTACT_FROM` | Sender address; must be one the SMTP account may send as |

The credentials are read only inside the server endpoint and are never included in the built pages. The endpoint also drops honeypot submissions and limits each IP to five messages per ten minutes.
