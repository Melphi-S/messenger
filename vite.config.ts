import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: resolve(__dirname, "dist"),
  },
  preview: {
    port: 3000,
  },
});
