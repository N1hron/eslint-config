import { posix } from "node:path";
import { AggregateConfigError, ConfigError } from "@/errors";

import type { Config, ConfigCreator, MaybeConfigArray, MaybePromise, Shift } from "@/types";
import type { ConfigErrorParameters } from "@/errors";

const EXT = Symbol.for("EXT");
const SET = Symbol.for("SET");
const MAP = Symbol.for("MAP");

interface GenericOverrider<T extends symbol, P> {
  type: T;
  payload: P;
}

type ExtOverrider<T> = GenericOverrider<typeof EXT, T>;
type SetOverrider<T> = GenericOverrider<typeof SET, T>;
type MapOverrider<T> = GenericOverrider<typeof MAP, (value: T) => T>;

export type Overrider<T> = ExtOverrider<T> | SetOverrider<T> | MapOverrider<T>;

export function ext<T>(value: T): ExtOverrider<T> {
  return { type: EXT, payload: value };
}

export function set<T>(value: T): SetOverrider<T> {
  return { type: SET, payload: value };
}

export function map<T>(callback: (value: T) => T): MapOverrider<T> {
  return { type: MAP, payload: callback };
}

function isGenericOverrider(value: unknown): value is GenericOverrider<symbol, unknown> {
  return (
    typeof value === "object" && value !== null &&
    "type" in value && typeof value.type === "symbol" &&
    "payload" in value
  );
}

function isExtOverrider<T>(value: unknown): value is ExtOverrider<T> {
  return isGenericOverrider(value) && value.type === EXT;
}

function isSetOverrider<T>(value: unknown): value is SetOverrider<T> {
  return isGenericOverrider(value) && value.type === SET;
}

function isMapOverrider<T>(value: unknown): value is MapOverrider<T> {
  return isGenericOverrider(value) && value.type === MAP;
}

type ConfigOverridableField = Extract<keyof Config,
  | "name"
  | "basePath"
  | "files"
  | "ignores"
  | "languageOptions"
  | "linterOptions"
  | "plugins"
  | "rules"
  | "settings"
>;

export type ConfigOverrides<C extends Config = Config, K extends ConfigOverridableField = ConfigOverridableField> = {
  [F in Extract<ConfigOverridableField, K>]?: Overrider<NonNullable<C[F]>>
};

interface Modules {
  [name: string]: unknown;
}

type ModuleName<M extends Modules> = Exclude<keyof M, number | symbol>;
type ModuleNames<M extends Modules> = Array<ModuleName<M>>;
type ModuleValues<M extends Modules, N extends ModuleNames<M>> = { [K in keyof N]: M[N[K]] };

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

const extArr = <T>(base: T[], ext: T[]): T[] => base.concat(ext);
const extObj = <T extends object>(base: T, ext: T): T => ({ ...base, ...ext });

export class ConfigUtils {
  configName: string;

  constructor(configName: string) {
    this.configName = configName;
  }

  async load<M extends Modules = KnownModules, N extends ModuleNames<M> = []>(...moduleNames: N) {
    const settled = await Promise.allSettled(moduleNames.map((n) => import(n) as unknown));

    const [modules, errors] = settled.reduce((acc, result, i) => {
      if (result.status === "fulfilled") {
        acc[0].push(result.value);
      } else {
        const message = `Failed to load module "${moduleNames[i]!}". Make sure it is installed`;
        acc[1].push(this.#error(message, { cause: result.reason }));
      }
      return acc;
    }, [[] as unknown[], [] as ConfigError[]]);

    if (errors.length > 0) {
      throw this.#aggregateError(errors, "Failed to load modules");
    }

    return modules as ModuleValues<M, N>;
  }

  override<C extends Config = Config>(config: C, overrides: ConfigOverrides<C>): C {
    if (overrides.name) {
      config.name = this.#override(config.name || "", overrides.name, (base, ext) => {
        return ext ? (`${ext} > ${base}`) : (base && "");
      });
    }

    if (overrides.basePath) {
      config.basePath = this.#override(config.basePath || "", overrides.basePath, (base, ext) => {
        return posix.join(base, ext);
      });
    }

    if (overrides.files) {
      config.files = this.#override(config.files || [], overrides.files, extArr);
    }

    if (overrides.ignores) {
      config.ignores = this.#override(config.ignores || [], overrides.ignores, extArr);
    }

    if (overrides.languageOptions) {
      config.languageOptions = this.#override(config.languageOptions || {}, overrides.languageOptions, extObj);
    }

    if (overrides.linterOptions) {
      config.linterOptions = this.#override(config.linterOptions || {}, overrides.linterOptions, extObj);
    }

    if (overrides.plugins) {
      config.plugins = this.#override(config.plugins || {}, overrides.plugins, extObj);
    }

    if (overrides.rules) {
      config.rules = this.#override(config.rules || {}, overrides.rules, extObj);
    }

    if (overrides.settings) {
      config.settings = this.#override(config.settings || {}, overrides.settings, extObj);
    }

    return config;
  }

  #override<T>(value: T, overrider: Overrider<T>, extend: (base: T, ext: T) => T): T {
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

  #error(...args: Shift<ConfigErrorParameters>): ConfigError {
    return new ConfigError(this.configName, ...args);
  }

  #aggregateError(errors: Iterable<ConfigError>, ...args: Shift<ConfigErrorParameters>): ConfigError {
    return new AggregateConfigError(errors, this.configName, ...args);
  }
}

class FailedConfig {
  name: string;

  constructor(name: string) {
    this.name = `FAILED > ${name}`;
  }
}

type Creator<O> = [ConfigCreator<O>, O | boolean];
type Creators<O extends unknown[]> = { [K in keyof O]: Creator<O[K]> };

export async function resolve<O extends unknown[] = unknown[]>(creators: Creators<O>) {
  const configs = creators.reduce((configs, [create, options]) => {
    let config: MaybePromise<MaybeConfigArray>;

    try {
      if (options === true) {
        config = create();
      } else if (options) {
        config = create(options);
      } else {
        return configs;
      }
    } catch (error) {
      if (error instanceof ConfigError) {
        error.report();
        config = new FailedConfig(error.configName);
      } else throw error;
    }

    configs.push(config);

    return configs;
  }, [] as Array<MaybePromise<MaybeConfigArray>>);

  for (let i = 0; i < configs.length; i++) {
    const config = configs[i]!;

    if (config instanceof Promise) {
      try {
        configs[i] = await config;
      } catch (error) {
        if (error instanceof ConfigError) {
          error.report();
          configs[i] = new FailedConfig(error.configName);
        } else throw error;
      }
    }
  }

  return configs as Array<MaybeConfigArray>;
}
