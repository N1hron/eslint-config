import { ConfigUtils } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";

import type { default as __globals } from "globals";
import type { Config, ConfigCreator } from "@/types";
import type { ConfigOverrides } from "@/utils";

type Globals = keyof typeof __globals;
type GlobalsLib = { [K in Globals]: K extends `es${string}` ? K : never }[Globals];
type GlobalsEnv = Exclude<Globals, GlobalsLib>[];

export type JavascriptGlobalsOptions = {
  /** @default "es2023" */
  lib?: GlobalsLib;
  /** @default ["node"] */
  env?: GlobalsEnv;

  overrides?: ConfigOverrides<Config, "basePath" | "files" | "ignores" | "languageOptions" | "name">;
};

type JavascriptGlobals = ConfigCreator<JavascriptGlobalsOptions>;

const utils = new ConfigUtils("n1hron/javascript/globals");

export const globals: JavascriptGlobals = ({
  lib = "es2023",
  env = ["node"],
  overrides = {},
}: JavascriptGlobalsOptions = {}) => utils.load("globals").then(([globals]) => utils.override(
  {
    name: utils.configName,
    files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
    languageOptions: {
      globals: {
        ...globals[lib],
        ...env.reduce((acc, env) => Object.assign(acc, globals[env]), {}),
      },
    },
  },
  overrides,
));
