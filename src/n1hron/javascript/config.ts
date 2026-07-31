import { ConfigUtils, resolve } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { globals } from "./globals";
import { rules } from "./rules";

import type { Config, CreateConfig, MaybeConfigArray, MaybePromise } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { JavascriptGlobalsOptions } from "./globals";
import type { JavascriptRules } from "./types.gen";

type JavascriptConfig = Config<JavascriptRules>;

export interface JavascriptOptions {
  rulesets?: {
    /** @default true */
    core?: boolean;
    /** @default true */
    stylistic?: boolean;
  };
  /**
   * Requires {@link https://www.npmjs.com/package/globals|globals} to be installed
   * @default false
   */
  globals?: boolean | JavascriptGlobalsOptions;
  overrides?: ConfigOverrides<JavascriptConfig>;
}

interface Javascript extends CreateConfig<JavascriptOptions> {
  globals: typeof globals;
}

const utils = new ConfigUtils("n1hron/javascript");

const javascript: Javascript = async function javascript({
  rulesets: { core = true, stylistic = true } = {},
  globals = false,
  overrides = {},
}: JavascriptOptions = {}) {
  const config: JavascriptConfig = {
    name: utils.configName,
    files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
    rules: {
      ...(core && rules.core),
      ...(stylistic && rules.stylistic),
    },
  };

  const configs: Array<MaybePromise<MaybeConfigArray>> = [utils.override(config, overrides)];

  if (globals === true) configs.push(javascript.globals());
  else if (globals) configs.push(javascript.globals(globals));

  return resolve(configs);
};

javascript.globals = globals;

export { javascript };
