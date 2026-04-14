/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 🔥 مهم بزاف
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}