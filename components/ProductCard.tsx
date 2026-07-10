'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRegion } from '@/context/RegionContext';

interface Variant {
  id: string;
  title: string;
  price: string;
}

interface Image {
  src: string;
  alt: string;
}

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    vendor: string;
    descriptionHtml: string;
    variants: Variant[];
    images: Image[];
  };
  onOpenZoom: (images: Image[], initialIdx: number) => void;
}

export function ProductCard({ product, onOpenZoom }: ProductCardProps) {
  const { addItem } = useCart();
  const { formatPrice } = useRegion();
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants[0] || { id: '0', title: 'Default', price: '0' }
  );
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const currentImage = product.images[activeImgIndex]?.src || 
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80';

  const handleAddToCart = () => {
    addItem({
      id: selectedVariant.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      image: currentImage,
    });
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-gold-500/50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
      {/* Image Container with Lightbox Zoom Trigger */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        <img 
          src={currentImage} 
          alt={product.title} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 cursor-pointer"
          onClick={() => onOpenZoom(product.images, activeImgIndex)}
        />
        <div className="absolute top-4 left-4 bg-indigo-950/85 backdrop-blur-md text-gold-400 text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-gold-500/30">
          Heirloom Edition
        </div>
        <button 
          onClick={() => onOpenZoom(product.images, activeImgIndex)}
          className="absolute bottom-4 right-4 bg-indigo-950/80 hover:bg-indigo-950 text-gold-400 text-xs px-3 py-1.5 rounded-lg border border-gold-500/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          🔍 Zoom View
        </button>
      </div>

      {/* Thumbnails if multiple images */}
      {product.images.length > 1 && (
        <div className="flex gap-2 p-3 bg-stone-50 border-b border-stone-100 overflow-x-auto">
          {product.images.slice(0, 5).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImgIndex(idx)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${
                activeImgIndex === idx ? 'border-gold-500 shadow-sm' : 'border-transparent opacity-60'
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-medium">
              {product.vendor}
            </span>
            <span className="text-lg font-serif font-semibold text-indigo-950">
              {formatPrice(selectedVariant.price)}
            </span>
          </div>
          <h3 className="text-xl font-serif text-indigo-950 group-hover:text-gold-500 transition-colors leading-snug">
            {product.title}
          </h3>
          <div 
            className="text-sm text-stone-600 line-clamp-3 leading-relaxed font-light"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </div>

        {/* Dynamic Variant Selector */}
        {product.variants.length > 1 && (
          <div className="space-y-2 pt-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              Select Edition / Size:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    selectedVariant.id === v.id
                      ? 'bg-indigo-950 text-gold-400 border-gold-500 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-indigo-950 hover:bg-indigo-900 text-stone-100 py-3.5 px-6 rounded-xl font-medium tracking-wider uppercase text-xs transition duration-300 shadow-md flex items-center justify-center space-x-2"
          >
            <span>Add to Bag — {formatPrice(selectedVariant.price)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
