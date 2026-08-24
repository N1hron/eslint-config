import { definer, load, override } from "@/utils/config";
import { FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigOverrides } from "@/utils/config";
import type { EslintPlugin } from "@/types";
import type { JavascriptCoreRules } from "../javascript/core";
import type { TypescriptRules } from "./types.gen";

export interface TypescriptOptions {
  rulesets?: {
    /** @default `true` */
    core?: boolean;
    /** @default `true` */
    typechecked?: boolean;
  };
  overrides?: ConfigOverrides<Config<TypescriptRules & JavascriptCoreRules>>;
}

export const typescript = definer<TypescriptOptions>(
  "n1hron/typescript",
  ({
    rulesets: { core = true, typechecked = true } = {},
    overrides,
  } = {}) => load("@typescript-eslint/parser", "@typescript-eslint/eslint-plugin").then(([parser, plugin]) => override(
    {
      files: [FILES_TS, FILES_TSX],
      plugins: {
        "@typescript-eslint": plugin as unknown as EslintPlugin,
      },
      languageOptions: {
        parser: parser,
        sourceType: "module",
        parserOptions: { projectService: typechecked },
      },
      rules: {
        ...rules.compats,
        ...core && rules.core,
        ...typechecked && rules.typechecked,
      },
    },
    overrides,
  )),
);
