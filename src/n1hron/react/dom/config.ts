import { definer, load, override } from "@/utils/config";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigOverrides } from "@/utils/config";
import type { ReactDomRules } from "./types.gen";

export interface ReactDomOptions {
  overrides?: ConfigOverrides<Config<ReactDomRules>>;
}

export const dom = definer<ReactDomOptions>(
  "n1hron/react/dom",
  ({ overrides } = {}) => load("eslint-plugin-react-dom").then(([reactDOM]) => override(
    {
      files: [FILES_JSX, FILES_TSX],
      plugins: { "react-dom": reactDOM },
      rules: { ...rules },
    },
    overrides,
  )),
);
