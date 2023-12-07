/* eslint-disable @typescript-eslint/no-var-requires */

const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        html: { fontSize: '13px' },
      });
    }),
  ],

  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
};
