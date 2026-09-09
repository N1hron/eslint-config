import { findPackageJSON } from "node:module";
import { readFile } from "node:fs/promises";
import { satisfies } from "semver";
import { InnerAggregateError, InnerError } from "./errors";
import { isObject, wrap } from "./misc";

type ImportMetaResolve = ImportMeta["resolve"];

function resolve(...args: Parameters<ImportMetaResolve>): string | undefined {
  try {
    return import.meta.resolve(...args);
  } catch {
    return undefined;
  }
}

type FindPackageJSON = typeof findPackageJSON;

async function findVersion(...args: Parameters<FindPackageJSON>): Promise<string | undefined> {
  const packageJSON = findPackageJSON(...args);

  if (packageJSON) {
    try {
      const parsed: unknown = JSON.parse(
        await readFile(packageJSON, { encoding: "utf-8" }),
        (k, v: unknown) => !k || k === "version" ? v : undefined,
      );

      if (isObject(parsed) && "version" in parsed && typeof parsed.version === "string") {
        return parsed.version;
      }
      // eslint-disable-next-line no-empty
    } catch { }
  }
  return undefined;
}

type Specifier = string;
type SpecifierExact = [specifier: Specifier, version: string];

function hasOne(specifier: Specifier) {
  return !!resolve(specifier);
}

function hasAll(...specifiers: Array<Specifier>) {
  return specifiers.every(hasOne);
}

function hasAny(...specifiers: Array<Specifier>) {
  return specifiers.some(hasOne);
}

async function hasExactOne(specifier: Specifier, version: string) {
  const resolved = resolve(specifier);

  if (!resolved) {
    return false;
  }

  return findVersion(resolved).then((v) => !!v && satisfies(v, version)).catch(() => false);
}

const all = (...s: Array<SpecifierExact>) => Promise.all(s.map(([s, v]) => hasExactOne(s, v)));

function hasExactAll(...specifiers: Array<SpecifierExact>) {
  return all(...specifiers).then((r) => r.every((v) => v === true));
}

function hasExactAny(...specifiers: Array<SpecifierExact>) {
  return all(...specifiers).then((r) => r.some((v) => v === true));
}

export const has = Object.assign(
  wrap(hasOne),
  {
    all: wrap(hasAll),
    any: wrap(hasAny),

    exact: Object.assign(
      wrap(hasExactOne),
      {
        all: wrap(hasExactAll),
        any: wrap(hasExactAny),
      },
    ),
  },
);

export type Modules = Record<string, unknown>;

export type ModuleValues<M extends Modules, S extends ModuleSpecifiers<M>> = { [K in keyof S]: M[S[K]] };
export type ModuleSpecifier<M extends Modules> = Exclude<keyof M, number | symbol>;
export type ModuleSpecifiers<M extends Modules> = Array<ModuleSpecifier<M>>;

export async function load<M extends Modules, S extends ModuleSpecifiers<M>>(...specifiers: S) {
  const results = await Promise.allSettled(specifiers.map<unknown>((n) => import(n)));

  const [values, errors] = results.reduce<[Array<unknown>, Array<InnerError>]>((acc, result, i) => {
    if (result.status === "fulfilled") {
      acc[0].push(result.value);
    } else {
      const message = `Failed to load module "${specifiers[i]!}". Make sure it is installed`;
      acc[1].push(new InnerError(message, { cause: result.reason }));
    }
    return acc;
  }, [[], []]);

  if (errors.length === 0) return values as ModuleValues<M, S>;
  throw new InnerAggregateError(errors, "Failed to load modules");
}

export type InteropDefault<T> = T extends { default: infer D } ? D : T;
export type InteropDefaultProperties<T> = { [K in keyof T]: InteropDefault<T[K]> };

export function interopDefault<T>(value: T): InteropDefault<T> {
  return ((isObject(value) && "default" in value) ? value.default : value) as InteropDefault<T>;
}
