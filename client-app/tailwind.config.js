/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9", // ලස්සන නිල් පාටක්
        secondary: "#64748B",
        dark: "#0F172A",
        light: "#F8FAFC"
      }
    },
  },
  plugins: [],
}