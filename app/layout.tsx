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

          <footer className="bg-indigo-950 text-stone-400 py-16 border-t border-gold-500/20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
              <div>
                <h3 className="text-lg font-serif text-gold-400 uppercase tracking-wider mb-4">The Indigo Fable</h3>
                <p className="text-sm leading-relaxed text-stone-300">
                  Crafting luxury artisanal textiles and organic home comforts that celebrate timeless heritage and meticulous hand-stitching.
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-4">Collections</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/collections/quilts" className="hover:text-gold-400 transition">Organic Cotton Quilts</a></li>
                  <li><a href="/collections/sheets" className="hover:text-gold-400 transition">Fine Bed Sheets</a></li>
                  <li><a href="/collections/fragrances" className="hover:text-gold-400 transition">Home Fragrances</a></li>
                  <li><a href="/bundles" className="hover:text-gold-400 transition">Sensory Sanctuary Bundles</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-stone-200 font-semibold mb-4">Customer Care</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/policies/shipping-policy" className="hover:text-gold-400 transition">Shipping & Delivery</a></li>
                  <li><a href="/policies/refund-policy" className="hover:text-gold-400 transition">Refunds & Returns</a></li>
                  <li><a href="/policies/privacy-policy" className="hover:text-gold-400 transition">Privacy Policy</a></li>
                  <li><a href="/policies/terms-of-service" className="hover:text-gold-400 transition">Terms of Service</a></li>
                  <li><a href="/policies/contact-information" className="hover:text-gold-400 transition">Contact Concierge</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-stone-200 font-semibold mb-4">Newsletter</h4>
                <p className="text-xs text-stone-300 mb-4">Join our inner circle for private releases and bespoke textile drops.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-indigo-900/50 border border-gold-500/30 px-3 py-2 text-sm text-stone-100 placeholder-stone-400 rounded-l-md focus:outline-none focus:border-gold-400 w-full"
                  />
                  <button className="bg-gold-500 hover:bg-gold-400 text-indigo-950 font-medium px-4 py-2 text-sm rounded-r-md transition">
                    Join
                  </button>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-indigo-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-stone-500">
                © {new Date().getFullYear()} The Indigo Fable. Headless Storefront powered by Shopify & Next.js.
              </p>
              <RegionPaymentBadges tone="dark" />
            </div>
          </footer>
        </CartProvider>
        </RegionProvider>
      </body>
    </html>
  );
}
