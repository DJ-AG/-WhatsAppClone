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
        dark_bg_1:"#111B21",
        dark_bg_2:"#202C33",
        dark_bg_3:"#182229",
        dark_bg_4:"#222E35",
        dark_border_1:"#222D34",
        dark_border_2:"#313D45",
        dark_hover_1:"#2A3942",
        dark_svg_1:"#AEBAC1",
        dark_svg_2:"#8696A0",
        blue_1:"#53BDEB",
        blue_2:"#3E7B96",
        dark_text_1:"#E9EDEF",
      }
    },
  },
  plugins: [],
}