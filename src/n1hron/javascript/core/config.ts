import { ConfigUtils } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigCreator } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { JavascriptCoreRules } from "./types.gen";

type JavascriptCoreConfig = Config<JavascriptCoreRules>;

export interface JavascriptCoreOptions {
  rulesets?: {
    /** @default true */
    core?: boolean;
    /** @default true */
    stylistic?: boolean;
  };
  overrides?: ConfigOverrides<JavascriptCoreConfig>;
}

type JavascriptCore = ConfigCreator<JavascriptCoreOptions>;

const utils = new ConfigUtils("n1hron/javascript");

export const core: JavascriptCore = ({
  rulesets: { core = true, stylistic = true } = {},
  overrides = {},
} = {}) => utils.override<JavascriptCoreConfig>(
  {
    name: utils.configName,
    files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
    rules: {
      ...(core && rules.core),
      ...(stylistic && rules.stylistic),
    },
  },
  overrides,
);
