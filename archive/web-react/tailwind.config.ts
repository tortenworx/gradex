import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'oct': {
          'darkgreen': '#022113',
          'green': '#03A000',
          'othagreen': '#00684A',
          'lime': '#0B9008',
          'yellow': '#E6EA45'
        }
      }},
    fontFamily: {
      'sans': 'var(--font-dm-sans)',
      'serif': 'var(--font-lora)',
      'mono': 'var(--font-dm-mono)'
    }
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
