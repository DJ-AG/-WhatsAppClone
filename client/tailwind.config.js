/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        bg:"#F5F5F5",
        dark_bg:"#1F1F1F",
      }
    },
  },
  plugins: [],
}