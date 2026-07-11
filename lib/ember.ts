// House II · The Ember — the fragrance line (docs/design-system.md §3.3).
// TIF names only. Provenance is Meerut ("the Fable's dhoopshala"); the
// supplier's trade name is never rendered anywhere consumer-facing.
// Bracketed values await the brand book (docs §7).

import type { ShopifyProduct } from './shopify';

export type EmberMoment = 'dawn' | 'day' | 'dusk' | 'night';
export type EmberForm = 'dry_stick' | 'cone' | 'wet_dhoop';
export type EmberMovementLabel = 'First smoke' | 'The heart' | 'What lingers';

export interface EmberMovement {
  label: EmberMovementLabel;
  name: string;
  vernacular: string;
  desc: string;
  minute: number;
}

export interface EmberBurn {
  /** Verified atelier fact: ~35–40 minutes per stick. */
  minutes: number;
  smoke: 'low';
  /** Sticks or cones per coffret. */
  count: number;
}

export interface EmberProvenance {
  atelier: string;
  maker: string;
  method: string;
  days: string;
  base: string;
  batch: string;
}

export interface EmberEntry {
  handle: string;
  name: string;
  moment: EmberMoment;
  form: EmberForm;
  /** Italic sub-line, e.g. "rose held in guggul smoke". */
  notes: string;
  /** One-sentence breath paragraph in the Keeper voice. */
  essence: string;
  /** INR base price — illustrative only, see note below. */
  priceINR: number;
  flagship?: boolean;
  movements: EmberMovement[];
  burn: EmberBurn;
  provenance: EmberProvenance;
}

export const MOMENT_LABELS: Record<EmberMoment, string> = {
  dawn: 'Dawn',
  day: 'Day',
  dusk: 'Dusk',
  night: 'Night',
};

export const FORM_LABELS: Record<EmberForm, string> = {
  dry_stick: 'Dry stick',
  cone: 'Cone',
  wet_dhoop: 'Wet dhoop',
};

export const FORM_UNITS: Record<EmberForm, string> = {
  dry_stick: 'sticks',
  cone: 'cones',
  wet_dhoop: 'pieces',
};

const ATELIER = 'The dhoopshala · Meerut, Uttar Pradesh';
const MAKER = '[The master blender — record pending]';
const METHOD = 'Hand-rolled, bambooless, sun-cured';
const CURE = '[cure record pending]';

// NOTE: all priceINR figures below are ILLUSTRATIVE coffret prices
// (₹1,450–2,450 band, Dusk highest) pending the format & price
// architecture decision (docs §7.2).
const EMBER_LINE: EmberEntry[] = [
  {
    handle: 'ember-dawn',
    name: 'Dawn',
    moment: 'dawn',
    form: 'dry_stick',
    notes: 'sandalwood woken in guggul smoke',
    essence:
      'Lit before the house stirs, Dawn is sandalwood at its coolest — a pale, milky wood that opens the first hour slowly and asks nothing of it.',
    priceINR: 1650,
    movements: [
      {
        label: 'First smoke',
        name: 'Cool sandal',
        vernacular: 'chandan',
        desc: 'Sandalwood — chandan — struck cold and clean, nearer the sawyer’s bench than the perfumer’s table.',
        minute: 0,
      },
      {
        label: 'The heart',
        name: 'Milk & resin',
        vernacular: 'guggul',
        desc: 'The guggul base — a bitter tree resin — warms through and rounds the wood into something almost creamy.',
        minute: 12,
      },
      {
        label: 'What lingers',
        name: 'Warm ash',
        vernacular: 'rakh',
        desc: 'What stays is rakh — the ash note — dry, faintly sweet, the smell of a room that has been sat in early.',
        minute: 30,
      },
    ],
    burn: { minutes: 38, smoke: 'low', count: 40 },
    provenance: {
      atelier: ATELIER,
      maker: MAKER,
      method: METHOD,
      days: CURE,
      base: 'Guggul resin & sandalwood',
      batch: 'TIF-DH-DWN-01/2026',
    },
  },
  {
    handle: 'ember-threshold',
    name: 'Threshold',
    moment: 'day',
    form: 'dry_stick',
    notes: 'loban and guggul, burned side by side',
    essence:
      'Threshold is the working day’s incense — loban, the benzoin resin of doorways and shop-fronts, held steady by guggul so the smoke stays low and the mind stays at its desk.',
    priceINR: 1450,
    movements: [
      {
        label: 'First smoke',
        name: 'Struck resin',
        vernacular: 'loban',
        desc: 'Loban — benzoin resin — opens sharp and bright, the note that has marked Indian thresholds for generations.',
        minute: 0,
      },
      {
        label: 'The heart',
        name: 'Two resins',
        vernacular: 'guggul',
        desc: 'Guggul comes up beneath it, bitter against loban’s sweetness, and the two settle into a level, unhurried middle.',
        minute: 12,
      },
      {
        label: 'What lingers',
        name: 'Clean smoke',
        vernacular: 'dhuan',
        desc: 'The close is dhuan itself — smoke as a note — papery and dry, gone almost as soon as the door opens.',
        minute: 30,
      },
    ],
    burn: { minutes: 38, smoke: 'low', count: 40 },
    provenance: {
      atelier: ATELIER,
      maker: MAKER,
      method: METHOD,
      days: CURE,
      base: 'Guggul & loban resins',
      batch: 'TIF-DH-THR-01/2026',
    },
  },
  {
    handle: 'ember-monsoon',
    name: 'Monsoon',
    moment: 'day',
    form: 'dry_stick',
    notes: 'mogra against wet-earth resin',
    essence:
      'Monsoon carries mogra — the small Indian jasmine — over a damp resin base, the way the flower actually arrives: on rain-cooled air, through an open window, mid-afternoon.',
    priceINR: 1550,
    movements: [
      {
        label: 'First smoke',
        name: 'The flower, whole',
        vernacular: 'mogra',
        desc: 'Mogra — jasmine sambac — comes first and undiluted, greener and less sugared than its French cousins.',
        minute: 0,
      },
      {
        label: 'The heart',
        name: 'Rain on earth',
        vernacular: 'gili mitti',
        desc: 'Beneath it the guggul turns humid — gili mitti, the wet-earth note — as if the first shower has just crossed the courtyard.',
        minute: 12,
      },
      {
        label: 'What lingers',
        name: 'Green stem',
        vernacular: 'kali',
        desc: 'It closes on the kali — the unopened bud — a green, stemmy trace that outlasts the flower itself.',
        minute: 30,
      },
    ],
    burn: { minutes: 38, smoke: 'low', count: 40 },
    provenance: {
      atelier: ATELIER,
      maker: MAKER,
      method: METHOD,
      days: CURE,
      base: 'Guggul resin & mogra',
      batch: 'TIF-DH-MON-01/2026',
    },
  },
  {
    // Flagship — leads the line and the prerender list (docs §6).
    handle: 'ember-dusk',
    name: 'Dusk',
    moment: 'dusk',
    form: 'dry_stick',
    notes: 'rose held in guggul smoke',
    essence:
      'Dusk is the house’s flagship hour — deep Indian rose folded into bitter guggul resin, so the flower arrives the way it does at day’s end: darkened, quieter, a little smoky.',
    priceINR: 2450,
    flagship: true,
    movements: [
      {
        label: 'First smoke',
        name: 'Rose, opened',
        vernacular: 'gulab',
        desc: 'Gulab — the rose — up front and unsweetened, closer to petals crushed in the hand than to rosewater.',
        minute: 0,
      },
      {
        label: 'The heart',
        name: 'The resin turn',
        vernacular: 'guggul',
        desc: 'Guggul rises through the flower, bitter and balsamic, and holds it there — rose kept in smoke rather than in sugar.',
        minute: 12,
      },
      {
        label: 'What lingers',
        name: 'Embered rose',
        vernacular: 'angara',
        desc: 'What lingers is the angara — the ember note — a dark, dried-rose warmth that stays in cloth long after the stick is out.',
        minute: 30,
      },
    ],
    burn: { minutes: 38, smoke: 'low', count: 40 },
    provenance: {
      atelier: ATELIER,
      maker: MAKER,
      method: METHOD,
      days: CURE,
      base: 'Guggul resin & rose',
      batch: 'TIF-DH-DSK-01/2026',
    },
  },
  {
    handle: 'ember-vigil',
    name: 'Vigil',
    moment: 'night',
    form: 'wet_dhoop',
    notes: 'oudh deepened with kesar',
    essence:
      'Vigil is kneaded, not rolled — a wet dhoop of oudh and kesar, saffron, made for the hours when the house is dark and one lamp is still on.',
    priceINR: 2250,
    movements: [
      {
        label: 'First smoke',
        name: 'Dark wood',
        vernacular: 'oudh',
        desc: 'Oudh — agarwood — opens low and resinous, more shadow than perfume, slow to take the flame as wet dhoop is.',
        minute: 0,
      },
      {
        label: 'The heart',
        name: 'Saffron warmth',
        vernacular: 'kesar',
        desc: 'Kesar — saffron — comes through as warmth rather than spice, a leathery amber against the dark of the wood.',
        minute: 12,
      },
      {
        label: 'What lingers',
        name: 'The long watch',
        vernacular: 'raat',
        desc: 'The finish is raat — the night itself — deep, still and unhurried; the wet form yields the fullest hour of the line.',
        minute: 32,
      },
    ],
    burn: { minutes: 40, smoke: 'low', count: 24 },
    provenance: {
      atelier: ATELIER,
      maker: MAKER,
      method: METHOD,
      days: CURE,
      base: 'Guggul resin, oudh & kesar',
      batch: 'TIF-DH-VGL-01/2026',
    },
  },
  {
    handle: 'ember-raatrani',
    name: 'Raatrani',
    moment: 'night',
    form: 'cone',
    notes: 'night-blooming jasmine, seated in a cone',
    essence:
      'Raatrani takes its name from the flower that refuses daylight — the night-queen jasmine — pressed into cones that open fast and fill a bedroom before the lamp goes out.',
    priceINR: 1750,
    movements: [
      {
        label: 'First smoke',
        name: 'The night-queen',
        vernacular: 'raatrani',
        desc: 'Raatrani — the night-blooming jasmine — arrives all at once, heady and cool, exactly as the living flower does after sundown.',
        minute: 0,
      },
      {
        label: 'The heart',
        name: 'White warmth',
        vernacular: 'chameli',
        desc: 'The chameli sweetness — jasmine’s broader family note — settles and softens as the cone reaches its full ember.',
        minute: 10,
      },
      {
        label: 'What lingers',
        name: 'Cooling flower',
        vernacular: 'os',
        desc: 'It ends on os — the dew note — the flower cooling into green quiet as the cone burns down to its seat.',
        minute: 25,
      },
    ],
    burn: { minutes: 35, smoke: 'low', count: 24 },
    provenance: {
      atelier: ATELIER,
      maker: MAKER,
      method: METHOD,
      days: CURE,
      base: 'Guggul resin & raatrani',
      batch: 'TIF-DH-RAT-01/2026',
    },
  },
];

export function getEmberProducts(): EmberEntry[] {
  return EMBER_LINE;
}

export function getEmberByHandle(handle: string): EmberEntry | undefined {
  const h = handle.toLowerCase();
  return EMBER_LINE.find((entry) => entry.handle === h);
}

export function isEmberHandle(handle: string): boolean {
  return handle.toLowerCase().startsWith('ember-');
}

/** Map an Ember entry onto the ShopifyProduct shape the catalog consumes. */
export function toShopifyProduct(entry: EmberEntry): ShopifyProduct {
  const unit = FORM_UNITS[entry.form];
  return {
    id: `tif-${entry.handle}`,
    title: `${entry.name} · Ritual Dhoop`,
    handle: entry.handle,
    descriptionHtml: `<p>${entry.essence}</p>`,
    vendor: 'The Indigo Fable',
    variants: [
      {
        id: `tif-variant-${entry.handle}`,
        title: `Coffret · ${entry.burn.count} ${unit}`,
        price: String(entry.priceINR),
      },
    ],
    // No imagery yet — existing packshots are prohibited on all TIF surfaces
    // (docs §5), so tiles render a plain ground until the Ember shoot lands.
    images: [],
    scent_profile: entry.notes,
    burn_time: `~${entry.burn.minutes} minutes per ${unit.replace(/s$/, '')}`,
    tags: [`fragrance-type:${entry.form}`, 'house:ember', `moment:${entry.moment}`],
  };
}
