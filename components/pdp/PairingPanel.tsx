import React from 'react';
import Link from 'next/link';

// PairingPanel — cross-house cross-sell (design-system.md §2.14).
// Split panel (image | copy) on khadi-deep; madder eyebrow; ONE ghost CTA.

export interface PairingPanelProps {
  eyebrow: string;
  title: string;
  narrative: string;
  image: string;
  href: string;
  ctaLabel: string;
  savingNote?: string;
}

export function PairingPanel({
  eyebrow,
  title,
  narrative,
  image,
  href,
  ctaLabel,
  savingNote,
}: PairingPanelProps) {
  return (
    <section className="overflow-hidden rounded-2xl bg-khadi-deep">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[340px]">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-madder">
            {eyebrow}
          </p>
          <h2 className="font-serif text-2xl leading-snug text-kohl md:text-3xl">
            {title}
          </h2>
          <p className="font-sans text-[15px] leading-relaxed text-kohl-soft">
            {narrative}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Link
              href={href}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-kohl px-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-kohl transition-colors hover:bg-kohl hover:text-khadi touch-manipulation"
            >
              {ctaLabel}
            </Link>
            {savingNote && (
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-kohl-soft">
                {savingNote}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
