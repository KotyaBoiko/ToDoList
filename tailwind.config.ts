/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'rotate': {
        '4.2': '4.5deg',
        '2.2': '2.5deg',
      }
    },
  },
  plugins: [],
}