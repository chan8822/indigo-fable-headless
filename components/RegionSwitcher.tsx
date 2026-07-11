'use client';

import React from 'react';
import { REGIONS, RegionCode } from '@/lib/region';
import { useRegion } from '@/context/RegionContext';

/** RegionToggle — pill pair, role="group" (design-system.md §2.3, §1.4). */
export function RegionSwitcher() {
  const { region, switchRegion } = useRegion();

  return (
    <div
      role="group"
      aria-label="Shipping region"
      className="flex items-center rounded-full border border-kohl/20 p-0.5"
    >
      {(Object.keys(REGIONS) as RegionCode[]).map((code) => {
        const active = region.code === code;
        const label = code === 'in' ? 'IN ₹' : 'CA C$';
        return (
          <button
            key={code}
            onClick={() => switchRegion(code)}
            aria-pressed={active}
            aria-label={`${REGIONS[code].label} (${REGIONS[code].currency})`}
            className={`min-h-10 rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors touch-manipulation ${
              active
                ? 'bg-kohl text-khadi'
                : 'text-kohl-soft hover:text-kohl'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

/** Region-aware payment marks — mono-micro text chips. */
export function RegionPaymentBadges({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { region } = useRegion();
  const badgeClass =
    tone === 'dark'
      ? 'border-indigo-edge text-ember'
      : 'border-kohl/15 text-kohl-soft';

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {region.paymentMethods.map((method) => (
        <span
          key={method}
          className={`font-mono text-[9.5px] uppercase tracking-[0.18em] px-2 py-1 rounded border ${badgeClass}`}
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

/** Region-aware tax note — IN inclusive / export duties (design-system.md §4). */
export function RegionTaxNote({ className = '' }: { className?: string }) {
  const { region } = useRegion();
  return (
    <p className={className}>
      {region.code === 'in'
        ? 'Inclusive of all taxes'
        : 'Duties & taxes settled at checkout'}
    </p>
  );
}
