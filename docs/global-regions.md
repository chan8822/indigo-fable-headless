# Global Region Architecture

The storefront serves two regional experiences from a single Next.js deployment:

| Region | Domain | Currency | Free-shipping threshold | Checkout emphasis |
| --- | --- | --- | --- | --- |
| India (`in`) | `theindigofable.com` | INR (₹) | ₹1,999 | UPI, RuPay, Netbanking, COD |
| Canada & International (`ca`) | `theindigofable.ca` | CAD (C$) | C$65 | Visa/Mastercard/Amex, PayPal, Apple Pay, Shop Pay |

Both domains point at the same deployment; the region layer decides everything
per-request. Config lives in `lib/region.ts` — one `RegionConfig` per region
(currency, locale, FX rate, threshold, payment methods, shipping copy,
checkout params).

## How a request resolves its region

`middleware.ts` runs on every page request and resolves the region in this
priority order:

1. `?region=in|ca` query override (set by the header switcher; also pins the
   choice via the `indigo_region_choice` cookie so geo-redirects stop).
2. Canonical domain — on `theindigofable.com`/`.ca` the domain is the source
   of truth.
3. Saved `indigo_region` cookie (localhost / preview deployments).
4. Geo-IP country header (`x-vercel-ip-country`, `cf-ipcountry`,
   `cloudfront-viewer-country`): `IN` → India, everything else → `ca`.
5. Default: India.

Smart redirection: a first-time visitor whose geo-IP contradicts the domain
they landed on is 302'd once to their regional domain. Visitors who have
explicitly chosen a region via the switcher are never auto-redirected.

The resolved region is forwarded to server components via the
`x-indigo-region` request header (read in `app/layout.tsx`) and persisted in
the `indigo_region` cookie, so the very first server render already matches
the client — no hydration flash.

## Pricing model

Shopify holds catalog prices in INR (store base currency). The `ca` region
converts for display at `NEXT_PUBLIC_FX_INR_CAD` with premium rounding
(quarter steps under C$20, whole units above), via
`convertFromINR`/`formatFromINR`. Display conversion is an estimate for
browsing; the authoritative charge happens at Shopify checkout — cart
permalinks carry `?country=CA&currency=CAD` (or `IN`/`INR`) so Shopify
Markets presents and settles in the shopper's currency.

The free-shipping progress bar in the cart drawer compares the converted cart
total against the region's own threshold, keeping the
`Cart Total ≥ T_region ⇒ Shipping = 0` guard independent per market.

## Client surface

- `context/RegionContext.tsx` — `useRegion()` exposes `region`, `formatPrice`
  (INR base → localized display), `convertPrice`, `formatAmount`,
  `freeShippingThreshold`, and `switchRegion`.
- `components/RegionSwitcher.tsx` — header region selector, payment-method
  badges (footer, cart drawer, cart page), and region shipping note. On the
  canonical domains switching regions hops to the sibling domain with
  `?region=`; on localhost/previews it switches in place.
- All price displays (home, collections, PDP, bundle builder, cart page, cart
  drawer, cross-sell injector) render through `formatPrice`, and
  region-conditional copy handles COD (India only) vs. duties/tracked express
  (international).

SEO: `app/layout.tsx` emits `hreflang` alternates (`en-IN` → `.com`,
`en-CA`/`en-US` → `.ca`, `x-default` → `.com`) and sets `<html lang>` from the
resolved region.

## Why not Medusa

The goal allowed adopting [Medusa](https://github.com/medusajs/medusa) if it
fit. It was evaluated and not adopted: the storefront already has a working
Shopify Admin GraphQL integration, Shopify-hosted checkout (which is what
provides UPI/COD for India and CAD settlement + tax/duty handling
internationally via Shopify Markets), and live catalog data. Replacing that
with a self-hosted Medusa backend would mean rebuilding checkout, payments,
and order management from scratch for no functional gain at this stage. The
region layer is deliberately backend-agnostic — `lib/region.ts` and the
context/middleware would survive a future migration unchanged.

## Environment variables

See `.env.example`: `NEXT_PUBLIC_FX_INR_CAD` (display FX rate),
`NEXT_PUBLIC_FREE_SHIP_IN` / `NEXT_PUBLIC_FREE_SHIP_CA` (thresholds in local
currency), plus the existing Shopify credentials.

## Launch checklist (ops)

1. Point both apex domains at the deployment; keep TLS certs for each.
2. Enable Shopify Markets with Canada/US in CAD/USD presentment and India as
   the primary market; align Markets shipping rates with the thresholds here.
3. Confirm the hosting platform sends a geo country header (Vercel and
   Cloudflare do by default) so smart redirection activates.
