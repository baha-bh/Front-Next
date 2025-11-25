/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
  addUtilities({
    ".mask-portal": {
      maskImage: "url('https://minionsart.github.io/aow4db/Icons/Interface/CosmicHappeningPortal.png')",
      maskSize: "cover",
      maskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskImage: "url('https://minionsart.github.io/aow4db/Icons/Interface/CosmicHappeningPortal.png')",
      WebkitMaskSize: "cover",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskClip: "border-box",
      WebkitMaskClip: "border-box",
      maskOrigin: "border-box",
      WebkitMaskOrigin: "border-box",
    },
  }, { variants: ["responsive", "hover"] });
}),
  ],
};
