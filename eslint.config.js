import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, {
  tsconfigPaths: "./tsconfig.json",
});

/** @type {typeof import("./src/index.ts")} */
const { n1hron, ext } = await jiti.import("./src/index.ts");

export default n1hron({
  ignores: {
    overrides: {
      ignores: ext(["**/*.gen.ts"]),
    },
  },
  react: false,
  next: false,
});
