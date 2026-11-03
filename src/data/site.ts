export const site = {
  name: 'Insoftica',
  legalName: 'Insoftica Ltd',
  url: 'https://www.insoftica.com',
  tagline: 'Software worth building.',
  description:
    'Insoftica is a technology company building its own software products and AI-powered tools, and engineering software platforms for businesses that need them built properly.',
  email: 'support@insoftica.com',
  address: {
    line1: '128 City Road',
    city: 'London',
    postcode: 'EC1V 2NX',
    country: 'United Kingdom',
    countryCode: 'GB',
  },
  location: 'London, United Kingdom',
  foundedYear: 2026,
  /**
   * Optional form endpoint (for example a Formspree URL such as
   * https://formspree.io/f/xxxxxxx). When empty, the contact form composes an
   * email to `email` in the visitor's mail client instead.
   */
  formEndpoint: '',
  social: {
    linkedin: '',
  },
};

export const addressLines = [
  site.address.line1,
  `${site.address.city}, ${site.address.postcode}`,
  site.address.country,
];

export interface NavChild {
  label: string;
  desc: string;
  href: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Custom software', desc: 'Applications built around how you work', href: '/solutions#custom-software', icon: 'code' },
      { label: 'AI-powered solutions', desc: 'Models applied to a specific job, with review', href: '/solutions#ai', icon: 'sparkle' },
      { label: 'Web applications', desc: 'Fast, accessible, built to scale', href: '/solutions#web', icon: 'monitor' },
      { label: 'SaaS platforms', desc: 'Tenancy, billing, onboarding, admin', href: '/solutions#saas', icon: 'layers' },
      { label: 'API & integration', desc: 'Connect the systems you already run', href: '/solutions#integration', icon: 'plug' },
      { label: 'Modernisation', desc: 'Faster and safer without a rewrite', href: '/solutions#modernisation', icon: 'gauge' },
    ],
  },
  { label: 'Technology', href: '/technology' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Technology', href: '/technology' },
    { label: 'Contact', href: '/contact' },
  ],
  Solutions: [
    { label: 'Custom software', href: '/solutions#custom-software' },
    { label: 'AI-powered solutions', href: '/solutions#ai' },
    { label: 'SaaS platforms', href: '/solutions#saas' },
    { label: 'API & integration', href: '/solutions#integration' },
  ],
  Products: [
    { label: 'Product portfolio', href: '/products' },
    { label: 'Product status', href: '/products#status' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};
