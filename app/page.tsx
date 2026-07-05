'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ImageModal } from '@/components/ImageModal';
import { OrderLookup } from '@/components/OrderLookup';

interface Image {
  src: string;
  alt: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [zoomImages, setZoomImages] = useState<Image[]>([]);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleOpenZoom = (images: Image[], initialIdx: number) => {
    setZoomImages(images);
    setZoomIndex(initialIdx);
    setIsZoomOpen(true);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Banner */}
      <section className="luxury-gradient text-stone-100 py-28 px-6 relative overflow-hidden border-b border-gold-500/30">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold block">
            Artisanal Heritage Living
          </span>
          <h1 className="text-4xl md:text-6xl font-serif tracking-wide leading-tight">
            Heirloom Hand-Stitched Organic Textiles
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Signature Khadi prints highlighted with shimmering gold-dust accents, crafted with timeless tagai stitching designed to last generations.
          </p>
          <div className="pt-6 flex justify-center gap-4">
            <a 
              href="#collection" 
              className="inline-block bg-gold-500 hover:bg-gold-400 text-indigo-950 px-8 py-4 rounded-full font-medium tracking-wider uppercase text-sm shadow-lg hover:shadow-gold-500/20 transition duration-300"
            >
              Explore Collection
            </a>
            <a 
              href="#concierge" 
              className="inline-block bg-indigo-900/60 hover:bg-indigo-900 text-stone-200 px-8 py-4 rounded-full font-medium tracking-wider uppercase text-sm border border-gold-500/30 transition duration-300"
            >
              Track Order
            </a>
          </div>
        </div>
      </section>

      {/* Live Catalog Section */}
      <section id="collection" className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-500 font-semibold">
            Direct From Our Loom
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-indigo-950">
            Live Storefront Collection
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-2" />
        </div>

        {loading ? (
          <div className="text-center py-20 space-y-4">
            <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-stone-500 text-sm">Syncing live catalog from Jaipur workshop...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
            <p className="text-stone-500">No live products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOpenZoom={handleOpenZoom}
              />
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Zoom Gallery */}
      <ImageModal 
        images={zoomImages}
        initialIndex={zoomIndex}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />

      {/* Order Lookup Portal */}
      <OrderLookup />

      {/* Craftsmanship Section */}
      <section id="heritage" className="max-w-7xl mx-auto px-6 pt-6">
        <div className="bg-indigo-950 text-stone-100 rounded-3xl p-12 md:p-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center border border-gold-500/30 relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
              The Artisan Promise
            </span>
            <h2 className="text-3xl md:text-4xl font-serif leading-tight">
              Meticulous Tagai Stitching & 100% Organic Fills
            </h2>
            <p className="text-stone-300 leading-relaxed font-light">
              Every Indigo Fable quilt is crafted over weeks by master artisans using unbleached organic cotton fibers. Naturally temperature-regulating, hypoallergenic, and detailed with hand-stamped gold accents that grow softer with every season.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-indigo-900/50 backdrop-blur-md p-6 rounded-2xl border border-gold-500/20 text-center space-y-2">
              <span className="text-3xl font-serif text-gold-400 block">100%</span>
              <span className="text-xs uppercase tracking-wider text-stone-300">Organic Cotton</span>
            </div>
            <div className="bg-indigo-900/50 backdrop-blur-md p-6 rounded-2xl border border-gold-500/20 text-center space-y-2">
              <span className="text-3xl font-serif text-gold-400 block">Hand</span>
              <span className="text-xs uppercase tracking-wider text-stone-300">Stitched Tagai</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
