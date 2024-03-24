/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.html", "./src/assets/js/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
