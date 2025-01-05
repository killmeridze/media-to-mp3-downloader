import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: "src/main/main.ts",
        vite: {
          build: {
            rollupOptions: {
              external: ["electron"],
            },
            outDir: "dist/main",
          },
        },
      },
      preload: {
        input: "src/preload/index.ts",
        vite: {
          build: {
            outDir: "dist/preload",
          },
        },
      },
    }),
  ],
  build: {
    outDir: "dist/renderer",
  },
});
