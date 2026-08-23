import { definer, override } from "@/utils/config";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigOverrides } from "@/utils/config";
import type { JavascriptCoreRules } from "./types.gen";

export interface JavascriptCoreOptions {
  rulesets?: {
    /** @default `true` */
    core?: boolean;
    /** @default `true` */
    suggestions?: boolean;
  };
  overrides?: ConfigOverrides<Config<JavascriptCoreRules>>;
}

export const core = definer<JavascriptCoreOptions>(
  "n1hron/javascript",
  ({ rulesets: { core = true, suggestions = true } = {}, overrides } = {}) => override(
    {
      files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
      rules: {
        ...core && rules.core,
        ...suggestions && rules.suggestions,
      },
    },
    overrides,
  ),
);
