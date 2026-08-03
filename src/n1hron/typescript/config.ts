import { ConfigUtils } from "@/utils";
import { FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigCreator } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { JavascriptCoreRules } from "../javascript/core";
import type { TypescriptRules } from "./types.gen";

type TypescriptConfig = Config<TypescriptRules & JavascriptCoreRules>;

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

type Typescript = ConfigCreator<TypescriptOptions>;

const utils = new ConfigUtils("n1hron/typescript");

export const typescript: Typescript = async ({
  rulesets: { core = true, stylistic = true, typechecked = true } = {},
  overrides = {},
} = {}) => utils.load("typescript-eslint").then(([tseslint]) => utils.override<TypescriptConfig>({
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
}, overrides));
