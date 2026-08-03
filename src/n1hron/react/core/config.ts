import { ConfigUtils } from "@/utils";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigCreator } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { ReactCoreRules } from "./types.gen";

type ReactCoreConfig = Config<ReactCoreRules>;

export interface ReactCoreOptions {
  overrides?: ConfigOverrides<ReactCoreConfig>;
}

type ReactCore = ConfigCreator<ReactCoreOptions>;

const utils = new ConfigUtils("n1hron/react/core");

export const core: ReactCore = ({
  overrides = {},
} = {}) => utils.load("eslint-plugin-react-x").then(([{ default: reactX }]) => utils.override<ReactCoreConfig>(
  {
    name: utils.configName,
    files: [FILES_JSX, FILES_TSX],
    plugins: { "react-x": reactX },
    rules,
  },
  overrides,
));
