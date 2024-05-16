/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const colors = require("tailwindcss/colors");
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1600px",
    },
    colors: {
      hover: "#63738114",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      yellow: colors.amber,
      green: colors.green,
      blue: colors.blue,
      indigo: colors.indigo,
      purple: colors.purple,
      pink: colors.pink,
      success: "#22c55e",
      warning: "#ff7849",
      error: "#ff5630",
      info: "#00b8d9",

      code: "#d63384",

      "gray-100": "#F9FAFB",
      "gray-200": "#F4F6F8",
      "gray-300": "#DFE3E8",
      "gray-400": "#C4CDD5",
      "gray-500": "#F9FAFB",
      "gray-600": "#637381",
      "gray-700": "#454F5B",
      "gray-800": "#212B36",
      "gray-900": "#161C24",
    },
    extend: {
      transitionProperty: {
        height: "height",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
    },
  },
  corePlugins: {
    // Remove the Tailwind CSS preflight styles so it can use custom base style (src/theme/base.css)
    preflight: false, // https://tailwindcss.com/docs/preflight#disabling-preflight
  },
  plugins: [],
};
