'use client';

import { ZoomIn, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface Image {
  src: string;
  alt: string;
}

interface ImageModalProps {
  images: Image[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({ images, initialIndex, isOpen, onClose }: ImageModalProps) {
  const [currentIdx, setCurrentIdx] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIdx(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIdx];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-indigo-950/95 backdrop-blur-xl flex flex-col justify-between p-6 overflow-hidden animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
        <span className="text-sm font-serif text-gold-400 uppercase tracking-widest">
          Artisanal Detail View ({currentIdx + 1} / {images.length})
        </span>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="bg-indigo-900/60 hover:bg-indigo-900 text-stone-200 px-4 py-2 rounded-full border border-gold-500/30 text-xs font-medium uppercase tracking-wider transition"
          >
            <span className="flex items-center gap-1.5"><ZoomIn className="h-4 w-4" strokeWidth={1.5} /> {isZoomed ? 'Reset Zoom' : '2x High-Res Zoom'}</span>
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-indigo-900/60 hover:bg-rose-900/60 text-stone-200 border border-gold-500/30 flex items-center justify-center text-lg transition"
          ><X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden my-4" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button 
            onClick={handlePrev}
            className="absolute left-4 z-10 w-12 h-12 rounded-full bg-indigo-900/80 hover:bg-gold-500 hover:text-indigo-950 text-stone-200 border border-gold-500/40 flex items-center justify-center text-xl transition shadow-lg"
          >
            ←
          </button>
        )}

        <div className={`max-h-full max-w-full overflow-auto transition-all duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => setIsZoomed(!isZoomed)}>
          <img 
            src={currentImg.src} 
            alt={currentImg.alt} 
            className="max-h-[75vh] max-w-[85vw] object-contain rounded-xl shadow-2xl border border-gold-500/20 mx-auto"
          />
        </div>

        {images.length > 1 && (
          <button 
            onClick={handleNext}
            className="absolute right-4 z-10 w-12 h-12 rounded-full bg-indigo-900/80 hover:bg-gold-500 hover:text-indigo-950 text-stone-200 border border-gold-500/40 flex items-center justify-center text-xl transition shadow-lg"
          >
            →
          </button>
        )}
      </div>

      {/* Thumbnails Bar */}
      {images.length > 1 && (
        <div className="flex justify-center gap-3 py-2 overflow-x-auto z-10" onClick={(e) => e.stopPropagation()}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                currentIdx === idx ? 'border-gold-500 scale-105 shadow-lg' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
