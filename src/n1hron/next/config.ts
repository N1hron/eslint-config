import { definer, load, override } from "@/utils/config";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";

import type { Config, ConfigOverrides } from "@/utils/config";
import type { NextRules } from "./types.gen";

import * as rules from "./rules";

export interface NextOptions {
  rulesets?: {
    /** @default `true` */
    core?: boolean;
    /** @default `true` */
    vitals?: boolean;
  };
  overrides?: ConfigOverrides<Config<NextRules>>;
}

export const next = definer<NextOptions>(
  "n1hron/next",
  ({
    rulesets: { core = true, vitals = true } = {},
    overrides,
  } = {}) => load("@next/eslint-plugin-next").then(([next]) => override(
    {
      files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
      plugins: { "@next/next": next },
      rules: {
        ...core && rules.core,
        ...vitals && rules.vitals,
      },
    },
    overrides,
  )),
);
