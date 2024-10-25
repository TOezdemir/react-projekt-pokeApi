/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 16px 32px var(--tw-shadow-color)',
      },
    },
    colors: {
      searchBlue: "#2C72B8",
      searchYellow: "#FFCB05"
    },
  },
  plugins: [],
  darkMode: "class",
};
