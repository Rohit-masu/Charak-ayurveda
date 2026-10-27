/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#06150F",
        forest: { DEFAULT: "#0B2A1D", light: "#143D2B" },
        ivory: { DEFAULT: "#F4EFE3", deep: "#EAE2CF" },
        gold: { DEFAULT: "#C9A45C", light: "#E9D4A1", dark: "#9C7A3C" },
        noir: "#0B0B09",
        sage: "#8FA597",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Manrope Variable'", "system-ui", "sans-serif"],
        deva: ["'Tiro Devanagari Sanskrit'", "serif"],
      },
      letterSpacing: {
        label: "0.32em",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
