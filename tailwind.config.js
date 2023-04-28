/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: { main: ["Poppins", "sans-serif"] },
    extend: {
      height: {
        450: "450px",
      },
      maxWidth: {
        main: "1260px",
      },
      backgroundColor: {
        main: "#ee3131",
        "black-05": "rgba(0,0,0,0.5)",
        "white-02": "rgba(255, 255, 255, 0.2)",
      },
      colors: {
        main: "#ee3131",
        second: "#505050",
        third: "#1c1d1d",
      },
      borderColor: {
        main: "ebebeb",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
