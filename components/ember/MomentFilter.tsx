'use client';

import React from 'react';
import { EmberMoment, MOMENT_LABELS } from '@/lib/ember';

export type MomentFilterValue = EmberMoment | 'all';

const CHIPS: MomentFilterValue[] = ['all', 'dawn', 'day', 'dusk', 'night'];

/** MomentFilter — chip row filtering ScentCards by moment (design-system.md §2.19). */
export function MomentFilter({
  value,
  onChange,
}: {
  value: MomentFilterValue;
  onChange: (value: MomentFilterValue) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter by moment of the day"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {CHIPS.map((chip) => {
        const active = value === chip;
        return (
          <button
            key={chip}
            type="button"
            onClick={() => onChange(chip)}
            aria-pressed={active}
            data-m={chip}
            className={`min-h-10 rounded-full px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.22em] transition-colors touch-manipulation ${
              active
                ? 'bg-kohl text-khadi'
                : 'border border-kohl/20 text-kohl-soft hover:text-kohl'
            }`}
          >
            {chip === 'all' ? 'All' : MOMENT_LABELS[chip]}
          </button>
        );
      })}
    </div>
  );
}
