// Region layer for the dual-domain storefront:
//   theindigofable.com -> India domestic (INR, UPI/COD, ₹1,999 free-shipping threshold)
//   theindigofable.ca  -> Western markets (CAD display, international gateways)
//
// Catalog prices arrive from Shopify in INR (store base currency). Non-INR
// regions convert at a display rate for browsing; the shopper settles in
// local currency at Shopify Markets checkout via the country/currency params.

export type RegionCode = 'in' | 'ca';

export interface RegionConfig {
  code: RegionCode;
  label: string;
  shortLabel: string;
  flag: string;
  domain: string;
  currency: 'INR' | 'CAD';
  currencySymbol: string;
  locale: string;
  hreflang: string;
  /** Multiplier applied to INR base prices for display in this region. */
  fxFromINR: number;
  /** Free-shipping threshold in the region's display currency. */
  freeShippingThreshold: number;
  codAvailable: boolean;
  paymentMethods: string[];
  shippingNote: string;
  /** Query params appended to Shopify cart permalinks (Shopify Markets). */
  checkoutParams: Record<string, string>;
}

const FX_INR_TO_CAD = Number(process.env.NEXT_PUBLIC_FX_INR_CAD) || 0.0165;
const FREE_SHIP_IN = Number(process.env.NEXT_PUBLIC_FREE_SHIP_IN) || 1999;
const FREE_SHIP_CA = Number(process.env.NEXT_PUBLIC_FREE_SHIP_CA) || 65;

export const REGIONS: Record<RegionCode, RegionConfig> = {
  in: {
    code: 'in',
    label: 'India',
    shortLabel: 'IN · ₹',
    flag: '🇮🇳',
    domain: 'theindigofable.com',
    currency: 'INR',
    currencySymbol: '₹',
    locale: 'en-IN',
    hreflang: 'en-IN',
    fxFromINR: 1,
    freeShippingThreshold: FREE_SHIP_IN,
    codAvailable: true,
    paymentMethods: ['UPI', 'RuPay', 'Visa', 'Mastercard', 'Netbanking', 'COD'],
    shippingNote: `Complimentary shipping over ₹${FREE_SHIP_IN.toLocaleString('en-IN')} · Cash on Delivery available across India.`,
    checkoutParams: { country: 'IN', currency: 'INR' },
  },
  ca: {
    code: 'ca',
    label: 'Canada & International',
    shortLabel: 'CA · C$',
    flag: '🇨🇦',
    domain: 'theindigofable.ca',
    currency: 'CAD',
    currencySymbol: 'C$',
    locale: 'en-CA',
    hreflang: 'en-CA',
    fxFromINR: FX_INR_TO_CAD,
    freeShippingThreshold: FREE_SHIP_CA,
    codAvailable: false,
    paymentMethods: ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Shop Pay'],
    shippingNote: `Complimentary tracked express shipping over C$${FREE_SHIP_CA} · Duties & taxes settled at checkout.`,
    checkoutParams: { country: 'CA', currency: 'CAD' },
  },
};

export const DEFAULT_REGION: RegionCode = 'in';

export const REGION_COOKIE = 'indigo_region';
export const REGION_CHOICE_COOKIE = 'indigo_region_choice';
export const REGION_HEADER = 'x-indigo-region';

export function parseRegion(value: string | null | undefined): RegionCode | null {
  return value === 'in' || value === 'ca' ? value : null;
}

export function regionForHost(host: string): RegionCode | null {
  const hostname = host.split(':')[0].toLowerCase();
  for (const region of Object.values(REGIONS)) {
    if (hostname === region.domain || hostname.endsWith(`.${region.domain}`)) {
      return region.code;
    }
  }
  return null;
}

export function regionForCountry(countryCode: string): RegionCode {
  return countryCode.toUpperCase() === 'IN' ? 'in' : 'ca';
}

/** Convert an INR base amount into the region's display currency, with premium rounding. */
export function convertFromINR(amountINR: number, region: RegionConfig): number {
  if (region.fxFromINR === 1) return amountINR;
  const value = amountINR * region.fxFromINR;
  // Low-ticket aromatics round to a .25 step; larger pieces to whole units.
  return value < 20 ? Math.round(value * 4) / 4 : Math.round(value);
}

/** Format an amount already expressed in the region's display currency. */
export function formatMoney(amount: number, region: RegionConfig): string {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  const digits = hasCents ? 2 : 0;
  return (
    region.currencySymbol +
    amount.toLocaleString(region.locale, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })
  );
}

/** Convert an INR base amount and format it for the region. */
export function formatFromINR(amountINR: number | string, region: RegionConfig): string {
  return formatMoney(convertFromINR(Number(amountINR) || 0, region), region);
}

/** Shopify cart permalink carrying the region's Markets country/currency. */
export function buildCheckoutUrl(shopDomain: string, cartParts: string, region: RegionConfig): string {
  const qs = new URLSearchParams(region.checkoutParams).toString();
  return `https://${shopDomain}/cart/${cartParts}${qs ? `?${qs}` : ''}`;
}
