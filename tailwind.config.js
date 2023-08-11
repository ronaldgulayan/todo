/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#081c15",
        secondary: "#1b4332",
        third: "#40916c",
        light: "#d8f3dc",
      },
    },
  },
  plugins: [],
};
