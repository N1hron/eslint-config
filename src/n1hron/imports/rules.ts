import type { ImportsRules } from "./types.gen";

export const rules: ImportsRules = {
  "import-x/export": "error",
  "import-x/no-empty-named-blocks": "error",
  "import-x/no-extraneous-dependencies": "error",
  "import-x/first": "error",
  "import-x/newline-after-import": "error",
  "import-x/consistent-type-specifier-style": ["error", "prefer-top-level"],
  "import-x/no-duplicates": ["error", { considerQueryString: true }],
};
