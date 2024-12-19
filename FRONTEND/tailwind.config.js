// /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        customBg: "#f7f3e9", // Add custom background color here
        emeraldHover: "#2A9D8F", // Add hover color here
      },
    },
  },
  plugins: [],
};
