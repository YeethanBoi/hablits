/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#507c6a",

          secondary: "#047857",

          accent: "#669f87",

          neutral: "#047857",

          "base-100": "#f3eef2",

          info: "#e5e7eb",

          success: "#36d399",

          warning: "#2dd4bf",

          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
