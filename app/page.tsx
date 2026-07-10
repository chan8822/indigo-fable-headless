'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Banknote, Instagram, Stamp, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRegion } from '@/context/RegionContext';
import { OrderLookup } from '@/components/OrderLookup';
import { ProductTile } from '@/components/ProductTile';
import type { ShopifyProduct } from '@/lib/shopify';

const HERO_IMAGE = 'https://cdn.shopify.com/s/files/1/0961/5497/6620/files/IMGL1908.jpg?v=1773771865';

const BANNER_BEDDING_IMAGE = 'https://cdn.shopify.com/s/files/1/0961/5497/6620/files/indigo-quilt-lifestyle-shot-4.png?v=1770447036';

const BANNER_RITUAL_IMAGE = 'https://cdn.shopify.com/s/files/1/0961/5497/6620/files/IMGL1877.jpg?v=1773771866';

const STORY_IMAGE =
  'https://cdn.shopify.com/s/files/1/0961/5497/6620/files/hanging-jaipuri-quilt-with-natural-lighting-and-wrinkles.png?v=1769581736';

/* Keyword filters — kept in lockstep with /collections/[handle] */
const isQuilt = (p: ShopifyProduct) =>
  /quilt|razai|rajai/.test(p.handle) || p.title.toLowerCase().includes('quilt');
const isSheet = (p: ShopifyProduct) =>
  p.handle.includes('sheet') || p.title.toLowerCase().includes('sheet');
const isRobe = (p: ShopifyProduct) =>
  p.handle.includes('robe') || p.title.toLowerCase().includes('robe');
const isFragrance = (p: ShopifyProduct) =>
  p.handle.includes('incense') ||
  p.handle.includes('dhoop') ||
  (p.tags ?? []).some((t) => t.includes('fragrance-type'));
const isBeddingSet = (p: ShopifyProduct) => /bedding|set/.test(p.title.toLowerCase());

const CATEGORY_DEFS: {
  name: string;
  href: string;
  match: (p: ShopifyProduct) => boolean;
}[] = [
  { name: 'Quilts', href: '/collections/quilts', match: isQuilt },
  { name: 'Bedding Sets', href: '/collections/bedding-sets', match: isBeddingSet },
  { name: 'Fine Linens', href: '/collections/sheets', match: isSheet },
  { name: 'Robes', href: '/collections/robes', match: isRobe },
  { name: 'Home Fragrance', href: '/collections/fragrances', match: isFragrance },
];

const TABS = [
  { key: 'best', label: 'Best Sellers' },
  { key: 'new', label: 'New Arrivals' },
  { key: 'aromatics', label: 'Aromatics' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

function SectionHeader({
  kicker,
  title,
  subline,
}: {
  kicker: string;
  title: string;
  subline?: string;
}) {
  return (
    <div className="mb-12 md:mb-16 text-center space-y-3">
      <p className="text-[11px] uppercase tracking-[0.3em] text-gold-500 font-semibold">
        {kicker}
      </p>
      <h2 className="text-3xl md:text-5xl font-serif text-indigo-950">{title}</h2>
      {subline && (
        <p className="text-sm text-stone-500 font-light max-w-xl mx-auto leading-relaxed">
          {subline}
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('best');
  // Cart context stays wired at page level; quick-add itself lives inside <ProductTile />.
  useCart();
  const { formatAmount, freeShippingThreshold } = useRegion();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () =>
      CATEGORY_DEFS.map((def) => {
        const matches = products.filter(def.match);
        return {
          name: def.name,
          href: def.href,
          count: matches.length,
          image: matches[0]?.images[0]?.src || '',
        };
      }),
    [products]
  );

  const tabProducts = useMemo(() => {
    if (activeTab === 'new') return [...products].slice(-8).reverse();
    if (activeTab === 'aromatics') return products.filter(isFragrance).slice(0, 8);
    return products.slice(0, 8);
  }, [activeTab, products]);

  const atelierImages = useMemo(() => {
    const srcs: string[] = [];
    for (const product of products) {
      for (const img of product.images) {
        if (img.src && !srcs.includes(img.src)) srcs.push(img.src);
        if (srcs.length === 5) return srcs;
      }
    }
    return srcs;
  }, [products]);

  return (
    <div className="bg-white">
      {/* 1. Hero */}
      <section className="relative h-[85vh] w-full overflow-hidden flex flex-col justify-end px-6 md:px-16 pb-16">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041534]/70 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 space-y-6 max-w-3xl text-white">
          <span className="text-[11px] uppercase tracking-[0.42em] text-gold-300 font-medium block">
            Hand-Block Printed in Jaipur
          </span>
          <h1 className="text-5xl md:text-7xl font-serif leading-[1.05] font-semibold">
            The Heritage of Jaipur,
            <br className="hidden md:block" /> Woven for Your Home
          </h1>
          <p className="text-base md:text-lg opacity-85 max-w-lg font-light leading-relaxed">
            Heirloom quilts, fine percale linens, and botanical home fragrance — crafted
            slowly in Rajasthan.
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-3">
            <a
              href="/collections/all"
              className="rounded-full bg-white text-indigo-950 hover:bg-gold-300 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors touch-manipulation"
            >
              Shop the Collection
            </a>
            <a
              href="/bundles"
              className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium text-stone-100 border-b border-gold-400/70 pb-1 hover:text-gold-300 transition-colors touch-manipulation"
            >
              Build a Sanctuary Set
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Shop by Categories */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader
          kicker="Explore the Craft"
          title="Shop by Category"
          subline="Five slow disciplines — quilting, printing, weaving, stitching, and scent — each carried forward by Jaipur's ateliers."
        />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              className="group block text-center touch-manipulation"
            >
              <div className="relative aspect-square rounded-full overflow-hidden border border-stone-200 group-hover:border-gold-400 transition-colors bg-stone-100">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-200" />
                )}
              </div>
              <h3 className="mt-5 text-lg md:text-xl font-serif text-indigo-950 group-hover:text-gold-600 transition-colors">
                {cat.name}
              </h3>
              <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-stone-400">
                {cat.count} {cat.count === 1 ? 'piece' : 'pieces'}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* 3. Featured Tabs */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader kicker="Curated for the Discerning" title="The Edit" />
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors touch-manipulation ${
                activeTab === tab.key
                  ? 'bg-indigo-950 text-gold-300'
                  : 'border border-stone-300 text-stone-500 hover:border-indigo-950/40 hover:text-indigo-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-500 text-sm font-light">Unfolding the edit…</p>
          </div>
        ) : tabProducts.length === 0 ? (
          <p className="text-center py-12 text-stone-500 text-sm font-light">
            The atelier is still preparing this edit — return shortly.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {tabProducts.map((product) => (
              <ProductTile key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Split promo banners */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/collections/quilts"
            className="group relative block rounded-xl overflow-hidden aspect-[4/3] border border-stone-200/70 hover:border-gold-500/40 transition-colors touch-manipulation"
          >
            <img
              src={BANNER_BEDDING_IMAGE}
              alt="Hand-block printed quilts layered on a bed"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/75 via-indigo-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 max-w-md space-y-3">
              <p className="text-xl md:text-2xl font-serif text-stone-50 leading-snug">
                Layer the bed slowly — carved-block indigo and tagai-stitched warmth for
                the season&apos;s longest nights.
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-gold-300 border-b border-gold-400 pb-1">
                Discover Now
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </span>
            </div>
          </a>

          <a
            href="/collections/fragrances"
            className="group relative block rounded-xl overflow-hidden aspect-[4/3] border border-stone-200/70 hover:border-gold-500/40 transition-colors touch-manipulation"
          >
            <img
              src={BANNER_RITUAL_IMAGE}
              alt="Botanical incense resting on a ceramic stand"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/75 via-indigo-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 max-w-md space-y-3">
              <p className="text-xl md:text-2xl font-serif text-stone-50 leading-snug">
                Let dusk settle with a single charcoal-free stick — rose, guggul, and the
                quiet close of the day.
              </p>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-gold-300 border-b border-gold-400 pb-1">
                Discover Now
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* 5. Trust row */}
      <section className="py-12 bg-ivory border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center text-center">
          <div className="flex flex-col items-center gap-3">
            <Truck className="h-6 w-6 text-gold-500" strokeWidth={1.25} />
            <p className="text-[11px] uppercase tracking-[0.18em] text-indigo-950 font-semibold">
              Complimentary Shipping Over {formatAmount(freeShippingThreshold)}
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Stamp className="h-6 w-6 text-gold-500" strokeWidth={1.25} />
            <p className="text-[11px] uppercase tracking-[0.18em] text-indigo-950 font-semibold">
              Hand-Block Printed in Jaipur
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Banknote className="h-6 w-6 text-gold-500" strokeWidth={1.25} />
            <p className="text-[11px] uppercase tracking-[0.18em] text-indigo-950 font-semibold">
              UPI, Cards &amp; Cash on Delivery
            </p>
          </div>
        </div>
      </section>

      {/* 6. Artisan story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/2">
            <div className="aspect-video overflow-hidden rounded-xl border border-stone-200/70">
              <img
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                src={STORY_IMAGE}
                alt="Jaipur workshop block printing"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold-500 font-semibold">
              The Artisan Heritage
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-indigo-950">
              Rooted in Tradition
            </h2>
            <p className="text-lg md:text-xl text-stone-700 italic leading-relaxed font-light">
              &quot;Every piece at The Indigo Fable is a labour of love. From carved
              wooden blocks to hand-stitched tagai quilting, we honour the slow,
              intentional art of Indian textile making.&quot;
            </p>
            <div className="pt-2">
              <a
                href="/policies/contact-information"
                className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-indigo-950 border-b border-gold-400 pb-1 hover:text-gold-600 transition-colors touch-manipulation"
              >
                Our Story
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. From the Atelier */}
      <section className="py-16 md:py-24">
        <SectionHeader kicker="Follow the Fable" title="@theindigofable" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 px-2">
          {Array.from({ length: 5 }).map((_, i) => {
            const src = atelierImages[i];
            return (
              <a
                key={src || `atelier-${i}`}
                href="https://www.instagram.com/theindigofable"
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden bg-stone-200 touch-manipulation"
                aria-label="The Indigo Fable on Instagram"
              >
                {src && (
                  <img
                    src={src}
                    alt="From the Indigo Fable atelier"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-indigo-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-stone-50" strokeWidth={1.5} />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* 8. Order lookup */}
      <section className="bg-ivory border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <OrderLookup />
        </div>
      </section>
    </div>
  );
}
