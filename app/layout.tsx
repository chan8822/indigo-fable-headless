import './globals.css';
import '@fontsource/fraunces/400.css';
import '@fontsource/fraunces/500.css';
import '@fontsource/fraunces/600.css';
import '@fontsource/fraunces/400-italic.css';
import '@fontsource/fraunces/500-italic.css';
import '@fontsource/hanken-grotesk/400.css';
import '@fontsource/hanken-grotesk/500.css';
import '@fontsource/hanken-grotesk/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { CartProvider } from '@/context/CartContext';
import { RegionProvider } from '@/context/RegionContext';
import { CartDrawer } from '@/components/CartDrawer';
import { NavBagButton } from '@/components/NavBagButton';
import { RegionSwitcher, RegionPaymentBadges, RegionShippingNote } from '@/components/RegionSwitcher';
import { DEFAULT_REGION, REGION_COOKIE, REGION_HEADER, REGIONS, parseRegion } from '@/lib/region';

export const metadata: Metadata = {
  title: 'The Indigo Fable | Houses of the Craft · India',
  description:
    'Hand-block printed quilts and linens from the Jaipur ateliers; hand-rolled bambooless dhoop from the Fable’s dhoopshala in Meerut. Objects with their records intact.',
  alternates: {
    languages: {
      'en-IN': `https://${REGIONS.in.domain}`,
      'en-CA': `https://${REGIONS.ca.domain}`,
      'en-US': `https://${REGIONS.ca.domain}`,
      'x-default': `https://${REGIONS.in.domain}`,
    },
  },
};

const NAV_LINKS = [
  { label: 'Quilts', href: '/collections/quilts' },
  { label: 'Linens', href: '/collections/sheets' },
  { label: 'Robes', href: '/collections/robes' },
  { label: 'The Ember', href: '/collections/ritual' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialRegion =
    parseRegion(headers().get(REGION_HEADER)) ??
    parseRegion(cookies().get(REGION_COOKIE)?.value) ??
    DEFAULT_REGION;

  return (
    <html lang={REGIONS[initialRegion].hreflang}>
      <body className="min-h-screen flex flex-col">
        <RegionProvider initialRegion={initialRegion}>
        <CartProvider>
          {/* AnnounceBar — dark, mono-micro, region-aware (§2.1) */}
          <div className="bg-indigo-deep text-center py-2.5 px-4">
            <RegionShippingNote className="font-mono text-[10px] tracking-[0.22em] uppercase text-ember" />
          </div>

          {/* Nav — light sticky (§2.2) */}
          <header className="sticky top-0 z-40 bg-khadi/95 backdrop-blur border-b border-kohl/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
              <a href="/" className="flex flex-col leading-none group shrink-0">
                <span className="text-[21px] font-serif font-medium tracking-[0.14em] text-kohl uppercase">
                  The Indigo Fable
                </span>
                <span className="font-mono text-[9px] tracking-[0.34em] uppercase text-kohl-soft mt-1.5">
                  Houses of the Craft · India
                </span>
              </a>
              <nav className="hidden lg:flex gap-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-kohl-soft hover:text-kohl py-1 border-b border-transparent hover:border-madder transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center gap-3 md:gap-4">
                <RegionSwitcher />
                <NavBagButton />
              </div>
            </div>
          </header>

          <CartDrawer />

          <main className="flex-grow">
            {children}
          </main>

          {/* Footer — dark, keyed by House I / House II / Care (§2.4) */}
          <footer className="bg-indigo-deep text-dark-body">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div>
                <a href="/" className="inline-block touch-manipulation">
                  <span className="text-lg font-serif font-medium tracking-[0.14em] uppercase text-khadi">
                    The Indigo Fable
                  </span>
                </a>
                <p className="mt-5 text-sm leading-relaxed">
                  Objects brought back from named ateliers, their records intact —
                  cloth from Jaipur, smoke from Meerut.
                </p>
                <div className="mt-6">
                  <RegionPaymentBadges tone="dark" />
                </div>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-khari mb-5">House I · The Loom</h4>
                <ul className="space-y-3">
                  <li><a href="/collections/quilts" className="text-sm hover:text-khadi transition-colors touch-manipulation">Quilts</a></li>
                  <li><a href="/collections/sheets" className="text-sm hover:text-khadi transition-colors touch-manipulation">Linens</a></li>
                  <li><a href="/collections/robes" className="text-sm hover:text-khadi transition-colors touch-manipulation">Robes</a></li>
                  <li><a href="/collections/throws" className="text-sm hover:text-khadi transition-colors touch-manipulation">Kantha & Throws</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-khari mb-5">House II · The Ember</h4>
                <ul className="space-y-3">
                  <li><a href="/collections/ritual" className="text-sm hover:text-khadi transition-colors touch-manipulation">The Ritual Collection</a></li>
                  <li><a href="/houses/ember" className="text-sm hover:text-khadi transition-colors touch-manipulation">The Dhoopshala</a></li>
                  <li><a href="/bundles" className="text-sm hover:text-khadi transition-colors touch-manipulation">Pairings</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-khari mb-5">Care</h4>
                <ul className="space-y-3">
                  <li><a href="/policies/shipping-policy" className="text-sm hover:text-khadi transition-colors touch-manipulation">Shipping & Delivery</a></li>
                  <li><a href="/policies/refund-policy" className="text-sm hover:text-khadi transition-colors touch-manipulation">Returns</a></li>
                  <li><a href="/policies/privacy-policy" className="text-sm hover:text-khadi transition-colors touch-manipulation">Privacy</a></li>
                  <li><a href="/policies/terms-of-service" className="text-sm hover:text-khadi transition-colors touch-manipulation">Terms</a></li>
                  <li><a href="/policies/contact-information" className="text-sm hover:text-khadi transition-colors touch-manipulation">Contact</a></li>
                </ul>
                <form className="mt-8 rounded-full overflow-hidden flex border border-indigo-edge">
                  <input
                    type="email"
                    placeholder="Your email"
                    aria-label="Email address"
                    className="bg-transparent px-5 py-3 text-sm text-khadi placeholder-dark-body/60 focus:outline-none flex-1 min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-khadi hover:bg-khadi-deep text-kohl px-6 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors touch-manipulation"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
            <div className="border-t border-indigo-edge/60 py-6">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="font-mono text-[10px] tracking-[0.14em] text-dark-body/70 uppercase">
                  © {new Date().getFullYear()} The Indigo Fable · Kept by the Fable
                </p>
                <p className="font-mono text-[10px] tracking-[0.14em] text-dark-body/70">
                  theindigofable.com · theindigofable.ca
                </p>
              </div>
            </div>
          </footer>
        </CartProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
