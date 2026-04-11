/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        foreground: "#ffffff",
        primary: "#9333ea",
        secondary: "#06b6d4",
      },
      fontFamily: {
        heading: ["Moon Walk", "sans-serif"],
        body: ["Futura", "sans-serif"],
        accent: ["Amsterdam", "cursive"],
      },
    },
  },
  plugins: [],
}
