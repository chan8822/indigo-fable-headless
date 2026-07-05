'use client';

import React, { useState } from 'react';

export function OrderLookup() {
  const [orderNum, setOrderNum] = useState('');
  const [status, setStatus] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNum.trim()) return;

    setLoading(true);
    setError('');
    setStatus(null);

    try {
      // Query API proxy or direct client status
      const res = await fetch(`/api/order?num=${encodeURIComponent(orderNum.replace('#', ''))}`);
      if (!res.ok) {
        setError('Order not found or still processing. Try entering 1001.');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setStatus(data);
    } catch (err) {
      setError('Unable to reach concierge portal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="concierge" className="max-w-4xl mx-auto px-6 py-20">
      <div className="bg-white rounded-3xl p-10 md:p-14 border border-stone-200/80 shadow-sm space-y-8 text-center">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-500 font-semibold">
            Heirloom Concierge Portal
          </span>
          <h2 className="text-3xl font-serif text-indigo-950">
            Track Your Artisanal Order
          </h2>
          <p className="text-sm text-stone-600 font-light max-w-lg mx-auto">
            Enter your order reference number (e.g., <span className="font-semibold text-indigo-950">#1001</span>) to check live fulfillment status directly from our Jaipur craft workshop.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-3">
          <input
            type="text"
            placeholder="Order Number (e.g. 1001)"
            value={orderNum}
            onChange={(e) => setOrderNum(e.target.value)}
            className="flex-1 bg-stone-50 border border-stone-300 px-4 py-3 text-sm rounded-xl focus:outline-none focus:border-gold-500 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-950 hover:bg-indigo-900 disabled:bg-stone-400 text-stone-100 px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-medium transition shadow-md"
          >
            {loading ? 'Searching...' : 'Lookup'}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium">
            {error}
          </div>
        )}

        {status && (
          <div className="p-6 bg-stone-50 rounded-2xl border border-gold-500/30 text-left space-y-4 max-w-md mx-auto animate-fadeIn">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <span className="font-serif text-lg text-indigo-950 font-semibold">Order #{status.orderNumber}</span>
              <span className="bg-gold-500/20 text-indigo-950 text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full border border-gold-500/40">
                {status.financialStatus || 'Paid'}
              </span>
            </div>
            <div className="text-xs space-y-2 text-stone-600">
              <p><span className="font-semibold text-stone-800">Total:</span> {status.total} {status.currency}</p>
              <p><span className="font-semibold text-stone-800">Created:</span> {new Date(status.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
              <p><span className="font-semibold text-stone-800">Fulfillment:</span> {status.fulfillmentStatus || 'In Artisanal Workshop (Hand-Stitching)'}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
