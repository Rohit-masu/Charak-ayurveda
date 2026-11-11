/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#06150F",
        forest: { DEFAULT: "#0B2A1D", light: "#143D2B" },
        // Light theme: cream page, white cards, forest + gold accents.
        ivory: { DEFAULT: "#F7F2E8", deep: "#EFE7D6" },
        mist: "#E9EFE7",
        // hero background: a light green, never the dark forest
        "sage-light": "#DDE9DA",
        // gold-dark is the text gold on light backgrounds (AA on ivory).
        gold: { DEFAULT: "#C9A45C", light: "#E9D4A1", dark: "#7F6128" },
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
