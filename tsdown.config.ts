import { defineConfig } from "tsdown";

export default defineConfig({
  format: "esm",
  fixedExtension: false,
  sourcemap: false,
  dts: { sourcemap: false },
  tsconfig: "tsconfig.json",
});
