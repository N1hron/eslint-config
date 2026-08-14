import type { ImportsRules } from "./types.gen";

export const rules: ImportsRules = {
  "import-x/export": "error",
  "import-x/no-empty-named-blocks": "error",
  "import-x/no-extraneous-dependencies": "error",
  "import-x/no-self-import": "error",
  "import-x/named": "error",
  "import-x/default": "error",

  "import-x/first": "warn",
  "import-x/no-duplicates": "warn",
  "import-x/newline-after-import": "warn",
  "import-x/consistent-type-specifier-style": ["warn", "prefer-top-level"],
};
