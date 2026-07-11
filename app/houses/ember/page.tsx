import React from 'react';
import type { Metadata } from 'next';
import { FormatStrip } from '@/components/ember/FormatStrip';

export const metadata: Metadata = {
  title: 'House II · The Ember | The Indigo Fable',
  description:
    'The Fable’s dhoopshala in Meerut — hand-rolled, bambooless dhoop on a guggul base, sun-cured and batch-numbered.',
};

const EYEBROW = 'font-mono text-[10.5px] uppercase tracking-[0.22em]';

/** House II atelier story — design-system.md §6. Verified facts only;
    bracketed entries await the brand book (§7.1). */
export default function EmberHousePage() {
  return (
    <div className="bg-khadi">
      {/* Dark hero band */}
      <section className="bg-indigo-deep px-6 py-24 text-center md:py-32">
        <p className={`${EYEBROW} text-khari`}>House II</p>
        <h1 className="mt-4 text-h1 font-serif text-khadi">The Dhoopshala</h1>
        <p className="mx-auto mt-5 max-w-xl font-serif text-essence italic text-dark-body">
          Meerut, Uttar Pradesh — where the hour is rolled by hand.
        </p>
      </section>

      {/* Light read band */}
      <section className="mx-auto max-w-2xl space-y-6 px-6 py-16 text-[15px] leading-relaxed text-kohl-soft md:py-24">
        <p>
          The Fable&rsquo;s dhoopshala works the way dhoop has always been made in
          Meerut: no bamboo core, no charcoal. Each stick is a paste of{' '}
          <em>guggul</em> — a bitter tree resin — and fragrance oils, rolled by hand
          and cured in the sun until it holds its shape.
        </p>
        <p>
          Because there is no core and no charcoal, nothing burns but the fragrance
          itself. A single stick keeps roughly thirty-five to forty minutes, with a
          smoke that stays low and close.
        </p>
        <p>
          Every batch is entered in the ledger as it is made — the blend, the cure,
          the count — and the batch code travels with the coffret. The blender&rsquo;s
          name and the founding record of the workshop will be entered here when the
          house archive is opened. [Record pending.]
        </p>
        <div className="pt-4 text-center">
          <a
            href="/collections/ritual"
            className={`${EYEBROW} inline-block rounded-full bg-kohl px-8 py-4 text-khadi transition-colors hover:bg-kohl/90 touch-manipulation`}
          >
            Enter the Ritual Collection
          </a>
        </div>
      </section>

      {/* FormatStrip on deep ground */}
      <section className="bg-khadi-deep px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <FormatStrip />
        </div>
      </section>
    </div>
  );
}
