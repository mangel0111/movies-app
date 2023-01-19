/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '600px',
    },
    extend: {
      animation: {
        loader: 'loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
        'spin-slow': 'spin 10s linear infinite',
      },
      colors: {
        $violet: '#3b0062',
      },
      keyframes: {
        loader: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
};
