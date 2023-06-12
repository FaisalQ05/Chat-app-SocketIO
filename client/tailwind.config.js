/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        topToBottom: {
          "0%": { transform: "translate(0px,0px)" },
          "100%": { transform: "translate(0px,100px)" },
          // "60%": { transform: "translate(0px,100px)" },
          // "80%": { transform: "translate(0px,-40px)" },
          // "100%": { transform: "translate(0px,-70px)" },
        },
      },
      animation: {
        topToBottom: "topToBottom 1s linear",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar')
  ],
}
