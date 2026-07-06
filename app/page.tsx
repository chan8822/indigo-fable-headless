'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
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
    <div className="space-y-20 pb-20">
      {/* Announcement Bar */}
      <div className="bg-[#041534] text-white text-[12px] uppercase tracking-widest py-2.5 px-6 text-center font-semibold">
        Complimentary Nationwide Shipping | Secure Cash on Delivery
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[75vh] min-h-[550px] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida/AP1WRLt3tQz2JaHgEfXpdhARB9TWhsgti5xD5GkU7TrhfTQXmNylPAo0widHBDKx3DCdh3ATgUTi6vJwYd1xflL3GDt2dvD0wBEIgN3kuOveTIXxl0yHm4YFt2IEjE7Si3OAHuOg52jFKYEkYLPBRTZc5HMq0zkN-dWRS2xMSi8VZFb3Ofv4fQvhsY930TL8q6_FcveEMQLbqKqWGBY6mBcI6HRsZdAi-m9FS5YbReWpSdXk4Mtav5u16X079CqV')` }}
          />
          <div className="absolute inset-0 bg-[#0F172A]/30" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-5 text-white">
          <span className="text-xs uppercase tracking-[0.3em] text-[#F5F0EA] font-semibold">
            The Indigo Fable
          </span>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight font-medium">
            The Heritage of Jaipur, Woven for Your Home
          </h1>
          <p className="text-base md:text-lg text-stone-200 max-w-lg mx-auto font-light">
            Hand-block printed heirloom quilts, crafted slowly in Rajasthan.
          </p>
          <a 
            href="#collection" 
            className="mt-6 px-8 py-4 bg-[#041534] hover:bg-[#0c244c] text-white text-xs uppercase tracking-widest font-semibold rounded transition"
          >
            Explore the Collection
          </a>
        </div>
      </section>

      {/* Craft Pillars */}
      <section className="bg-[#041534] text-white py-4 px-6 border-b border-[#1b2a4a]">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-[11px] uppercase tracking-[0.2em] font-semibold">
          <span>Complimentary Shipping</span>
          <span className="text-[#D4AF37]">•</span>
          <span>Handcrafted in Jaipur</span>
          <span className="text-[#D4AF37]">•</span>
          <span>Cash on Delivery</span>
        </div>
      </section>

      {/* Shop by Craft Grid */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold">
            Three pillars of the Indian textile heritage
          </span>
          <h2 className="text-3xl font-serif text-[#0F172A]">Shop by Craft</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <a href="/collections/quilts" className="group block relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-100 shadow-sm border border-stone-200">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida/AP1WRLsxswCnoiAidNlqqasMfYcNGDEkOcbvgXRIfbZSJQuwvn9w11-I603-_9nGQwPT8vZV57o5_74SgZcai3mUq8sm4QnRr9kK2SUbcocma1sb5WdKhiibZ6bTprqiFJtjB3Muim-osVbgHDAB0LWVmSNS0vh5dgTYE5YEvTz2YBLLk834jk5Z4gg_q3gcewg1hmWtWSvg3RgnF-0J-oG-ZjrwZ7quKnNE-wSHZKp2Gpumf2xsMVdufo67A4o7')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-0 w-full text-center">
              <h3 className="text-2xl font-serif text-[#F5F0EA]">Jaipuri Quilts</h3>
            </div>
          </a>

          <a href="/collections/sheets" className="group block relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-100 shadow-sm border border-stone-200">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida/AP1WRLu3RJzXRItaaw8ylJJ-SfEsIEBFLe5_UtUgxZm46aCfL-ZP4IaRb_rH3VE8CvjHoSulg6QXW0X2lmGU7WoVq3T8SKIgSYLVcuqDWV9ForZSt44tmo8A3t80xozQdMgUCsKC6VWsNqkW20O_K8PtV_Umo5ttn4J_X2Upf4PAk8fUACkIL37ZmiqN3RfhZxmjVkhzSWvUQl6ygYprPX7PZRPXgZ2VQyCI1DQYPHT9BvCQsE3URAgaC1pnvTg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-0 w-full text-center">
              <h3 className="text-2xl font-serif text-[#F5F0EA]">Block-Printed Sheets</h3>
            </div>
          </a>

          <a href="/collections/robes" className="group block relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-100 shadow-sm border border-stone-200">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida/AP1WRLuR4KhQKZxbl4rWH_VTBmUUQm852O9ZoqGKHFEhSB6HQXPtSBo2ZQ1U9QadvxRVIpni3eHJfXAfifJjDt5Fa95I4HpE8JL5KIw7VG0d02Aa-ZrOtcdUGfV0Pyu_3Uw19Q6g8L5XC4akv08lmCwoc6F8RVD9WSAnXdeKbRQXir8rymnqOOPhh-A_Exs6DGatxyw96Z4GEH1VZjGyWN12Qz9FfxA5Yjqe67z60rA-RjfzO97IBV45K0QQVsgY')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-0 w-full text-center">
              <h3 className="text-2xl font-serif text-[#F5F0EA]">Waffle Robes</h3>
            </div>
          </a>
        </div>
      </section>

      {/* Storytelling Inset */}
      <section className="py-20 bg-[#F5F0EA]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <img 
              className="w-full h-auto object-cover aspect-[4/5]" 
              alt="Artisan at work"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrZ2Y82xlJUQSIKI3hUPzyMB4IZyqr-T0uGWdy3Ix96O8fGu7DieQQ3kssyiA-7R6zo-DE7577gQ0XYMNuznhL3cDDcZJsSYWxm8JiLvOF4VZvYqDqZvWe1BGzPBcYxZ7P5WiDeRomLBzlyqgSE05QXIK0Bk9PiuK9KKF3yQ6r-yr78trsHA_XCL2ReozQnYhEAtpVX88hOfmzBaMIx4AhRKCAJrNRlSQ5z0sX9lFp8hDFrtqb6NJfDmyqo4Wzmo4sOBSvVUXEDMVT"
            />
          </div>
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#0F172A] font-semibold">
              The Artisan Heritage
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#0F172A]">
              Rooted in Tradition
            </h2>
            <p className="text-stone-700 leading-relaxed font-light">
              Every piece at The Indigo Fable is a labour of love. From carved wooden blocks to hand-stitched tagai quilting, we honour the slow, intentional art of Indian textile making.
            </p>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              In the dusty lanes of Sanganer, a craftsman lifts a hand-carved wooden block, presses it onto organic cotton with a practised rhythm — and in that single motion, 300 years of Jaipur heritage lives again.
            </p>
            <a 
              href="/policies/contact-information" 
              className="inline-block border border-[#0F172A] text-[#0F172A] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold hover:bg-[#0F172A] hover:text-[#F5F0EA] transition"
            >
              Our Story
            </a>
          </div>
        </div>
      </section>

      {/* Live Storefront Catalog */}
      <section id="collection" className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12 flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-500 font-semibold">
            Handpicked favourites, cherished across India
          </span>
          <h2 className="text-3xl font-serif text-[#0F172A]">Live Storefront Pieces</h2>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-stone-500 text-sm font-light">Syncing Jaipur workshop catalog...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const mainImage = product.images[0]?.src || '';
              const firstVariant = product.variants[0] || { id: '', price: '0.00' };

              return (
                <div key={product.id} className="flex flex-col gap-4 border border-stone-200 rounded-2xl p-4 bg-white hover:shadow-md transition">
                  <a href={`/products/${product.handle}`} className="aspect-square bg-stone-100 rounded-xl overflow-hidden block">
                    <img 
                      className="w-full h-full object-cover hover:scale-103 transition duration-500" 
                      src={mainImage} 
                      alt={product.title} 
                    />
                  </a>
                  <div className="text-center flex flex-col gap-1 mt-2">
                    <a href={`/products/${product.handle}`} className="text-base font-serif text-[#0F172A] hover:text-[#D4AF37] transition">
                      {product.title}
                    </a>
                    <span className="text-sm text-stone-600 font-medium">
                      ₹{Number(firstVariant.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button 
                    onClick={() => addItem({
                      id: firstVariant.id,
                      title: product.title,
                      variantTitle: 'Standard',
                      price: firstVariant.price,
                      quantity: 1,
                      image: mainImage,
                    })}
                    className="w-full mt-2 py-3 bg-[#041534] hover:bg-[#0c244c] text-white text-xs uppercase tracking-widest font-semibold rounded transition"
                  >
                    Quick Add to Bag
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Artisan Process Section */}
      <section className="py-20 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              The Artisan Process
            </span>
            <h2 className="text-3xl md:text-5xl font-serif">
              One Piece. Three Hundred Years of Craft.
            </h2>
            <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed pt-2">
              Each quilt begins with a hand-carved teak block — pressed thousands of times across organic mulmul cotton to build the pattern. An artisan then threads a needle and begins the kantha stitch: row by row, hour by hour, binding the layers into something that will outlast any machine-made piece by decades.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-[#D4AF37]/20">
            <img 
              className="w-full h-auto object-cover aspect-video" 
              alt="Drying quilts"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYCSJebiofgR4lxYGB6_hQzte75MURm5vXX94jesd9VGQ9NlHrwjC718mk32obWiUJ2FR4N8a-102GEU8sfx9OA1E1bkPj60h4zm1BkA9XZL2dAj-HfkXu2T7XrKIcbWjfVdNgJTmPXwOxR4H6LT2PvBPBbKkYoQOhTAvWb2PyJmfP1aloC3GUcv_N5Ti-xZZU0ASsyBf6FtHcSPlwDfZMA5LeFQRWKpyX7Z3kyW8U7GkxkSPnxcCLtOSntqtf5U7Rmcv_EnY0w9Ei"
            />
          </div>
        </div>
      </section>

      {/* Concierge Portal Tracking */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <OrderLookup />
      </div>
    </div>
  );
}
