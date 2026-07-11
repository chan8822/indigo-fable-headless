'use client';

import React from 'react';
import Link from 'next/link';
import { useRegion } from '@/context/RegionContext';
import { EmberEntry, FORM_UNITS, MOMENT_LABELS } from '@/lib/ember';

/**
 * ScentCard — Ember PLP card (design-system.md §2.18).
 * Plain khadi-deep ground with the serif name until the Ember shoot lands;
 * existing packshots are prohibited on all TIF surfaces (§5).
 */
export function ScentCard({ entry }: { entry: EmberEntry }) {
  const { formatPrice } = useRegion();
  const unit = FORM_UNITS[entry.form];

  return (
    <Link
      href={`/products/${entry.handle}`}
      className="group block touch-manipulation"
      aria-label={`${entry.name} — ${entry.notes}`}
      data-m={entry.moment}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-kohl/10 bg-khadi-deep">
        <div className="flex h-full w-full items-center justify-center transition-transform duration-1000 ease-fable group-hover:scale-[1.045]">
          <span className="px-4 text-center font-serif text-3xl text-kohl/30" aria-hidden="true">
            {entry.name}
          </span>
        </div>
        {/* Moment badge — mono chip */}
        <span className="absolute left-3 top-3 rounded-full border border-kohl/20 bg-khadi/85 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-kohl-soft">
          {MOMENT_LABELS[entry.moment]}
        </span>
      </div>

      <div className="mt-4 space-y-1.5">
        <h3 className="font-serif text-xl text-kohl transition-colors group-hover:text-madder">
          {entry.name}
        </h3>
        <p className="font-serif italic text-[15px] leading-snug text-kohl-soft">{entry.notes}</p>
        <p className="font-mono text-[13px] text-kohl">{formatPrice(entry.priceINR)}</p>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-kohl-soft">
          ~{entry.burn.minutes} min · {entry.burn.count} {unit} · {entry.burn.smoke} smoke
        </p>
      </div>
    </Link>
  );
}
