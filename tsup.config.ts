import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // Consumers bring their own React.
  external: ["react", "react-dom"],
  // CSS is emitted separately by the `build:css` script (Tailwind CLI),
  // so component files never inline styles.
});
