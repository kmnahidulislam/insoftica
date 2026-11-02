/**
 * Product portfolio.
 *
 * Add a product by appending an entry here. The Products page and the home
 * page product section render from this list. Keep `status` honest:
 *   - 'in-development'  : being built, not yet usable by the public
 *   - 'early-access'    : usable by invited users
 *   - 'available'       : publicly released
 *
 * Leave the list empty until the first product can be described truthfully.
 */
export type ProductStatus = 'in-development' | 'early-access' | 'available';

export interface Product {
  slug: string;
  name: string;
  summary: string;
  status: ProductStatus;
  /** Optional external link once the product is live. */
  url?: string;
}

export const products: Product[] = [];

export const statusLabel: Record<ProductStatus, string> = {
  'in-development': 'In development',
  'early-access': 'Early access',
  available: 'Available',
};

/**
 * Directions the company is actively exploring. These are areas of work,
 * not products, and are presented as such.
 */
export const productAreas = [
  {
    title: 'AI-assisted tools for everyday work',
    text: 'Applications that use language models to draft, summarise, search and organise, with the user reviewing every result.',
  },
  {
    title: 'SaaS platforms for small and growing businesses',
    text: 'Focused, subscription-based software that replaces spreadsheets and manual processes with something dependable.',
  },
  {
    title: 'Developer and automation tooling',
    text: 'Utilities and APIs that remove repetitive work from building and operating software.',
  },
];
