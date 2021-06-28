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
          lighter: "#7aa6d5",
        },
        bgaGreen: {
          DEFAULT: "#199c97",
        },
        bgaOrange: {
          DEFAULT: "#f0b555",
        },
      },
      animation: {
        "pulse-0.5": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;",
      },
    },
  },
  variants: {},
  plugins: [],
};
