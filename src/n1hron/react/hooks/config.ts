import { definer, load, override } from "@/utils/config";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigOverrides } from "@/utils/config";
import type { EslintPlugin } from "@/types";
import type { ReactHooksRules } from "./types.gen";

export interface ReactHooksOptions {
  overrides?: ConfigOverrides<Config<ReactHooksRules>>;
}

export const hooks = definer<ReactHooksOptions>(
  "n1hron/react/hooks",
  ({ overrides } = {}) => load("eslint-plugin-react-hooks").then(([reactHooks]) => override(
    {
      files: [FILES_JSX, FILES_TSX],
      plugins: { "react-hooks": reactHooks as EslintPlugin },
      rules: { ...rules.compats, ...rules.core },
    },
    overrides,
  )),
);
