import { compose, one } from "@/utils";
import { core } from "./core";
import { globals } from "./globals";

import type { DefineConfigArrayAsync } from "@/types";
import type { JavascriptCoreOptions } from "./core";
import type { JavascriptGlobalsOptions } from "./globals";

export interface JavascriptOptions {
  /** @default `true` */
  core?: boolean | JavascriptCoreOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/globals|globals} to be installed.
   * @default `false`
   */
  globals?: boolean | JavascriptGlobalsOptions;
}

interface Javascript extends DefineConfigArrayAsync<JavascriptOptions> {
  core: typeof core;
  globals: typeof globals;
}

const javascript: Javascript = ({ core = true, globals = one("globals") }: JavascriptOptions = {}) => compose([
  [javascript.core, core],
  [javascript.globals, globals],
]);

javascript.core = core;
javascript.globals = globals;

export { javascript };
