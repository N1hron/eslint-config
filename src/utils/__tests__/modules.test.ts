import { describe, expect, it, vi } from "vitest";
import { canResolve, canResolveAll, canResolveAny, interopDefault, load, resolve } from "../modules";
import { InnerAggregateError } from "../errors";

vi.mock("module#1", () => ({ specifier: "module#1" }));
vi.mock("module#2", () => ({ specifier: "module#2" }));
vi.mock("module#3", () => ({ specifier: "module#3" }));

describe("resolve", () => {
  describe("tries to resolve a module specifier to a URL string", () => {
    it("returns resolved URL string on success", () => {
      const result = resolve("eslint");

      expect(typeof result).toBe("string");
      expect(result).toBe(import.meta.resolve("eslint"));
    });

    it("returns undefined on failure", () => {
      expect(resolve("vue")).not.toBeDefined();
    });
  });
});

describe("canResolve", () => {
  it("returns true if module is resolvable", () => {
    expect(canResolve("typescript")).toBe(true);
    expect(canResolve("unknown")).toBe(false);
  });

  it("returns false if module is not resolvable", () => {
    expect(canResolve("react")).toBe(false);
    expect(canResolve("vue")).toBe(false);
  });
});

describe("canResolveAll", () => {
  it("returns true if all modules are resolvable", () => {
    expect(canResolveAll("typescript", "eslint")).toBe(true);
  });

  it("returns false if not all modules are resolvable", () => {
    expect(canResolveAll("react", "vue")).toBe(false);
    expect(canResolveAll("typescript", "react")).toBe(false);
  });
});

describe("canResolveAny", () => {
  it("returns true if any of the modules is resolvable", () => {
    expect(canResolveAny("typescript", "react")).toBe(true);
  });

  it("returns false if none of the modules is resolvable", () => {
    expect(canResolveAny("react", "vue")).toBe(false);
  });
});

describe("load", () => {
  describe("tries to load provided modules", () => {
    it("returns an array of results on success", async () => {
      await expect(load("module#1", "module#2", "module#3")).resolves.toEqual([
        { specifier: "module#1" },
        { specifier: "module#2" },
        { specifier: "module#3" },
      ]);
    });

    it("throws InnerAggregateError on failure", async () => {
      await expect(load("module#1", "unknown#2", "unknown#3")).rejects.toThrow("Failed to load modules");
      await expect(load("unknown#1", "module#2", "unknown#3")).rejects.toBeInstanceOf(InnerAggregateError);
      await expect(load("unknown#1", "unknown#2", "module#3")).rejects.toHaveLength(2);
    });
  });
});

describe("interopDefault", () => {
  it("returns the value of the \"default\" property if it exists", () => {
    const obj = {};

    expect(interopDefault({ default: obj })).toBe(obj);
  });

  it("returns the provided value as-is if it has no \"default\" property", () => {
    const obj = {};
    const str = "str";

    expect(interopDefault(obj)).toBe(obj);
    expect(interopDefault(str)).toBe(str);
  });
});
