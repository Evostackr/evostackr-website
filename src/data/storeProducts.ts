/**
 * Evostackr — Static Software Store Products Data Architecture
 * 
 * Strict Scope Constraints:
 * - Local static data module (no database, no backend CMS, no API).
 * - Future-ready typed contract for manual product entry.
 * - Initial catalogue MUST contain zero actual or fictional products.
 * - When products are ready to sell, append entries to `storeProducts` with:
 *   - text details (name, shortDescription, description)
 *   - logoUrl, screenshotUrls
 *   - price (amount, currency, displayPrice)
 *   - buyUrl (Buy Me a Coffee digital product URL)
 */

export interface StoreProductPrice {
  amount?: number;
  currency?: string;
  displayPrice: string;
  billingType?: 'one-time' | 'subscription' | 'free';
}

export interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description?: string;
  productType: string;
  price?: StoreProductPrice;
  logoUrl?: string;
  screenshotUrls?: string[];
  buyUrl?: string;
  platforms?: string[];
  version?: string;
  featured?: boolean;
  status?: string;
  features?: string[];
}

/**
 * Static software store catalogue.
 * Initialized as an empty array until authentic software products are launched.
 */
export const storeProducts: StoreProduct[] = [];

