# Catalog Data Sources

## Live store (theindigofable.com / i0ch0y-kq.myshopify.com)

12 published textile products, read at runtime via the Admin GraphQL API or
the tokenless public `/products.json` fallback (`lib/shopify.ts`). Collections:
The Heritage Quilt Edit, Fine Linens & Sheeting, Kantha & Throws,
Robes & Rituals, The Trousseau Gift Shop.

## Google Drive (connected workspace)

- **Shopify metafield export** (`311056_export_products_i0ch0y-kq_…`): the
  provenance details baked into `lib/catalog-meta.ts` — artisan origin, dye
  type, craft technique, fabric weight, warmth rating, care, packaging,
  gift-ready / plastic-free flags per handle. When these products' metafields
  become readable via the Storefront/Admin API in this app, the static map
  can be replaced with a live read.
- **`products_export_1`** (Shopify CSV): full body HTML and CDN image URLs
  for the textile catalog.
- **Bansi Dhoop – Product Catalog** (supplier sheet, `bansi dhoop/` folder):
  source data for the incense line. First listed product: Rajnigandha
  (Tuberose) dhoop sticks, 100g (~27 extra-thick hand-rolled sticks), ceramic
  stand included, 30–40 min burn per stick, natural resins/essential
  oils/herbs, D2C ₹149 / MSRP ₹199, HSN 33074100, expiry horizon ~2 years.
  Rendered in the storefront as "The Rajnigandha Ritual Dhoop"
  (`lib/shopify.ts`). The folder also holds a brand book PDF and product
  photography (`BD-RG-100.jpg`, `_DSC05xx/_DSC06xx.JPG` series) ready to be
  uploaded to Shopify when the product is listed; commercial terms stay in
  the supplier sheet in Drive.

## To list the incense line for real

1. Create the product in Shopify from the supplier sheet (title, specs,
   ₹149/₹199 pricing) and upload the Drive photography.
2. Replace the `sourced-fragrance-bansi-rg` entry's ids in
   `lib/shopify.ts` with the real Shopify GIDs (or simply delete it — the
   live product will flow in through the catalog fetch).
3. Tag it `fragrance-type:dhoop` so the fragrance collection filter and
   cart cross-sell logic pick it up unchanged.
