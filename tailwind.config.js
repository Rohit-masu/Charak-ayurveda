/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neem: "#0F2E21",
        forest: "#1B4332",
        gold: "#B8923F",
        "gold-soft": "#DDBF73",
        paper: "#FCFBF7",
        mist: "#E8F0EA",
        ink: "#16251C",
      },
      fontFamily: {
        display: ["Cinzel", "Marcellus", "serif"],
        body: ["Outfit", "Hind", "sans-serif"],
      },
      boxShadow: {
        stage: "0 10px 30px -10px rgba(15, 46, 33, 0.08)",
      },
      borderRadius: {
        arch: "999px 999px 1rem 1rem",
      },
    },
  },
  plugins: [],
}
