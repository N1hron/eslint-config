import { describe, expect, it } from "vitest";
import { isAction, isActionWithPayload, reduce } from "../reduce";

import type { Action, ActionWithPayload, Reducer } from "../reduce";

const actions: Array<Action> = [
  { type: "inc" },
  { type: "dec" },
];

const actionsWithPayload: Array<ActionWithPayload> = [
  { type: "add", payload: 1 },
  { type: "sub", payload: 2 },
];

const notActions = [1, "1", true, false, [null], undefined, {}, { payload: {} }];

describe("isAction", () => {
  describe("returns true if value is an action", () => {
    it.for([...actions, ...actionsWithPayload])("isAction(%o) => true", (value) => {
      expect(isAction(value)).toBe(true);
    });
  });

  describe("returns false if value is not an action", () => {
    it.for(notActions)("isAction(%o) => false", (value) => {
      expect(isAction(value)).toBe(false);
    });
  });
});

describe("isActionWithPayload", () => {
  describe("returns true if value is an action with a payload", () => {
    it.for(actionsWithPayload)("isActionWithPayload(%o) => true", (value) => {
      expect(isActionWithPayload(value)).toBe(true);
    });
  });

  describe("returns false if value is not an action with a payload", () => {
    it.for([...notActions, ...actions])("isActionWithPayload(%o) => false", (value) => {
      expect(isActionWithPayload(value)).toBe(false);
    });
  });
});

describe("reduce", () => {
  const reducer: Reducer<number, Action<"inc"> | ActionWithPayload<"add", number>> = {
    inc: (v) => v + 1,
    add: (v, p) => v + p,
  };

  it("returns some value depending on provided value, action and reducer", () => {
    expect(reduce(5, { type: "inc" }, reducer)).toBe(6);
    expect(reduce(5, { type: "add", payload: 5 }, reducer)).toBe(10);
  });

  it("throws an error if action is invalid", () => {
    // @ts-expect-error: Required for test to work correctly
    expect(() => reduce(5, {}, reducer)).toThrow("not valid");
  });

  it("throws an error if action and reducer are not compatible with each other", () => {
    // @ts-expect-error: Required for test to work correctly
    expect(() => reduce(5, { type: "dec" }, reducer)).toThrow("not compatible");
  });
});
