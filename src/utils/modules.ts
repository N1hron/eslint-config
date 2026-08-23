import { InnerAggregateError, InnerError } from "./errors";
import { isObject } from "./misc";

export type Modules = Record<string, unknown>;

export type ModuleValues<M extends Modules, S extends ModuleSpecifiers<M>> = { [K in keyof S]: M[S[K]] };
export type ModuleSpecifier<M extends Modules> = Exclude<keyof M, number | symbol>;
export type ModuleSpecifiers<M extends Modules> = Array<ModuleSpecifier<M>>;

export function resolve(specifier: string): string | undefined {
  try {
    return import.meta.resolve(specifier);
  } catch {
    return undefined;
  }
}

export function canResolve(specifier: string) {
  return Boolean(resolve(specifier));
}

export function canResolveAll(...specifiers: Array<string>) {
  return specifiers.every(canResolve);
}

export function canResolveAny(...specifiers: Array<string>) {
  return specifiers.some(canResolve);
}

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
