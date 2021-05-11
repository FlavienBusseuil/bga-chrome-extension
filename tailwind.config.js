module.exports = {
  purge: {
    content: ["./src/**/*.html", "./src/**/*.js"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgaBlue: {
          DEFAULT: "#4065a3",
          light: "#4871b6",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
