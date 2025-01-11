/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        teal: '#20c997',
        blue: '#007bff',
        olive: '#6c757d'
      }
    }
  },
  darkMode: 'class', // Enables dark mode support
  plugins: []
}
