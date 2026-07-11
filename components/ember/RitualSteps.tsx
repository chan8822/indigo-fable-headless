import React from 'react';

/** RitualSteps — 4-step lowercase-roman grid (design-system.md §2.17). */
const STEPS = [
  {
    numeral: 'i',
    name: 'Stand it upright',
    body: 'Seat it in its tray, clear of drafts and paper.',
  },
  {
    numeral: 'ii',
    name: 'Light the tip',
    body: 'Hold the flame to the tip until it takes and glows.',
  },
  {
    numeral: 'iii',
    name: 'Blow out the flame',
    body: 'The flame is not the point. The ember is.',
  },
  {
    numeral: 'iv',
    name: 'Let it keep the hour',
    body: 'Set it down and let the room fill on its own time.',
  },
];

export function RitualSteps() {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((step) => (
        <li key={step.numeral} className="border-t border-kohl/20 pt-5">
          <p className="font-serif text-2xl italic text-madder" aria-hidden="true">
            {step.numeral}.
          </p>
          <h3 className="mt-2 font-serif text-lg text-kohl">{step.name}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-kohl-soft">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
