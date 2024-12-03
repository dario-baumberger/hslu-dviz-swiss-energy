/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Oswald"', 'sans-serif'],
      serif: ['"Quattrocento"', 'serif'],
    },
    extend: {
      width: {
        '2px': '2px',
      },
      height: {
        'h-screen-1/2': '50vh',
      },
    },
  },
  plugins: [],
}
