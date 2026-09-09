import type {
  Definer,
  DefinerAsync,
  DefinerSync,
  ESLintConfig,
  ESLintLinterOptions,
  ESLintRules,
  MapFn,
  Recursive,
  RecursiveArray,
} from "@/types";

import { posix } from "node:path";
import { load as $load, interopDefault } from "./modules";
import { InnerAggregateError, InnerError } from "./errors";
import { measurePromise, promisify } from "./misc";
import { reduce } from "./reduce";

import type { ActionWithPayload, Reducer } from "./reduce";
import type { InteropDefaultProperties, ModuleSpecifiers } from "./modules";

export interface Config<R extends ESLintRules = ESLintRules> extends ESLintConfig {
  languageOptions?: ESLintLinterOptions;
  rules?: R;
}

export interface NamedConfig<N extends string = string, R extends ESLintRules = ESLintRules> extends Config<R> {
  name?: N;
}

export type ConfigArray<R extends ESLintRules = ESLintRules> = RecursiveArray<Config<R>>;
export type FailedConfig<N extends string = string> = NamedConfig<`FAILED > ${N}`>;
export type NamelessConfig<R extends ESLintRules = ESLintRules> = Omit<Config<R>, "name">;

export interface ConfigDefiner<O = unknown, C extends Config = Config> extends Definer<O, C> {}
export interface ConfigDefinerSync<O = unknown, C extends Config = Config> extends DefinerSync<O, C> {}
export interface ConfigDefinerAsync<O = unknown, C extends Config = Config> extends DefinerAsync<O, C> {}

export interface ConfigArrayDefiner<O = unknown, C extends ConfigArray = ConfigArray> extends Definer<O, C> {}
export interface ConfigArrayDefinerSync<O = unknown, C extends ConfigArray = ConfigArray> extends DefinerSync<O, C> {}
export interface ConfigArrayDefinerAsync<O = unknown, C extends ConfigArray = ConfigArray> extends DefinerAsync<O, C> {}

export function definer<
  O = unknown,
  N extends string = string,
  C extends NamelessConfig = NamelessConfig,
>(name: N, define: ConfigDefiner<O, C>): ConfigDefinerAsync<O, NamedConfig<N> | FailedConfig<N>> {
  return async function(options) {
    try {
      const [config, ms] = await measurePromise(promisify(define)(options));
      notify(name, `Finished loading in ${ms.toFixed(2)}ms`);
      return { ...config, name };
    } catch (error) {
      reportError(name, error);
      report(name, "Failed to load");
      return { name: `FAILED > ${name}` };
    }
  };
}

function reportError(name: string, error: unknown) {
  if (error instanceof InnerAggregateError) {
    error.errors.forEach((error) => reportError(name, error));
  } else if (error instanceof InnerError) {
    report(name, error.message);
  } else {
    throw error;
  }
}

function report(name: string, ...messages: Array<string>) {
  console.warn(format(name, ...messages));
}

function notify(name: string, ...messages: Array<string>) {
  console.log(format(name, ...messages));
}

function format(name: string, ...messages: Array<string>) {
  return [`[${name}]`, ...messages].join(" ");
}

type ConfigModules = {
  globals: typeof import("globals");

  "eslint-plugin-import-x": typeof import("eslint-plugin-import-x");
  "eslint-plugin-perfectionist": typeof import("eslint-plugin-perfectionist");
  "eslint-plugin-react-x": typeof import("eslint-plugin-react-x");
  "eslint-plugin-react-dom": typeof import("eslint-plugin-react-dom");
  "eslint-plugin-react-hooks": typeof import("eslint-plugin-react-hooks");
  "eslint-plugin-react-refresh": typeof import("eslint-plugin-react-refresh");
  "@stylistic/eslint-plugin": typeof import("@stylistic/eslint-plugin");
  "@typescript-eslint/eslint-plugin": typeof import("@typescript-eslint/eslint-plugin");
  "@typescript-eslint/parser": typeof import("@typescript-eslint/parser");
};

export function load<N extends ModuleSpecifiers<ConfigModules> = []>(...specifiers: N) {
  return $load<ConfigModules, N>(...specifiers).then((values) => {
    return values.map(interopDefault) as InteropDefaultProperties<typeof values>;
  });
}

const SET = "set";
const MAP = "map";
const EXT = "ext";

type SetAction<T = unknown> = ActionWithPayload<typeof SET, T>;
type MapAction<T = unknown> = ActionWithPayload<typeof MAP, MapFn<T>>;
type ExtAction<T = unknown> = ActionWithPayload<typeof EXT, T>;

export function set<T>(payload: T): SetAction<T> {
  return { type: SET, payload };
}

export function map<T>(payload: MapFn<T>): MapAction<T> {
  return { type: MAP, payload };
}

export function ext<T>(payload: T): ExtAction<T> {
  return { type: EXT, payload };
}

type OverridesField = Extract<keyof Config,
  | "basePath"
  | "files"
  | "ignores"
  | "languageOptions"
  | "linterOptions"
  | "plugins"
  | "rules"
  | "settings"
>;

type OverridesAction<T> = SetAction<T> | MapAction<T> | ExtAction<T>;
type OverridesReducers = { [K in OverridesField]-?: Reducer<Config[K], OverridesAction<Config[K]>> };

const $set = <T>(_: T, p: T) => p;
const $map = <T>(v: T, p: MapFn<T>) => p(v);
const $extArr = <T>(v: Array<T> | undefined = [], p: Array<T> | undefined = []) => ([...v, ...p]);
const $extObj = <T extends object>(v: T | undefined, p: T | undefined) => ({ ...v, ...p });

const reducers: OverridesReducers = {
  basePath: {
    set: $set,
    map: $map,
    ext: (v, p) => posix.join(v || "", p || ""),
  },

  files: {
    set: $set,
    map: $map,
    ext: $extArr,
  },

  ignores: {
    set: $set,
    map: $map,
    ext: $extArr,
  },

  languageOptions: {
    set: $set,
    map: $map,
    ext: $extObj,
  },

  linterOptions: {
    set: $set,
    map: $map,
    ext: $extObj,
  },

  plugins: {
    set: $set,
    map: $map,
    ext: $extObj,
  },

  rules: {
    set: $set,
    map: $map,
    ext: $extObj,
  },

  settings: {
    set: $set,
    map: $map,
    ext: $extObj,
  },
};

export type ConfigOverrides<C extends Config = Config, F extends OverridesField = OverridesField> = {
  [K in F]?: OverridesAction<C[K]>
};

export function override<C extends Config>(config: C, overrides: ConfigOverrides<C> | undefined): C {
  if (overrides) {
    try {
      for (const entry of Object.entries(reducers)) {
        const [key, value] = entry as ["basePath", OverridesReducers["basePath"]];
        if (overrides[key]) config[key] = reduce(config[key], overrides[key], value);
      }
    } catch (error) {
      if (error instanceof InnerError) {
        throw new InnerError("Encountered invalid overrider. Use \"set\", \"map\" and \"ext\" utility functions");
      }
      throw error;
    }
  }
  return config;
}

type ComposeData<O extends Array<unknown>> = {
  [K in keyof O]: [ConfigDefinerAsync<O[K]> | ConfigArrayDefinerAsync<O[K]>, O[K] | boolean]
};

export function compose<O extends Array<unknown>>(data: ComposeData<O>): Promise<ConfigArray> {
  return Promise.all(data.reduce<Array<Promise<Recursive<Config>>>>((configs, [definer, options]) => {
    if (options === true) {
      configs.push(definer());
    } else if (options) {
      configs.push(definer(options));
    }
    return configs;
  }, []));
}
