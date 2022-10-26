/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        0.55: '0.525rem',
        16.5: '4.125rem',
        76: '19rem',
      },
      transitionDuration: {
        250: '250ms',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        idk: '#646cff',
      },
    },
  },
  plugins: [],
};
