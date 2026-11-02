export const site = {
  name: 'Insoftica',
  legalName: 'Insoftica Ltd',
  url: 'https://www.insoftica.com',
  tagline: 'Software worth building.',
  description:
    'Insoftica is a UK technology company building its own software products and AI-powered tools, and engineering software platforms for businesses that need them built properly.',
  email: 'support@insoftica.com',
  location: 'United Kingdom',
  foundedYear: 2026,
  /**
   * Optional form endpoint (for example a Formspree URL such as
   * https://formspree.io/f/xxxxxxx). When empty, the contact form composes an
   * email to `email` in the visitor's mail client instead.
   */
  formEndpoint: '',
  social: {
    linkedin: '',
    github: 'https://github.com/kmnahidulislam/insoftica',
  },
};

export const nav = [
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Technology', href: '/technology' },
  { label: 'About', href: '/about' },
];

export const footerNav = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Technology', href: '/technology' },
    { label: 'Contact', href: '/contact' },
  ],
  'What we do': [
    { label: 'Products', href: '/products' },
    { label: 'Solutions', href: '/solutions' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};
