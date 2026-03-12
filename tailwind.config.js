/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#faf8f3',
          100: '#f5f2ed',
          200: '#ede9e0',
          300: '#e8dfd5',
          500: '#e8a857',
          600: '#c9873a',
          700: '#a0704a',
        },
        stone: {
          50: '#fbf9f4',
          100: '#f5f3ed',
          200: '#ede9e0',
          600: '#7a5c3d',
          700: '#5c3d24',
          800: '#2d1a0a',
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", 'serif'],
        sans: ["'Lato'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
