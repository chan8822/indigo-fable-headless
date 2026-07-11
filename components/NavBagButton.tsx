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
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-kohl/20 text-kohl hover:border-madder hover:text-madder transition-colors touch-manipulation"
    >
      <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
      {totalCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-madder px-1 font-mono text-[10px] font-medium text-khadi">
          {totalCount}
        </span>
      )}
    </button>
  );
}
