'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRegion } from '@/context/RegionContext';
import { ShopifyProduct } from '@/lib/shopify';
import { getProvenance } from '@/lib/catalog-meta';
import { RegionTaxNote } from '@/components/RegionSwitcher';
import { ProvenancePassport, PassportField } from '@/components/pdp/ProvenancePassport';
import { TrustRows } from '@/components/pdp/TrustRows';
import { StickyBuyBar } from '@/components/pdp/StickyBuyBar';
import { PairingPanel } from '@/components/pdp/PairingPanel';

interface StitchesPDPProps {
  product: ShopifyProduct;
}

const ACTIONS_SENTINEL_ID = 'pdp-actions';

export function StitchesPDP({ product }: StitchesPDPProps) {
  const { addItem } = useCart();
  const { region, formatPrice } = useRegion();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || { id: '', title: '', price: '0.00' });
  const [activeSize, setActiveSize] = useState('Double');
  const [isTrilogy, setIsTrilogy] = useState(false); // Multi-buy widget state

  const isFragrance = product.handle.includes('incense') || product.handle.includes('dhoop');
  const provenance = getProvenance(product.handle);
  // The Trilogy multi-buy (3 boxes for ₹799) applies to the ₹299 incense boxes only.
  const offersTrilogy = isFragrance && Math.round(Number(selectedVariant.price)) === 299;

  const getScentPairing = () => {
    if (product.handle.includes('rose')) {
      return {
        title: "Jaipuri Rose & Monsoon Rain Incense",
        price: "299.00",
        id: "mock-variant-f1",
        href: "/products/jaipuri-rose-monsoon-rain-incense",
        image: "https://lh3.googleusercontent.com/aida/AP1WRLtCBgcx-G9rKHLLwnWSzdiB82XG8D_qe7E6qPRIFY1L_pMZOpZFCk0Ifjg2AUSBWPfHtPvOpUKmRVxxuAxIwpJH-vfb_Y4l_5uX_c_o6GaSDc_xHLhURjkm4xMq_JHoMIg9A8yzTqUl8_i_jiXiT99opDd77DOHEXOoaWKrY5pc3ynmj8EeJfFK_R8HwwtnUioB7XdaMRtKHDOlw19R0xJbzpGQWn9jWejQQD6Un-_WQM95iNjEzIjqpqiC"
      };
    }
    return {
      title: "Indigo Nights Signature Incense",
      price: "299.00",
      id: "mock-variant-f2",
      href: "/products/indigo-nights-incense",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLvePLKmfu-RkqzJeFBThsiqL4cj6nWZVrPN0SeZ_uLItOvxH6h3-O09zJxH7fMzTGm9wc0DWkLbSPdpgPBZtRBqjZft1rnFRGIJq7gwVVERVaVr3dlyPjq4ublhH333_CnNd2qiTfUf2iVLjLxWS_3D2ZuGgeZOdpQ617fl21jOsv8Gt9alB3xaAhIyBQtS_uEzBMUX4xe4AO1JCTgyUkN18rPIrqj3BqYnvKn3KWe0Ydj7ffjBiOrkXWTg"
    };
  };

  const handleAddToCart = () => {
    const finalPrice = offersTrilogy && isTrilogy ? "266.33" : selectedVariant.price; // 799 / 3 = 266.33
    const finalQty = offersTrilogy && isTrilogy ? 3 : 1;

    addItem({
      id: selectedVariant.id,
      title: product.title,
      variantTitle: offersTrilogy && isTrilogy ? "Trilogy Pack (3 boxes)" : (selectedVariant.title || activeSize),
      price: finalPrice,
      quantity: finalQty,
      image: product.images[0]?.src || '',
    });
  };

  const pairing = getScentPairing();

  // House lockups — provenance honesty rule: textiles are Jaipur, dhoop is Meerut.
  const houseEyebrow = isFragrance ? 'House II · The Ember · Meerut' : 'House I · The Loom · Jaipur';
  const cornerTag = isFragrance ? 'House II · Meerut' : 'House I · Jaipur';

  // Italic sub + breath paragraph derived from the description.
  const description = product.descriptionHtml.replace(/<[^>]*>/g, '').trim();
  const sentenceEnd = description.indexOf('. ');
  const subLine = sentenceEnd > 0 ? description.slice(0, sentenceEnd + 1) : description;
  const breathRemainder = sentenceEnd > 0 ? description.slice(sentenceEnd + 1).trim() : '';
  const breath = breathRemainder || description;

  // Batch code derived from the handle slug: TIF-LM-XXX-01/2026.
  const slugCode = (product.handle.replace(/[^a-z]/gi, '').slice(0, 3) || 'LOM').toUpperCase();
  const batch = `TIF-LM-${slugCode}-01/2026`;

  // Passport fields from the metafield record (§2.12, §3.1).
  const passportFields: PassportField[] = provenance
    ? ([
        { key: 'Atelier', value: 'Sanganer, Jaipur · Rajasthan' },
        { key: 'Maker', value: '[The master printer — record pending]' },
        provenance.craftTechnique
          ? {
              key: 'Method',
              value: provenance.craftTechnique,
              vernacular: provenance.craftTechnique.toLowerCase().includes('tagai')
                ? 'tagai — the running stitch that binds the layers'
                : undefined,
            }
          : null,
        provenance.dyeType ? { key: 'Dye', value: provenance.dyeType } : null,
        provenance.materialComposition ? { key: 'Material', value: provenance.materialComposition } : null,
        provenance.careSummary ? { key: 'Care', value: provenance.careSummary } : null,
        provenance.fabricWeight ? { key: 'Weight', value: provenance.fabricWeight } : null,
        provenance.warmthRating ? { key: 'Warmth', value: provenance.warmthRating } : null,
      ].filter(Boolean) as PassportField[])
    : [];

  // Sticky buy bar mirrors the in-column configuration.
  const stickyConfigLabel =
    offersTrilogy && isTrilogy ? 'Trilogy · 3 boxes' : selectedVariant.title || activeSize;
  const stickyPriceINR = offersTrilogy && isTrilogy ? 799 : Number(selectedVariant.price);

  const chipBase =
    'flex-1 min-h-[44px] rounded-full border font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors touch-manipulation';
  const chipActive = 'border-kohl bg-kohl text-khadi';
  const chipIdle = 'border-kohl/20 text-kohl-soft hover:border-kohl hover:text-kohl';

  return (
    <>
      <main className="mx-auto max-w-[1280px] space-y-20 px-6 pt-8 pb-28 md:space-y-24 md:px-16 md:pt-16">
        {/* Product hero */}
        <section className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          {/* Gallery — 4:5 stage with mono corner tag (§2.10) */}
          <div className="flex flex-col gap-2 md:col-span-7">
            <figure className="group relative w-full overflow-hidden border border-kohl/10 bg-khadi-deep aspect-[4/5]">
              <img
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-1000 ease-fable group-hover:scale-105"
                src={product.images[0]?.src || 'https://lh3.googleusercontent.com/aida/AP1WRLt3tQz2JaHgEfXpdhARB9TWhsgti5xD5GkU7TrhfTQXmNylPAo0widHBDKx3DCdh3ATgUTi6vJwYd1xflL3GDt2dvD0wBEIgN3kuOveTIXxl0yHm4YFt2IEjE7Si3OAHuOg52jFKYEkYLPBRTZc5HMq0zkN-dWRS2xMSi8VZFb3Ofv4fQvhsY930TL8q6_FcveEMQLbqKqWGBY6mBcI6HRsZdAi-m9FS5YbReWpSdXk4Mtav5u16X079CqV'}
              />
              <figcaption className="pointer-events-none absolute left-4 top-4 bg-indigo-deep/90 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
                {cornerTag}
              </figcaption>
            </figure>
            {product.images.length > 2 && (
              <div className="grid grid-cols-2 gap-2">
                <div className="group aspect-square w-full overflow-hidden border border-kohl/10 bg-khadi-deep">
                  <img
                    alt="Close-up detail"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-fable group-hover:scale-105"
                    src={product.images[1]?.src}
                  />
                </div>
                <div className="group aspect-square w-full overflow-hidden border border-kohl/10 bg-khadi-deep">
                  <img
                    alt="Folded detail"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-fable group-hover:scale-105"
                    src={product.images[2]?.src}
                  />
                </div>
              </div>
            )}
          </div>

          {/* InfoColumn — order per §2.11 */}
          <div className="flex flex-col pt-2 md:col-span-5 md:pl-8">
            {/* Breadcrumb */}
            <nav className="mb-6 flex font-mono text-[10px] uppercase tracking-[0.18em] text-kohl-soft">
              <a className="transition-colors hover:text-madder" href="/">Home</a>
              <span className="mx-2">/</span>
              <a className="transition-colors hover:text-madder" href="/collections/all">
                {isFragrance ? 'The Ember' : 'The Loom'}
              </a>
              <span className="mx-2">/</span>
              <span className="text-kohl">{isFragrance ? 'Incense' : 'Quilts & Linens'}</span>
            </nav>

            {/* Eyebrow */}
            <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-madder">
              {houseEyebrow}
            </p>

            {/* H1 */}
            <h1 className="mb-3 font-serif text-3xl leading-tight text-kohl md:text-[40px]">
              {product.title}
            </h1>

            {/* Italic sub */}
            {subLine && (
              <p className="mb-5 font-serif text-essence italic text-kohl-soft">
                {subLine}
              </p>
            )}

            {/* Price row */}
            <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono">
              <span className="text-xl text-kohl">
                {offersTrilogy && isTrilogy ? formatPrice(799) : formatPrice(selectedVariant.price)}
              </span>
              {!isFragrance && (
                <span className="text-sm text-kohl-soft line-through">
                  {formatPrice(Number(selectedVariant.price) * 1.25)}
                </span>
              )}
              {offersTrilogy && isTrilogy && (
                <span className="text-[10.5px] uppercase tracking-[0.18em] text-madder">
                  Saves {formatPrice(98)} against three singles
                </span>
              )}
            </div>
            <RegionTaxNote className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-kohl-soft" />

            {/* Breath paragraph */}
            <p className="mb-7 font-sans text-[15px] leading-relaxed text-kohl-soft">
              {breath}
            </p>

            {/* Formulation notes (fragrance handles — Ember PDP migration pending) */}
            {isFragrance && (
              <div className="mb-6 flex flex-wrap gap-2">
                {['Charcoal-free', 'Botanical infusion', 'Bambooless'].map((note) => (
                  <span
                    key={note}
                    className="rounded-full border border-kohl/20 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-kohl-soft"
                  >
                    {note}
                  </span>
                ))}
              </div>
            )}

            {/* Spec block */}
            {isFragrance ? (
              <dl className="mb-8 border-t border-kohl/15">
                {([
                  ['Scent', product.scent_profile],
                  ['Ingredients', product.ingredients],
                  ['Burn', product.burn_time],
                ] as const)
                  .filter(([, v]) => v)
                  .map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-6 border-b border-kohl/10 py-2.5">
                      <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-kohl-soft">
                        {label}
                      </dt>
                      <dd className="text-right font-sans text-sm text-kohl">{value}</dd>
                    </div>
                  ))}
              </dl>
            ) : provenance ? (
              <div className="mb-8">
                <dl className="border-t border-kohl/15">
                  {[
                    ['Artisan Origin', provenance.artisanOrigin],
                    ['Craft Technique', provenance.craftTechnique],
                    ['Dye', provenance.dyeType],
                    ['Material', provenance.materialComposition],
                    ['Fabric Weight', provenance.fabricWeight],
                    ['Warmth', provenance.warmthRating],
                    ['Dimensions', provenance.dimensionsIn],
                    ['Care', provenance.careSummary],
                    ['Packaging', provenance.packagingType],
                  ].filter(([, v]) => v).map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-6 border-b border-kohl/10 py-2.5">
                      <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-kohl-soft">
                        {label}
                      </dt>
                      <dd className="text-right font-sans text-sm text-kohl">{value}</dd>
                    </div>
                  ))}
                </dl>
                {(provenance.giftReady || provenance.plasticFree) && (
                  <div className="mt-4 flex gap-2">
                    {provenance.giftReady && (
                      <span className="rounded-full border border-kohl/20 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-kohl-soft">
                        Gift-ready
                      </span>
                    )}
                    {provenance.plasticFree && (
                      <span className="rounded-full border border-kohl/20 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-kohl-soft">
                        Plastic-free
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <dl className="mb-8 border-t border-kohl/15">
                {([
                  ['Material', '100% organic mulmul cotton, shell & filling'],
                  ['Dye', 'Azo-free natural plant dyes, hand-block printed'],
                  ['Design', 'Reversible — indigo floral / geometric sand'],
                  ['Care', 'Dry clean, to keep the dye true'],
                ] as const).map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-6 border-b border-kohl/10 py-2.5">
                    <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-kohl-soft">
                      {label}
                    </dt>
                    <dd className="text-right font-sans text-sm text-kohl">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* Config — pill chips, kohl-active */}
            {offersTrilogy ? (
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-kohl-soft">
                    Choose Pack Size
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsTrilogy(false)}
                    className={`${chipBase} ${!isTrilogy ? chipActive : chipIdle}`}
                  >
                    Single Box ({formatPrice(299)})
                  </button>
                  <button
                    onClick={() => setIsTrilogy(true)}
                    className={`${chipBase} ${isTrilogy ? chipActive : chipIdle}`}
                  >
                    Trilogy · 3 Boxes ({formatPrice(799)})
                  </button>
                </div>
              </div>
            ) : isFragrance ? null : (
              /* Textile size selector */
              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-kohl-soft">
                    Select Size
                  </span>
                  <span className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.18em] text-kohl-soft underline underline-offset-2 hover:text-madder">
                    Size Guide
                  </span>
                </div>
                <div className="flex gap-3">
                  {['Single', 'Double', 'King'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      className={`${chipBase} ${activeSize === size ? chipActive : chipIdle}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA — sentinel for the sticky buy bar */}
            <div id={ACTIONS_SENTINEL_ID} className="mb-6">
              <button
                onClick={handleAddToCart}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-kohl text-[11px] font-semibold uppercase tracking-[0.2em] text-khadi transition-colors hover:bg-kohl/90 touch-manipulation"
              >
                {offersTrilogy && isTrilogy ? 'Add the Trilogy to the Bag' : 'Add to the Bag'}
              </button>
              <p className="mt-3 text-center font-sans text-xs text-kohl-soft">
                {region.shippingNote}
              </p>
            </div>

            {/* Pairing injector (textiles pair dhoop) */}
            {!isFragrance && (
              <div className="mb-8 flex items-center justify-between gap-4 rounded-xl border border-kohl/10 bg-khadi-deep p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={pairing.image}
                    className="h-16 w-12 rounded-md border border-kohl/10 object-cover"
                    alt="Pairing incense"
                  />
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-kohl-soft">
                      The pairing
                    </h4>
                    <p className="mt-0.5 font-sans text-[12px] text-kohl">
                      {pairing.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => addItem({
                    id: pairing.id,
                    title: pairing.title,
                    variantTitle: 'Standard Box',
                    price: pairing.price,
                    quantity: 1,
                    image: pairing.image
                  })}
                  className="min-h-[40px] shrink-0 rounded-full bg-kohl px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-khadi transition-colors hover:bg-kohl/90 touch-manipulation"
                >
                  + Pair ({formatPrice(pairing.price)})
                </button>
              </div>
            )}

            <TrustRows tone="light" />
          </div>
        </section>

        {/* Provenance Passport — THE signature (§2.12) */}
        {passportFields.length > 0 && (
          <section className="mx-auto w-full max-w-2xl">
            <ProvenancePassport
              title={product.title}
              fields={passportFields}
              batch={batch}
              tone="light"
            />
          </section>
        )}

        {/* Cross-house pairing panel (§2.14) — razai pairs dhoop */}
        {!isFragrance && (
          <PairingPanel
            eyebrow="House II · The Ember"
            title={pairing.title}
            narrative="The cloth keeps the night; the dhoop keeps the hour. Hand-rolled at the Fable's dhoopshala in Meerut, this is the stick we burn beside this quilt — lit as the light goes, left to smoulder while the bed is turned down."
            image={pairing.image}
            href={pairing.href}
            ctaLabel="Meet the pairing"
            savingNote={`Pairs at ${formatPrice(pairing.price)}`}
          />
        )}

        {/* Story band — dark inset (dye-vat rhythm) */}
        <section className="rounded-3xl bg-indigo-deep px-8 py-16 md:px-16 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
            <div className="space-y-5">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-khari">
                The record
              </p>
              <h2 className="font-serif text-3xl text-khadi">The Story of the Block</h2>
              <p className="font-sans text-[15px] leading-relaxed text-dark-body">
                Our artisans in Sanganer spend days carving a single teak wood block.
                This quilt is stamped over <span className="font-mono">1,500</span> times
                by hand, creating subtle variations that denote true human touch rather
                than machine perfection. The indigo is harvested sustainably, honoring
                the earth as much as the craft.
              </p>
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-indigo-edge">
              <img
                className="h-full w-full object-cover"
                alt="Artisan block carving"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCso3huV3_cUkmQ3xmRIcbSqtgmKRkZ39j8YcZPAxbJBNg7Ra-LSpdQJhndR_IsaXmA3bNS3MypaYn8x5vDBoPLhatrSknmbTCVWTXMRT6KKjyIBoJEs_2kqep3biK3Ro_VcKuIMm6cmE9EXUH7lbveHrKndWkBZRMh8-ayDwf8iFbATuCXYkohvwp_NIJ4sF868BqziZiwHC7E9tW-uMhnczU7Lavr9rCvqgkvMkiAAMouBEk0b2yIczAcEEgMdHBl1lclIAtD3Qu8"
              />
            </div>
          </div>
        </section>

        {/* Complete The Set */}
        <section className="pb-10">
          <div className="mb-8 flex items-end justify-between border-b border-kohl/15 pb-3">
            <h2 className="font-serif text-2xl text-kohl">Complete The Set</h2>
            <a
              className="inline-flex min-h-[40px] items-center gap-1.5 border-b border-madder pb-0.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-kohl transition-colors hover:text-madder touch-manipulation"
              href="/collections/all"
            >
              Shop All
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* Card 1 */}
            <a href="/products/jaipuri-hand-block-printed-bedsheet-set-pink-floral" className="group flex cursor-pointer flex-col gap-3 touch-manipulation">
              <div className="aspect-square overflow-hidden rounded-2xl border border-kohl/10 bg-khadi-deep transition-colors group-hover:border-kohl/30">
                <img
                  className="h-full w-full object-cover transition-transform duration-1000 ease-fable group-hover:scale-105"
                  alt="The Jaipur Rose Sheet Set"
                  src="https://cdn.shopify.com/s/files/1/0961/5497/6620/files/jaipuri-hand-block-print_a81bba04-66f7-403a-ad56-3edb344a4576.png?v=1773769106"
                />
              </div>
              <h3 className="font-serif text-base text-kohl transition-colors group-hover:text-madder">
                The Jaipur Rose Sheet Set
              </h3>
              <p className="font-mono text-sm text-kohl">{formatPrice(9499)}</p>
            </a>

            {/* Card 2 */}
            <a href="/products/golden-sunshine-kantha-quilt-hand-stitched-paisley-peacock-design" className="group flex cursor-pointer flex-col gap-3 touch-manipulation">
              <div className="aspect-square overflow-hidden rounded-2xl border border-kohl/10 bg-khadi-deep transition-colors group-hover:border-kohl/30">
                <img
                  className="h-full w-full object-cover transition-transform duration-1000 ease-fable group-hover:scale-105"
                  alt="The Saffron Paisley Kantha Throw"
                  src="https://cdn.shopify.com/s/files/1/0961/5497/6620/files/IMGL1877.jpg?v=1773771866"
                />
              </div>
              <h3 className="font-serif text-base text-kohl transition-colors group-hover:text-madder">
                The Saffron Paisley Kantha Throw
              </h3>
              <p className="font-mono text-sm text-kohl">{formatPrice(13499)}</p>
            </a>
          </div>
        </section>
      </main>

      <StickyBuyBar
        name={product.title}
        configLabel={stickyConfigLabel}
        priceINR={stickyPriceINR}
        onAdd={handleAddToCart}
        watchId={ACTIONS_SENTINEL_ID}
      />
    </>
  );
}
