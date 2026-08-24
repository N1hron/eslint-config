import { definer, load, override } from "@/utils/config";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";

import type { default as $globals } from "globals";
import type { Config, ConfigOverrides } from "@/utils/config";

type Globals = typeof $globals;
type GlobalsLib = { [K in keyof Globals]: K extends `es${string}` ? K : never }[keyof Globals];
type GlobalsEnv = Array<Exclude<keyof Globals, GlobalsLib>>;

export type JavascriptGlobalsOptions = {
  /** @default `"es2023"` */
  lib?: GlobalsLib;
  /** @default `["node"]` */
  env?: GlobalsEnv;
  overrides?: Pick<ConfigOverrides, "basePath" | "files" | "ignores" | "languageOptions">;
};

export const globals = definer(
  "n1hron/javascript/globals",
  ({
    lib = "es2023",
    env = ["node"],
    overrides,
  }: JavascriptGlobalsOptions = {}) => load("globals").then(([globals]) => override<Config>(
    {
      files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
      languageOptions: {
        globals: {
          ...globals[lib],
          ...env.reduce((acc, env) => Object.assign(acc, globals[env]), {}),
        },
      },
    },
    overrides,
  )),
);
