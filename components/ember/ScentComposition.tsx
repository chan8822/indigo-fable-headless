'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EmberEntry } from '@/lib/ember';

/**
 * ScentComposition — three time-based movements (First smoke / The heart /
 * What lingers) joined by the SmokeThread SVG (design-system.md §2.16, §1.3).
 * The single meandering path draws over 6s on view entry; app/globals.css
 * already renders `.smoke-thread path` static under prefers-reduced-motion.
 */
export function ScentComposition({
  entry,
  tone = 'dark',
}: {
  entry: EmberEntry;
  tone?: 'dark' | 'light';
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setDrawn(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dark = tone === 'dark';
  // One accent per surface: khari on dark grounds, madder on light (§1.1).
  const accentText = dark ? 'text-khari' : 'text-madder';
  const accentDot = dark ? 'bg-khari' : 'bg-madder';
  const headingText = dark ? 'text-khadi' : 'text-kohl';
  const bodyText = dark ? 'text-dark-body' : 'text-kohl-soft';

  return (
    <div ref={ref}>
      <style>{`
        .smoke-thread path { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .smoke-thread[data-drawn='true'] path {
          animation: smoke-thread-draw 6s cubic-bezier(.2,.7,.2,1) forwards;
        }
        @keyframes smoke-thread-draw { to { stroke-dashoffset: 0; } }
      `}</style>

      {/* The smoke thread — a single meandering hairline */}
      <svg
        className={`smoke-thread h-12 w-full ${accentText}`}
        data-drawn={drawn ? 'true' : undefined}
        viewBox="0 0 600 56"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 38 C 52 10, 110 52, 176 32 S 288 6, 366 34 S 500 54, 570 22 S 592 14, 598 10"
          pathLength={1}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="mt-8 grid gap-10 md:grid-cols-3">
        {entry.movements.map((movement) => (
          <div key={movement.label}>
            <div className="flex items-center gap-2.5">
              <span className={`h-1.5 w-1.5 rounded-full ${accentDot}`} aria-hidden="true" />
              <p className={`font-mono text-[10.5px] uppercase tracking-[0.22em] ${accentText}`}>
                Min {String(movement.minute).padStart(2, '0')} · {movement.label}
              </p>
            </div>
            <h3 className={`mt-3 font-serif text-2xl ${headingText}`}>
              {movement.name}{' '}
              <span className={`font-serif text-lg italic ${bodyText}`}>
                · {movement.vernacular}
              </span>
            </h3>
            <p className={`mt-2 text-[15px] leading-relaxed ${bodyText}`}>{movement.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
