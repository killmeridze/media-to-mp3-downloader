module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      animation: {
        gradient: "gradient 15s linear infinite",
      },
      keyframes: {
        gradient: {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
      },
      backgroundImage: {
        gradient: "linear-gradient(-45deg, #4f46e5, #7e22ce, #be185d, #7e22ce)",
      },
    },
  },
  plugins: [],
};
