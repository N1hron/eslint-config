import { ConfigUtils } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";

import type { default as g } from "globals";
import type { Config, CreateConfig } from "@/types";
import type { ConfigOverrides } from "@/utils";

type Globals = keyof typeof g;
type GlobalsLib = { [K in Globals]: K extends `es${string}` ? K : never }[Globals];
type GlobalsEnv = Exclude<Globals, GlobalsLib>[];

export type JavascriptGlobalsOptions = {
  /** @default "es2023" */
  lib?: GlobalsLib;

  /** @default ["node"] */
  env?: GlobalsEnv;

  overrides?: ConfigOverrides;
};

type JavascriptGlobals = CreateConfig<JavascriptGlobalsOptions>;

const utils = new ConfigUtils("n1hron/javascript/globals");

export const globals: JavascriptGlobals = async ({
  lib = "es2023",
  env = ["node"],
  overrides = {},
}: JavascriptGlobalsOptions = {}) => {
  const [globals] = await utils.load("globals");

  const config: Config = {
    name: utils.configName,
    files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
    languageOptions: {
      globals: {
        ...globals[lib],
        ...env.reduce((acc, env) => Object.assign(acc, globals[env]), {}),
      },
    },
  };

  return utils.override(config, overrides);
};
