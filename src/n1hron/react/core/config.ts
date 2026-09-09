import { definer, load, override } from "@/utils/config";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { has } from "@/utils/modules";
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

export const core = definer<ReactCoreOptions>("n1hron/react/core", async ({ rulesets = {}, overrides } = {}) => {
  const {
    core = true,

    typechecked = await has.exact.all(
      ["@typescript-eslint/eslint-plugin", "^8.67.0"],
      ["@typescript-eslint/parser", "^8.67.0"],
    ),
  } = rulesets;

  const [reactX] = await load("eslint-plugin-react-x");

  return override(
    {
      files: [FILES_JSX, FILES_TSX],
      plugins: { "react-x": reactX },
      rules: {
        ...core && rules.core,
        ...typechecked && rules.typechecked,
      },
    },
    overrides,
  );
});
