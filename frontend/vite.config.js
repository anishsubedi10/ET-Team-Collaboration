import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import eslint from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslint({
      emitWarning: true, // Show ESLint warnings in the terminal
      emitError: true, // Show ESLint errors in the terminal
      failOnError: false, // Keep dev server running despite ESLint errors
      failOnWarning: false, // Keep dev server running despite ESLint warnings
    }),
  ],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3000",
  //       changeOrigin: true, // Helps with CORS issues
  //       rewrite: (path) => path.replace(/^\/api/, "/api"), // Ensure path correctness
  //       secure: false, // If using HTTP instead of HTTPS
  //     },
  //   },
  // },
});
