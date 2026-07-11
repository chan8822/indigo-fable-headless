'use client';

import React, { useEffect, useState } from 'react';
import { useRegion } from '@/context/RegionContext';

// StickyBuyBar — PDP only (design-system.md §2.5). Slides up once the
// in-column actions block (the sentinel, by id) scrolls out above the fold.

export interface StickyBuyBarProps {
  name: string;
  configLabel: string;
  /** INR base amount; formatted for the active region. */
  priceINR: number | string;
  onAdd: () => void;
  /** id of the sentinel element to watch (the in-column actions block). */
  watchId: string;
}

export function StickyBuyBar({
  name,
  configLabel,
  priceINR,
  onAdd,
  watchId,
}: StickyBuyBarProps) {
  const { formatPrice } = useRegion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Show only once the sentinel has scrolled out above the viewport —
        // not while it is still below the fold on first paint.
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, [watchId]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-indigo-edge bg-indigo-deep text-khadi transition-transform duration-500 ease-fable ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-2.5 md:px-16 md:py-3">
        <div className="min-w-0">
          <p className="truncate font-serif text-sm md:text-base">{name}</p>
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
            {configLabel} · {formatPrice(priceINR)}
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          tabIndex={visible ? 0 : -1}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-khadi px-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-kohl transition-colors hover:bg-ember touch-manipulation md:px-7"
        >
          Add to the Bag
        </button>
      </div>
    </div>
  );
}
