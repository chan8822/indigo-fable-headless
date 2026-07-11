'use client';

import React from 'react';
import { useRegion } from '@/context/RegionContext';

// TrustRows — three rows, 2px dot, region-aware row 2 (design-system.md §2.13, §4).

export interface TrustRowsProps {
  tone?: 'light' | 'dark';
  /** Row 1 — delivery assurance. */
  deliveryLine?: string;
  /** Row 3 — returns assurance. */
  returnLine?: string;
}

export function TrustRows({
  tone = 'light',
  deliveryLine = 'Insured, tracked delivery',
  returnLine = '30-day return in original condition',
}: TrustRowsProps) {
  const { region } = useRegion();

  const regionLine =
    region.code === 'in'
      ? 'UPI, cards & COD — pan-India 3–4 days'
      : 'Duties & taxes settled at checkout';

  const dot = tone === 'dark' ? 'bg-khari' : 'bg-madder';
  const text = tone === 'dark' ? 'text-dark-body' : 'text-kohl-soft';

  const rows = [deliveryLine, regionLine, returnLine];

  return (
    <ul className="space-y-2.5">
      {rows.map((row) => (
        <li
          key={row}
          className={`flex items-center gap-3 font-sans text-[13px] ${text}`}
        >
          <span
            aria-hidden="true"
            className={`h-0.5 w-0.5 shrink-0 rounded-full ${dot}`}
          />
          {row}
        </li>
      ))}
    </ul>
  );
}
