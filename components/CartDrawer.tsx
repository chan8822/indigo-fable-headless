'use client';

import React from 'react';
import { X, PartyPopper, Sparkle, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRegion } from '@/context/RegionContext';
import { RegionPaymentBadges } from '@/components/RegionSwitcher';
import { buildCheckoutUrl } from '@/lib/region';
import { getEmberByHandle, toShopifyProduct } from '@/lib/ember';

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'i0ch0y-kq.myshopify.com';

// Cross-sell: the Ember flagship (design-system.md §3.3 — Dusk).
const dusk = getEmberByHandle('ember-dusk');
const duskProduct = dusk ? toShopifyProduct(dusk) : null;
const EMBER_NAMES = ['dawn', 'threshold', 'monsoon', 'dusk', 'vigil', 'raatrani'];

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
  const hasFragrance = items.some(item => {
    const t = item.title.toLowerCase();
    return t.includes('incense') || t.includes('dhoop') || EMBER_NAMES.includes(t);
  });

  const showCrossSell = hasTextile && !hasFragrance && duskProduct !== null;

  const promoProduct = duskProduct
    ? {
        id: duskProduct.variants[0].id,
        title: `${duskProduct.title} — the flagship hour`,
        price: duskProduct.variants[0].price,
        image: duskProduct.images[0]?.src || '',
      }
    : { id: '', title: '', price: '0', image: '' };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-indigo-deep/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-indigo-deep text-khadi shadow-2xl border-l border-indigo-edge flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-indigo-deep border-b border-indigo-edge">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-serif text-khadi uppercase tracking-wider">Your Shopping Bag</h2>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ember">Houses of the Craft · India</p>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close bag"
                className="p-2 text-dark-body hover:text-khadi transition touch-manipulation"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Progressive Free Shipping Bar */}
            {items.length > 0 && (
              <div className="space-y-2 mt-4 bg-indigo-card/60 p-3 rounded-lg border border-indigo-edge/60">
                <div className="text-xs flex justify-between font-light">
                  {isFreeShipping ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5"><PartyPopper className="h-3.5 w-3.5" strokeWidth={1.5} /> You've unlocked Free Shipping!</span>
                  ) : (
                    <span>Add <strong className="font-mono text-khari">{formatAmount(difference)}</strong> more for Free Shipping</span>
                  )}
                  <span>{formatAmount(displayTotal)} / {formatAmount(freeShippingThreshold)}</span>
                </div>
                <div className="h-1.5 w-full bg-indigo-card rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-ember transition-all duration-500" 
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
                <div className="w-16 h-16 rounded-full bg-indigo-card border border-khari/40 flex items-center justify-center mx-auto text-khari">
                  <Sparkle className="h-6 w-6" strokeWidth={1.25} />
                </div>
                <p className="text-dark-body text-sm">Your bag is empty — nothing has been entered yet.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-indigo-card/50 rounded-xl border border-indigo-edge/60">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-20 object-cover rounded-lg border border-indigo-edge"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-sm text-khadi line-clamp-1">{item.title}</h4>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ember">{item.variantTitle}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-indigo-edge rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-xs hover:bg-indigo-card text-dark-body touch-manipulation"
                        >-</button>
                        <span className="px-2 font-mono text-xs text-khadi">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-xs hover:bg-indigo-card text-dark-body touch-manipulation"
                        >+</button>
                      </div>
                      <span className="font-mono text-xs text-khadi">
                        {formatPrice(Number(item.price) * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="text-dark-body/70 hover:text-madder self-start touch-manipulation"
                  ><X className="h-4 w-4" strokeWidth={1.5} /></button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          <div className="p-6 bg-indigo-deep border-t border-indigo-edge space-y-4">
            
            {/* One-Click Cross-Sell Injector */}
            {showCrossSell && (
              <div className="p-4 bg-indigo-card/60 border border-indigo-edge rounded-xl flex items-center justify-between gap-4 mb-2">
                <div className="flex gap-3 items-center">
                  <img src={promoProduct.image} alt={promoProduct.title} className="w-10 h-12 object-cover rounded border border-indigo-edge" />
                  <div>
                    <h4 className="text-xs text-khadi line-clamp-1">{promoProduct.title}</h4>
                    <p className="font-mono text-[10px] text-ember">Pair the hour: {formatPrice(promoProduct.price)}</p>
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
                  className="bg-khadi hover:bg-khadi-deep text-kohl font-mono text-[10px] uppercase tracking-[0.14em] px-3 py-2 transition rounded-full touch-manipulation"
                >
                  + Add
                </button>
              </div>
            )}

            <div className="flex justify-between items-center text-sm text-dark-body">
              <span>Subtotal</span>
              <span className="font-mono text-lg text-khadi">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-[11px] text-dark-body/80">
              {region.shippingNote} Taxes and insured delivery calculated at secure checkout.
            </p>
            <RegionPaymentBadges tone="dark" />
            <button 
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="w-full bg-khadi hover:bg-khadi-deep disabled:bg-indigo-card disabled:text-dark-body/50 text-kohl py-4 rounded-full font-mono tracking-[0.2em] uppercase text-[10.5px] transition duration-300 shadow-lg touch-manipulation flex items-center justify-center gap-2"
            >
              <Lock className="h-3.5 w-3.5" strokeWidth={2} /> Proceed to Secure Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
