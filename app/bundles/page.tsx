'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRegion } from '@/context/RegionContext';
import { ShopifyProduct } from '@/lib/shopify';

export default function BundleBuilderPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem, openCart } = useCart();
  const { formatPrice } = useRegion();

  // Step states
  const [step, setStep] = useState(1);
  const [selectedQuilt, setSelectedQuilt] = useState<ShopifyProduct | null>(null);
  const [selectedScent, setSelectedScent] = useState<ShopifyProduct | null>(null);
  const [addHolder, setAddHolder] = useState(true);

  // Holder mock product
  const holderProduct = {
    id: "mock-holder-1",
    title: "Hand-Carved Soapstone Incense Burner",
    price: "499.00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGxJ0nKV9QjcDoTkNzIldZR2k18mAYZPjd1u3YbKAiTOo0AP6EqwyKVmjWvyxKAMP3UUFt6_BbKXjIvVbcJX8A62JZT2R1liww6tK5ekfudRyDGgdGtJU5Ek8cIs17Cfw0t-qT-NiO3s12LePcFJoPKI4jDbDTn1IgMHW8OFKpMuXE4HSISuy1FTR3O3njxFDsFFGx7RpluU0SFYNNntke1Ugv28c_yLlYVUsDyXy3ulW6bSnIkzR0q7vxnEENkVHHf_oS2iTKYuEi"
  };

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const quilts = products.filter(p =>
    p.handle.includes('quilt') ||
    p.handle.includes('razai') ||
    p.handle.includes('rajai') ||
    p.title.toLowerCase().includes('quilt')
  );
  const scents = products.filter(p => p.handle.includes('incense') || p.handle.includes('dhoop'));

  // Scent recommendation mapping logic
  const getRecommendedScent = (quilt: ShopifyProduct) => {
    if (quilt.handle.includes('rose') || quilt.title.toLowerCase().includes('rose')) {
      return scents.find(s => s.handle.includes('rose')) || scents[0];
    }
    return scents.find(s => s.handle.includes('indigo') || s.handle.includes('night')) || scents[0];
  };

  const handleSelectQuilt = (quilt: ShopifyProduct) => {
    setSelectedQuilt(quilt);
    // Auto-recommend scent for step 2
    setSelectedScent(getRecommendedScent(quilt) || null);
    setStep(2);
  };

  const handleAddToBag = () => {
    if (!selectedQuilt || !selectedScent) return;

    // Calculate bundle pricing with 15% discount applied directly to item price
    const discountFactor = 0.85;

    // Add Quilt
    addItem({
      id: selectedQuilt.variants[0]?.id || selectedQuilt.id,
      title: selectedQuilt.title,
      variantTitle: 'Sensory Set Bundle (15% Off)',
      price: (Number(selectedQuilt.variants[0]?.price || 0) * discountFactor).toFixed(2),
      quantity: 1,
      image: selectedQuilt.images[0]?.src || ''
    });

    // Add Scent
    addItem({
      id: selectedScent.variants[0]?.id || selectedScent.id,
      title: selectedScent.title,
      variantTitle: 'Sensory Set Bundle (15% Off)',
      price: (Number(selectedScent.variants[0]?.price || 0) * discountFactor).toFixed(2),
      quantity: 1,
      image: selectedScent.images[0]?.src || ''
    });

    // Add Holder
    if (addHolder) {
      addItem({
        id: holderProduct.id,
        title: holderProduct.title,
        variantTitle: 'Sensory Set Bundle (15% Off)',
        price: (Number(holderProduct.price) * discountFactor).toFixed(2),
        quantity: 1,
        image: holderProduct.image
      });
    }

    openCart();
  };

  // Pricing summary calculation
  const quiltPrice = Number(selectedQuilt?.variants[0]?.price || 0);
  const scentPrice = Number(selectedScent?.variants[0]?.price || 0);
  const holderPrice = addHolder ? Number(holderProduct.price) : 0;
  const originalSubtotal = quiltPrice + scentPrice + holderPrice;
  const bundleTotal = originalSubtotal * 0.85;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-stone-500 font-light">
        Loading Sensory Builder...
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      {/* Title Header */}
      <div className="text-center mb-16 space-y-3">
        <span className="text-[11px] uppercase tracking-[0.3em] text-gold-500 font-semibold block">
          Custom Wellness Bundler
        </span>
        <h1 className="text-3xl md:text-5xl font-serif text-indigo-950">
          Build Your Sensory Sanctuary
        </h1>
        <p className="text-sm md:text-base text-stone-500 max-w-xl mx-auto font-light leading-relaxed">
          Select a heritage tagai quilt, pair it with its dedicated organic incense, and add a hand-carved stone burner at a 15% custom bundle savings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Section: Configurator Steps */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Step 1: Select Bedding */}
          <div className={`p-6 md:p-8 rounded-2xl border transition ${step === 1 ? 'border-indigo-950 bg-white' : 'border-stone-200 bg-stone-50/50 opacity-60'}`}>
            <h2 className="text-xl font-serif text-indigo-950 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-indigo-950 text-gold-300 flex items-center justify-center text-xs font-bold font-sans">1</span>
              Choose Heritage Bedding
            </h2>
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {quilts.map((quilt) => (
                  <div 
                    key={quilt.id} 
                    onClick={() => handleSelectQuilt(quilt)}
                    className="border border-stone-200/70 hover:border-gold-500/40 rounded-xl p-4 cursor-pointer bg-white transition hover:shadow-sm touch-manipulation"
                  >
                    <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden mb-3">
                      <img className="w-full h-full object-cover" src={quilt.images[0]?.src} alt={quilt.title} />
                    </div>
                    <h3 className="text-sm font-serif text-indigo-950 line-clamp-1">{quilt.title}</h3>
                    <p className="text-xs text-gold-600 font-semibold mt-1">{formatPrice(quilt.variants[0]?.price || 0)}</p>
                  </div>
                ))}
              </div>
            )}
            {step > 1 && selectedQuilt && (
              <div className="flex items-center justify-between border-t border-stone-200/50 pt-4 mt-2">
                <span className="text-sm text-stone-600 font-light">{selectedQuilt.title}</span>
                <button onClick={() => setStep(1)} className="text-xs text-gold-600 font-semibold underline hover:text-indigo-950 touch-manipulation">Change</button>
              </div>
            )}
          </div>

          {/* Step 2: Select Scent */}
          <div className={`p-6 md:p-8 rounded-2xl border transition ${step === 2 ? 'border-indigo-950 bg-white' : 'border-stone-200 bg-stone-50/50 opacity-60'}`}>
            <h2 className="text-xl font-serif text-indigo-950 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-indigo-950 text-gold-300 flex items-center justify-center text-xs font-bold font-sans">2</span>
              Pair Botanical Incense
            </h2>
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {scents.map((scent) => {
                    const isRec = selectedQuilt && getRecommendedScent(selectedQuilt)?.id === scent.id;
                    return (
                      <div 
                        key={scent.id} 
                        onClick={() => setSelectedScent(scent)}
                        className={`border rounded-xl p-4 cursor-pointer bg-white transition hover:shadow-sm touch-manipulation ${
                          selectedScent?.id === scent.id ? 'border-gold-400 ring-1 ring-gold-400' : 'border-stone-200/70 hover:border-gold-500/40'
                        }`}
                      >
                        <div className="aspect-square bg-stone-100 rounded-lg overflow-hidden mb-3">
                          <img className="w-full h-full object-cover" src={scent.images[0]?.src} alt={scent.title} />
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-serif text-indigo-950 line-clamp-1">{scent.title}</h3>
                          {isRec && <span className="text-[9px] uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 border border-emerald-100 font-bold shrink-0">Rec</span>}
                        </div>
                        <p className="text-xs text-gold-600 font-semibold mt-1">{formatPrice(scent.variants[0]?.price || 0)}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center border-t border-stone-200/50 pt-6 mt-4">
                  <button onClick={() => setStep(1)} className="text-xs text-stone-500 font-semibold hover:text-black touch-manipulation">Back to Bedding</button>
                  <button onClick={() => setStep(3)} className="bg-indigo-950 hover:bg-indigo-900 text-stone-50 text-[11px] uppercase tracking-[0.2em] px-8 py-3.5 font-semibold transition rounded-full shadow touch-manipulation">Next Step</button>
                </div>
              </div>
            )}
            {step > 2 && selectedScent && (
              <div className="flex items-center justify-between border-t border-stone-200/50 pt-4 mt-2">
                <span className="text-sm text-stone-600 font-light">{selectedScent.title}</span>
                <button onClick={() => setStep(2)} className="text-xs text-gold-600 font-semibold underline hover:text-indigo-950 touch-manipulation">Change</button>
              </div>
            )}
          </div>

          {/* Step 3: Add Burner */}
          <div className={`p-6 md:p-8 rounded-2xl border transition ${step === 3 ? 'border-indigo-950 bg-white' : 'border-stone-200 bg-stone-50/50 opacity-60'}`}>
            <h2 className="text-xl font-serif text-indigo-950 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-indigo-950 text-gold-300 flex items-center justify-center text-xs font-bold font-sans">3</span>
              Add Accessories (Optional)
            </h2>
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border border-stone-200 p-4 rounded-xl bg-stone-50/20">
                  <div className="flex gap-4 items-center">
                    <img src={holderProduct.image} alt={holderProduct.title} className="w-16 h-16 object-cover rounded-md border border-stone-200" />
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800">{holderProduct.title}</h4>
                      <p className="text-xs text-stone-500 font-light mt-0.5">{formatPrice(holderProduct.price)}</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={addHolder}
                    onChange={(e) => setAddHolder(e.target.checked)}
                    className="w-5 h-5 text-gold-400 border-stone-300 rounded focus:ring-gold-400 touch-manipulation"
                  />
                </div>
                <div className="flex justify-between items-center border-t border-stone-200/50 pt-6 mt-4">
                  <button onClick={() => setStep(2)} className="text-xs text-stone-500 font-semibold hover:text-black touch-manipulation">Back to Incense</button>
                  <button onClick={handleAddToBag} className="bg-indigo-950 hover:bg-indigo-900 text-stone-50 text-[11px] uppercase tracking-[0.2em] px-8 py-3.5 font-semibold transition rounded-full shadow touch-manipulation">Add Bundle to Bag</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Sticky Bundle Summary Card */}
        <div className="lg:col-span-5">
          <div className="bg-ivory p-6 md:p-8 rounded-2xl border border-stone-200/50 shadow-sm space-y-6">
            <h3 className="text-lg font-serif text-indigo-950">Your Sanctuary Set</h3>
            <div className="space-y-4 border-b border-stone-200 pb-6">
              {/* Quilt slot */}
              <div className="flex justify-between text-sm">
                <span className="font-light">{selectedQuilt ? selectedQuilt.title : '1. Choose Bedding'}</span>
                <span>{selectedQuilt ? formatPrice(quiltPrice) : '—'}</span>
              </div>
              {/* Scent slot */}
              <div className="flex justify-between text-sm">
                <span className="font-light">{selectedScent ? selectedScent.title : '2. Choose Fragrance'}</span>
                <span>{selectedScent ? formatPrice(scentPrice) : '—'}</span>
              </div>
              {/* Holder slot */}
              <div className="flex justify-between text-sm">
                <span className="font-light">{addHolder ? holderProduct.title : '3. Holder Excluded'}</span>
                <span>{addHolder ? formatPrice(holderPrice) : '—'}</span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-sm text-indigo-950 border-b border-stone-200 pb-6">
              <div className="flex justify-between">
                <span className="font-light">Original Subtotal</span>
                <span>{formatPrice(originalSubtotal)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Bundle Discount (15% Off)</span>
                <span>-{formatPrice(originalSubtotal * 0.15)}</span>
              </div>
            </div>

            <div className="flex justify-between font-serif text-lg text-indigo-950">
              <span>Set Total</span>
              <span className="font-bold text-xl">{formatPrice(bundleTotal)}</span>
            </div>

            <button 
              disabled={!selectedQuilt || !selectedScent}
              onClick={handleAddToBag}
              className="w-full bg-indigo-950 hover:bg-indigo-900 disabled:bg-stone-300 disabled:cursor-not-allowed text-stone-50 text-[11px] uppercase tracking-[0.2em] font-semibold py-3.5 rounded-full transition shadow flex justify-center items-center gap-2 touch-manipulation"
            >
              Add Complete Set to Bag
            </button>
            <p className="text-[11px] text-stone-500 text-center font-light">
              Taxes and free priority delivery included for all Sanctuary Bundles.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
