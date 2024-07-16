import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        popup: "./popup.html",
      },
      output: {
        entryFileNames: "popup.js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    outDir: "dist",
  },
});
