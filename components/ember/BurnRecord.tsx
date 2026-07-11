import React from 'react';
import { EmberEntry, FORM_LABELS, FORM_UNITS } from '@/lib/ember';

/** BurnRecord — apothecary specimen card, 3×2 mono grid (design-system.md §2.15). */
export function BurnRecord({ entry }: { entry: EmberEntry }) {
  const cells: [string, string][] = [
    ['Form', FORM_LABELS[entry.form]],
    ['Burn', `~${entry.burn.minutes} min`],
    ['Smoke', entry.burn.smoke === 'low' ? 'Low' : entry.burn.smoke],
    ['Count', `${entry.burn.count} ${FORM_UNITS[entry.form]}`],
    ['Base', entry.provenance.base],
    ['Atelier', 'Meerut, U.P.'],
  ];

  return (
    <div className="rounded-sm border border-kohl/25 bg-khadi-deep/40 p-5">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-kohl-soft">
        Burn record
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        {cells.map(([key, value]) => (
          <div key={key}>
            <dt className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-kohl-soft">
              {key}
            </dt>
            <dd className="mt-1 font-mono text-[12.5px] leading-snug text-kohl">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
