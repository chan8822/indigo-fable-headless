import './globals.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { CartProvider } from '@/context/CartContext';
import { RegionProvider } from '@/context/RegionContext';
import { CartDrawer } from '@/components/CartDrawer';
import { NavBagButton } from '@/components/NavBagButton';
import { RegionSwitcher, RegionPaymentBadges, RegionShippingNote } from '@/components/RegionSwitcher';
import { DEFAULT_REGION, REGION_COOKIE, REGION_HEADER, REGIONS, parseRegion } from '@/lib/region';

export const metadata: Metadata = {
  title: 'The Indigo Fable | Artisanal Hand-Stitched Quilts & Living',
  description: 'Heirloom-quality tagai stitching, organic cotton fills, and signature Khadi prints with gold-dust highlights.',
  alternates: {
    languages: {
      'en-IN': `https://${REGIONS.in.domain}`,
      'en-CA': `https://${REGIONS.ca.domain}`,
      'en-US': `https://${REGIONS.ca.domain}`,
      'x-default': `https://${REGIONS.in.domain}`,
    },
  },
};

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
      <body className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
        <RegionProvider initialRegion={initialRegion}>
        <CartProvider>
          <div className="bg-indigo-950 text-center py-2 px-4 border-b border-gold-500/20">
            <RegionShippingNote className="text-[11px] tracking-[0.14em] uppercase text-gold-300/90 font-light" />
          </div>
          <header className="sticky top-0 z-40 bg-indigo-950/97 backdrop-blur text-stone-100 border-b border-gold-500/20">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-10">
                <a href="/" className="flex flex-col leading-none group">
                  <span className="text-[22px] font-serif font-semibold tracking-[0.18em] text-stone-50 uppercase group-hover:text-gold-300 transition-colors">
                    The Indigo Fable
                  </span>
                  <span className="text-[9px] tracking-[0.42em] uppercase text-gold-400/80 mt-1.5">
                    Jaipur · Est. Heritage Craft
                  </span>
                </a>
                <nav className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.18em] text-stone-300 font-medium">
                  <a href="/collections/quilts" className="hover:text-gold-300 transition-colors py-1 border-b border-transparent hover:border-gold-400/60">Quilts</a>
                  <a href="/collections/sheets" className="hover:text-gold-300 transition-colors py-1 border-b border-transparent hover:border-gold-400/60">Fine Linens</a>
                  <a href="/collections/fragrances" className="hover:text-gold-300 transition-colors py-1 border-b border-transparent hover:border-gold-400/60">Home Fragrance</a>
                  <a href="/bundles" className="text-gold-400 hover:text-gold-300 transition-colors py-1 border-b border-transparent hover:border-gold-400/60">Sensory Sanctuary</a>
                </nav>
              </div>
              <div className="flex items-center gap-3 md:gap-5">
                <RegionSwitcher />
                <NavBagButton />
              </div>
            </div>
          </header>

          <CartDrawer />

          <main className="flex-grow">
            {children}
          </main>

          <footer className="bg-indigo-950 text-stone-300 border-t border-gold-500/20">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div>
                <a href="/" className="inline-block touch-manipulation">
                  <span className="text-xl font-serif font-semibold tracking-[0.18em] uppercase text-stone-50">
                    The Indigo Fable
                  </span>
                </a>
                <p className="mt-5 text-sm font-light leading-relaxed text-stone-400">
                  Hand-block prints and tagai-quilted layers from Jaipur ateliers,
                  finished with botanical incense for slow, storied living.
                </p>
                <div className="mt-6">
                  <RegionPaymentBadges tone="dark" />
                </div>
              </div>
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold mb-5">Shop</h4>
                <ul className="space-y-3">
                  <li><a href="/collections/quilts" className="text-sm font-light hover:text-gold-300 transition-colors touch-manipulation">Heirloom Quilts</a></li>
                  <li><a href="/collections/sheets" className="text-sm font-light hover:text-gold-300 transition-colors touch-manipulation">Fine Linens</a></li>
                  <li><a href="/collections/robes" className="text-sm font-light hover:text-gold-300 transition-colors touch-manipulation">Lounge Robes</a></li>
                  <li><a href="/collections/fragrances" className="text-sm font-light hover:text-gold-300 transition-colors touch-manipulation">Home Fragrance</a></li>
                  <li><a href="/bundles" className="text-sm font-light hover:text-gold-300 transition-colors touch-manipulation">Sensory Sanctuary</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold mb-5">Customer Care</h4>
                <ul className="space-y-3">
                  <li><a href="/policies/shipping-policy" className="text-sm font-light hover:text-gold-300 transition-colors touch-manipulation">Shipping & Delivery</a></li>
                  <li><a href="/policies/refund-policy" className="text-sm font-light hover:text-gold-300 transition-colors touch-manipulation">Refunds & Returns</a></li>
                  <li><a href="/policies/privacy-policy" className="text-sm font-light hover:text-gold-300 transition-colors touch-manipulation">Privacy Policy</a></li>
                  <li><a href="/policies/terms-of-service" className="text-sm font-light hover:text-gold-300 transition-colors touch-manipulation">Terms of Service</a></li>
                  <li><a href="/policies/contact-information" className="text-sm font-light hover:text-gold-300 transition-colors touch-manipulation">Contact Concierge</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold mb-5">Don&rsquo;t Miss a Thing</h4>
                <p className="text-sm font-light leading-relaxed text-stone-400 mb-5">
                  Be first to private releases, atelier stories, and small-batch prints.
                </p>
                <form className="rounded-full overflow-hidden flex bg-indigo-900/50 border border-gold-500/30">
                  <input
                    type="email"
                    placeholder="Your email address"
                    aria-label="Email address"
                    className="bg-transparent px-5 py-3 text-sm text-stone-100 placeholder-stone-400 focus:outline-none flex-1 min-w-0"
                  />
                  <button
                    type="submit"
                    className="bg-gold-400 hover:bg-gold-300 text-indigo-950 px-6 text-[11px] uppercase tracking-[0.18em] font-semibold transition-colors touch-manipulation"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>
            <div className="border-t border-indigo-900/60 py-6">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="text-xs text-stone-500">
                  © {new Date().getFullYear()} The Indigo Fable. All rights reserved.
                </p>
                <p className="text-xs text-stone-500">theindigofable.com · theindigofable.ca</p>
              </div>
            </div>
          </footer>
        </CartProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
