/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins-font': ['Poppins', 'sans-serif'],
        'roboto-font': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
