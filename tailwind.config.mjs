/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF7F2',
          50: '#FDFCFB',
          100: '#FAF7F2',
          200: '#F3ECE2',
          300: '#E6DAC8',
        },
        champagne: {
          DEFAULT: '#EFE7DA',
          light: '#F7F3EC',
          dark: '#DFD2BE',
        },
        gold: {
          DEFAULT: '#B5945B',
          light: '#D4BC91',
          dark: '#8F713E',
          muted: '#C8B289',
        },
        sage: {
          DEFAULT: '#6B7B65',
          light: '#EAEEE8',
          muted: '#94A38E',
          dark: '#4A5745',
        },
        charcoal: {
          DEFAULT: '#221F1D',
          light: '#45403B',
          muted: '#6E675F',
        },
      },
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', ' Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        editorial: '0 20px 50px -12px rgba(34, 31, 29, 0.08)',
        'editorial-lg': '0 28px 65px -15px rgba(34, 31, 29, 0.14)',
        gold: '0 10px 30px -5px rgba(181, 148, 91, 0.25)',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
      },
      animation: {
        'float-slow': 'floatSlow 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};


