/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Design Tokens — مصدر واحد للألوان (سيُوسّع في Sprint 0.5)
        rk: {
          bg: '#0a0b0d',
          surface: '#121317',
          surfaceHover: '#181a1f',
          border: '#1f2126',
          accent: '#c0392b',
          'accent-dim': '#7b2318',
          text: '#e6e6e6',
          muted: '#8a8d93',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
