/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand navy — matches the #041534 used across page surfaces
        indigo: {
          900: '#0C244C',
          950: '#041534',
        },
        gold: {
          300: '#E3C878',
          400: '#D4AF37',
          500: '#C6A15B',
          600: '#A98734',
        },
        ivory: '#F5F0EA',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.25em',
      },
    },
  },
  plugins: [],
}
