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

The form posts to `site.formEndpoint` (in `src/data/site.ts`). Set it to a Formspree or similar endpoint to receive messages by email without a backend. While it is empty, the form opens the visitor's email app with the message pre-filled and addressed to `site.email`.

## Deployment

`npm run build` prerenders every page to static HTML in `dist/client/` and produces a small Node server in `dist/server/` that serves those pages and handles the contact form (`POST /api/contact`). Run it with `npm start`; it listens on `PORT` (default 4321).

On Render: create a **Web Service** from this repository with Build Command `npm install; npm run build` and Start Command `npm start`. No GitHub Actions workflow is used.

### Contact form email

The form sends through SMTP. Set these environment variables on the host (and in a local `.env`, which is git-ignored, for development). See `.env.example`.

| Variable | Meaning |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT` | Mail server, e.g. `smtp.mailgun.org` and `587` |
| `SMTP_USER`, `SMTP_PASS` | SMTP login |
| `CONTACT_TO` | Inbox that receives messages (defaults to the site email) |
| `CONTACT_FROM` | Sender address; must be one the SMTP account may send as |

The credentials are read only inside the server endpoint and are never included in the built pages. The endpoint also drops honeypot submissions and limits each IP to five messages per ten minutes.
