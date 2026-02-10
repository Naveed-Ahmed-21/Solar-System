import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        space: '#050816',
        sun: '#f9a826',
        accent: '#4cc9f0'
      },
      boxShadow: {
        glow: '0 0 28px rgba(76, 201, 240, 0.35)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
} satisfies Config;
