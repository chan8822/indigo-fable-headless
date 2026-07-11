'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRegion } from '@/context/RegionContext';
import { OrderLookup } from '@/components/OrderLookup';
import { ProductTile } from '@/components/ProductTile';
import { Reveal } from '@/components/Reveal';
import type { ShopifyProduct } from '@/lib/shopify';

const HERO_IMAGE = 'https://cdn.shopify.com/s/files/1/0961/5497/6620/files/IMGL1908.jpg?v=1773771865';

const BANNER_BEDDING_IMAGE = 'https://cdn.shopify.com/s/files/1/0961/5497/6620/files/indigo-quilt-lifestyle-shot-4.png?v=1770447036';

const BANNER_RITUAL_IMAGE = 'https://cdn.shopify.com/s/files/1/0961/5497/6620/files/IMGL1877.jpg?v=1773771866';

const STORY_IMAGE =
  'https://cdn.shopify.com/s/files/1/0961/5497/6620/files/hanging-jaipuri-quilt-with-natural-lighting-and-wrinkles.png?v=1769581736';

/* Canonical eyebrow — design-system.md §1.2 (mono-micro, uppercase). */
const EYEBROW = 'font-mono text-[10.5px] uppercase tracking-[0.22em]';

/* Keyword filters — kept in lockstep with /collections/[handle] */
const isQuilt = (p: ShopifyProduct) =>
  /quilt|razai|rajai/.test(p.handle) || p.title.toLowerCase().includes('quilt');
const isSheet = (p: ShopifyProduct) =>
  p.handle.includes('sheet') || p.title.toLowerCase().includes('sheet');
const isRobe = (p: ShopifyProduct) =>
  p.handle.includes('robe') || p.title.toLowerCase().includes('robe');
/* Defensive: matches legacy handles/tags AND the Ember house's renamed
   `ember-*` handles / `house:ember` tags while migration is in flight. */
const isFragrance = (p: ShopifyProduct) => {
  const handle = p.handle.toLowerCase();
  const tags = p.tags ?? [];
  return (
    handle.includes('incense') ||
    handle.includes('dhoop') ||
    handle.startsWith('ember-') ||
    tags.some(
      (t) => t.includes('fragrance-type') || t.toLowerCase().startsWith('house:ember')
    )
  );
};
const isBeddingSet = (p: ShopifyProduct) => /bedding|set/.test(p.title.toLowerCase());

const CATEGORY_DEFS: {
  name: string;
  href: string;
  match: (p: ShopifyProduct) => boolean;
}[] = [
  { name: 'Quilts', href: '/collections/quilts', match: isQuilt },
  { name: 'Bedding Sets', href: '/collections/bedding-sets', match: isBeddingSet },
  { name: 'Fine Linens', href: '/collections/sheets', match: isSheet },
  { name: 'Robes', href: '/collections/robes', match: isRobe },
  { name: 'Home Fragrance', href: '/collections/fragrances', match: isFragrance },
];

const TABS = [
  { key: 'best', label: 'Best Sellers' },
  { key: 'new', label: 'New Arrivals' },
  { key: 'aromatics', label: 'Aromatics' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

const HOUSES = [
  {
    numeral: 'I',
    eyebrow: 'House I · Jaipur',
    name: 'The Loom',
    line: 'Cloth cut for the long keeping — printed once, handed down for a generation.',
    href: '/collections/quilts',
  },
  {
    numeral: 'II',
    eyebrow: 'House II · Meerut',
    name: 'The Ember',
    line: 'An hour kept in smoke — one hand-rolled stick, lit, blown out, and let to finish.',
    href: '/collections/ritual',
  },
];

/* Light-band section header — madder eyebrow + serif H2 (§2.8). */
function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12 md:mb-16 text-center space-y-3">
      <p className={`${EYEBROW} text-madder`}>{eyebrow}</p>
      <h2 className="text-h2 font-serif text-kohl">{title}</h2>
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('best');
  const { region, formatAmount, freeShippingThreshold } = useRegion();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () =>
      CATEGORY_DEFS.map((def) => {
        const matches = products.filter(def.match);
        return {
          name: def.name,
          href: def.href,
          count: matches.length,
          image: matches[0]?.images[0]?.src || '',
        };
      }),
    [products]
  );

  const tabProducts = useMemo(() => {
    if (activeTab === 'new') return [...products].slice(-8).reverse();
    if (activeTab === 'aromatics') return products.filter(isFragrance).slice(0, 8);
    return products.slice(0, 8);
  }, [activeTab, products]);

  const trustItems = [
    `Complimentary shipping over ${formatAmount(freeShippingThreshold)}`,
    'Hand-block printed in Jaipur · Hand-rolled in Meerut',
    region.code === 'in'
      ? 'UPI, cards & COD — pan-India 3–4 days'
      : 'Cards, PayPal & Shop Pay — duties settled at checkout',
  ];

  return (
    <div className="bg-khadi">
      {/* 1. HeroThesis — §2.6 */}
      <section className="relative flex h-[85vh] w-full flex-col justify-end overflow-hidden bg-indigo-deep px-6 pb-16 md:px-16">
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep via-indigo-deep/40 to-transparent" />
        </div>
        <Reveal className="relative z-10 max-w-3xl space-y-6">
          <p className={`${EYEBROW} text-khari`}>Houses of the Craft · India</p>
          <h1 className="text-h1 font-serif text-khadi">
            Every object here leaves with its record intact.
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-dark-body md:text-lg">
            The Fable keeps two houses — a printing atelier in Jaipur, a dhoopshala in
            Meerut. Each piece is entered in the ledger as it is made: the maker, the
            method, the batch, the days it took.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href="/collections/quilts"
              className={`${EYEBROW} rounded-full bg-khadi px-7 py-3.5 text-kohl transition-colors hover:bg-khadi-deep touch-manipulation`}
            >
              Enter House I · The Loom
            </a>
            <a
              href="/collections/ritual"
              className={`${EYEBROW} rounded-full border border-khadi/60 px-7 py-3.5 text-khadi transition-colors hover:border-khadi hover:bg-khadi/10 touch-manipulation`}
            >
              Enter House II · The Ember
            </a>
          </div>
        </Reveal>
      </section>

      {/* 2. TwoHouses — §2.7 (permitted hero→houses dark→dark exception) */}
      <section className="bg-indigo-deep">
        <div className="grid md:grid-cols-2">
          {HOUSES.map((house, i) => (
            <Reveal key={house.numeral}>
              <a
                href={house.href}
                className={`group relative flex min-h-[420px] flex-col justify-end overflow-hidden p-10 transition-colors duration-500 ease-fable hover:bg-indigo-card md:p-14 touch-manipulation ${
                  i === 1 ? 'border-t border-indigo-edge md:border-l md:border-t-0' : ''
                }`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-8 right-8 select-none font-serif text-[180px] leading-none text-khadi opacity-10"
                >
                  {house.numeral}
                </span>
                <div className="relative space-y-4">
                  <p className={`${EYEBROW} text-khari`}>{house.eyebrow}</p>
                  <h2 className="text-h2 font-serif text-khadi">{house.name}</h2>
                  <p className="max-w-md font-serif text-essence italic text-dark-body">
                    {house.line}
                  </p>
                  <span
                    className={`${EYEBROW} inline-flex w-fit items-center gap-2 border-b border-khari/50 pb-1 text-ember transition-colors group-hover:text-khadi`}
                  >
                    Enter the house
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. CategoryRing — §2.8, light band */}
      <section className="bg-khadi px-6 py-16 md:py-24">
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Across Both Houses" title="The Disciplines" />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={cat.href}
                className="group block text-center touch-manipulation"
              >
                <div className="relative aspect-square overflow-hidden rounded-full border border-kohl/15 bg-khadi-deep transition-colors group-hover:border-madder">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-fable group-hover:scale-[1.05]"
                    />
                  ) : (
                    <div className="h-full w-full bg-khadi-deep" />
                  )}
                </div>
                <h3 className="mt-5 font-serif text-lg text-kohl transition-colors group-hover:text-madder md:text-xl">
                  {cat.name}
                </h3>
                {cat.count > 0 && (
                  <p className={`${EYEBROW} mt-1 text-kohl-soft`}>
                    {cat.count} {cat.count === 1 ? 'piece' : 'pieces'}
                  </p>
                )}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 4. SignatureLine — §2.9, the page's one aphorism */}
      <section className="bg-khadi px-6 pb-16 md:pb-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-[clamp(22px,2.6vw,32px)] italic leading-snug text-kohl">
            The dye will soften and the smoke will clear —{' '}
            <strong className="font-semibold text-madder">the record remains</strong>.
          </p>
        </Reveal>
      </section>

      {/* 5. From the Houses — featured tabs, light band */}
      <section className="bg-khadi px-6 py-16 md:py-24">
        <Reveal className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="From the Houses" title="The Edit" />
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`${EYEBROW} min-h-10 rounded-full px-6 py-2.5 transition-colors touch-manipulation ${
                  activeTab === tab.key
                    ? 'bg-kohl text-khadi'
                    : 'border border-kohl/20 text-kohl-soft hover:text-kohl'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-madder border-t-transparent" />
              <p className="text-sm text-kohl-soft">Unfolding the edit…</p>
            </div>
          ) : tabProducts.length === 0 ? (
            <p className="py-12 text-center text-sm text-kohl-soft">
              The houses are still preparing this edit — return shortly.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
              {tabProducts.map((product) => (
                <ProductTile key={product.id} product={product} />
              ))}
            </div>
          )}
        </Reveal>
      </section>

      {/* 6. Split promo banners — khadi-deep copy plates */}
      <section className="bg-khadi px-6 pb-16 md:pb-24">
        <Reveal className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
          <a
            href="/collections/quilts"
            className="group block overflow-hidden rounded-xl border border-kohl/10 bg-khadi-deep touch-manipulation"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={BANNER_BEDDING_IMAGE}
                alt="Hand-block printed quilts layered on a bed"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-fable group-hover:scale-[1.05]"
              />
            </div>
            <div className="space-y-3 p-6 md:p-8">
              <p className={`${EYEBROW} text-madder`}>House I · Jaipur</p>
              <p className="font-serif text-xl leading-snug text-kohl md:text-2xl">
                A winter razai is weighed before it is named — carded cotton,
                tagai-stitched, heavy enough to hold a Jaipur January.
              </p>
              <span
                className={`${EYEBROW} inline-flex items-center gap-2 border-b border-madder/50 pb-1 text-madder`}
              >
                Discover
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </span>
            </div>
          </a>

          <a
            href="/collections/fragrances"
            className="group block overflow-hidden rounded-xl border border-kohl/10 bg-khadi-deep touch-manipulation"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={BANNER_RITUAL_IMAGE}
                alt="Dhoop stick resting on a ceramic stand"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-fable group-hover:scale-[1.05]"
              />
            </div>
            <div className="space-y-3 p-6 md:p-8">
              <p className={`${EYEBROW} text-madder`}>House II · Meerut</p>
              <p className="font-serif text-xl leading-snug text-kohl md:text-2xl">
                The hour before sleep asks for its own instrument — a single
                hand-rolled stick, and the day is closed.
              </p>
              <span
                className={`${EYEBROW} inline-flex items-center gap-2 border-b border-madder/50 pb-1 text-madder`}
              >
                Discover
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </span>
            </div>
          </a>
        </Reveal>
      </section>

      {/* 7. Trust row — khadi-deep, madder accent dots */}
      <section className="border-y border-kohl/10 bg-khadi-deep py-10">
        <Reveal className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-6 text-center md:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center justify-center gap-3">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-madder" />
              <p className={`${EYEBROW} text-kohl`}>{item}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* 8. The Record — dark story band */}
      <section className="bg-indigo-deep px-6 py-16 md:py-24">
        <Reveal className="mx-auto flex max-w-7xl flex-col items-center gap-12 md:flex-row md:gap-16">
          <div className="w-full md:w-1/2">
            <div className="aspect-video overflow-hidden rounded-xl border border-indigo-edge">
              <img
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-fable hover:scale-[1.05]"
                src={STORY_IMAGE}
                alt="Hand-block printed quilt hanging in natural light"
              />
            </div>
          </div>
          <div className="w-full space-y-5 md:w-1/2">
            <p className={`${EYEBROW} text-khari`}>The Record</p>
            <h2 className="text-h2 font-serif text-khadi">Kept by the Fable</h2>
            <p className="text-base leading-relaxed text-dark-body md:text-lg">
              In Jaipur the blocks are carved before the cloth is cut; in Meerut the
              resin cures before a single hour is rolled. Every batch that leaves
              either house is numbered, dated, and entered in the record — the object
              you keep travels with its paperwork.
            </p>
            <div className="pt-2">
              <a
                href="/houses/ember"
                className={`${EYEBROW} group inline-flex items-center gap-2 border-b border-khari/50 pb-1 text-ember transition-colors hover:text-khadi touch-manipulation`}
              >
                Read the Ember record
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 9. Order lookup — slim khadi-deep band */}
      <section className="border-t border-kohl/10 bg-khadi-deep">
        <div className="mx-auto max-w-7xl px-6">
          <OrderLookup />
        </div>
      </section>
    </div>
  );
}
