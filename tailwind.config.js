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
        indigo: {
          900: '#1a237e',
          950: '#0d1137',
        },
        gold: {
          400: '#d4af37',
          500: '#c5a059',
        }
      }
    },
  },
  plugins: [],
}
