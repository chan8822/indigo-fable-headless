'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRegion } from '@/context/RegionContext';
import { ShopifyProduct } from '@/lib/shopify';

export function ProductTile({ product }: { product: ShopifyProduct }) {
  const { addItem, openCart } = useCart();
  const { formatPrice } = useRegion();
  const [wishlisted, setWishlisted] = useState(false);

  const handle = product.handle.toLowerCase();
  const isFragrance =
    handle.includes('incense') ||
    handle.includes('dhoop') ||
    handle.startsWith('ember-') ||
    (product.tags ? product.tags.some((t) => t.includes('fragrance-type')) : false);
  const badge = isFragrance ? 'Charcoal-Free' : 'Hand-Crafted';

  const primaryImage = product.images[0]?.src || '';
  const secondaryImage = product.images[1]?.src || '';
  const variant = product.variants[0] || { id: '', title: '', price: '0.00' };
  const price = Number(variant.price) || 0;

  const handleQuickAdd = () => {
    addItem({
      id: variant.id,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      image: primaryImage,
    });
    openCart();
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-xl border border-stone-200/70 hover:border-gold-500/40 transition-colors duration-300 bg-stone-100">
        <Link
          href={`/products/${product.handle}`}
          className="block aspect-[3/4] touch-manipulation"
          aria-label={product.title}
        >
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={product.images[0]?.alt || product.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[11px] uppercase tracking-[0.2em] text-stone-400">
              Image Coming Soon
            </div>
          )}
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={product.images[1]?.alt || product.title}
              className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </Link>

        {/* Craft badge */}
        <span className="absolute left-3 top-3 bg-indigo-950/90 text-gold-300 text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full pointer-events-none">
          {badge}
        </span>

        {/* Hover icon actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={() => setWishlisted((w) => !w)}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm text-indigo-950 hover:text-gold-600 transition-colors touch-manipulation"
          >
            <Heart
              className={`h-4 w-4 ${wishlisted ? 'fill-gold-400 text-gold-400' : ''}`}
            />
          </button>
          <Link
            href={`/products/${product.handle}`}
            aria-label={`View ${product.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-sm text-indigo-950 hover:text-gold-600 transition-colors touch-manipulation"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>

        {/* Quick-add bar */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute bottom-0 inset-x-0 w-full bg-indigo-950/95 text-stone-50 py-3 text-[11px] uppercase tracking-[0.2em] font-semibold translate-y-full group-hover:translate-y-0 max-lg:translate-y-0 transition-transform duration-300 hover:bg-indigo-900 touch-manipulation"
        >
          Add to Bag
        </button>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-[10px] uppercase tracking-[0.18em] text-stone-400">
          {product.vendor || 'The Indigo Fable'}
        </p>
        <Link
          href={`/products/${product.handle}`}
          className="block text-base font-serif text-indigo-950 hover:text-gold-600 transition-colors line-clamp-1 touch-manipulation"
        >
          {product.title}
        </Link>
        <p className="flex items-baseline gap-2">
          <span className="font-semibold text-indigo-950">{formatPrice(variant.price)}</span>
          {!isFragrance && (
            <span className="text-sm text-stone-400 line-through">
              {formatPrice(price * 1.25)}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
