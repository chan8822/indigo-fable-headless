import React from 'react';

// ProvenancePassport — THE signature component (design-system.md §2.12).
// Double-hairline frame, header row + circular seal, up to 8-cell grid
// (mono key / value / italic vernacular), footer batch code + keeper line.
// Renders identically for Loom & Ember; only the fields differ.

export interface PassportField {
  key: string;
  value: string;
  vernacular?: string;
}

export interface ProvenancePassportProps {
  title: string;
  fields: PassportField[];
  batch: string;
  tone?: 'light' | 'dark';
}

export function ProvenancePassport({
  title,
  fields,
  batch,
  tone = 'light',
}: ProvenancePassportProps) {
  const dark = tone === 'dark';

  // Hairlines: khari on dark, kohl/20 on light (§1.1 — gold never fills).
  const hairline = dark ? 'border-khari/40' : 'border-kohl/20';
  const ground = dark ? 'bg-indigo-card' : 'bg-khadi-deep';
  const eyebrowColor = dark ? 'text-khari' : 'text-madder';
  const titleColor = dark ? 'text-khadi' : 'text-kohl';
  const keyColor = dark ? 'text-ember' : 'text-kohl-soft';
  const valueColor = dark ? 'text-dark-body' : 'text-kohl';
  const vernacularColor = dark ? 'text-ember' : 'text-kohl-soft';
  const sealClasses = dark
    ? 'border-khari/60 text-khari'
    : 'border-kohl/30 text-kohl';

  const cells = fields.slice(0, 8);

  return (
    <section
      aria-label={`Provenance passport — ${title}`}
      className={`${ground} border ${hairline} p-1`}
    >
      {/* Inner hairline ring, offset 4px from the outer border */}
      <div className={`border ${hairline}`}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 px-5 py-5">
          <div className="min-w-0">
            <p
              className={`font-mono text-[10.5px] uppercase tracking-[0.22em] ${eyebrowColor}`}
            >
              Provenance Passport
            </p>
            <h3 className={`mt-1.5 font-serif text-lg leading-snug ${titleColor}`}>
              {title}
            </h3>
          </div>
          <span
            aria-hidden="true"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${sealClasses} font-serif text-sm italic`}
          >
            IF
          </span>
        </div>

        {/* Body grid — up to 8 cells, 2 cols × up to 4 rows */}
        <dl className="grid grid-cols-2">
          {cells.map((field, i) => (
            <div
              key={field.key}
              className={`border-t px-5 py-4 ${hairline} ${
                i % 2 === 0 ? `border-r` : ''
              }`}
            >
              <dt
                className={`font-mono text-[10px] uppercase tracking-[0.22em] ${keyColor}`}
              >
                {field.key}
              </dt>
              <dd className={`mt-1 font-sans text-sm leading-snug ${valueColor}`}>
                {field.value}
                {field.vernacular && (
                  <span
                    className={`mt-0.5 block font-serif text-[13px] italic ${vernacularColor}`}
                  >
                    {field.vernacular}
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        {/* Footer row */}
        <div
          className={`flex items-center justify-between gap-4 border-t px-5 py-3.5 ${hairline}`}
        >
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.18em] ${keyColor}`}
          >
            {batch}
          </span>
          <span className={`font-serif text-[13px] italic ${titleColor}`}>
            Kept by the Fable
          </span>
        </div>
      </div>
    </section>
  );
}
