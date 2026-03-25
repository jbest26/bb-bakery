/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bb-bg':    '#F7F3ED',
        'bb-brown': '#2C1A0E',
        'bb-terra': '#C4522A',
        'bb-olive': '#5C6B3A',
        'bb-card':  '#FFFAF5',
      },
      fontFamily: {
        fraunces: ['"Fraunces"', 'Georgia', 'serif'],
        sans:     ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '42rem',
      },
    },
  },
  plugins: [],
}
