import { defineConfig } from "vite";
import { resolve } from "path";
import { handlebars } from "./vite-plugin-handlebars-precompile";

export default defineConfig({
  build: {
    outDir: resolve(__dirname, "dist"),
  },
  plugins: [handlebars()],
});
