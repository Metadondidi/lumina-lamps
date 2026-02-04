import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Palette luxe minimaliste
      colors: {
        // Tons principaux
        'ivory': '#FDFBF7',
        'cream': '#F8F6F1',
        'sand': '#EBE6DC',
        'stone': '#9A9590',
        'charcoal': '#2C2826',
        'ink': '#1A1816',
        // Accent subtil
        'champagne': '#D4C4A8',
        'blush': '#E8DDD4',
      },
      // Typographie élégante
      fontFamily: {
        'display': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'body': ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      // Espacements généreux
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      // Animations subtiles
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      // Tailles de texte
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'title': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'caption': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'micro': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
      },
      // Keyframes pour animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.4s ease-out forwards',
        'slide-out-right': 'slide-out-right 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
