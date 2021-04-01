const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        teal: colors.teal,
        orange: colors.orange,
        cyan: colors.cyan,
      },
      animation: {
        "animate-spin": "spin 1s linear infinite",
      },
      spacing: {
        chat: "56rem",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },

      transitionProperty: {
        width: "width",
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
