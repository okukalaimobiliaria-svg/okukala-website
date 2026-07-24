const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // CORES OFICIAIS OKUKALA
      colors: {
        okukala: {
          blue: "#0A43D8",
          dark: "#042A8F",
          gold: "#F5C400",
          goldLight: "#FFD700",
          white: "#FFFFFF",
          black: "#000000",
        },
      },
      // FAMÍLIAS DE FONTE
      fontFamily: {
        sans: ["Poppins", "Roboto", ...fontFamily.sans],
        montserrat: ["Montserrat", "Poppins", ...fontFamily.sans],
        poppins: ["Poppins", ...fontFamily.sans],
        roboto: ["Roboto", ...fontFamily.sans],
      },
      // SOMBRAS PERSONALIZADAS
      boxShadow: {
        'card': '0 10px 30px -10px rgba(10, 67, 216, 0.15)',
        'card-hover': '0 20px 40px -15px rgba(10, 67, 216, 0.3)',
      },
    },
  },
  plugins: [],
};
