import { ConfigUtils } from "@/utils";
import { FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, CreateConfig } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { JavascriptRules } from "../javascript";
import type { TypescriptRules } from "./types.gen";

type TypescriptConfig = Config<TypescriptRules & JavascriptRules>;

export interface TypescriptOptions {
  rulesets?: {
    /** @default true */
    core?: boolean;
    /** @default true */
    stylistic?: boolean;
    /** @default true */
    typechecked?: boolean;
  };
  overrides?: ConfigOverrides<TypescriptConfig>;
}

type Typescript = CreateConfig<TypescriptOptions>;

const utils = new ConfigUtils("n1hron/typescript");

export const typescript: Typescript = async ({
  rulesets: { core = true, stylistic = true, typechecked = true } = {},
  overrides = {},
} = {}) => {
  const [tseslint] = await utils.load("typescript-eslint");

  const config: TypescriptConfig = {
    name: utils.configName,
    files: [FILES_TS, FILES_TSX],
    extends: [tseslint.configs.base],

    languageOptions: {
      parserOptions: {
        projectService: typechecked,
      },
    },

    rules: {
      ...rules.compats,
      ...(core && rules.core),
      ...(stylistic && rules.stylistic),
      ...(typechecked && rules.typechecked),
    },
  };

  return utils.override(config, overrides);
};
