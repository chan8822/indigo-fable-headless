import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/CartDrawer';
import { NavBagButton } from '@/components/NavBagButton';

export const metadata: Metadata = {
  title: 'The Indigo Fable | Artisanal Hand-Stitched Quilts & Living',
  description: 'Heirloom-quality tagai stitching, organic cotton fills, and signature Khadi prints with gold-dust highlights.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
        <CartProvider>
          <header className="sticky top-0 z-40 bg-indigo-950 text-stone-100 border-b border-gold-500/30 shadow-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <a href="/" className="text-2xl font-serif tracking-wider text-gold-400 uppercase">
                  The Indigo Fable
                </a>
                <nav className="hidden md:flex space-x-6 text-sm uppercase tracking-widest text-stone-300 font-medium">
                  <a href="/" className="hover:text-gold-400 transition">Home</a>
                  <a href="/collections/quilts" className="hover:text-gold-400 transition">Quilts</a>
                  <a href="/collections/fragrances" className="hover:text-gold-400 transition">Home Fragrances</a>
                  <a href="/bundles" className="hover:text-gold-400 transition">Sensory Bundles</a>
                </nav>
              </div>
              <div className="flex items-center space-x-6">
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
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-indigo-900/60 text-xs text-center text-stone-500">
              © {new Date().getFullYear()} The Indigo Fable. Headless Storefront powered by Shopify & Next.js.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
