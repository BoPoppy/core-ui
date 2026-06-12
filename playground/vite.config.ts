import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The catalog is a standalone showcase that reuses the real library source
// (../src) so it always reflects the shipped components. It deploys to GitHub
// Pages under /core-ui/, hence the base path in production.
export default defineConfig(({ command }) => ({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: command === "build" ? "/core-ui/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Import components exactly as a consumer would.
      "@bopoppy/core-ui": fileURLToPath(new URL("../src/index.ts", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("./dist", import.meta.url)),
    emptyOutDir: true,
  },
}));
