/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts,js}"],
  theme: {
    extend: {},
  },
  // prefix: 'tw-',
  // important: true,
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn": {
          padding: ".5rem 1rem",
          borderRadius: ".25rem",
          fontWeight: "500",
        },
        ".btn-blue": {
          backgroundColor: "#3490dc",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2779bd",
          },
        },
        ".btn-red": {
          backgroundColor: "#e3342f",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#cc1f1a",
          },
        },
        ".input-box": {
          display: "block",
          border: "0.25rem",
          padding: ".375rem , 0",
        },
        
      });
    }),
  ],
};
