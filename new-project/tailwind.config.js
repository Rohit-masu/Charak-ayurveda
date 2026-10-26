/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#f3dc9f',
          DEFAULT: '#c9a45c',
          dark: '#b8924a',
        },
        forest: {
          DEFAULT: '#0b2a1d',
          dark: '#06150f',
        },
        ivory: {
          DEFAULT: '#F4EFE3',
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", 'Georgia', 'serif'],
        sans: ["'Manrope'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
