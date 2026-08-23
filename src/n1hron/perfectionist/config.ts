import { definer, load, override } from "@/utils/config";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigOverrides } from "@/utils/config";
import type { PerfectionistRules } from "./types.gen";

export interface PerfectionistOptions {
  overrides?: ConfigOverrides<Config<PerfectionistRules>>;
}

export const perfectionist = definer<PerfectionistOptions>(
  "n1hron/perfectionist",
  ({ overrides } = {}) => load("eslint-plugin-perfectionist").then(([perfectionist]) => override(
    {
      files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
      plugins: { perfectionist },
      rules: { ...rules },
    },
    overrides,
  )),
);
