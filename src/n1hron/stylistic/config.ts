import { definer, load, override } from "@/utils/config";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigOverrides } from "@/utils/config";
import type { StylisticRules } from "./types.gen";

export interface StylisticOptions {
  overrides?: ConfigOverrides<Config<StylisticRules>>;
}

export const stylistic = definer<StylisticOptions>(
  "n1hron/stylistic",
  ({ overrides } = {}) => load("@stylistic/eslint-plugin").then(([stylistic]) => override(
    {
      files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
      plugins: { "@stylistic": stylistic },
      rules: { ...rules },
    },
    overrides,
  )),
);
