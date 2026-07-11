# indigo-fable-headless

Next.js 14 App Router + Shopify headless storefront for The Indigo Fable —
two houses: The Loom (textiles, Jaipur) and The Ember (dhoop, Meerut).

**Read `docs/design-system.md` before writing any copy or CSS.** It is the
canonical design system (tokens, type, components, data model, voice) and
carries hard brand rules:
- Supplier trade names are NEVER rendered consumer-facing (incl. alt text,
  SEO meta, structured data, image filenames).
- Dhoop provenance is Meerut; textile provenance is Jaipur. Never fold one
  into the other.
- One accent per surface: madder on light, khari on dark. Gold never fills.
- No "luxury/premium/exquisite" adjectives — specificity is the signal.
- All prices render through `useRegion().formatPrice` (INR base).

Regions: `lib/region.ts` + `middleware.ts` (in/ca, cookie `indigo_region`).
Catalog: `lib/shopify.ts` (Admin GraphQL → public /products.json fallback).
