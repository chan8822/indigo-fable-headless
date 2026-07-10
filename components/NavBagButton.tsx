'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function NavBagButton() {
  const { openCart, totalCount } = useCart();

  return (
    <button
      onClick={openCart}
      aria-label={`Open bag, ${totalCount} items`}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-stone-100 hover:border-gold-400 hover:text-gold-300 transition-colors touch-manipulation"
    >
      <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
      {totalCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-400 px-1 text-[10px] font-bold text-indigo-950">
          {totalCount}
        </span>
      )}
    </button>
  );
}
