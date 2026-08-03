import { defineConfig } from "eslint/config";
import { ignores } from "./ignores";
import { imports } from "./imports";
import { javascript } from "./javascript";
import { perfectionist } from "./perfectionist";
import { react } from "./react";
import { resolve } from "@/utils";
import { stylistic } from "./stylistic";
import { typescript } from "./typescript";

import type { Linter } from "eslint";
import type { ConfigArray } from "@/types";
import type { IgnoresOptions } from "./ignores";
import type { ImportsOptions } from "./imports";
import type { JavascriptOptions } from "./javascript";
import type { PerfectionistOptions } from "./perfectionist";
import type { ReactOptions } from "./react";
import type { StylisticOptions } from "./stylistic";
import type { TypescriptOptions } from "./typescript";

interface N1hronOptions {
  /** @default true */
  ignores?: boolean | IgnoresOptions;
  /** @default true */
  javascript?: boolean | JavascriptOptions;

  /**
   * Requires {@link https://www.npmjs.com/package/typescript-eslint|typescript-eslint} to be installed
   * @default false
   */
  typescript?: boolean | TypescriptOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-import-x|eslint-plugin-import-x} to be installed
   * @default false
   */
  imports?: boolean | ImportsOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/@stylistic/eslint-plugin|@stylistic/eslint-plugin} to be installed
   * @default false
   */
  stylistic?: boolean | StylisticOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-perfectionist|eslint-plugin-perfectionist} to be installed
   * @default false
   */
  perfectionist?: boolean | PerfectionistOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-react-x|eslint-plugin-react-x} to be installed
   * @default false
   */
  react?: boolean | ReactOptions;
}

interface N1hron {
  (options?: N1hronOptions, ...userConfigs: ConfigArray): Promise<Linter.Config[]>;

  ignores: typeof ignores;
  javascript: typeof javascript;
  typescript: typeof typescript;
  stylistic: typeof stylistic;
  imports: typeof imports;
  perfectionist: typeof perfectionist;
  react: typeof react;
}

const n1hron: N1hron = async (
  {
    ignores = true,
    javascript = true,
    typescript = false,
    stylistic = false,
    imports = false,
    perfectionist = false,
    react = false,
  } = {},

  ...userConfigs
) => defineConfig(
  ...await resolve([
    [n1hron.ignores, ignores],
    [n1hron.javascript, javascript],
    [n1hron.typescript, typescript],
    [n1hron.stylistic, stylistic],
    [n1hron.imports, imports],
    [n1hron.perfectionist, perfectionist],
    [n1hron.react, react],
  ]),
  ...userConfigs,
);

n1hron.ignores = ignores;
n1hron.javascript = javascript;
n1hron.typescript = typescript;
n1hron.stylistic = stylistic;
n1hron.imports = imports;
n1hron.perfectionist = perfectionist;
n1hron.react = react;

export { n1hron };
