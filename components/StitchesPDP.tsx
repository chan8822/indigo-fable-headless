'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShopifyProduct } from '@/lib/shopify';

interface StitchesPDPProps {
  product: ShopifyProduct;
}

export function StitchesPDP({ product }: StitchesPDPProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || { id: '', title: '', price: '0.00' });
  const [activeSize, setActiveSize] = useState('Double'); // Default active size mock

  const handleAddToCart = () => {
    addItem({
      id: selectedVariant.id,
      title: product.title,
      variantTitle: selectedVariant.title || activeSize,
      price: selectedVariant.price,
      quantity: 1,
      image: product.images[0]?.src || '',
    });
  };

  return (
    <main className="max-w-[1280px] mx-auto md:px-16 px-6 md:pt-20 pt-8 space-y-24">
      {/* Product Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Bento Image Gallery */}
        <div className="md:col-span-7 flex flex-col gap-2">
          <div className="w-full aspect-[4/3] md:aspect-square bg-stone-100 overflow-hidden rounded-2xl border border-stone-200 group relative">
            <img 
              alt={product.title} 
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out" 
              src={product.images[0]?.src || 'https://lh3.googleusercontent.com/aida/AP1WRLt3tQz2JaHgEfXpdhARB9TWhsgti5xD5GkU7TrhfTQXmNylPAo0widHBDKx3DCdh3ATgUTi6vJwYd1xflL3GDt2dvD0wBEIgN3kuOveTIXxl0yHm4YFt2IEjE7Si3OAHuOg52jFKYEkYLPBRTZc5HMq0zkN-dWRS2xMSi8VZFb3Ofv4fQvhsY930TL8q6_FcveEMQLbqKqWGBY6mBcI6HRsZdAi-m9FS5YbReWpSdXk4Mtav5u16X079CqV'}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="w-full aspect-square bg-stone-100 overflow-hidden rounded-2xl border border-stone-200 group">
              <img 
                alt="Close-up detail" 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out" 
                src={product.images[1]?.src || 'https://lh3.googleusercontent.com/aida/AP1WRLvePLKmfu-RkqzJeFBThsiqL4cj6nWZVrPN0SeZ_uLItOvxH6h3-O09zJxH7fMzTGm9wc0DWkLbSPdpgPBZtRBqjZft1rnFRGIJq7gwVVERVaVr3dlyPjq4ublhH333_CnNd2qiTfUf2iVLjLxWS_3D2ZuGgeZOdpQ617fl21jOsv8Gt9alB3xaAhIyBQtS_uEzBMUX4xe4AO1JCTgyUkN18rPIrqj3BqYnvKn3KWe0Ydj7ffjBiOrkXWTg'}
              />
            </div>
            <div className="w-full aspect-square bg-stone-100 overflow-hidden rounded-2xl border border-stone-200 group">
              <img 
                alt="Folded detail" 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out" 
                src={product.images[2]?.src || 'https://lh3.googleusercontent.com/aida/AP1WRLscXhOrBafqwwe6B40RvBlh-x6iisW75JjDxth34fY-5DG9aJAl0mEPo249Jc8rDFhF91HoSek_PjOX6_vD1Qn18xQYfpnc0aNj1pUc5fWYw4h3bucPOuTSpPkpUFW6vFKAlrPYEUCm9Tw9oX9nCOPYGrCbsMPNF4j56TEyatZ4sDieFLJGhtkKb7eMUdEKBX7IRS_wyqiB13s8A_3kifu28LCRUnsIPuVwnE3LN5Nnz4WPovMxD_W7cqzc'}
              />
            </div>
          </div>
        </div>

        {/* Product Info Column */}
        <div className="md:col-span-5 flex flex-col pt-4 md:pl-8">
          <nav className="flex text-stone-500 text-[10px] uppercase tracking-widest font-semibold mb-6">
            <a className="hover:text-black transition" href="/">Home</a>
            <span className="mx-2">/</span>
            <a className="hover:text-black transition" href="/collections/all">Bedding</a>
            <span className="mx-2">/</span>
            <span className="text-black">Quilts</span>
          </nav>
          
          <h1 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight mb-4">
            {product.title}
          </h1>

          <p className="text-stone-600 leading-relaxed font-light mb-6 text-sm md:text-base">
            A masterpiece of restraint and artistry. Hand-carved teak blocks meet 300 years of Rajasthani heritage, dyed in deep natural indigo. Reversible for nuanced storytelling in your most intimate space.
          </p>

          <div className="text-2xl font-serif text-slate-900 mb-8">
            ₹{Number(selectedVariant.price).toLocaleString('en-IN')}
            <span className="text-sm font-sans text-stone-400 ml-3 line-through">
              ₹{(Number(selectedVariant.price) * 1.25).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Size Selector */}
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
                  className={`flex-1 py-3 border text-xs uppercase tracking-wider transition ${
                    activeSize === size
                      ? 'border-[#041534] bg-[#F5F0EA] text-[#041534] font-semibold'
                      : 'border-stone-200 text-stone-600 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag Button */}
          <button 
            onClick={handleAddToCart}
            className="w-full bg-[#041534] hover:bg-[#0c244c] text-white text-xs uppercase tracking-[0.25em] font-semibold py-4.5 rounded transition flex justify-center items-center gap-2 mb-3 shadow-md"
          >
            Add to Bag ➔
          </button>
          <p className="text-xs text-stone-500 text-center mb-10">
            Complimentary shipping and returns on all heritage pieces.
          </p>

          {/* Accordions */}
          <div className="border-t border-stone-200 divide-y divide-stone-200">
            <details className="group py-4.5 cursor-pointer" open>
              <summary className="flex justify-between items-center text-base font-serif text-slate-900 list-none">
                Craft & Care
                <span className="transition duration-300 group-open:rotate-180">▾</span>
              </summary>
              <div className="pt-3 text-stone-600 text-sm font-light space-y-2 leading-relaxed">
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>100% Organic Mulmul Cotton Shell & Filling</li>
                  <li>Hand-block printed using Azo-Free, natural plant dyes</li>
                  <li>Reversible design (Indigo Floral / Geometric Sand)</li>
                  <li>Care: Dry clean recommended to preserve natural dye vibrancy.</li>
                </ul>
              </div>
            </details>

            <details className="group py-4.5 cursor-pointer">
              <summary className="flex justify-between items-center text-base font-serif text-slate-900 list-none">
                Shipping & Returns
                <span className="transition duration-300 group-open:rotate-180">▾</span>
              </summary>
              <div className="pt-3 text-stone-600 text-sm font-light leading-relaxed">
                <p>Each piece is crafted slowly. Please allow 3-5 business days for dispatch. We offer a 30-day return policy for unused items in original packaging.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Story Inset Section */}
      <section className="bg-[#F5F0EA] rounded-3xl py-16 md:py-24 px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-slate-900">The Story of the Block</h2>
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
          <h2 className="text-2xl font-serif text-slate-900">Complete The Set</h2>
          <a className="text-xs uppercase tracking-widest font-semibold hover:text-[#D4AF37] transition" href="/collections/all">
            Shop All →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="group cursor-pointer flex flex-col gap-3">
            <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
              <img 
                className="w-full h-full object-cover group-hover:scale-103 transition duration-500" 
                alt="Indigo pillowcase set"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzHDFJ2hWy4M-iF1Z01vvdmWDmST_yX-91FGd_bC2P0eC2-CRh0dYxphRnLN72GIuZKV4N67lin4kWCJVWT1nTfx5Na5L2v55fw1yAkt90hmQGnFSiEWwmY9K1gDIKK8uDwBTujpqEs1_dbgPeCQLr9L2dlDsptoyEb2SkPfm0C3uDF5GlvZURkC01_Ljv13yLkwh2ycrDajTq4gq265nYECKDTJsvVwbAGlrPIwylTrt01RGUhAcrDzo2PgPgA5N2oONm3oB3QW8y"
              />
            </div>
            <h3 className="font-serif text-[#0F172A] text-base group-hover:text-[#D4AF37] transition">
              Heritage Indigo Pillowcase Set
            </h3>
            <p className="text-sm text-stone-600 font-medium">₹2,499.00</p>
          </div>
          
          {/* Card 2 */}
          <div className="group cursor-pointer flex flex-col gap-3">
            <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
              <img 
                className="w-full h-full object-cover group-hover:scale-103 transition duration-500" 
                alt="Mulmul cotton sheet set"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGxJ0nKV9QjcDoTkNzIldZR2k18mAYZPjd1u3YbKAiTOo0AP6EqwyKVmjWvyxKAMP3UUFt6_BbKXjIvVbcJX8A62JZT2R1liww6tK5ekfudRyDGgdGtJU5Ek8cIs17Cfw0t-qT-NiO3s12LePcFJoPKI4jDbDTn1IgMHW8OFKpMuXE4HSISuy1FTR3O3njxFDsFFGx7RpluU0SFYNNntke1Ugv28c_yLlYVUsDyXy3ulW6bSnIkzR0q7vxnEENkVHHf_oS2iTKYuEi"
              />
            </div>
            <h3 className="font-serif text-[#0F172A] text-base group-hover:text-[#D4AF37] transition">
              Organic Mulmul Sheet Set
            </h3>
            <p className="text-sm text-stone-600 font-medium">₹8,499.00</p>
          </div>
        </div>
      </section>
    </main>
  );
}
