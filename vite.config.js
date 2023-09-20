// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about/index.html"),
        statistics: resolve(__dirname, "src/statistics/index.html"),
        habit_creation: resolve(__dirname, "src/create-habit/index.html"),
        habits: resolve(__dirname, "src/habits/index.html"),
      },
    },
  },
});
