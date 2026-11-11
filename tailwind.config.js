/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        studio: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#E8DFD5',
          300: '#D7C7B7',
          400: '#BFAB97',
          500: '#A48E77',
          600: '#87705B',
          700: '#695544',
          800: '#4F3F33',
          900: '#342921',
          950: '#1D1713',
        },
        burgundy: {
          50: '#FDF2F4',
          100: '#FBE6EA',
          200: '#F7CCD6',
          300: '#EEA2B4',
          400: '#DF6D89',
          500: '#CB4064',
          600: '#B0294D',
          700: '#8F1E3D',
          800: '#66023C',
          900: '#571E2B',
          950: '#360E18',
        },
        sage: {
          50: '#F5F7F3',
          100: '#E9EFE5',
          200: '#D5DFCE',
          300: '#BACAB0',
          400: '#A8B78B',
          500: '#899B6A',
          600: '#6B7D4E',
        },
        champagne: {
          DEFAULT: '#E8C9B5',
          light: '#F6E9DD',
          sand: '#E8C7AE',
          nude: '#D8AD91',
          blush: '#D8A6A0',
          mocha: '#91654F',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 30px rgba(0, 0, 0, 0.04)',
        'luxury': '0 20px 40px -15px rgba(54, 14, 24, 0.08)',
        'floating': '0 30px 60px -12px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 25px rgba(102, 2, 60, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'zoom-in': 'zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
