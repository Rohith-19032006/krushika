/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#16a34a',
          DEFAULT: '#15803d',
          dark: '#166534',
        },
        accent: {
          light: '#ea580c',
          DEFAULT: '#c2410c',
          dark: '#9a3412',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(234, 88, 12, 0.4)',
        'glow-green': '0 0 20px rgba(22, 163, 74, 0.4)',
        'card': '0 4px 20px rgba(0,0,0,0.08)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.12)',
        'card-dark': '0 4px 20px rgba(0,0,0,0.3)',
        'card-dark-hover': '0 12px 40px rgba(234, 88, 12, 0.15)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        'farmer-walk-in': {
          '0%': { opacity: '0', transform: 'translateX(-80px) scale(0.9)' },
          '70%': { transform: 'translateX(8px) scale(1)' },
          '85%': { transform: 'translateX(-4px) scale(1)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
        'farmer-wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-20deg)' },
          '75%': { transform: 'rotate(15deg)' },
        },
        'farmer-point': {
          '0%, 100%': { transform: 'translateX(0) scale(1)' },
          '50%': { transform: 'translateX(4px) scale(1.05)' },
        },
        'welcome-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'soil-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        'weather-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'crop-grow': {
          '0%': { opacity: '0', transform: 'scaleY(0.2)', transformOrigin: 'bottom' },
          '60%': { transform: 'scaleY(1.05)', transformOrigin: 'bottom' },
          '100%': { opacity: '1', transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'scale-in': 'scale-in 0.3s ease-out both',
        'slide-in-right': 'slide-in-right 0.35s ease-out both',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulse-soft 1.5s ease-in-out infinite',
        'farmer-walk-in': 'farmer-walk-in 1s ease-out both',
        'farmer-wave': 'farmer-wave 0.6s ease-in-out infinite',
        'farmer-point': 'farmer-point 1.2s ease-in-out infinite',
        'welcome-bounce': 'welcome-bounce 2s ease-in-out infinite',
        'soil-pulse': 'soil-pulse 2.5s ease-in-out infinite',
        'weather-float': 'weather-float 3s ease-in-out infinite',
        'crop-grow': 'crop-grow 1s ease-out both',
      },
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
};
