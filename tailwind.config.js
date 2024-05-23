/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {
      rotate: {
        360: '360deg',
      },
      fontFamily: {
        goodDog: ['GoodDog', 'Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
