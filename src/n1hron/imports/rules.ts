import type { ImportsRules } from "./types.gen";

export const rules: ImportsRules = {
  "import-x/default": "error", // Importing unexisting default import is forbidden
  "import-x/export": "error", // All exports must be valid
  "import-x/named": "error", // Importing unexisting named imports is forbidden
  "import-x/no-extraneous-dependencies": "error", // Importing external extraneous may cause problems

  "import-x/consistent-type-specifier-style": ["warn", "prefer-top-level"],
  "import-x/first": "warn",
  "import-x/newline-after-import": "warn",
  "import-x/no-duplicates": "warn",
  "import-x/no-empty-named-blocks": "warn",
  "import-x/no-self-import": "warn",
};
