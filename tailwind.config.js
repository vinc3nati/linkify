/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "yellow-mango":
          "url('/bg_1.png'), radial-gradient(circle farthest-side,#f4faff, #4361ee)",
      },
      backgroundColor: {
        primary: "#4361ee",
        secondary: "#f4faff",
        modalBackgroundColor: "rgba(0,0,0,0.3))",
      },
      colors: {
        primary: "#4361ee",
      },
      borderColor: {
        primary: "#4361ee",
        secondary: "#f4faff",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
