import { canResolveAll } from "@/utils/modules";
import { definer, load, override } from "@/utils/config";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigOverrides } from "@/utils/config";
import type { ReactCoreRules } from "./types.gen";

export interface ReactCoreOptions {
  rulesets?: {
    /** @default `true` */
    core?: boolean;
    /** @default `true` if {@link https://www.npmjs.com/package/typescript-eslint|typescript-eslint} installed, `false` otherwise. */
    typechecked?: boolean;
  };
  overrides?: ConfigOverrides<Config<ReactCoreRules>>;
}

export const core = definer<ReactCoreOptions>(
  "n1hron/react/core",
  ({
    rulesets: {
      core = true,
      typechecked = canResolveAll("@typescript-eslint/eslint-plugin", "@typescript-eslint/parser"),
    } = {},

    overrides,
  } = {}) => load("eslint-plugin-react-x").then(([reactX]) => override(
    {
      files: [FILES_JSX, FILES_TSX],
      plugins: { "react-x": reactX },
      rules: {
        ...core && rules.core,
        ...typechecked && rules.typechecked,
      },
    },
    overrides,
  )),
);
