import { core } from "./core";
import { globals } from "./globals";
import { resolve } from "@/utils";

import type { ConfigCreator } from "@/types";
import type { JavascriptCoreOptions } from "./core";
import type { JavascriptGlobalsOptions } from "./globals";

export interface JavascriptOptions {
  core?: boolean | JavascriptCoreOptions;
  globals?: boolean | JavascriptGlobalsOptions;
}

interface Javascript extends ConfigCreator<JavascriptOptions> {
  core: typeof core;
  globals: typeof globals;
}

const javascript: Javascript = async ({ core = true, globals = false }: JavascriptOptions = {}) => resolve([
  [javascript.core, core],
  [javascript.globals, globals],
]);

javascript.core = core;
javascript.globals = globals;

export { javascript };
