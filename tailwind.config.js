/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {},
    fontFamily: {
      goodDog: ['GoodDog', 'Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
    },
  },
  plugins: [],
};
