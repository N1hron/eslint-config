import { defineConfig } from "eslint/config";
import { ignores } from "./ignores";
import { imports } from "./imports";
import { javascript } from "./javascript";
import { perfectionist } from "./perfectionist";
import { react } from "./react";
import { resolve } from "@/utils";
import { stylistic } from "./stylistic";
import { typescript } from "./typescript";

import type { DefineConfig, MaybeConfigArray } from "@/types";
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

interface N1hron extends DefineConfig<N1hronOptions> {
  ignores: typeof ignores;
  javascript: typeof javascript;
  typescript: typeof typescript;
  stylistic: typeof stylistic;
  imports: typeof imports;
  perfectionist: typeof perfectionist;
  react: typeof react;
}

const n1hron: N1hron = async ({
  ignores = true,
  javascript = true,
  typescript = false,
  stylistic = false,
  imports = false,
  perfectionist = false,
  react = false,
} = {}, ...userConfigs) => {
  const configs: Array<Promise<MaybeConfigArray>> = [];

  if (ignores === true) configs.push(n1hron.ignores());
  else if (ignores) configs.push(n1hron.ignores(ignores));

  if (javascript === true) configs.push(n1hron.javascript());
  else if (javascript) configs.push(n1hron.javascript(javascript));

  if (typescript === true) configs.push(n1hron.typescript());
  else if (typescript) configs.push(n1hron.typescript(typescript));

  if (stylistic === true) configs.push(n1hron.stylistic());
  else if (stylistic) configs.push(n1hron.stylistic(stylistic));

  if (imports === true) configs.push(n1hron.imports());
  else if (imports) configs.push(n1hron.imports(imports));

  if (perfectionist === true) configs.push(n1hron.perfectionist());
  else if (perfectionist) configs.push(n1hron.perfectionist(perfectionist));

  if (react === true) configs.push(n1hron.react());
  else if (react) configs.push(n1hron.react(react));

  return defineConfig(...await resolve(configs), ...userConfigs);
};

n1hron.ignores = ignores;
n1hron.javascript = javascript;
n1hron.typescript = typescript;
n1hron.stylistic = stylistic;
n1hron.imports = imports;
n1hron.perfectionist = perfectionist;
n1hron.react = react;

export { n1hron };
