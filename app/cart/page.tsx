'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const [giftNote, setGiftNote] = useState('');

  const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "i0ch0y-kq.myshopify.com";

  const handleCheckout = () => {
    if (items.length === 0) return;
    const cartParts = items.map(item => `${item.id.replace('gid://shopify/ProductVariant/', '')}:${item.quantity}`).join(',');
    window.location.href = `https://${DOMAIN}/cart/${cartParts}`;
  };

  return (
    <main className="max-w-[1280px] mx-auto md:px-16 px-6 py-8 md:py-16 mt-8 flex-grow">
      {/* Cart Header */}
      <div className="mb-8 md:mb-12 border-b border-stone-200 pb-4">
        <h2 className="text-3xl md:text-4xl font-serif text-[#0F172A]">Your Cart</h2>
        <p className="text-sm text-stone-500 mt-2">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-200 p-8">
          <p className="text-stone-500 font-light mb-6">Your shopping bag is empty.</p>
          <a 
            href="/" 
            className="inline-block bg-[#041534] hover:bg-[#0c244c] text-white text-xs uppercase tracking-widest font-semibold px-8 py-4 rounded transition"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 md:gap-6 pb-6 border-b border-stone-200">
                <div className="w-24 h-32 md:w-32 md:h-40 bg-[#F5F0EA] shrink-0 overflow-hidden rounded-lg border border-stone-200 relative group">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                    src={item.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuANFHqtth60BmhZ0oluhFQdlMdzCOGqhQOv5I2Jwt8OlQKRw6jnqsN6_4Ozl45-Tnl8HeLKWabWszskrUrRoiwIPSYDRC16k32PGm8u30VIqnBYvyxdc4qZawC2x_G7rqkFC8dszyF6rKBG_MLLsN6IgTGfU0FUyrcMDLGRRmp0V6Nndcu-AdbWVqYgfL5l0CAU6bUSlHMMZp8e7x4WRdqEandQ_pYN3UcydAnKJbyAkRMO-odhxRFw3fvisOra5t_CS7WX_A1V8xGs'} 
                    alt={item.title} 
                  />
                </div>
                <div className="flex flex-col flex-grow justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-base md:text-lg font-serif text-[#0F172A] leading-tight">
                        {item.title}
                      </h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item" 
                        className="text-stone-400 hover:text-red-600 transition-colors touch-manipulation"
                      >
                        <span className="text-xl">✕</span>
                      </button>
                    </div>
                    {item.variantTitle && (
                      <p className="text-xs text-stone-500 mt-1">Edition: {item.variantTitle}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-stone-300 rounded-md h-10 w-24 overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-1/3 h-full flex justify-center items-center text-stone-500 hover:text-black hover:bg-stone-50 transition touch-manipulation"
                      >
                        -
                      </button>
                      <span className="w-1/3 h-full flex justify-center items-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-1/3 h-full flex justify-center items-center text-stone-500 hover:text-black hover:bg-stone-50 transition touch-manipulation"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-base font-serif text-[#0F172A]">
                      ₹{(Number(item.price) * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Gift Message Section */}
            <div className="mt-4 p-6 bg-[#F5F0EA] rounded-xl border border-stone-200">
              <div className="flex items-center gap-2 mb-4 text-[#0F172A]">
                <span className="text-xl">📝</span>
                <h4 className="text-base font-serif font-semibold">Add a Gift Message or Note</h4>
              </div>
              <textarea 
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] p-3 text-sm text-slate-800 resize-none h-24 placeholder:text-stone-400" 
                placeholder="Write a personal note to accompany your handcrafted items..."
              />
            </div>
          </div>

          {/* Checkout Sticky Sidebar */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-[#F5F0EA] p-6 md:p-8 rounded-2xl sticky top-24 border border-stone-200/55 shadow-sm">
              <h3 className="text-lg font-serif text-[#0F172A] mb-6">Order Summary</h3>
              <div className="space-y-4 text-sm text-[#0F172A] border-b border-stone-200 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-serif text-[#0F172A] mb-8">
                <span>Estimated Total</span>
                <span className="font-semibold text-xl">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#041534] hover:bg-[#0c244c] text-white text-xs uppercase tracking-[0.2em] py-4 rounded font-semibold flex items-center justify-center gap-2 transition shadow touch-manipulation"
              >
                🔒 SECURE CHECKOUT
              </button>
              <p className="text-xs text-stone-500 text-center mt-4">
                Taxes and shipping calculated at checkout.
              </p>

              {/* Complimentary Gift Wrap Upsell */}
              <div className="mt-8 pt-8 border-t border-stone-200 flex gap-4 items-start">
                <div className="w-16 h-16 bg-white shrink-0 overflow-hidden rounded-lg border border-stone-200">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Artisan wrapper"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1Db6Y87IcKn-2szwQIvywYFRmUYOY0L5nmx1SrpAO1Knu3p65BZ1B2ymeNrXvbcwakZ1CA5SPhBtzXkUbrREPe63d4sGuFZdoBvjBC2_MCs-sKip-r4tEEkPKHeq99w99oqVeOOXgSgcvaIIIZRlqhaehRpVcAqjIL1nucZo_AOTIGMusxzZckJCEup5hRPKuBvLOMVFIgV5vussrqjhcQKnOFr2psFJRJAqL_XsA0WAp8EphQiokyv7PrNufqeTX3G7AWb_N4cBe"
                  />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-slate-800">Complimentary Artisan Wrapping</h5>
                  <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                    Every order is hand-wrapped in delicate muslin with a personalized touch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
