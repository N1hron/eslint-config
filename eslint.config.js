import { createJiti } from "jiti";

import path from "path";

const jiti = createJiti(import.meta.url, {
  alias: {
    "@": path.resolve(import.meta.dirname, "src"),
  },
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
});
