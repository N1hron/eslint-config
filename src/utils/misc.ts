import type { MaybePromise } from "@/types";

export function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

export function measure<T>(promise: Promise<T>): Promise<[T, ms: number]> {
  const start = performance.now();
  return promise.then((result) => [result, performance.now() - start]);
}

export function promisify<A extends Array<unknown>, R, C>(fn: (this: C, ...args: A) => MaybePromise<R>) {
  return function(this: C, ...args: A): Promise<R> {
    return new Promise((resolve) => resolve(fn.apply(this, args)));
  };
}

export function mergeArrays<T>(base: Array<T>, ext: Array<T>): Array<T> {
  return [...base, ...ext];
}

export function mergeObjects<T extends object>(base: T, ext: T): T {
  return Object.assign({}, base, ext);
}
