import { definer, load, override } from "@/utils/config";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigOverrides } from "@/utils/config";
import type { ImportsRules } from "./types.gen";

export interface ImportsOptions {
  overrides?: ConfigOverrides<Config<ImportsRules>>;
}

export const imports = definer<ImportsOptions>(
  "n1hron/imports",
  ({ overrides } = {}) => load("eslint-plugin-import-x").then(([importX]) => override(
    {
      files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
      plugins: { "import-x": importX },
      rules: { ...rules },
    },
    overrides,
  )),
);
