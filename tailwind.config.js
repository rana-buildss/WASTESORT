/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A', // Primary green
          700: '#15803D',
          800: '#166534',
          900: '#14532D', // Dark green
          950: '#052E16',
        },
        surface: {
          light: '#F8FAF9', // App background
          card: '#FFFFFF',
          dark: '#172B24',  // Primary text/dark surfaces
        },
        waste: {
          plastic: '#0284C7',
          paper: '#D97706',
          glass: '#0D9488',
          metal: '#64748B',
          organic: '#16A34A',
          ewaste: '#7C3AED',
          battery: '#EA580C',
          hazardous: '#DC2626',
          mixed: '#6B7280',
          general: '#475569',
        },
        charcoal: '#172B24',
        subtext: '#64748B',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        card: '0 4px 16px -2px rgba(22, 163, 74, 0.08), 0 2px 6px -1px rgba(0,0,0,0.04)',
        hover: '0 10px 25px -5px rgba(22, 163, 74, 0.14), 0 8px 10px -6px rgba(0,0,0,0.03)',
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};
