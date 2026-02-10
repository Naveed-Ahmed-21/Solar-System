import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cosmic: {
          bg: '#040712',
          panel: 'rgba(14, 26, 54, 0.55)',
          glow: '#6ca8ff'
        }
      },
      boxShadow: {
        glow: '0 0 24px rgba(108,168,255,0.35)'
      }
    }
  },
  plugins: []
} satisfies Config;
