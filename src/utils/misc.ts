import type { Fn, MaybePromise } from "@/types";

export function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

export function measurePromise<T>(promise: Promise<T>): Promise<[T, ms: number]> {
  const start = performance.now();
  return promise.then((result) => [result, performance.now() - start]);
}

export function promisify<A extends Array<unknown>, R, C>(fn: Fn<A, MaybePromise<R>, C>) {
  return function(this: C, ...args: A): Promise<R> {
    return new Promise((resolve) => resolve(fn.apply(this, args)));
  };
}
