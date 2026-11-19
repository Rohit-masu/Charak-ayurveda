/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // v3 palette: warm ivory + deep charcoal + muted bronze (see docs/REDESIGN_PLAN.md).
        // Product colours do not live here — each product carries its own `theme` in src/data/products.js.
        ivory: "#F7F3EC",
        paper: "#FCFAF6",
        sand: "#EEE6D9",
        sandstone: "#DCCDB6",
        charcoal: "#1E1C1A",
        graphite: { DEFAULT: "#2A2724", light: "#36322E" },
        onyx: "#121110",
        stone: "#6F675E",
        bronze: { DEFAULT: "#B3905F", light: "#D8BF96", dark: "#7A5A33" },
      },
      fontFamily: {
        display: ["'Fraunces Variable'", "Georgia", "serif"],
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
