# Insoftica — Brand & Website Strategy

_Working document. Written November 2026 before the site build. Update it as the company and product portfolio evolve._

---

## 1. Research findings

Twelve reference sites were reviewed (OpenAI, Anthropic, Stripe, Vercel, Linear, Figma, Notion, Cloudflare, Framer, Perplexity, Ramp, Retool). The relevant conclusions:

**What the strongest sites have in common**

- **One plain sentence first.** Anthropic's hero is a mission statement; Stripe's is "Financial infrastructure to grow your revenue." Nobody leads with an abstract slogan alone.
- **Vision paired with something concrete.** Vercel backs a category claim with three bullets; Stripe shows a product grid directly under the vision. A claim with no mechanism reads as hype.
- **Three jobs, not a feature list.** Notion organises its whole page around Capture / Find / Automate. Linear uses three pillars. Visitors remember three things.
- **The product is the imagery.** Linear and Retool use their own interfaces as visuals. Where no product exists, honest, labelled concept visuals do the same job.
- **Specifics over superlatives.** Cloudflare names cities and runtimes; Framer quotes Core Web Vitals. Stated constraints and principles are more credible than adjectives.
- **Short navigation.** The companies with huge mega-menus (Figma, Stripe, Ramp) have hundreds of products. Early companies use four to six items.
- **Credibility signals that cost nothing to be honest about:** the legal entity in the footer, a real contact address, a published set of principles, a visible "what we're building" log.

**What Insoftica must not copy**

- Logo walls, customer counts, testimonials, ROI figures, compliance badges. They are unearned today and would be fabricated.
- Category-defining slogans ("Agentic infrastructure", "the full-stack creative canvas"). They need shipped products behind them.
- "Agent"/"AI era" stuffed into every heading. It is the current cliché shared by every reference site.
- A launch-feed homepage. It looks empty without a release cadence.

---

## 2. Positioning

**Category:** Technology company — software products and AI-powered tools.

**Positioning statement**

> Insoftica is a UK technology company that builds its own software products and AI-powered tools for an international audience, and engineers software platforms for businesses that need them built properly.

**The three ideas, in the order the site presents them**

| Idea | What it means for Insoftica | How the site shows it |
|---|---|---|
| **Products** | We develop and operate our own digital products: web applications, SaaS platforms, developer tools. The portfolio is at its beginning. | A Products page built to grow; the first products shown as "in development", never as released. |
| **Technology** | Modern engineering practice: typed code, tested releases, measurable performance, cloud-native infrastructure. | A Technology page with principles and the actual stack. A dark "engineering" band on the home page. |
| **Innovation (AI)** | Applying AI where it does useful work — assistants, automation, search, generation — inside real products, with the user in control. | "Practical AI" messaging everywhere; AI shown as a capability inside products, not a standalone promise. |

**Secondary activity:** software engineering and technology services for businesses. Presented as "Solutions", clearly subordinate to the product identity.

**Mission:** To build software products and AI-powered tools that are genuinely useful, well engineered and a pleasure to use.

**Vision:** A portfolio of Insoftica products used by people and businesses around the world, and a company known for the quality of what it builds.

**Principles** (used on About and Technology)

1. Useful before impressive.
2. Engineered to last.
3. AI where it earns its place.
4. The user stays in control.
5. Clear about what's real.

**Tone of voice:** Confident, plain, specific. Sentence case. Short sentences. British spelling. No "empowering", "revolutionising", "unlock", "transform", "redefine", "world-class", "cutting-edge", "leverage".

**Honesty rules baked into the copy**

- No invented customers, metrics, team sizes, funding, awards, partners.
- No product is described as available. Everything in the portfolio is "in development" until the company says otherwise.
- Concept interface visuals carry an "Illustrative concept" label.

---

## 3. Messaging

**Headline (home):** _Software worth building._

Why: three words, declarative, modest and confident at once. It implies selectivity and craft without claiming scale, and it reads as a standard the company holds itself to.

**Supporting line:** Insoftica is a technology company building its own software products and AI-powered tools, and engineering platforms for businesses that need them built properly.

**Calls to action:** Primary "Talk to us" (Contact). Secondary "What we're building" (Products). There is nothing to sign up for yet, so there is no "Get started".

**Section headlines (home)**

1. Hero — Software worth building.
2. Intro — A product company at the start of its portfolio.
3. Three jobs — Products we build / AI applied to real work / Engineering for businesses
4. Products — The first products are in development.
5. Engineering band (dark) — Built the way software should be built.
6. Approach — How we work.
7. Contact — Let's talk about what you're building.

**Alternatives considered and rejected:** "Technology that moves ideas forward" (abstract, could be any company), "Engineering software for what's next" (generic "next"), "Building the next generation of digital products" (claims a generation).

---

## 4. Visual identity

**Logo.** The existing mark is kept: a 3×3 module grid forming a capital **I**, with one module rendered as a dot. It is simple, geometric and owns the letter I without resorting to circuit or sparkle imagery. The wordmark (geometric sans, lowercase after the capital) stays as supplied. Primary lock-up: wordmark in Indigo on light surfaces; white on Ink.

**Graphic system — "modules".** The logo's squares-and-dot grid becomes the brand's graphic language: dot grids as backgrounds, modules as section markers and bullet glyphs, modules assembling into interface compositions. It is distinctive, cheap to reproduce, and scales from a favicon to a hero illustration.

**Theme.** Light-first, with Ink (near-black navy) used for one engineering band on the home page, the Technology page header and the footer. Reason: a light site reads as product and business-facing; the dark band signals engineering depth. A full dark theme would push the brand toward the dev-tool cliché.

**Colour**

| Token | Value | Use |
|---|---|---|
| Indigo | `#4C4FD6` | Primary brand, links, primary buttons |
| Indigo deep | `#3538B8` | Hover states |
| Indigo light | `#8E93F7` | Accents on Ink |
| Ink | `#0E0F2A` | Headings, dark surfaces |
| Slate | `#5B5C73` | Body text secondary |
| Canvas | `#F6F6FA` | Page background (cool off-white) |
| Surface | `#FFFFFF` | Cards, panels |
| Line | `#E3E3ED` | Borders |
| Signal | `#1F9D6A` | "Live" status only |
| Amber | `#D98A1F` | "In development" status only |

No gradients as decoration. No glass. One accent colour.

**Typography.** **Manrope** (display and body) — geometric with humanist warmth, pairs naturally with the wordmark's geometry, sets well at 72px and 16px. **JetBrains Mono** for labels, status tags, numbers and code. Headlines: weight 700, tight tracking (−0.025em), sentence case, full stops.

**Layout.** 1200px container, 8px grid, generous whitespace. Sections alternate: full-bleed, two-column, bordered list, dark band. No two adjacent sections share a layout.

**Motion.** Fade-and-rise on scroll (once), module grid assembling in the hero, 150–250ms hover transitions. Respects `prefers-reduced-motion`.

---

## 5. Information architecture

```
Home
About          — company, mission, vision, principles, how we work
Products       — portfolio (status-aware), product areas, notify
Solutions      — engineering & AI services for businesses
Technology     — engineering philosophy, stack, practices
Contact        — form + direct email + company details
Privacy Policy
Terms of Service
404
```

Navigation: Products · Solutions · Technology · About · [Talk to us]. Footer carries everything else.

**Scalability.** Products live in `src/data/products.ts` with a `status` field (`in-development` | `early-access` | `available`). Adding a product is a data change; the Products page and home page product section render from it. Individual product pages can be added under `src/pages/products/[slug].astro` using the same layout.

---

## 6. Technical decisions

- **Astro** (static output) + plain CSS design tokens. No client-side framework; the site is content. Zero JavaScript shipped except the nav toggle, scroll reveal and contact form helper.
- **Hosting:** GitHub Pages via Actions, custom domain `www.insoftica.com` (CNAME in `public/`).
- **Contact form:** posts to a form endpoint set in `src/data/site.ts` (`formEndpoint`). Until one is configured it composes an email to `support@insoftica.com` in the visitor's mail client, which works without a backend. No fake success states.
- **SEO:** per-page titles and descriptions, canonical URLs, Open Graph/Twitter, `sitemap-index.xml`, `robots.txt`, `Organization` + `WebSite` JSON-LD.
