/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors : {
        'darkblue': '#364F6B',
        'lightblue': '#3FC1C9',
        'offwhite': '#F5F5F5',
        'pink' : '#FC5185',
      },
    },
  },
  plugins: [],
}
