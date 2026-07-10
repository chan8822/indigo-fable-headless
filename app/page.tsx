'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRegion } from '@/context/RegionContext';
import { OrderLookup } from '@/components/OrderLookup';

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  variants: { id: string; price: string; title: string }[];
  images: { src: string; alt: string }[];
}

export default function HomePage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { formatPrice } = useRegion();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden flex flex-col justify-end px-6 md:px-16 pb-16">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0H5G9VWArUhKlY3IskGNfavU2LkNDQXeqjnGeyfgRhKj84K-urxhQJFI89f0qjiVrSRh5vXN4RYQz6Nppxf6jWWgTA-iyWpHG4FwQ27seMn8p9QKdXUlUpZi1BGyGgsVUsSp8acBSC2V5i4zgdXfJ-CGdXVeA6w4XAiCQLh-Ce8RjEkLmUJeZpdNNw9pM2cjqBEWvwMrCLku2ykfG7Nn04YM-nnsCzr9bYs9DtvCXYZOQbw-SKK4AQfbYXLfXZJsjHvRuyAU01JpU')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041534]/70 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 space-y-6 max-w-2xl text-white">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-200 font-semibold block">
            The Indigo Fable
          </span>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight font-medium">
            The Heritage of Jaipur, Woven for Your Home
          </h2>
          <p className="text-base md:text-lg opacity-90 max-w-lg font-light leading-relaxed">
            Hand-block printed heirloom quilts, crafted slowly in Rajasthan.
          </p>
          <div className="flex pt-2">
            <a 
              href="#collection" 
              className="bg-[#041534] hover:bg-[#0c244c] text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold transition-all hover:translate-y-[-2px] active:scale-95 shadow-lg"
            >
              Explore the Collection
            </a>
          </div>
        </div>
      </section>

      {/* Features Row */}
      <section className="py-12 bg-[#F5F0EA] border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center text-center">
          <div className="flex flex-col items-center gap-3">
            <span className="text-2xl text-[#D4AF37]">🚚</span>
            <p className="text-[11px] uppercase tracking-widest text-[#041534] font-bold">
              Complimentary Shipping Across India
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="text-2xl text-[#D4AF37]">📐</span>
            <p className="text-[11px] uppercase tracking-widest text-[#041534] font-bold">
              Handcrafted in Jaipur
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="text-2xl text-[#D4AF37]">💵</span>
            <p className="text-[11px] uppercase tracking-widest text-[#041534] font-bold">
              Cash on Delivery Available
            </p>
          </div>
        </div>
      </section>

      {/* Shop by Craft */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-2 font-semibold">
            Heritage Techniques
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#041534]">Shop by Craft</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Category 1 */}
          <a className="group block" href="/collections/quilts">
            <div className="aspect-[2/3] overflow-hidden rounded-2xl bg-stone-100 mb-6 relative border border-stone-200 shadow-sm">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLtCBgcx-G9rKHLLwnWSzdiB82XG8D_qe7E6qPRIFY1L_pMZOpZFCk0Ifjg2AUSBWPfHtPvOpUKmRVxxuAxIwpJH-vfb_Y4l_5uX_c_o6GaSDc_xHLhURjkm4xMq_JHoMIg9A8yzTqUl8_i_jiXiT99opDd77DOHEXOoaWKrY5pc3ynmj8EeJfFK_R8HwwtnUioB7XdaMRtKHDOlw19R0xJbzpGQWn9jWejQQD6Un-_WQM95iNjEzIjqpqiC"
                alt="Jaipuri Quilts"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <h3 className="text-xl font-serif text-[#041534] mb-2">Jaipuri Quilts</h3>
            <p className="text-sm text-stone-500 flex items-center gap-2 font-light">
              Explore ➔
            </p>
          </a>

          {/* Category 2 */}
          <a className="group block md:-mt-12" href="/collections/sheets">
            <div className="aspect-[2/3] overflow-hidden rounded-2xl bg-stone-100 mb-6 relative border border-stone-200 shadow-sm">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLsr2usY1Wj5hIWAg7-oRYQbnEEylPTt6lRirPoznQaxBB_TtwCZVqvllda5NwyuMGjnw8OSw3xYXwt-Osc4-aUEz-ACk4-1z2Hqa39b7s6MOyMTOv_Vgezb8wC6zPOXOP3sehYw2B6uJzI-fjYp2urL0L6KMI2DLQ7ptCHBT_aQmgimKUJQPFx2KxuyosAWO8dJvS03TDX18hqaBRZUKpsJLcSjoWtGaLoQY0kPKZYkbDLa7ax-VmJMQsia"
                alt="Block-Printed Sheets"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <h3 className="text-xl font-serif text-[#041534] mb-2">Block-Printed Sheets</h3>
            <p className="text-sm text-stone-500 flex items-center gap-2 font-light">
              Explore ➔
            </p>
          </a>

          {/* Category 3 */}
          <a className="group block" href="/collections/robes">
            <div className="aspect-[2/3] overflow-hidden rounded-2xl bg-stone-100 mb-6 relative border border-stone-200 shadow-sm">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLtMPoJGgrGzpQiR6GcgtP0_-4EBRpe5gcm4coBR82O3ru5ihJ4cNTuyBwf0png4kTLBTo4BlV1RLngO7etG8Jt7y_cKNJqQBe0hG0z13-BgprIcxmMSgTG6qQJdYWK8CQ_f_qDKGYU9UF533k_hdJjDJYhl48wLSkqhxhA_XfPlsx70SjuhlXUol9zEhYce65e5j5XHqr0wpHgcU0UJfBSL69Ik5yTbWesQSxtrsgkeJhRIzcVlSar8NOBp"
                alt="Waffle Robes"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <h3 className="text-xl font-serif text-[#041534] mb-2">Waffle Robes</h3>
            <p className="text-sm text-stone-500 flex items-center gap-2 font-light">
              Explore ➔
            </p>
          </a>
        </div>
      </section>

      {/* Artisan Story Section */}
      <section className="py-24 bg-[#F5F0EA] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="w-full md:w-1/2">
            <div className="aspect-video overflow-hidden rounded-2xl shadow-md border border-stone-200">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida/AP1WRLsd55eL8X84gorWWMBqbaIK2xKF8_9AiAMCTQegvzNU2-26OosrD1LTIPgaxzmAuYdTcoGFGc1aXNFoYDGNVCppSAeR1OabCIurIbJLf6yUSu44I0NGIuWWKCU3QS1pVeOC_UpVnygh0s3DUrOEazSk0p0hdSdxMqIB36-MLjvPDpLrQus97lsf6mu7ihO0J2YbGqe8xUbOVK7xxYSb5_x3NZO8mZsY5Npwbte4znZy5NCP5GIv70iygDA"
                alt="Jaipur workshop block printing"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              The Artisan Heritage
            </p>
            <h2 className="text-3xl font-serif text-[#041534]">Rooted in Tradition</h2>
            <p className="text-lg md:text-xl text-stone-700 italic leading-relaxed font-light">
              "Every piece at The Indigo Fable is a labour of love. From carved wooden blocks to hand-stitched tagai quilting, we honour the slow, intentional art of Indian textile making."
            </p>
            <div className="pt-4">
              <a 
                href="/policies/contact-information" 
                className="inline-block border-b-2 border-[#D4AF37] pb-1 text-xs uppercase tracking-widest text-[#041534] font-semibold hover:text-[#D4AF37] transition-colors"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Most Loved Pieces Carousel */}
      <section className="py-12 overflow-hidden max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-xl space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">Customer Favorites</p>
            <h2 className="text-3xl font-serif text-[#041534]">Our Most Loved Pieces</h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-500 text-sm font-light">Updating favorites...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => {
              const mainImage = product.images[0]?.src || '';
              const firstVariant = product.variants[0] || { id: '', price: '0.00' };

              return (
                <div key={product.id} className="group flex flex-col gap-4 border border-stone-200 rounded-2xl p-4 bg-white hover:shadow-md transition">
                  <div className="aspect-[4/5] bg-[#F5F0EA] rounded-xl overflow-hidden relative">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
                      src={mainImage} 
                      alt={product.title} 
                    />
                    <button 
                      onClick={() => addItem({
                        id: firstVariant.id,
                        title: product.title,
                        variantTitle: 'Standard',
                        price: firstVariant.price,
                        quantity: 1,
                        image: mainImage,
                      })}
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm text-[#041534] px-6 py-3 text-xs uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-sm"
                    >
                      Add to Bag
                    </button>
                  </div>
                  <div className="mt-2 space-y-1">
                    <a href={`/products/${product.handle}`} className="text-lg font-serif text-[#041534] block hover:text-[#D4AF37] transition">
                      {product.title}
                    </a>
                    <p className="text-sm text-[#D4AF37] font-semibold">
                      {formatPrice(firstVariant.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Trust Pillars */}
      <section className="py-24 bg-[#041534] text-white rounded-3xl mx-6 border border-stone-200/10">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center text-xl text-[#D4AF37]">
                🍃
              </div>
              <div>
                <h3 className="text-lg font-serif mb-2 text-white font-semibold">100% Organic Mulmul Cotton</h3>
                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  Breathable, skin-gentle fabric certified for purity — designed specifically for the nuanced Indian climate.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center text-xl text-[#D4AF37]">
                🎨
              </div>
              <div>
                <h3 className="text-lg font-serif mb-2 text-white font-semibold">Azo-Free Dyes</h3>
                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  Natural, safe dyes applied by master artisans. No harsh chemicals, just the pure essence of Jaipur's color palette.
                </p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 border-2 border-[#D4AF37]/30 -m-4 transition-all duration-500 group-hover:m-0" />
            <div className="bg-[#F5F0EA]/5 backdrop-blur-sm p-12 border border-white/10 relative z-10 text-center rounded-xl">
              <p className="text-2xl font-serif italic mb-6 text-stone-200">"Like sleeping under a cloud."</p>
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">— Priya M., New Delhi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Testimonials Grid */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] mb-2 font-semibold">Our Community</p>
          <h2 className="text-3xl font-serif text-[#041534]">Loved Across India</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#F5F0EA] p-8 rounded-2xl shadow-sm border border-stone-200/50">
            <div className="flex gap-1 text-[#D4AF37] mb-4 text-sm">★★★★★</div>
            <h4 className="text-lg font-serif text-[#041534] mb-3 font-semibold">Like sleeping under a cloud.</h4>
            <p className="text-stone-600 text-sm font-light leading-relaxed mb-6">
              "I was skeptical about how warm this quilt would be because it feels so light — but it is perfect even for Delhi winters."
            </p>
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Priya M. — New Delhi</p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F5F0EA] p-8 rounded-2xl shadow-sm border border-stone-200/50">
            <div className="flex gap-1 text-[#D4AF37] mb-4 text-sm">★★★★★</div>
            <h4 className="text-lg font-serif text-[#041534] mb-3 font-semibold">The most beautiful thing in our home.</h4>
            <p className="text-stone-600 text-sm font-light leading-relaxed mb-6">
              "Bought the Jodhpur Indigo Bedding Set as a housewarming gift for my sister and she absolutely loves it. The mul mul cotton is incredibly soft."
            </p>
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Ananya R. — Bengaluru</p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F5F0EA] p-8 rounded-2xl shadow-sm border border-stone-200/50">
            <div className="flex gap-1 text-[#D4AF37] mb-4 text-sm">★★★★★</div>
            <h4 className="text-lg font-serif text-[#041534] mb-3 font-semibold">Arrived beautifully packed.</h4>
            <p className="text-stone-600 text-sm font-light leading-relaxed mb-6">
              "The Saffron Paisley Kantha Throw now lives on our living room sofa. It is the first thing guests notice and compliment."
            </p>
            <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Rohan P. — Hyderabad</p>
          </div>
        </div>
      </section>

      {/* Concierge Portal Tracking */}
      <div className="max-w-7xl mx-auto px-6">
        <OrderLookup />
      </div>
    </div>
  );
}
