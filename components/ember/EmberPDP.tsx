'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useRegion } from '@/context/RegionContext';
import { RegionTaxNote } from '@/components/RegionSwitcher';
import { ProvenancePassport } from '@/components/pdp/ProvenancePassport';
import { TrustRows } from '@/components/pdp/TrustRows';
import { StickyBuyBar } from '@/components/pdp/StickyBuyBar';
import { PairingPanel } from '@/components/pdp/PairingPanel';
import { BurnRecord } from '@/components/ember/BurnRecord';
import { ScentComposition } from '@/components/ember/ScentComposition';
import { RitualSteps } from '@/components/ember/RitualSteps';
import { Reveal } from '@/components/Reveal';
import {
  EmberEntry,
  FORM_LABELS,
  FORM_UNITS,
  MOMENT_LABELS,
  toShopifyProduct,
} from '@/lib/ember';

const EYEBROW = 'font-mono text-[10.5px] uppercase tracking-[0.22em]';

/** Ember PDP — design-system.md §2.10–2.17. House II · Meerut. */
export function EmberPDP({ entry }: { entry: EmberEntry }) {
  const { addItem, openCart } = useCart();
  const { formatPrice } = useRegion();
  const product = toShopifyProduct(entry);
  const variant = product.variants[0];

  const handleAdd = () => {
    addItem({
      id: variant.id,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      image: product.images[0]?.src || '',
    });
    openCart();
  };

  const configLabel = `Coffret · ${entry.burn.count} ${FORM_UNITS[entry.form]}`;

  return (
    <div className="bg-khadi">
      {/* Top: GalleryStage | InfoColumn */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 md:py-20">
        {/* GalleryStage — 4:5 stage, mono corner tag (§2.10). Typographic
            khadi ground until Phase 1 photography lands (§5, §7.7). */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-khadi-deep">
          {product.images[0]?.src ? (
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-serif text-6xl italic text-kohl/25">{entry.name}</span>
            </div>
          )}
          <span className={`${EYEBROW} absolute left-4 top-4 rounded-full bg-indigo-deep/90 px-3 py-1.5 text-ember`}>
            House II · Meerut
          </span>
        </div>

        {/* InfoColumn (§2.11) */}
        <div className="flex flex-col gap-6">
          <nav className={`${EYEBROW} text-kohl-soft`}>
            <a href="/collections/ritual" className="hover:text-madder transition-colors">The Ritual Collection</a>
            <span className="mx-2">/</span>
            <span className="text-kohl">{entry.name}</span>
          </nav>
          <div className="space-y-3">
            <p className={`${EYEBROW} text-madder`}>
              {MOMENT_LABELS[entry.moment]} · {FORM_LABELS[entry.form]}
            </p>
            <h1 className="text-h1 font-serif text-kohl">{entry.name}</h1>
            <p className="font-serif text-essence italic text-kohl-soft">{entry.notes}</p>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-mono text-xl text-kohl">{formatPrice(entry.priceINR)}</span>
            <RegionTaxNote className="font-mono text-[10px] uppercase tracking-[0.18em] text-kohl-soft" />
          </div>
          <p className="max-w-prose text-[15px] leading-relaxed text-kohl-soft">{entry.essence}</p>

          <BurnRecord entry={entry} />

          <div id="ember-actions" className="space-y-4 pt-2">
            <button
              onClick={handleAdd}
              className={`${EYEBROW} w-full rounded-full bg-kohl px-8 py-4 text-khadi transition-colors hover:bg-kohl/90 touch-manipulation`}
            >
              Add to the Bag — {formatPrice(entry.priceINR)}
            </button>
            <p className="text-center font-mono text-[10px] tracking-[0.14em] text-kohl-soft">
              {configLabel}
            </p>
          </div>

          <TrustRows tone="light" />
        </div>
      </section>

      {/* Dark band — ScentComposition (§2.16) */}
      <section className="bg-indigo-deep py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <ScentComposition entry={entry} tone="dark" />
        </div>
      </section>

      {/* Light band — Passport + Ritual (§2.12, §2.17) */}
      <section className="mx-auto max-w-5xl space-y-16 px-6 py-16 md:py-24">
        <Reveal>
          <ProvenancePassport
            title={entry.name}
            batch={entry.provenance.batch}
            tone="light"
            fields={[
              { key: 'Atelier', value: entry.provenance.atelier },
              { key: 'Blender', value: entry.provenance.maker },
              { key: 'Method', value: entry.provenance.method },
              { key: 'Base', value: entry.provenance.base, vernacular: 'guggul — a bitter tree resin' },
              { key: 'Cure', value: entry.provenance.days },
              { key: 'Burn', value: `${entry.burn.minutes} minutes · ${entry.burn.smoke} smoke` },
              { key: 'Count', value: `${entry.burn.count} ${FORM_UNITS[entry.form]}` },
              { key: 'Form', value: FORM_LABELS[entry.form] },
            ]}
          />
        </Reveal>
        <Reveal>
          <RitualSteps />
        </Reveal>
        <Reveal>
          <PairingPanel
            eyebrow="House I · The Loom"
            title="The cloth it burns beside"
            narrative="The first hour of a razai's morning and the last hour of the Ember's evening belong together — cloth printed in Jaipur, smoke rolled in Meerut, one record between them."
            image="https://cdn.shopify.com/s/files/1/0961/5497/6620/files/indigo-quilt-lifestyle-shot-4.png?v=1770447036"
            href="/products/indigo-gold-hand-stitched-organic-cotton-quilt-single"
            ctaLabel="See the Gilded Indigo Quilt"
          />
        </Reveal>
      </section>

      <StickyBuyBar
        name={entry.name}
        configLabel={configLabel}
        priceINR={entry.priceINR}
        onAdd={handleAdd}
        watchId="ember-actions"
      />
    </div>
  );
}
