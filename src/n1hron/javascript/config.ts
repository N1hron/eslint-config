import { canResolve } from "@/utils/modules";
import { compose } from "@/utils/config";
import { core } from "./core";
import { globals } from "./globals/config";

import type { ConfigArrayDefinerAsync } from "@/utils/config";
import type { JavascriptCoreOptions } from "./core";
import type { JavascriptGlobalsOptions } from "./globals";

export interface JavascriptOptions {
  /** @default `true` */
  core?: boolean | JavascriptCoreOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/globals|globals} to be installed.
   * @default `true` if {@link https://www.npmjs.com/package/globals|globals} installed, `false` otherwise.
   */
  globals?: boolean | JavascriptGlobalsOptions;
}

interface Javascript extends ConfigArrayDefinerAsync<JavascriptOptions> {
  core: typeof core;
  globals: typeof globals;
}

const javascript: Javascript = ({ core = true, globals = canResolve("globals") }: JavascriptOptions = {}) => compose([
  [javascript.core, core],
  [javascript.globals, globals],
]);

javascript.core = core;
javascript.globals = globals;

export { javascript };
