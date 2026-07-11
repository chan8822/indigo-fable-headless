'use client';

import React, { useMemo, useState } from 'react';
import { ScentCard } from '@/components/ember/ScentCard';
import { MomentFilter, MomentFilterValue } from '@/components/ember/MomentFilter';
import { FormatStrip } from '@/components/ember/FormatStrip';
import { Reveal } from '@/components/Reveal';
import { getEmberProducts } from '@/lib/ember';

const EYEBROW = 'font-mono text-[10.5px] uppercase tracking-[0.22em]';

/** The Ember PLP — design-system.md §2.18–2.20, §6. */
export default function RitualCollectionPage() {
  const [moment, setMoment] = useState<MomentFilterValue>('all');
  const entries = getEmberProducts();

  const filtered = useMemo(
    () => (moment === 'all' ? entries : entries.filter((e) => e.moment === moment)),
    [entries, moment]
  );

  return (
    <div className="bg-khadi">
      {/* Header band */}
      <section className="px-6 pb-10 pt-16 text-center md:pt-24">
        <p className={`${EYEBROW} text-madder`}>House II · The Ember</p>
        <h1 className="mt-4 text-h1 font-serif text-kohl">The Ritual Collection</h1>
        <p className="mx-auto mt-5 max-w-xl font-serif text-essence italic text-kohl-soft">
          Six hours of the day, each kept by a different smoke — rolled by hand at the
          Fable&rsquo;s dhoopshala in Meerut.
        </p>
      </section>

      {/* MomentFilter + grid */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <div className="mb-12">
          <MomentFilter value={moment} onChange={setMoment} />
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <Reveal key={entry.handle}>
              <ScentCard entry={entry} />
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-16 text-center font-serif text-2xl italic text-kohl-soft">
            No smoke keeps this hour yet.
          </p>
        )}
      </section>

      {/* SignatureLine — the page's single aphorism (§2.9) */}
      <section className="bg-khadi-deep px-6 py-16 md:py-20">
        <p className="mx-auto max-w-2xl text-center font-serif text-2xl italic leading-relaxed text-kohl md:text-3xl">
          A candle scents a room. A stick of dhoop{' '}
          <span className="font-medium not-italic text-madder">keeps the hour</span>.
        </p>
      </section>

      {/* FormatStrip */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <FormatStrip />
      </section>
    </div>
  );
}
