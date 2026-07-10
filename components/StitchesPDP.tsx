'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRegion } from '@/context/RegionContext';
import { ShopifyProduct } from '@/lib/shopify';
import { getProvenance } from '@/lib/catalog-meta';

interface StitchesPDPProps {
  product: ShopifyProduct;
}

export function StitchesPDP({ product }: StitchesPDPProps) {
  const { addItem } = useCart();
  const { region, formatPrice } = useRegion();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || { id: '', title: '', price: '0.00' });
  const [activeSize, setActiveSize] = useState('Double'); 
  const [isTrilogy, setIsTrilogy] = useState(false); // Multi-buy widget state

  const isFragrance = product.handle.includes('incense') || product.handle.includes('dhoop');
  const provenance = getProvenance(product.handle);
  // The Trilogy multi-buy (3 boxes for ₹799) applies to the ₹299 incense boxes only.
  const offersTrilogy = isFragrance && Math.round(Number(selectedVariant.price)) === 299;

  const getScentPairing = () => {
    if (product.handle.includes('rose')) {
      return {
        title: "Jaipuri Rose & Monsoon Rain Incense",
        price: "299.00",
        id: "mock-variant-f1",
        image: "https://lh3.googleusercontent.com/aida/AP1WRLtCBgcx-G9rKHLLwnWSzdiB82XG8D_qe7E6qPRIFY1L_pMZOpZFCk0Ifjg2AUSBWPfHtPvOpUKmRVxxuAxIwpJH-vfb_Y4l_5uX_c_o6GaSDc_xHLhURjkm4xMq_JHoMIg9A8yzTqUl8_i_jiXiT99opDd77DOHEXOoaWKrY5pc3ynmj8EeJfFK_R8HwwtnUioB7XdaMRtKHDOlw19R0xJbzpGQWn9jWejQQD6Un-_WQM95iNjEzIjqpqiC"
      };
    }
    return {
      title: "Indigo Nights Signature Incense",
      price: "299.00",
      id: "mock-variant-f2",
      image: "https://lh3.googleusercontent.com/aida/AP1WRLvePLKmfu-RkqzJeFBThsiqL4cj6nWZVrPN0SeZ_uLItOvxH6h3-O09zJxH7fMzTGm9wc0DWkLbSPdpgPBZtRBqjZft1rnFRGIJq7gwVVERVaVr3dlyPjq4ublhH333_CnNd2qiTfUf2iVLjLxWS_3D2ZuGgeZOdpQ617fl21jOsv8Gt9alB3xaAhIyBQtS_uEzBMUX4xe4AO1JCTgyUkN18rPIrqj3BqYnvKn3KWe0Ydj7ffjBiOrkXWTg"
    };
  };

  const handleAddToCart = () => {
    const finalPrice = offersTrilogy && isTrilogy ? "266.33" : selectedVariant.price; // 799 / 3 = 266.33
    const finalQty = offersTrilogy && isTrilogy ? 3 : 1;

    addItem({
      id: selectedVariant.id,
      title: product.title,
      variantTitle: offersTrilogy && isTrilogy ? "Trilogy Pack (3 boxes)" : (selectedVariant.title || activeSize),
      price: finalPrice,
      quantity: finalQty,
      image: product.images[0]?.src || '',
    });
  };

  const pairing = getScentPairing();

  return (
    <main className="max-w-[1280px] mx-auto md:px-16 px-6 md:pt-20 pt-8 space-y-24">
      {/* Product Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Bento Image Gallery */}
        <div className="md:col-span-7 flex flex-col gap-2">
          <div className="w-full aspect-[4/3] md:aspect-square bg-stone-100 overflow-hidden rounded-2xl border border-stone-200 group relative">
            <img 
              alt={product.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              src={product.images[0]?.src || 'https://lh3.googleusercontent.com/aida/AP1WRLt3tQz2JaHgEfXpdhARB9TWhsgti5xD5GkU7TrhfTQXmNylPAo0widHBDKx3DCdh3ATgUTi6vJwYd1xflL3GDt2dvD0wBEIgN3kuOveTIXxl0yHm4YFt2IEjE7Si3OAHuOg52jFKYEkYLPBRTZc5HMq0zkN-dWRS2xMSi8VZFb3Ofv4fQvhsY930TL8q6_FcveEMQLbqKqWGBY6mBcI6HRsZdAi-m9FS5YbReWpSdXk4Mtav5u16X079CqV'}
            />
          </div>
          {product.images.length > 2 && (
            <div className="grid grid-cols-2 gap-2">
              <div className="w-full aspect-square bg-stone-100 overflow-hidden rounded-2xl border border-stone-200 group">
                <img 
                  alt="Close-up detail" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  src={product.images[1]?.src}
                />
              </div>
              <div className="w-full aspect-square bg-stone-100 overflow-hidden rounded-2xl border border-stone-200 group">
                <img 
                  alt="Folded detail" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  src={product.images[2]?.src}
                />
              </div>
            </div>
          )}
        </div>

        {/* Product Info Column */}
        <div className="md:col-span-5 flex flex-col pt-4 md:pl-8">
          <nav className="flex text-stone-500 text-[10px] uppercase tracking-widest font-semibold mb-6">
            <a className="hover:text-black transition" href="/">Home</a>
            <span className="mx-2">/</span>
            <a className="hover:text-black transition" href="/collections/all">
              {isFragrance ? 'Fragrance' : 'Bedding'}
            </a>
            <span className="mx-2">/</span>
            <span className="text-black">{isFragrance ? 'Incense' : 'Quilts'}</span>
          </nav>
          
          <h1 className="text-3xl md:text-5xl font-serif text-indigo-950 leading-tight mb-2">
            {product.title}
          </h1>

          {/* Formulation Badges (Fragrance only) */}
          {isFragrance && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 border border-emerald-100 font-semibold rounded-full">
                100% Charcoal-Free
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 border border-indigo-100 font-semibold rounded-full">
                Botanical Infusion
              </span>
              <span className="text-[10px] uppercase tracking-wider bg-amber-50 text-amber-700 px-3 py-1 border border-amber-100 font-semibold rounded-full">
                Bambooless Craft
              </span>
            </div>
          )}

          <p className="text-stone-600 leading-relaxed font-light mb-6 text-sm md:text-base">
            {product.descriptionHtml.replace(/<[^>]*>/g, '')}
          </p>

          <div className="text-2xl font-serif text-indigo-950 mb-8">
            {offersTrilogy && isTrilogy ? formatPrice(799) : formatPrice(selectedVariant.price)}
            {!isFragrance && (
              <span className="text-sm font-sans text-stone-400 ml-3 line-through">
                {formatPrice(Number(selectedVariant.price) * 1.25)}
              </span>
            )}
            {offersTrilogy && isTrilogy && (
              <span className="text-xs font-sans text-emerald-600 ml-3 font-semibold">
                (Save {formatPrice(98)} on Trilogy Pack!)
              </span>
            )}
          </div>

          {/* Scent selector / Trilogy Pack Multi-Buy Widget */}
          {offersTrilogy ? (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-wider text-slate-900 font-semibold">Choose Pack Size</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsTrilogy(false)}
                  className={`flex-1 py-3 rounded-full border text-[11px] uppercase tracking-[0.2em] transition touch-manipulation ${
                    !isTrilogy
                      ? 'border-indigo-950 bg-ivory text-indigo-950 font-semibold'
                      : 'border-stone-200 text-stone-600 hover:border-indigo-950'
                  }`}
                >
                  Single Box ({formatPrice(299)})
                </button>
                <button
                  onClick={() => setIsTrilogy(true)}
                  className={`flex-1 py-3 rounded-full border text-[11px] uppercase tracking-[0.2em] transition touch-manipulation ${
                    isTrilogy
                      ? 'border-indigo-950 bg-ivory text-indigo-950 font-semibold'
                      : 'border-stone-200 text-stone-600 hover:border-indigo-950'
                  }`}
                >
                  Trilogy Pack - 3 Boxes ({formatPrice(799)})
                </button>
              </div>
            </div>
          ) : isFragrance ? null : (
            /* Textile Size Selector */
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-wider text-slate-900 font-semibold">Select Size</span>
                <span className="text-xs text-stone-500 underline cursor-pointer hover:text-black">Size Guide</span>
              </div>
              <div className="flex gap-3">
                {['Single', 'Double', 'King'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`flex-1 py-3 rounded-full border text-[11px] uppercase tracking-[0.2em] transition touch-manipulation ${
                      activeSize === size
                        ? 'border-indigo-950 bg-ivory text-indigo-950 font-semibold'
                        : 'border-stone-200 text-stone-600 hover:border-indigo-950'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Bag Button */}
          <button 
            onClick={handleAddToCart}
            className="w-full bg-indigo-950 hover:bg-indigo-900 text-stone-50 text-[11px] uppercase tracking-[0.2em] font-semibold py-3.5 rounded-full transition flex justify-center items-center gap-2 mb-3 shadow-md touch-manipulation"
          >
            {offersTrilogy && isTrilogy ? 'Add Trilogy to Bag' : 'Add to Bag'}
          </button>
          <p className="text-xs text-stone-500 text-center mb-6">
            {region.shippingNote}
          </p>

          {/* Bedding Olfactory Pairing Injector Widget */}
          {!isFragrance && (
            <div className="mb-8 p-4 bg-ivory border border-stone-200 rounded-xl flex items-center justify-between gap-4">
              <div className="flex gap-3 items-center">
                <img src={pairing.image} className="w-12 h-16 object-cover rounded-md border border-stone-200" alt="Pairing Scent" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Olfactory Pairing Recommendation</h4>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5">Pair with {pairing.title}</p>
                </div>
              </div>
              <button
                onClick={() => addItem({
                  id: pairing.id,
                  title: pairing.title,
                  variantTitle: 'Standard Box',
                  price: pairing.price,
                  quantity: 1,
                  image: pairing.image
                })}
                className="bg-indigo-950 hover:bg-indigo-900 text-stone-50 text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-full font-semibold transition touch-manipulation"
              >
                + Pair ({formatPrice(pairing.price)})
              </button>
            </div>
          )}

          {/* Accordions */}
          <div className="border-t border-stone-200 divide-y divide-stone-200">
            <details className="group py-4 cursor-pointer" open>
              <summary className="flex justify-between items-center text-lg font-serif text-indigo-950 list-none">
                {isFragrance ? 'Olfactory Recipe' : 'Craft & Care'}
                <ChevronDown className="w-5 h-5 text-stone-500 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="pt-3 text-stone-600 text-sm font-light space-y-2 leading-relaxed">
                {isFragrance ? (
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li><strong>Scent Profile:</strong> {product.scent_profile}</li>
                    <li><strong>Ingredients:</strong> {product.ingredients}</li>
                  </ul>
                ) : provenance ? (
                  <div>
                    <dl className="grid grid-cols-1 gap-y-2">
                      {[
                        ['Artisan Origin', provenance.artisanOrigin],
                        ['Craft Technique', provenance.craftTechnique],
                        ['Dye', provenance.dyeType],
                        ['Material', provenance.materialComposition],
                        ['Fabric Weight', provenance.fabricWeight],
                        ['Warmth', provenance.warmthRating],
                        ['Dimensions', provenance.dimensionsIn],
                        ['Care', provenance.careSummary],
                        ['Packaging', provenance.packagingType],
                      ].filter(([, v]) => v).map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4 border-b border-stone-100 pb-1.5">
                          <dt className="text-stone-500">{label}</dt>
                          <dd className="text-right text-stone-700">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    {(provenance.giftReady || provenance.plasticFree) && (
                      <div className="flex gap-2 mt-4">
                        {provenance.giftReady && (
                          <span className="text-[10px] uppercase tracking-wider bg-amber-50 text-amber-700 px-3 py-1 border border-amber-100 font-semibold rounded-full">Gift-Ready</span>
                        )}
                        {provenance.plasticFree && (
                          <span className="text-[10px] uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 border border-emerald-100 font-semibold rounded-full">Plastic-Free</span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>100% Organic Mulmul Cotton Shell & Filling</li>
                    <li>Hand-block printed using Azo-Free, natural plant dyes</li>
                    <li>Reversible design (Indigo Floral / Geometric Sand)</li>
                    <li>Care: Dry clean recommended to preserve natural dye vibrancy.</li>
                  </ul>
                )}
              </div>
            </details>

            <details className="group py-4 cursor-pointer">
              <summary className="flex justify-between items-center text-lg font-serif text-indigo-950 list-none">
                {isFragrance ? 'Burn & Preservation Tips' : 'Shipping & Returns'}
                <ChevronDown className="w-5 h-5 text-stone-500 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="pt-3 text-stone-600 text-sm font-light leading-relaxed">
                {isFragrance ? (
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li><strong>Burn Time:</strong> {product.burn_time}</li>
                    <li>Store in a cool, dry place to prevent essential oil volatility.</li>
                    <li>Burn in a well-ventilated space away from drafts.</li>
                  </ul>
                ) : (
                  <p>Each piece is crafted slowly. Please allow 3-5 business days for dispatch. We offer a 30-day return policy for unused items in original packaging.</p>
                )}
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Story Inset Section */}
      <section className="bg-ivory rounded-3xl py-16 md:py-24 px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-indigo-950">The Story of the Block</h2>
            <p className="text-stone-700 leading-relaxed font-light text-sm md:text-base">
              Our artisans in Sanganer spend days carving a single teak wood block. This quilt is stamped over 1,500 times by hand, creating subtle variations that denote true human touch rather than machine perfection. The indigo is harvested sustainably, honoring the earth as much as the craft.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <img 
              className="w-full h-full object-cover" 
              alt="Artisan block carving"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCso3huV3_cUkmQ3xmRIcbSqtgmKRkZ39j8YcZPAxbJBNg7Ra-LSpdQJhndR_IsaXmA3bNS3MypaYn8x5vDBoPLhatrSknmbTCVWTXMRT6KKjyIBoJEs_2kqep3biK3Ro_VcKuIMm6cmE9EXUH7lbveHrKndWkBZRMh8-ayDwf8iFbATuCXYkohvwp_NIJ4sF868BqziZiwHC7E9tW-uMhnczU7Lavr9rCvqgkvMkiAAMouBEk0b2yIczAcEEgMdHBl1lclIAtD3Qu8"
            />
          </div>
        </div>
      </section>

      {/* Frequently Bought With */}
      <section className="pb-10">
        <div className="flex justify-between items-end mb-8 border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-serif text-indigo-950">Complete The Set</h2>
          <a className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-indigo-950 border-b border-gold-400 pb-0.5 hover:text-gold-600 transition" href="/collections/all">
            Shop All
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Card 1 */}
          <a href="/products/jaipuri-hand-block-printed-bedsheet-set-pink-floral" className="group cursor-pointer flex flex-col gap-3">
            <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden border border-stone-200/70 group-hover:border-gold-500/40 transition">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                alt="The Jaipur Rose Sheet Set"
                src="https://cdn.shopify.com/s/files/1/0961/5497/6620/files/jaipuri-hand-block-print_a81bba04-66f7-403a-ad56-3edb344a4576.png?v=1773769106"
              />
            </div>
            <h3 className="font-serif text-indigo-950 text-base group-hover:text-gold-600 transition">
              The Jaipur Rose Sheet Set
            </h3>
            <p className="text-sm text-stone-600 font-medium">{formatPrice(9499)}</p>
          </a>

          {/* Card 2 */}
          <a href="/products/golden-sunshine-kantha-quilt-hand-stitched-paisley-peacock-design" className="group cursor-pointer flex flex-col gap-3">
            <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden border border-stone-200/70 group-hover:border-gold-500/40 transition">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                alt="The Saffron Paisley Kantha Throw"
                src="https://cdn.shopify.com/s/files/1/0961/5497/6620/files/IMGL1877.jpg?v=1773771866"
              />
            </div>
            <h3 className="font-serif text-indigo-950 text-base group-hover:text-gold-600 transition">
              The Saffron Paisley Kantha Throw
            </h3>
            <p className="text-sm text-stone-600 font-medium">{formatPrice(13499)}</p>
          </a>
        </div>
      </section>
    </main>
  );
}
