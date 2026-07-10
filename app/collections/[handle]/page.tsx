'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductTile } from '@/components/ProductTile';
import { ShopifyProduct } from '@/lib/shopify';

type SortKey = 'featured' | 'price-asc' | 'price-desc';

// The live store's collection handles map onto our canonical filter groups,
// carrying their real titles from theindigofable.com.
const COLLECTION_ALIASES: Record<string, { group: string; title: string }> = {
  'jaipuri-razai-quilts': { group: 'quilts', title: 'The Heritage Quilt Edit' },
  'bedsheets-king-queen': { group: 'sheets', title: 'Fine Linens & Sheeting' },
  'waffle-bathrobes': { group: 'robes', title: 'Robes & Rituals' },
  'kantha-throws': { group: 'throws', title: 'Kantha & Throws' },
  'bedding-example-products': { group: 'bedding-sets', title: 'The Trousseau Gift Shop' },
};

const SUBLINES: Record<string, string> = {
  all: 'Every piece in the atelier — hand-block printed, tagai-quilted, and slow-made in Jaipur.',
  fragrances: 'Botanical incense rolled by hand, free of charcoal, to perfume a quiet home.',
  quilts: 'Cloud-light razais layered with mulmul and finished stitch by stitch in tagai.',
  sheets: 'Breathable cotton sheets carrying the rhythm of the wooden printing block.',
  robes: 'Unhurried mornings, wrapped in hand-printed cotton softened wash after wash.',
  throws: 'Kantha running stitches, worked by hand through layered cloth into heirloom throws.',
  'bedding-sets': 'Complete bedroom edits — quilt, sheeting, and covers printed as one story.',
};

export default function CollectionPage({ params }: { params: { handle: string } }) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortKey>('featured');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handle = params.handle.toLowerCase();
  const alias = COLLECTION_ALIASES[handle];
  const group = alias?.group ?? handle;

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (group === 'all') return true;
      if (group === 'fragrances') {
        return (
          p.handle.includes('incense') ||
          p.handle.includes('dhoop') ||
          (p.tags ? p.tags.some((t: string) => t.includes('fragrance-type')) : false)
        );
      }
      if (group === 'quilts') {
        return (
          p.handle.includes('quilt') ||
          p.handle.includes('razai') ||
          p.handle.includes('rajai') ||
          p.title.toLowerCase().includes('quilt')
        );
      }
      if (group === 'sheets') {
        return p.handle.includes('sheet') || p.title.toLowerCase().includes('sheet');
      }
      if (group === 'robes') {
        return p.handle.includes('robe') || p.title.toLowerCase().includes('robe');
      }
      if (group === 'throws') {
        return p.handle.includes('kantha') || p.title.toLowerCase().includes('throw');
      }
      if (group === 'bedding-sets') {
        return /bedding|set/.test(p.title.toLowerCase());
      }
      return true;
    });
  }, [products, group]);

  const sortedProducts = useMemo(() => {
    if (sort === 'featured') return filteredProducts;
    const priceOf = (p: ShopifyProduct) => Number(p.variants[0]?.price) || 0;
    return [...filteredProducts].sort((a, b) =>
      sort === 'price-asc' ? priceOf(a) - priceOf(b) : priceOf(b) - priceOf(a)
    );
  }, [filteredProducts, sort]);

  const formattedTitle = alias?.title ?? params.handle.replace(/-/g, ' ');
  const subline = SUBLINES[group] || SUBLINES.all;

  return (
    <div>
      {/* Page header band */}
      <section className="bg-ivory py-14 text-center px-6">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold-500 font-semibold">
          The Indigo Fable Collection
        </p>
        <h1 className="mt-3 text-3xl md:text-5xl font-serif text-indigo-950 capitalize">
          {formattedTitle}
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-sm text-stone-500">{subline}</p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {loading ? (
          <p className="py-20 text-center text-sm uppercase tracking-[0.2em] text-stone-400">
            Gathering the collection…
          </p>
        ) : sortedProducts.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl md:text-3xl font-serif text-indigo-950">
              Nothing here yet
            </h2>
            <p className="mt-3 text-sm text-stone-500">
              New pieces are still at the printing table. Do come back soon.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 uppercase text-[11px] tracking-[0.2em] font-semibold text-indigo-950 border-b border-gold-400 pb-1 hover:text-gold-600 transition-colors touch-manipulation"
            >
              Return home
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="mb-10 flex items-center justify-between gap-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'piece' : 'pieces'}
              </p>
              <label className="flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500 max-sm:hidden">
                  Sort by
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-full border border-stone-200/70 bg-white px-4 py-2 text-xs text-indigo-950 outline-none hover:border-gold-500/40 focus:border-gold-500/60 transition-colors touch-manipulation"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price low-high</option>
                  <option value="price-desc">Price high-low</option>
                </select>
              </label>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {sortedProducts.map((product) => (
                <ProductTile key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
