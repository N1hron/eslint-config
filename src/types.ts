import type { ConfigWithExtends, Plugin } from "@eslint/config-helpers";
import type { Linter } from "eslint";

export type MapFn<T> = (value: T) => T;
export type ExtendFn<B, E = B> = (base: B, extension: E) => B;

export type MaybePromise<T> = T | Promise<T>;
export type Recursive<T> = T | Array<Recursive<T>>;
export type RecursiveArray<T> = Array<Recursive<T>>;

export type ESLintConfig = ConfigWithExtends;
export type ESLintLinterOptions = Linter.LanguageOptions;
export type EslintPlugin = Plugin;
export type ESLintRules = NonNullable<ESLintConfig["rules"]>;

export interface Definer<O, R> {
  (options?: O): MaybePromise<R>;
}

export interface DefinerSync<O, R> {
  (options?: O): R;
}

export interface DefinerAsync<O, R> {
  (options?: O): Promise<R>;
}
