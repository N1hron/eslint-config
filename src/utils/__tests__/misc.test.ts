import { describe, expect, it, vi } from "vitest";
import { isObject, measurePromise, promisify } from "../misc";

describe("isObject", () => {
  describe("returns true if value is an object", () => {
    it.for([{}, [[]], new Map(), new Set()])("isObject(%o) => true", (value) => {
      expect(isObject(value)).toBe(true);
    });
  });

  describe("returns false if value is not an object", () => {
    it.for([1, 1n, "1", true, false, undefined, Symbol()])("isObject(%o) => false", (value) => {
      expect(isObject(value)).toBe(false);
    });
  });

  it("returns false if value is null", () => {
    expect(isObject(null)).toBe(false);
  });
});

describe("measure", () => {
  it("adds the execution time to the resolved value of the original promise", async () => {
    const obj = {};
    const err = new Error("Mock error");
    const spy = vi.spyOn(performance, "now");

    spy.mockReturnValueOnce(500).mockReturnValueOnce(1000);

    const result = await measurePromise(Promise.resolve(obj));

    expect(result[0]).toBe(obj);
    expect(result[1]).toBe(500);

    await expect(measurePromise(Promise.reject(err))).rejects.toThrow("Mock error");
  });
});

describe("promisify", () => {
  it("turns sync function into its async equivalent", async () => {
    const obj = {};
    const sync = vi.fn(() => obj);
    const async = promisify(sync);

    const result = async();

    expect(result instanceof Promise).toBeTruthy();
    await expect(result).resolves.toBe(obj);
  });
});
