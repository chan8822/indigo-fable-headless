'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export function NavBagButton() {
  const { openCart, totalCount } = useCart();

  return (
    <button 
      onClick={openCart}
      className="flex items-center space-x-2 bg-gold-500/15 hover:bg-gold-500/25 text-gold-400 px-4 py-2 rounded-full border border-gold-500/30 transition text-sm font-medium shadow-sm"
    >
      <span>Bag ({totalCount})</span>
    </button>
  );
}
