import { ConfigUtils } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigCreator } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { ImportsRules } from "./types.gen";

type ImportsConfig = Config<ImportsRules>;

export interface ImportsOptions {
  overrides?: ConfigOverrides<ImportsConfig>;
}

type Imports = ConfigCreator<ImportsOptions>;

const utils = new ConfigUtils("n1hron/imports");

export const imports: Imports = ({
  overrides = {},
} = {}) => utils.load("eslint-plugin-import-x").then(([{ importX }]) => utils.override<ImportsConfig>(
  {
    name: utils.configName,
    files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
    plugins: { "import-x": importX },
    rules,
  },
  overrides,
));
