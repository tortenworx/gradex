/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'oct': {
          'green': '#022113',
          'othagreen': '#00684A',
          'lime': '#0B9008',
          'yellow': '#E6EA45'
        }
      }},
    fontFamily: {
      'sans': ['"DM Sans"', ...defaultTheme.fontFamily.sans],
      'serif': ['"Lora"', ...defaultTheme.fontFamily.serif],
      'mono': ['"DM Mono"', ...defaultTheme.fontFamily.mono]
    }
  },
  plugins: [require('@tailwindcss/forms')],
}

