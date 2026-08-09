import { ConfigCreator } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";

import type { default as __globals } from "globals";
import type { ConfigOverrides } from "@/utils";

type Globals = typeof __globals;
type GlobalsLib = { [K in keyof Globals]: K extends `es${string}` ? K : never }[keyof Globals];
type GlobalsEnv = Array<Exclude<keyof Globals, GlobalsLib>>;

export type JavascriptGlobalsOptions = {
  /** @default `"es2023"` */
  lib?: GlobalsLib;
  /** @default `["node"]` */
  env?: GlobalsEnv;
  overrides?: Pick<ConfigOverrides, "basePath" | "files" | "ignores" | "languageOptions">;
};

const c = new ConfigCreator("n1hron/javascript/globals");

export const globals = c.define(async ({
  lib = "es2023",
  env = ["node"],
  overrides,
}: JavascriptGlobalsOptions = {}) => c.load("globals").then(([globals]) => c.override(
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
)));
