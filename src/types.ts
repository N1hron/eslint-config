import type { defineConfig } from "eslint/config";
import type { ESLint, Linter } from "eslint";

// export type Prettify<T> = { [K in keyof T]: T[K] } & {};
export type Constructor<A extends Array<unknown> = Array<unknown>, R = void> = new (...args: A) => R;
export type Shift<T extends Array<unknown>> = T extends [unknown?, ...infer R] ? R : [];
export type Nameless<C> = Omit<C, "name">;
// export type MaybeArray<T> = T | Array<T>;
export type MaybePromise<T> = T | Promise<T>;
export type Recursive<T> = T | Array<Recursive<T>>;
export type RecursiveArray<T> = Array<Recursive<T>>;
// export type Override<L, R> = Prettify<Omit<L, keyof R> & R>;

export type ESLintPlugin = ESLint.Plugin;
export type ESLintDefineConfig = typeof defineConfig;
export type ESLintConfig = Exclude<Parameters<ESLintDefineConfig>[number], Array<unknown>>;
export type ESLintRules = NonNullable<ESLintConfig["rules"]>;
export type ESLintLanguageOptions = Linter.LanguageOptions;

export interface Config<R extends ESLintRules = ESLintRules> extends ESLintConfig {
  languageOptions?: ESLintLanguageOptions;
  rules?: R;
}

export interface NamedConfig<N extends string = string, R extends ESLintRules = ESLintRules> extends Config<R> {
  name?: N;
}

export type NamelessConfig<R extends ESLintRules = ESLintRules> = Nameless<Config<R>>;
export type RecursiveConfig<R extends ESLintRules = ESLintRules> = Recursive<Config<R>>;
export type ConfigArray<R extends ESLintRules = ESLintRules> = RecursiveArray<Config<R>>;

export interface DefineConfig<O = unknown, C extends Config = Config> {
  (options?: O): MaybePromise<C>;
}

export interface DefineConfigSync<O = unknown, C extends Config = Config> {
  (options?: O): C;
}

export interface DefineConfigAsync<O = unknown, C extends Config = Config> {
  (options?: O): Promise<C>;
}

export interface DefineConfigArray<O = unknown, C extends Config = Config> {
  (options?: O): MaybePromise<RecursiveArray<C>>;
}

export interface DefineConfigArraySync<O = unknown, C extends Config = Config> {
  (options?: O): RecursiveArray<C>;
}

export interface DefineConfigArrayAsync<O = unknown, C extends Config = Config> {
  (options?: O): Promise<RecursiveArray<C>>;
}

export interface Modules {
  [name: string]: object;
}

export type ModuleName<M extends Modules> = Exclude<keyof M, number | symbol>;
export type ModuleNames<M extends Modules> = Array<ModuleName<M>>;
export type ModuleValues<M extends Modules, N extends ModuleNames<M>> = { [K in keyof N]: M[N[K]] };
