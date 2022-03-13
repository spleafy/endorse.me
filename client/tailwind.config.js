const colors = require("tailwindcss/colors");

module.exports = {
  // prefix: "cb-",
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/*.{html}"],
  theme: {
    extend: {
      keyframes: {
        scale: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "80%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        scale: "scale 0.5s ease-in-out forwards",
      },
      colors: {
        primary: colors.blue,
        theme: {
          50: "var(--theme-color-50)",
          100: "var(--theme-color-100)",
          200: "var(--theme-color-200)",
          300: "var(--theme-color-300)",
          400: "var(--theme-color-400)",
          500: "var(--theme-color-500)",
          600: "var(--theme-color-600)",
          700: "var(--theme-color-700)",
          800: "var(--theme-color-800)",
          900: "var(--theme-color-900)",
        },
      },
    },
  },
  plugins: [],
};
