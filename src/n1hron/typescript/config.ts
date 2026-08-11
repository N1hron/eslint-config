import { ConfigCreator } from "@/utils";
import { FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { ConfigOverrides } from "@/utils";
import type { JavascriptCoreRules } from "../javascript/core";
import type { NamelessConfig } from "@/types";
import type { TypescriptRules } from "./types.gen";

type TypescriptConfig = NamelessConfig<TypescriptRules & JavascriptCoreRules>;

export interface TypescriptOptions {
  rulesets?: {
    /** @default `true` */
    core?: boolean;
    /** @default `true` */
    stylistic?: boolean;
    /** @default `true` */
    typechecked?: boolean;
  };
  overrides?: ConfigOverrides<TypescriptConfig>;
}

const c = new ConfigCreator<TypescriptConfig>("n1hron/typescript");

export const typescript = c.define<TypescriptOptions>(({
  rulesets: { core = true, stylistic = true, typechecked = true } = {},
  overrides,
} = {}) => c.load("typescript-eslint").then(([tseslint]) => c.override(
  {
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
  },
  overrides,
)));
