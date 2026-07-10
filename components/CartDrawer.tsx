'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useRegion } from '@/context/RegionContext';
import { RegionPaymentBadges } from '@/components/RegionSwitcher';
import { buildCheckoutUrl } from '@/lib/region';

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'i0ch0y-kq.myshopify.com';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, addItem } = useCart();
  const { region, formatPrice, convertPrice, formatAmount, freeShippingThreshold } = useRegion();

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    const cartParts = items.map((item) => {
      const cleanId = item.id.replace(/[^0-9]/g, '');
      return `${cleanId}:${item.quantity}`;
    }).join(',');

    window.location.href = buildCheckoutUrl(SHOP_DOMAIN, cartParts, region);
  };

  // Region-localized shipping-protection threshold (₹1,999 in India, C$65 west)
  const displayTotal = convertPrice(totalPrice);
  const isFreeShipping = displayTotal >= freeShippingThreshold;
  const difference = freeShippingThreshold - displayTotal;
  const progressPercent = Math.min((displayTotal / freeShippingThreshold) * 100, 100);

  // Cross-sell logic
  const hasTextile = items.some(item => 
    item.title.toLowerCase().includes('quilt') || 
    item.title.toLowerCase().includes('sheet')
  );
  const hasFragrance = items.some(item => 
    item.title.toLowerCase().includes('incense') || 
    item.title.toLowerCase().includes('dhoop')
  );

  const showCrossSell = hasTextile && !hasFragrance;

  const promoProduct = {
    id: 'mock-variant-f2',
    title: 'Indigo Nights Signature Incense',
    price: '199.00',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvePLKmfu-RkqzJeFBThsiqL4cj6nWZVrPN0SeZ_uLItOvxH6h3-O09zJxH7fMzTGm9wc0DWkLbSPdpgPBZtRBqjZft1rnFRGIJq7gwVVERVaVr3dlyPjq4ublhH333_CnNd2qiTfUf2iVLjLxWS_3D2ZuGgeZOdpQ617fl21jOsv8Gt9alB3xaAhIyBQtS_uEzBMUX4xe4AO1JCTgyUkN18rPIrqj3BqYnvKn3KWe0Ydj7ffjBiOrkXWTg'
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
          <div className="p-6 bg-indigo-950 border-b border-gold-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-serif text-gold-400 uppercase tracking-wider">Your Shopping Bag</h2>
                <p className="text-xs text-stone-400">Heirloom Handcrafted Home Living</p>
              </div>
              <button 
                onClick={closeCart}
                className="p-2 text-stone-400 hover:text-gold-400 transition touch-manipulation"
              >
                ✕
              </button>
            </div>

            {/* Progressive Free Shipping Bar */}
            {items.length > 0 && (
              <div className="space-y-2 mt-4 bg-indigo-900/40 p-3 rounded-lg border border-gold-500/10">
                <div className="text-xs flex justify-between font-light">
                  {isFreeShipping ? (
                    <span className="text-emerald-400 font-semibold">🎉 You've unlocked Free Shipping!</span>
                  ) : (
                    <span>Add <strong className="text-gold-400">{formatAmount(difference)}</strong> more for Free Shipping</span>
                  )}
                  <span>{formatAmount(displayTotal)} / {formatAmount(freeShippingThreshold)}</span>
                </div>
                <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold-400 transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
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
                          className="px-2 py-0.5 text-xs hover:bg-stone-800 text-stone-300 touch-manipulation"
                        >-</button>
                        <span className="px-2 text-xs text-stone-100 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs hover:bg-stone-800 text-stone-300 touch-manipulation"
                        >+</button>
                      </div>
                      <span className="text-xs font-semibold text-stone-200">
                        {formatPrice(Number(item.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-stone-500 hover:text-rose-400 text-xs self-start touch-manipulation"
                  >✕</button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          <div className="p-6 bg-indigo-950 border-t border-gold-500/20 space-y-4">
            
            {/* One-Click Cross-Sell Injector */}
            {showCrossSell && (
              <div className="p-4 bg-indigo-900/40 border border-gold-500/20 rounded-xl flex items-center justify-between gap-4 mb-2">
                <div className="flex gap-3 items-center">
                  <img src={promoProduct.image} alt={promoProduct.title} className="w-10 h-12 object-cover rounded border border-stone-700" />
                  <div>
                    <h4 className="text-xs font-semibold text-stone-200 line-clamp-1">{promoProduct.title}</h4>
                    <p className="text-[10px] text-gold-400">One-time offer: {formatPrice(promoProduct.price)} <span className="line-through text-stone-500 ml-1">{formatPrice(299)}</span></p>
                  </div>
                </div>
                <button
                  onClick={() => addItem({
                    id: promoProduct.id,
                    title: promoProduct.title,
                    variantTitle: 'Promo Cross-Sell',
                    price: promoProduct.price,
                    quantity: 1,
                    image: promoProduct.image
                  })}
                  className="bg-gold-500 hover:bg-gold-400 text-indigo-950 text-[10px] uppercase tracking-wider px-3 py-2 font-bold transition rounded touch-manipulation"
                >
                  + Add
                </button>
              </div>
            )}

            <div className="flex justify-between items-center text-sm font-medium text-stone-300">
              <span>Subtotal</span>
              <span className="text-lg font-serif text-gold-400">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-[11px] text-stone-400 font-light">
              {region.shippingNote} Taxes and insured delivery calculated at secure checkout.
            </p>
            <RegionPaymentBadges tone="dark" />
            <button 
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="w-full bg-gold-500 hover:bg-gold-400 disabled:bg-stone-800 disabled:text-stone-600 text-indigo-950 py-4 rounded-xl font-medium tracking-wider uppercase text-xs transition duration-300 shadow-lg touch-manipulation"
            >
              Proceed to Secure Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
