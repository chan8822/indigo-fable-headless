'use client';

import React from 'react';
import { REGIONS, RegionCode } from '@/lib/region';
import { useRegion } from '@/context/RegionContext';

export function RegionSwitcher() {
  const { region, switchRegion } = useRegion();

  return (
    <label className="flex items-center gap-2 text-xs text-stone-300">
      <span className="hidden sm:inline uppercase tracking-widest text-[10px] text-stone-400">
        Ship to
      </span>
      <select
        value={region.code}
        onChange={(e) => switchRegion(e.target.value as RegionCode)}
        aria-label="Select your shipping region"
        className="bg-indigo-900/60 border border-gold-500/30 text-stone-100 text-xs rounded-md px-2 py-1.5 focus:outline-none focus:border-gold-400 cursor-pointer touch-manipulation"
      >
        {Object.values(REGIONS).map((r) => (
          <option key={r.code} value={r.code}>
            {r.flag} {r.shortLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

export function RegionPaymentBadges({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { region } = useRegion();
  const badgeClass =
    tone === 'dark'
      ? 'bg-indigo-900/50 border-gold-500/20 text-stone-300'
      : 'bg-stone-100 border-stone-200 text-stone-500';

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {region.paymentMethods.map((method) => (
        <span
          key={method}
          className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border font-medium ${badgeClass}`}
        >
          {method}
        </span>
      ))}
    </div>
  );
}

export function RegionShippingNote({ className = '' }: { className?: string }) {
  const { region } = useRegion();
  return <p className={className}>{region.shippingNote}</p>;
}
