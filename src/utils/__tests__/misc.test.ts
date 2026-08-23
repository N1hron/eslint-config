import { describe, expect, it, vi } from "vitest";
import { isObject, measure, mergeArrays, mergeObjects, promisify } from "../misc";

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

    const result = await measure(Promise.resolve(obj));

    expect(result[0]).toBe(obj);
    expect(result[1]).toBe(500);

    await expect(measure(Promise.reject(err))).rejects.toThrow("Mock error");
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

describe("mergeArrays", () => {
  it("merges two arrays into one new array", () => {
    const one = [1, 2];
    const two = [3, 4];
    const res = mergeArrays(one, two);

    expect(res).toEqual([1, 2, 3, 4]);
    expect(one).not.toBe(res);
    expect(two).not.toBe(res);
  });
});

describe("mergeObjects", () => {
  it("merges two objects into one new object", () => {
    const one = { one: 1 };
    const two = { two: 2 };
    const res = mergeObjects<object>(one, two);

    expect(res).toEqual({ one: 1, two: 2 });
    expect(one).not.toBe(res);
    expect(two).not.toBe(res);
  });
});
