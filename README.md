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

`npm run build` writes a fully static site to `dist/`. Upload that folder to any static host (Cloudflare Pages, Netlify, Vercel, or a plain web server) and point `www.insoftica.com` at it. No GitHub Actions workflow is used.
