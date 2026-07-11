import React from 'react';

/** FormatStrip — dry stick / cone / wet dhoop explainer trio (design-system.md §2.20). */
const FORMATS = [
  {
    numeral: 'i',
    name: 'The dry stick',
    body:
      'The long form. Rolled by hand around nothing at all — no bamboo core, no charcoal — so the only thing burning is the blend itself. One stick keeps a low-smoke hour of some thirty-five to forty minutes.',
  },
  {
    numeral: 'ii',
    name: 'The cone',
    body:
      'The seated form. The same blend pressed dense enough to stand on its own — a shorter, fuller breath, lit for a threshold moment rather than a kept hour.',
  },
  {
    numeral: 'iii',
    name: 'Wet dhoop',
    body:
      'The oldest form. Resin and oil kneaded soft instead of dried — slow to take the flame, and the deepest of the three once it does.',
  },
];

export function FormatStrip() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {FORMATS.map((format) => (
        <div key={format.numeral} className="border-t border-kohl/20 pt-5">
          <p className="font-serif text-2xl italic text-madder" aria-hidden="true">
            {format.numeral}.
          </p>
          <h3 className="mt-2 font-serif text-xl text-kohl">{format.name}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-kohl-soft">{format.body}</p>
        </div>
      ))}
    </div>
  );
}
