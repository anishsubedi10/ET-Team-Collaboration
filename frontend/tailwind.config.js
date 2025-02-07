/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Adjust the path based on where your HTML file is located
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JSX/TSX files in the src folder
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
