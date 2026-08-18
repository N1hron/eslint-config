import { ConfigCreator } from "@/utils";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Plugin } from "@eslint/config-helpers";
import type { ConfigOverrides } from "@/utils";
import type { NamelessConfig } from "@/types";
import type { ReactHooksRules } from "./types.gen";

type ReactHooksConfig = NamelessConfig<ReactHooksRules>;

export interface ReactHooksOptions {
  overrides?: ConfigOverrides<ReactHooksConfig>;
}

const c = new ConfigCreator<ReactHooksConfig>("n1hron/react/hooks");

export const hooks = c.define<ReactHooksOptions>(({
  overrides,
} = {}) => c.load("eslint-plugin-react-hooks").then(([reactHooks]) => c.override(
  {
    files: [FILES_JSX, FILES_TSX],
    plugins: { "react-hooks": reactHooks as Plugin },
    rules: { ...rules.compats, ...rules.core },
  },
  overrides,
)));
