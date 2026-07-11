# The Indigo Fable — Storefront Handoff v1
## Design System · Component Specs · Data Model · Art Direction
### For: Claude Code, indigo-fable-headless (Next.js App Router, Shopify headless)
### Ref prototypes: `indigo-fable-pdp.html` (razai PDP), `indigo-fable-storefront.html` (Home / PLP / dhoop PDP)
---
## 0. The persona, in one paragraph (read before writing any copy or CSS)
The house voice is the **Keeper of the Fable**: a curator-narrator who travels to named ateliers, knows the makers, and brings objects back with their records intact. Erudite, unhurried, quietly certain. Speaks to a fellow connoisseur, never a shopper. Sells **generational permanence** (textiles) and **measured time** (dhoop). Two audiences, one mechanism: the Indian HNW buyer needs *elevation* of the familiar; the Western HNW buyer needs *legibility and trust* of the unfamiliar. Both are converted by deep, specific, verifiable provenance told with restraint.
**Two-house architecture (structural, not decorative):**
- **House I · The Loom** — textiles, Jaipur (Sanganer). Quilts, linens, robes.
- **House II · The Ember** — fragrance, Meerut ("the Fable's dhoopshala"; supplier — internal reference only, never rendered). Dry dhoop, cones, wet dhoop.
The Ember is a **standalone vertical** with its own PLP, PDPs, and merchandising logic — never a cross-sell accessory. Cross-sell flows *both* directions (razai PDP pairs dhoop; dhoop PDP pairs razai).
**Brand architecture & naming rule (hard — decided 11 Jul):** The Ember is **fully absorbed into TIF** — a brand ladder, not a co-brand. The supplier remains the untouched volume marque (devotional, mass, ₹100–300 class); TIF's Ember is the premium marque. Same kilns, two brands, zero shared trade dress. Rationale: the supplier's trade name is price-discoverable and would anchor-contaminate HNW pricing. Storefront provenance therefore names **people and places, never supplier companies**: "the Fable's dhoopshala in Meerut" + the master blender's personal name. Every passport fact stays verifiably true (Meerut, hand-rolled, bambooless, guggul base, cure, batch). Do not render the supplier trade name or street anywhere consumer-facing — including alt text, SEO meta, structured data, and image filenames. (Compliance exception: India Legal Metrology requires the manufacturer name+address in the physical pack's declaration panel — fine print, out of scope for the storefront. UAE/export labeling: separate check.)
**Provenance honesty rule (hard):** dhoop provenance is Meerut, textiles are Jaipur. Never fold one into the other. Brand line updates from "Jaipur · Est. Heritage Craft" to "Houses of the Craft · India" (or per-house lockups).
---
## 1. Design tokens (canonical — ONE system)
### 1.1 Color
| Token | Hex | Role |
|---|---|---|
| `--indigo-deep` | `#0F1830` | Primary dark ground (dye-vat). Immersive bands, nav-dark, footer, buybar |
| `--indigo` | `#1B2A4A` | Card ground on dark (passport body) |
| `--indigo-edge` | `#26385E` | Borders/dividers on dark |
| `--khadi` | `#E9E3D5` | Primary light ground (undyed cotton). Read sections |
| `--khadi-deep` | `#DED6C4` | Card/image ground on light |
| `--kohl` | `#1B1A15` | Text on light; solid CTA on light |
| `--kohl-soft` | `#524D44` | Secondary text on light |
| `--madder` | `#8E3B2E` | THE accent. Eyebrows on light, links, focus ring, selection |
| `--khari` | `#B08A3E` | Gold. Seal, hairlines, eyebrows on dark ONLY. Never fills, never buttons |
| `--ember` | `#C9BE9E` | Muted text on dark (announce bar, tags) |
**Rules:** exactly one accent per surface (madder on light, khari on dark). Gold is demoted to seal + hairline; if a component uses gold as a fill, it is wrong. Page rhythm alternates dark/light bands = the dye-vat metaphor; do not stack two dark bands without a light band between (exception: hero → houses strip).
### 1.2 Type
| Role | Face | Usage |
|---|---|---|
| Display | **Fraunces** (opsz, 400–600, italic) | H1–H3, product names, signature lines, roman numerals |
| Body | **Hanken Grotesk** (400–600) | Paragraphs, UI |
| Data | **IBM Plex Mono** (400–500) | Eyebrows, prices, burn record, passport keys, batch codes, breadcrumbs |
Scale: H1 `clamp(38px,4.4vw,58px)` / H2 `clamp(28px,3.4vw,44px)` / essence-italic 19px / body 15–16px / mono-micro 9.5–11px with `.18–.28em` tracking, uppercase.
### 1.3 Motion
- Scroll reveals: opacity+22px translate, 1s, `cubic-bezier(.2,.7,.2,1)`, IntersectionObserver at 0.12.
- Image hovers: scale 1.045–1.06 over 0.8–1.1s.
- **Smoke thread** (Ember only): SVG path, `stroke-dasharray` draw over 6s on view entry.
- `prefers-reduced-motion`: all of the above become static. Non-negotiable.
### 1.4 A11y floor
Focus-visible: `2px solid var(--madder), offset 3px` on every interactive. Touch targets ≥ 40px. Contrast: `--kohl-soft` on `--khadi` = 7.4:1; `#B9C0CF` on `--indigo-deep` = 8.1:1. Region toggle is a `role="group"` with labelled buttons.
---
## 2. Component inventory (build order)
### Shared shell
1. **AnnounceBar** — dark, mono-micro, region-aware copy.
2. **Nav** — light sticky, brand lockup (serif name + mono sub), links with madder underline-on-hover, RegionToggle, Bag. Mobile: links collapse to sheet.
3. **RegionToggle** — pill pair IN₹/CA C$; drives price, tax note, payment trust copy sitewide (see §4).
4. **Footer** — dark; columns keyed by House I / House II / Care.
5. **StickyBuyBar** — PDP only; appears when `.actions` scrolls past; product name + config + price + CTA.
### Storefront
6. **HeroThesis** — full-bleed image, gradient veil, eyebrow + serif H1 + one paragraph + dual CTA.
7. **TwoHouses** — the homepage structural statement: two equal panels (Loom/Ember), roman-numeral watermark, hover ground-shift.
8. **CategoryRing** — circular image tiles; count labels ONLY when count > 0 (never render "0 pieces").
9. **SignatureLine** — centered serif-italic aphorism with one madder-bold phrase. One per page maximum.
### PDP core (shared by both houses)
10. **GalleryStage** — 4:5 stage, corner tag (mono), macro thumbs via background-size crop until real macro photography lands.
11. **InfoColumn** — eyebrow → H1 → italic sub (notes/essence) → price row → breath paragraph → spec block → config → CTAs → TrustRows.
12. **ProvenancePassport** — THE signature. Double-hairline frame, header row + circular seal, 8-cell grid (mono key / value / italic vernacular), footer batch code + "Kept by the Fable". Data from metafields (§3). Renders identically for loom & ember; only fields differ.
13. **TrustRows** — 3 rows, khari dot, region-aware row 2.
14. **PairingPanel** — cross-house cross-sell; image + narrative + one ghost CTA with bundle saving.
### Ember-specific
15. **BurnRecord** — apothecary specimen card: bordered, 3×2 mono grid (Form / Burn / Smoke / Count / Base / Atelier).
16. **ScentComposition** — three "movements" (First smoke / The heart / What lingers) with minute markers, vernacular italics, connected by the animated **SmokeThread** SVG. Time-based, not top/heart/base.
17. **RitualSteps** — 4-step lowercase-roman grid (stand / light / blow out / let it keep the hour).
18. **ScentCard (PLP)** — image + moment badge (Dawn/Day/Dusk/Night) + name + italic notes + price + meta strip (burn/count/smoke).
19. **MomentFilter** — chip row; filters ScentCards by `data-m`. Moment taxonomy: `dawn | day | dusk | night`.
20. **FormatStrip** — dry stick / cone / wet dhoop explainer trio.
---
## 3. Data model — Shopify metafields (namespace `fable`)
### 3.1 Shared (all products)
```
fable.provenance.atelier          single_line   "The dhoopshala · Meerut, Uttar Pradesh"  (consumer-facing)
fable.provenance.supplier_internal single_line  (NEVER rendered; ops/PO use only)
fable.provenance.maker            single_line   master printer / master blender
fable.provenance.method           single_line   "Hand-rolled, bambooless, sun-cured"
fable.provenance.days             integer       make/cure duration
fable.provenance.hands            integer       (loom) pairs of hands
fable.provenance.batch            single_line   "TIF-DH-DSK-01/2026"
fable.provenance.dye_or_base      single_line   "Natural indigo & madder" | "Guggul resin"
```
### 3.2 Ember-only
```
fable.scent.moment        enum      dawn|day|dusk|night      (PLP filter + badge)
fable.scent.movement_1..3 json      {label,name,vernacular,desc,minute}
fable.burn.minutes        integer   38
fable.burn.smoke          enum      low|medium|deep
fable.burn.form           enum      dry_stick|cone|wet_dhoop
fable.burn.count          integer   sticks/cones per coffret
```
### 3.3 Line architecture (supplier catalog → TIF names) — internal mapping; supplier name never renders.
| TIF name | Moment | Source scent | Form |
|---|---|---|---|
| Dawn | dawn | Chandan / Sandal | dry stick |
| Threshold | day | Loban + Guggal | dry stick |
| Monsoon | day | Mogra | dry stick |
| **Dusk** (flagship) | dusk | Rose + Guggul | dry stick |
| Vigil | night | Oudh + Kesar | wet dhoop |
| Raatrani | night | Raatrani | cones |
**Scent-naming rule:** generic botanical terms (rose, mogra, raatrani) are fair use; never reuse the supplier's *coined* SKU names — coined names are search-unique strings that re-open the price trail.
Verified atelier facts usable in copy today: bambooless, charcoal-free, ~35–40 min burn per stick, low smoke, Meerut. Everything bracketed in the passport awaits the brand book.
---
## 4. Region logic (single source of truth)
`region ∈ {in, ca}` (extensible). Drives:
1. Currency + formatted price (per-variant price list; **all current numbers illustrative**).
2. Tax note: IN "Inclusive of all taxes" / EXPORT "Duties & taxes settled at checkout".
3. Trust row 2: IN "UPI, cards & COD — pan-India 3–4 days" / EXPORT duties line.
4. Payment badge set.
Persist as cookie (`indigo_region`) — matches existing build behavior.
---
## 5. Art direction & photography brief
**Palette on set:** shoot against true khadi cloth and deep indigo grounds. Warm side-light, dusk-hour temperature. No pure white sweeps.
**Loom list:** tagai stitch macro (raking light) · block edge with ink bleed · indigo pooling · hands printing · quilt weight held falling · atelier environmental portrait of the named maker.
**Ember list (shoot before launch):** the smoke thread against `#0F1830` · resin grain macro · coffret opening · first-light moment (stick + brass tray + razai corner) · maker's hands rolling · ash portrait.
**Existing supplier packshots are prohibited on all TIF surfaces, including as placeholders.**
**Copy rules:** vernacular terms italicized once with plain-word gloss (tagai, guggul, gulab, gili). No "luxury/premium/exquisite" adjectives — specificity is the luxury signal. Numbers in mono. One aphorism per page.
---
## 5.5 Packaging architecture
**The Coffret (hero SKU):** rigid-board outer in `--indigo-deep`, khari foil seal only; inner tray with sticks in paper-banded bundles of 10; khadi-paper wrap; printed Provenance Passport card as the box insert; batch code stamped in madder.
**The Hours — Discovery Set (entry SKU):** minis of all five scents; price rung below the coffret.
**Burner:** brass tray from Moradabad ("brass from Moradabad, dhoop from Meerut").
## 6. Route & prerender additions
New routes: `/collections/ritual` (Ember PLP), ember PDPs under `/products/[handle]`, `/houses/ember` (atelier story). Add ember PLP + flagship PDPs (Dusk first) to the prerender list.
---
## 7. Open decisions (owner: Chandan)
1. Brand book access (auth-walled 82MB PDF) — populates founder/blender names, founding year, full SKU list.
2. Format & price architecture — coffret assumes repackaging; confirm bulk/unboxed supply.
3. Brand relationship on-pack — RESOLVED: full TIF absorption; person+place provenance.
4. Moment taxonomy (recommended) vs fragrance-family taxonomy.
5. Mono unification: Plex Mono vs JetBrains Mono.
6. Premium spec run: higher oil load, extended cure, per-lot burn-test QC.
7. Two-phase photography; supplier packshots prohibited on all TIF surfaces.
