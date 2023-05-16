/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: { main: ["Poppins", "sans-serif"] },
    extend: {
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
          "100%": {
            "-webkit-transform": "translateY(-20px)",
            transform: "translateY(-20px)",
          },
        },
        "scale-up-center": {
          "0%": {
            "-webkit-transform": "scale(0.2)",
            transform: "scale(0.2)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
        "scale-down-center": {
          "0%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
          "100%": {
            "-webkit-transform": "scale(0.2)",
            transform: "scale(0.2)",
          },
        },
        "rotate-center": {
          "0%": {
            "-webkit-transform": "rotate(0)",
            transform: "rotate(1)",
          },
          "100%": {
            "-webkit-transform": "rotate(360deg)",
            transform: "rotate(360deg)",
          },
        },
        "scale-up-tr": {
          "0%": {
            "-webkit-transform": "scale(0.5)",
            transform: "scale(0.5)",
            "-webkit-transform-origin": "100% 0%",
            "transform-origin": "100% 0%",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
            "-webkit-transform-origin": "100% 0%",
            "transform-origin": "100% 0%",
          },
        },
        "slide-bck-left": {
          "0%": {
            "-webkit-transform": "translateZ(0) translateX(0)",
            transform: "translateZ(0) translateX(0)",
          },
          "100%": {
            "-webkit-transform": " translateZ(-400px) translateX(-100%)",
            transform: " translateZ(-400px) translateX(-100%)",
          },
        },
      },
      animation: {
        "slide-top": "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-up-center": "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) forwards",
        "scale-down-center":
          "scale-down-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) forwards",
        "rotate-center": "rotate-center 0.8s ease-out infinite forwards",
        "scale-up-tr": "scale-up-tr 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "slide-bck-left": "slide-bck-left .45s cubic-bezier(0.470, 0.000, 0.745, 0.715) forwards",
      },
      height: {
        450: "450px",
        "screen-75": "90vh",
        "screen-50": "50vh",
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
        "theme-yellow": "#ffc727",
        "theme-yellow-dark": "#e6b323",
        "theme-dark": "#37474f",
      },
      borderColor: {
        main: "ebebeb",
      },
      borderWidth: {
        1: "1px",
      },
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },
  },
  variants: {
    extend: {
      scale: ["active", "group-hover"],
    },
  },
  plugins: [],
};
