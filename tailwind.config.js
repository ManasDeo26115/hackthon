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
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        gold: {
          50: '#fffbe6',
          100: '#fff3b3',
          200: '#ffe880',
          300: '#ffd94d',
          400: '#fcc81a',
          500: '#fbbf24',
          600: '#d97706',
          700: '#b45309',
        },
        indigo: {
          950: '#0b0f19',
          900: '#1e1b4b',
          800: '#2e1065',
          700: '#3730a3',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FFF8EE',
          200: '#FDF0DC',
          300: '#F6E4C4',
        }
      },
      fontFamily: {
        devanagari: ['"Tiro Devanagari Hindi"', '"Noto Serif Devanagari"', 'serif'],
        ui: ['"Mukta"', '"Poppins"', 'sans-serif'],
        sans: ['"Mukta"', '"Poppins"', 'sans-serif'],
        display: ['"Rozha One"', '"Tiro Devanagari Hindi"', 'serif']
      },
      animation: {
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'diya-glow': 'diyaGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        diyaGlow: {
          '0%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.9))' }
        }
      },
      boxShadow: {
        'glow-saffron': '0 10px 25px -5px rgba(249, 115, 22, 0.35), 0 8px 10px -6px rgba(249, 115, 22, 0.2)',
        'glow-gold': '0 10px 25px -5px rgba(251, 191, 36, 0.4), 0 8px 10px -6px rgba(251, 191, 36, 0.25)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
