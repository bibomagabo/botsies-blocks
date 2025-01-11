/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customTeal: '#20c997',
        customBlue: '#007bff',
        customOlive: '#6c757d'
      }
    }
  },
  darkMode: 'class', // Enables dark mode support
  plugins: []
}
