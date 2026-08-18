import { defineConfig } from "eslint/config";
import { all, any, compose, one } from "@/utils";
import { ignores } from "./ignores";
import { imports } from "./imports";
import { javascript } from "./javascript";
import { perfectionist } from "./perfectionist";
import { react } from "./react";
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
  /** @default `true` */
  ignores?: boolean | IgnoresOptions;
  /** @default `true` */
  javascript?: boolean | JavascriptOptions;

  /**
   * Requires {@link https://www.npmjs.com/package/@typescript-eslint/eslint-plugin|@typescript-eslint/eslint-plugin}
   * and {@link https://www.npmjs.com/package/@typescript-eslint/parser|@typescript-eslint/eslint-plugin} to be installed.
   *
   * @default `true` if {@link https://www.npmjs.com/package/@typescript-eslint/eslint-plugin|@typescript-eslint/eslint-plugin}
   * and {@link https://www.npmjs.com/package/@typescript-eslint/parser|@typescript-eslint/eslint-plugin} are installed, `false` otherwise.
   */
  typescript?: boolean | TypescriptOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-import-x|eslint-plugin-import-x} to be installed.
   * @default `true` if {@link https://www.npmjs.com/package/eslint-plugin-import-x|eslint-plugin-import-x} installed, `false` otherwise.
   */
  imports?: boolean | ImportsOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/@stylistic/eslint-plugin|@stylistic/eslint-plugin} to be installed.
   * @default `true` if {@link https://www.npmjs.com/package/@stylistic/eslint-plugin|@stylistic/eslint-plugin} installed, `false` otherwise.
   */
  stylistic?: boolean | StylisticOptions;
  /**
   * @default `true` if {@link https://www.npmjs.com/package/eslint-plugin-perfectionist|eslint-plugin-perfectionist} installed, `false` otherwise.
   */
  perfectionist?: boolean | PerfectionistOptions;
  /**
   * @default `true` if any of these installed:
   *
   * - {@link https://www.npmjs.com/package/eslint-plugin-react-x|eslint-plugin-react-x},
   * - {@link https://www.npmjs.com/package/eslint-plugin-react-dom|eslint-plugin-react-dom},
   * - {@link https://www.npmjs.com/package/eslint-plugin-react-hooks|eslint-plugin-react-hooks},
   * - {@link https://www.npmjs.com/package/eslint-plugin-react-refresh|eslint-plugin-react-refresh}.
   *
   * `false` otherwise.
   */
  react?: boolean | ReactOptions;
}

interface N1hron {
  (options?: N1hronOptions, ...userConfigs: ConfigArray): Promise<Array<Linter.Config>>;

  ignores: typeof ignores;
  javascript: typeof javascript;
  typescript: typeof typescript;
  stylistic: typeof stylistic;
  imports: typeof imports;
  perfectionist: typeof perfectionist;
  react: typeof react;
}

const n1hron: N1hron = (
  {
    ignores = true,
    javascript = true,

    typescript = all("@typescript-eslint/eslint-plugin", "@typescript-eslint/parser"),
    stylistic = one("@stylistic/eslint-plugin"),
    imports = one("eslint-plugin-import-x"),
    perfectionist = one("eslint-plugin-perfectionist"),

    react = any(
      "eslint-plugin-react-x",
      "eslint-plugin-react-dom",
      "eslint-plugin-react-hooks",
      "eslint-plugin-react-refresh",
    ),
  } = {},

  ...userConfigs
) => compose([
  [n1hron.ignores, ignores],
  [n1hron.javascript, javascript],
  [n1hron.typescript, typescript],
  [n1hron.stylistic, stylistic],
  [n1hron.imports, imports],
  [n1hron.perfectionist, perfectionist],
  [n1hron.react, react],
]).then((configs) => defineConfig(...configs, ...userConfigs));

n1hron.ignores = ignores;
n1hron.javascript = javascript;
n1hron.typescript = typescript;
n1hron.stylistic = stylistic;
n1hron.imports = imports;
n1hron.perfectionist = perfectionist;
n1hron.react = react;

export { n1hron };
