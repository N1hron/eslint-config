import { InnerError } from "./errors";
import { isObject } from "./misc";

export interface ReduceAction<T extends string = string, P = unknown> {
  type: T;
  payload: P;
}

export type Reducer<V, A extends ReduceAction> = {
  [T in A["type"]]: (value: V, payload: Extract<A, ReduceAction<T>>["payload"]) => V
};

export function isReduceAction(value: unknown): value is ReduceAction {
  return isObject(value) && "type" in value && typeof value.type === "string" && "payload" in value;
}

export function reduce<V, A extends ReduceAction>(value: V, action: A, reducer: Reducer<V, A>) {
  if (!isReduceAction(action)) {
    throw new InnerError("Specified reduce action is invalid");
  }

  if (!(action.type in reducer)) {
    throw new InnerError("Specified reduce action is not supported by provided reducer");
  }

  return reducer[action.type as keyof Reducer<V, A>](value, action.payload);
}
