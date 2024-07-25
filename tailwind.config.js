/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    screens: {
      phone: '320px',
      tablet: '640px',

      laptop: '1024px',

      desktop: '1280px'
    }
  },
  plugins: []
}
