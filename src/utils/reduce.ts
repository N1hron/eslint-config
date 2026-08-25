import { InnerError } from "./errors";
import { isObject } from "./misc";

import type { ExtendFn, MapFn } from "@/types";

export interface Action<T extends string = string> {
  type: T;
}

export interface ActionWithPayload<T extends string = string, P = unknown> extends Action<T> {
  payload: P;
}

export function isAction(value: unknown): value is Action {
  return isObject(value) && "type" in value && typeof value.type === "string";
}

export function isActionWithPayload(value: unknown): value is ActionWithPayload {
  return isAction(value) && "payload" in value;
}

export type Reducer<V, A extends Action> = {
  [T in A["type"]]: Extract<A, Action<T>> extends ActionWithPayload<T, infer P> ? ExtendFn<V, P> : MapFn<V>
};

export function reduce<V, A extends Action>(value: V, action: A, reducer: Reducer<V, A>) {
  if (!isAction(action)) {
    throw new InnerError("Provided action is not valid");
  }

  if (!(action.type in reducer)) {
    throw new InnerError("Provided action and reducer are not compatible with each other");
  }

  const type = action.type as typeof action["type"];

  if ("payload" in action) {
    return reducer[type](value, action.payload);
  }
  return (reducer[type] as MapFn<V>)(value);
}
