import { ConfigUtils } from "@/utils";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigCreator, ESLintPlugin } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { ReactHooksRules } from "./types.gen";

type ReactHooksConfig = Config<ReactHooksRules>;

export interface ReactHooksOptions {
  overrides?: ConfigOverrides<ReactHooksConfig>;
}

type ReactHooks = ConfigCreator<ReactHooksOptions>;

const utils = new ConfigUtils("n1hron/react/hooks");

export const hooks: ReactHooks = ({
  overrides = {},
} = {}) => utils.load("eslint-plugin-react-hooks").then(([reactHooks]) => utils.override<ReactHooksConfig>(
  {
    name: utils.configName,
    files: [FILES_JSX, FILES_TSX],
    plugins: { "react-hooks": reactHooks as ESLintPlugin },
    rules,
  },
  overrides,
));
