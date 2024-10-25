import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      searchBlue: "#2C72B8",
      searchYellow: "#FFCB05",
      ...colors
    },
  },
  plugins: [
  ],
  darkMode: "class",
};
