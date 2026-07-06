import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  config,
} = createStitches({
  theme: {
    colors: {
      // Primary Indigo Palette (Natural Indigo Dyes)
      indigoDeep: '#1A2332',
      indigoMidnight: '#0F1520',
      indigoAccent: '#3E506B',
      indigoLight: '#E8EDF5',

      // Accent Gold Palette (Hand-Stamped Gold Highlights)
      goldShimmer: '#D4AF37',
      goldDust: '#AA7C11',
      goldChampagne: '#F4E8C1',

      // Base Stone/Paper (Raw Organic Materials)
      pureWhite: '#FFFFFF',
      rawCotton: '#FDFBF7',
      stoneSoft: '#F4F1EA',
      stoneGray: '#76736E',
      textMain: '#222222',
    },
    fonts: {
      serif: 'Garamond, Georgia, "Times New Roman", serif',
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.75rem',
    },
    fontWeights: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
    },
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
    },
    space: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
    },
    sizes: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      maxContainer: '1200px',
    },
    radii: {
      small: '4px',
      medium: '12px',
      large: '24px',
      pill: '9999px',
    },
    shadows: {
      soft: '0 4px 20px rgba(26, 35, 50, 0.04)',
      deep: '0 12px 40px rgba(15, 21, 32, 0.08)',
      goldGlow: '0 0 15px rgba(212, 175, 55, 0.2)',
    },
    transitions: {
      smooth: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
    },
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
  },
  utils: {
    // Padding Utilities
    p: (value: any) => ({ padding: value }),
    pt: (value: any) => ({ paddingTop: value }),
    pr: (value: any) => ({ paddingRight: value }),
    pb: (value: any) => ({ paddingBottom: value }),
    pl: (value: any) => ({ paddingLeft: value }),
    px: (value: any) => ({ paddingLeft: value, paddingRight: value }),
    py: (value: any) => ({ paddingTop: value, paddingBottom: value }),

    // Margin Utilities
    m: (value: any) => ({ margin: value }),
    mt: (value: any) => ({ marginTop: value }),
    mr: (value: any) => ({ marginRight: value }),
    mb: (value: any) => ({ marginBottom: value }),
    ml: (value: any) => ({ marginLeft: value }),
    mx: (value: any) => ({ marginLeft: value, marginRight: value }),
    my: (value: any) => ({ marginTop: value, marginBottom: value }),

    // Layout & Sizing Utilities
    size: (value: any) => ({ width: value, height: value }),
    bg: (value: any) => ({ backgroundColor: value }),
    
    flexCenter: (value?: any) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: value || 'row',
    }),
  },
});
