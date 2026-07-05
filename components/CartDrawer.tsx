'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    // Build Shopify permalink checkout URL for variant items
    // Format: https://domain.myshopify.com/cart/variant_id:quantity,...
    const cartParts = items.map((item) => {
      // Extract numeric ID if it is a gid://
      const cleanId = item.id.replace(/[^0-9]/g, '');
      return `${cleanId}:${item.quantity}`;
    }).join(',');

    const checkoutUrl = `https://i0ch0y-kq.myshopify.com/cart/${cartParts}`;
    window.location.href = checkoutUrl;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-indigo-950/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 text-stone-100 shadow-2xl border-l border-gold-500/30 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-indigo-950 border-b border-gold-500/20 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif text-gold-400 uppercase tracking-wider">Your Shopping Bag</h2>
              <p className="text-xs text-stone-400">Heirloom Handcrafted Home Living</p>
            </div>
            <button 
              onClick={closeCart}
              className="p-2 text-stone-400 hover:text-gold-400 transition"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-indigo-950 border border-gold-500/20 flex items-center justify-center mx-auto text-gold-400 text-2xl">
                  ✦
                </div>
                <p className="text-stone-400 text-sm">Your artisanal bag is currently empty.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-indigo-950/40 rounded-xl border border-stone-800">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-20 object-cover rounded-lg border border-gold-500/20"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-sm text-stone-200 line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-gold-400">{item.variantTitle}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-700 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs hover:bg-stone-800 text-stone-300"
                        >-</button>
                        <span className="px-2 text-xs text-stone-100 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs hover:bg-stone-800 text-stone-300"
                        >+</button>
                      </div>
                      <span className="text-xs font-semibold text-stone-200">
                        ₹{(Number(item.price) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-stone-500 hover:text-rose-400 text-xs self-start"
                  >✕</button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          <div className="p-6 bg-indigo-950 border-t border-gold-500/20 space-y-4">
            <div className="flex justify-between items-center text-sm font-medium text-stone-300">
              <span>Subtotal</span>
              <span className="text-lg font-serif text-gold-400">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[11px] text-stone-400 font-light">
              Taxes and insured global delivery calculated at secure checkout.
            </p>
            <button 
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-stone-800 disabled:text-stone-600 text-indigo-950 py-4 rounded-xl font-medium tracking-wider uppercase text-xs transition duration-300 shadow-lg"
            >
              Proceed to Secure Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
