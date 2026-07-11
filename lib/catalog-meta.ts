// Artisan provenance details per product handle, sourced from the store's
// Shopify metafield export (custom.* namespace). Baked in until the
// storefront reads metafields directly from the Admin API.

export interface ProvenanceMeta {
  artisanOrigin?: string;
  dyeType?: string;
  craftTechnique?: string;
  fabricWeight?: string;
  warmthRating?: string;
  careSummary?: string;
  packagingType?: string;
  materialComposition?: string;
  dimensionsIn?: string;
  giftReady?: boolean;
  plasticFree?: boolean;
}

export const CATALOG_META: Record<string, ProvenanceMeta> = {
  'indigo-gold-hand-stitched-organic-cotton-quilt-single': {
    artisanOrigin: 'Jaipur, Rajasthan',
    dyeType: 'Natural Indigo',
    craftTechnique: 'Hand-Quilted (Tagai)',
    fabricWeight: 'Medium Weight',
    warmthRating: 'All-Season (Medium)',
    careSummary: 'Dry Clean Recommended',
    packagingType: 'Reusable Muslin Bag',
    materialComposition: '100% Cotton',
    giftReady: true,
    plasticFree: true,
  },
  'handmade-reversible-jaipuri-quilt-set-100-organic-cotton-razai-with-indigo-floral-buta-2-pillowcases-cushion-cover': {
    artisanOrigin: 'Jaipur, Rajasthan',
    dyeType: 'Natural Indigo',
    craftTechnique: 'Hand-Quilted (Tagai)',
    warmthRating: 'All-Season (Medium)',
    careSummary: 'Dry Clean Only',
    dimensionsIn: '90" x 108"',
    giftReady: true,
    plasticFree: true,
  },
  'premium-cotton-floral-rajai-handcrafted-indian-quilt-with-leaf-print-soft-lightweight-cozy-elegant-border-design': {
    artisanOrigin: 'Jaipur, Rajasthan',
    dyeType: 'Vegetable / Natural Dye',
    craftTechnique: 'Hand-Quilted (Tagai)',
    fabricWeight: 'Medium Weight',
    warmthRating: 'All-Season (Medium)',
    careSummary: 'Dry Clean Only',
    packagingType: 'Reusable Muslin Bag',
    materialComposition: 'Cotton Mulmul',
    giftReady: true,
    plasticFree: true,
  },
  'bedsheet-with-two-pillow-cover': {
    artisanOrigin: 'Sanganer, Rajasthan',
    dyeType: 'Vegetable / Natural Dye',
    craftTechnique: 'Hand-Block Print',
    fabricWeight: 'Lightweight (Percale)',
    careSummary: 'Machine Washable',
    packagingType: 'Signature Gift Box',
    materialComposition: '100% Cotton Percale',
    dimensionsIn: '90" x 100"',
    giftReady: true,
    plasticFree: true,
  },
  'botanical-medallion-hand-block-printed-bedsheet-set-white-gray-cotton': {
    artisanOrigin: 'Jaipur, Rajasthan',
    dyeType: 'Vegetable / Natural Dye',
    craftTechnique: 'Hand-Block Print',
    fabricWeight: 'Lightweight (Percale)',
    warmthRating: 'Summer Cool (AC)',
    careSummary: 'Machine Washable',
    packagingType: 'Kraft Paper Wrap',
    materialComposition: '100% Cotton',
    dimensionsIn: '108" x 108"',
    giftReady: true,
    plasticFree: true,
  },
  'jaipuri-hand-block-printed-bedsheet-set-pink-floral': {
    artisanOrigin: 'Jaipur, Rajasthan',
    dyeType: 'Vegetable / Natural Dye',
    craftTechnique: 'Hand-Block Print',
    fabricWeight: 'Lightweight (Percale)',
    warmthRating: 'All-Season (Medium)',
    careSummary: 'Machine Washable',
    packagingType: 'Kraft Paper Wrap',
    materialComposition: '100% Cotton',
    dimensionsIn: '108" x 108"',
    giftReady: true,
    plasticFree: true,
  },
  'blue-iris-garden-cotton-waffle-bathrobe-hand-block-printed': {
    artisanOrigin: 'Jaipur, Rajasthan',
    dyeType: 'Natural Indigo',
    craftTechnique: 'Hand-Block Print',
    fabricWeight: 'Textured (Waffle)',
    warmthRating: 'All-Season (Medium)',
    careSummary: 'Machine Washable',
    packagingType: 'Kraft Paper Wrap',
    materialComposition: '100% Cotton',
    giftReady: true,
    plasticFree: true,
  },
  'cotton-waffle-bathrobe-hand-block-printed': {
    artisanOrigin: 'Jaipur, Rajasthan',
    craftTechnique: 'Hand-Block Trim',
    fabricWeight: 'Textured (Waffle)',
    careSummary: 'Machine Wash Cold, Tumble Dry Low',
    materialComposition: '100% Cotton',
  },
};

export function getProvenance(handle: string): ProvenanceMeta | undefined {
  return CATALOG_META[handle];
}
