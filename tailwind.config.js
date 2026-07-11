/** @type {import('tailwindcss').Config} */
// Canonical tokens per docs/design-system.md §1.1 — ONE system.
// Legacy utility names (indigo-950, gold-*, ivory) are remapped onto the
// canonical values so pre-handoff surfaces render in-system during migration.
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Canonical
        'indigo-deep': '#0F1830',
        'indigo-card': '#1B2A4A',
        'indigo-edge': '#26385E',
        khadi: '#E9E3D5',
        'khadi-deep': '#DED6C4',
        kohl: '#1B1A15',
        'kohl-soft': '#524D44',
        madder: '#8E3B2E',
        khari: '#B08A3E',
        ember: '#C9BE9E',
        'dark-body': '#B9C0CF',
        // Legacy remap (migration shim — prefer canonical names in new code)
        indigo: {
          900: '#1B2A4A',
          950: '#0F1830',
        },
        gold: {
          300: '#C9BE9E',
          400: '#B08A3E',
          500: '#B08A3E',
          600: '#8E3B2E',
        },
        ivory: '#E9E3D5',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        h1: ['clamp(38px,4.4vw,58px)', { lineHeight: '1.06' }],
        h2: ['clamp(28px,3.4vw,44px)', { lineHeight: '1.12' }],
        essence: ['19px', { lineHeight: '1.5' }],
        'mono-micro': ['10.5px', { lineHeight: '1.4', letterSpacing: '0.22em' }],
      },
      transitionTimingFunction: {
        fable: 'cubic-bezier(.2,.7,.2,1)',
      },
    },
  },
  plugins: [],
}
