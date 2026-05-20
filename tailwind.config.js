/** @type {import('tailwindcss').Config} */
const { colors } = require("./src/styles/colors.ts");
const { height } = require("./src/styles/height.ts");
const { fontSize } = require("./src/styles/fonts.ts");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      height,
      fontSize,
    },
  },
  plugins: [],
};
