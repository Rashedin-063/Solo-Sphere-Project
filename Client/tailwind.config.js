/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato', sans-serif"
      }
    },
  },
  plugins: [require('daisyui')],
};
