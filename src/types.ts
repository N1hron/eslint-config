import type { defineConfig } from "eslint/config";
import type { ESLint, Linter } from "eslint";

export type Constructor<A extends unknown[] = unknown[], R = void> = new (...args: A) => R;
export type Shift<T extends unknown[]> = T extends [unknown?, ...infer R] ? R : [];
export type RecursiveArray<T> = T | Array<RecursiveArray<T>>;
export type MaybePromise<T> = T | Promise<T>;

export type ESLintPlugin = ESLint.Plugin;
export type ESLintDefineConfig = typeof defineConfig;
export type ESLintConfig = Exclude<Parameters<ESLintDefineConfig>[number], unknown[]>;
export type ESLintRules = NonNullable<ESLintConfig["rules"]>;

export interface Config<R extends ESLintRules = ESLintRules> extends ESLintConfig {
  rules?: R;
  languageOptions?: Linter.LanguageOptions;
}

export type ConfigArray<R extends ESLintRules = ESLintRules> = Array<RecursiveArray<Config<R>>>;
export type MaybeConfigArray<R extends ESLintRules = ESLintRules> = Config<R> | ConfigArray<R>;

export interface ConfigCreator<O = unknown, R extends ESLintRules = ESLintRules> {
  (options?: O): MaybePromise<MaybeConfigArray<R>>;
}
