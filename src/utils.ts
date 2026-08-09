import type {
  Config,
  ConfigArray,
  DefineConfig,
  DefineConfigArrayAsync,
  DefineConfigAsync,
  MaybePromise,
  ModuleNames,
  Modules,
  ModuleValues,
  NamedConfig,
  NamelessConfig,
  RecursiveConfig,
  Shift,
} from "@/types";

import { posix } from "node:path";
import { AggregateConfigError, ConfigError } from "@/errors";

import type { ConfigErrorParameters } from "@/errors";

const EXT = Symbol.for("EXT");
const SET = Symbol.for("SET");
const MAP = Symbol.for("MAP");

interface Overrider<T extends symbol, P> {
  type: T;
  payload: P;
}

type ExtOverrider<T> = Overrider<typeof EXT, T>;
type SetOverrider<T> = Overrider<typeof SET, T>;
type MapOverrider<T> = Overrider<typeof MAP, (value: T) => T>;

export function ext<T>(value: T): ExtOverrider<T> {
  return { type: EXT, payload: value };
}

export function set<T>(value: T): SetOverrider<T> {
  return { type: SET, payload: value };
}

export function map<T>(callback: (value: T) => T): MapOverrider<T> {
  return { type: MAP, payload: callback };
}

function isOverrider(value: unknown): value is Overrider<symbol, unknown> {
  return (
    typeof value === "object" && value !== null &&
    "type" in value && typeof value.type === "symbol" &&
    "payload" in value
  );
}

function isExtOverrider<T>(value: unknown): value is ExtOverrider<T> {
  return isOverrider(value) && value.type === EXT;
}

function isSetOverrider<T>(value: unknown): value is SetOverrider<T> {
  return isOverrider(value) && value.type === SET;
}

function isMapOverrider<T>(value: unknown): value is MapOverrider<T> {
  return isOverrider(value) && value.type === MAP;
}

export type ConfigOverrider<T> = ExtOverrider<T> | SetOverrider<T> | MapOverrider<T>;

export type ConfigOverrides<C extends Config = Config> = {
  [K in Extract<keyof Config,
  | "basePath"
  | "files"
  | "ignores"
  | "languageOptions"
  | "linterOptions"
  | "plugins"
  | "rules"
  | "settings"
  >]?: ConfigOverrider<NonNullable<C[K]>>
};

interface KnownModules extends Modules {
  globals: typeof import("globals");

  "eslint-plugin-import-x": typeof import("eslint-plugin-import-x");
  "eslint-plugin-perfectionist": typeof import("eslint-plugin-perfectionist");
  "eslint-plugin-react-x": typeof import("eslint-plugin-react-x");
  "eslint-plugin-react-dom": typeof import("eslint-plugin-react-dom");
  "eslint-plugin-react-hooks": typeof import("eslint-plugin-react-hooks");
  "eslint-plugin-react-refresh": typeof import("eslint-plugin-react-refresh");
  "@stylistic/eslint-plugin": typeof import("@stylistic/eslint-plugin");
  "typescript-eslint": typeof import("typescript-eslint");
}

type FailedConfig<N extends string = string> = NamedConfig<`FAILED > ${N}`>;

function extendArray<T>(base: Array<T>, ext: Array<T>): Array<T> {
  return base.concat(ext);
}

function extendObject<T extends object>(base: T, ext: T): T {
  return { ...base, ...ext };
}

export class ConfigCreator<C extends NamelessConfig = NamelessConfig, N extends string = string> {
  #name: N;

  constructor(name: N) {
    this.#name = name;
  }

  define<O>(define: DefineConfig<O, C>): DefineConfigAsync<O, NamedConfig<N> | FailedConfig<N>> {
    return async (options) => {
      let config: MaybePromise<C>;

      try {
        config = define(options);
      } catch (error) {
        return this.#reportWithFallback(error);
      }

      if (config instanceof Promise) {
        try {
          config = await config;
        } catch (error) {
          return this.#reportWithFallback(error);
        }
      }

      return { ...config, name: this.#name };
    };
  }

  async load<M extends Modules = KnownModules, N extends ModuleNames<M> = []>(...names: N) {
    const settled = await Promise.allSettled(names.map((n) => import(n) as unknown));

    const [values, errors] = settled.reduce<[Array<unknown>, Array<ConfigError>]>((acc, result, i) => {
      if (result.status === "fulfilled") {
        acc[0].push(result.value);
      } else {
        const message = `Failed to load module "${names[i]!}". Make sure it is installed`;
        acc[1].push(this.#error(message, { cause: result.reason }));
      }
      return acc;
    }, [[], []]);

    if (errors.length > 0) {
      throw this.#aggregateError(errors, "Failed to load modules");
    }

    return values as ModuleValues<M, N>;
  }

  override(config: C, overrides: ConfigOverrides<C> | undefined): C {
    if (!overrides) {
      return config;
    }

    if (overrides.basePath) {
      config.basePath = this.#override(config.basePath || "", overrides.basePath, (base, ext) => {
        return posix.join(base, ext);
      });
    }

    if (overrides.files) {
      config.files = this.#override(config.files || [], overrides.files, extendArray);
    }

    if (overrides.ignores) {
      config.ignores = this.#override(config.ignores || [], overrides.ignores, extendArray);
    }

    if (overrides.languageOptions) {
      config.languageOptions = this.#override(config.languageOptions || {}, overrides.languageOptions, extendObject);
    }

    if (overrides.linterOptions) {
      config.linterOptions = this.#override(config.linterOptions || {}, overrides.linterOptions, extendObject);
    }

    if (overrides.plugins) {
      config.plugins = this.#override(config.plugins || {}, overrides.plugins, extendObject);
    }

    if (overrides.rules) {
      config.rules = this.#override(config.rules || {}, overrides.rules, extendObject);
    }

    if (overrides.settings) {
      config.settings = this.#override(config.settings || {}, overrides.settings, extendObject);
    }

    return config;
  }

  #override<T>(value: T, overrider: ConfigOverrider<T>, extend: (base: T, ext: T) => T): T {
    if (isExtOverrider<T>(overrider)) {
      return extend(value, overrider.payload);
    }

    if (isMapOverrider<T>(overrider)) {
      return overrider.payload(value);
    }

    if (isSetOverrider<T>(overrider)) {
      return overrider.payload;
    }

    throw this.#error("Encountered invalid overrider. Use \"ext\", \"set\" and \"map\" utility functions");
  }

  #reportWithFallback(error: unknown): FailedConfig<N> {
    if (error instanceof ConfigError) {
      error.report();
      return this.#fallback();
    }
    throw error;
  }

  #fallback(): FailedConfig<N> {
    return { name: `FAILED > ${this.#name}` };
  }

  #error(...args: Shift<ConfigErrorParameters>): ConfigError {
    return new ConfigError(this.#name, ...args);
  }

  #aggregateError(errors: Iterable<ConfigError>, ...args: Shift<ConfigErrorParameters>): ConfigError {
    return new AggregateConfigError(errors, this.#name, ...args);
  }
}

type Definers<O extends Array<unknown>> = { [K in keyof O]: [
  DefineConfigAsync<O[K]> | DefineConfigArrayAsync<O[K]>, O[K] | boolean]
};

export function resolve<O extends Array<unknown> = Array<unknown>>(definers: Definers<O>): Promise<ConfigArray> {
  return Promise.all(definers.reduce<Array<Promise<RecursiveConfig>>>((configs, [define, options]) => {
    if (options === true) {
      configs.push(define());
    } else if (options) {
      configs.push(define(options));
    }

    return configs;
  }, []));
}
