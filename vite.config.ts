import { defineConfig } from "vite";
import { generateTailwindThemePlugin } from "./vite.plugins";

export default defineConfig({
  plugins: [generateTailwindThemePlugin()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
    },
    emptyOutDir: false,
  },
});
