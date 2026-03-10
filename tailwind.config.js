/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#0e0b08',
        roast: '#1a1410',
        cream: '#e8dcc8',
        gold: '#c9a96e',
        latte: '#8a7a68',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Lora"', 'serif'],
        label: ['"Cormorant SC"', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        'dm-serif': ['"DM Serif Text"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 169, 110, 0)' },
          '50%': { boxShadow: '0 0 15px 2px rgba(201, 169, 110, 0.3)' },
        }
      }
    }
  },
  plugins: [],
};
