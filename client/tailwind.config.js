/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rgba1: "rgba(17, 70, 143, 1)",
        rgba2: "rgba(17, 70, 143, 0.57)",
        rgba3: "rgba(238, 238, 238, 1)",
        rgba4: "rgba(170, 170, 170, 1)",
        rgba5: "rgba(17, 70, 143, 0.76)",
        rgba6: "rgba(134, 161, 198, 0.863)",
        rgba7: "rgba(17, 52, 143, 1)",
        rgba8: "rgba(17, 52, 143, 0.3135)",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
