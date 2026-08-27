/* eslint-disable @typescript-eslint/require-await */

import { describe, expect, it, vi } from "vitest";
import { compose, definer, ext, load, map, override, set } from "../config";
import { InnerAggregateError, InnerError } from "../errors";

import type { ConfigDefinerSync } from "../config";

import * as reduce from "../reduce";

describe("definer", () => {
  const name = "example";
  const config = { rules: { "no-console": "error" } } as const;
  const configFailed = { name: `FAILED > ${name}` } as const;

  const define = definer(name, () => config);
  const defineAsync = definer(name, async () => config);

  describe("returns a new async config definer function that", () => {
    it("accepts both sync and async config definer functions", async () => {
      await expect(define()).resolves.toMatchObject(config);
      await expect(defineAsync()).resolves.toMatchObject(config);
    });

    it("adds specified name to the resulting config", async () => {
      await expect(define()).resolves.toEqual({ ...config, name });
      await expect(defineAsync()).resolves.toEqual({ ...config, name });
    });

    it("notifies on success", async () => {
      const spy = vi.spyOn(console, "log");
      const regex = new RegExp(`^\\[${name}] Finished loading in \\d+\\.\\d{2}ms$`);

      await define();

      expect(spy).toHaveBeenCalledWith(expect.stringMatching(regex));
    });

    it("resolves with a failed config if an InnerError occurs", async () => {
      const fail = definer(name, () => {
        throw new InnerError("Something went wrong");
      });

      await expect(fail()).resolves.toEqual(configFailed);
    });

    it("shows a warning for every InnerError", async () => {
      const spy = vi.spyOn(console, "warn");

      const fail = definer(name, () => {
        throw new InnerError("First");
      });

      const failMany = definer(name, () => {
        throw new InnerAggregateError([new InnerError("Second"), new InnerError("Third")]);
      });

      await expect(fail()).resolves.toEqual(configFailed);
      await expect(failMany()).resolves.toEqual(configFailed);

      expect(spy).toHaveBeenCalledWith(`[${name}] First`);
      expect(spy).toHaveBeenCalledWith(`[${name}] Second`);
      expect(spy).toHaveBeenCalledWith(`[${name}] Third`);
      expect(spy).toHaveBeenCalledWith(`[${name}] Failed to load`);
    });

    it("rejects with the original error if it is not an InnerError", async () => {
      const define = definer(name, () => {
        throw new Error("Unexpected error");
      });

      await expect(define()).rejects.toThrow("Unexpected error");
    });
  });
});

vi.mock("globals", () => ({ default: { window: true } }));
vi.mock("eslint-plugin-perfectionist", () => ({ rules: { sort: {} } }));

describe("load", () => {
  it("loads specified modules and resolves their exports using default interop", async () => {
    await expect(load("globals", "eslint-plugin-perfectionist")).resolves.toEqual([
      { window: true },
      { rules: { sort: {} } },
    ]);
  });

  it("throws an InnerAggregateError if any of the specified modules fail to load", async () => {
    // @ts-expect-error: Required for test to work correctly
    await expect(load("unknown")).rejects.toThrow("Failed to load modules");
    // @ts-expect-error: Required for test to work correctly
    await expect(load("unknown")).rejects.toBeInstanceOf(InnerAggregateError);
  });
});

describe("set", () => {
  it("creates a new set action", () => {
    const payload = 5;
    const action = set(payload);

    expect(reduce.isActionWithPayload(action)).toBeTruthy();
    expect(action.payload).toBe(payload);
  });
});

describe("map", () => {
  it("creates a new map action", () => {
    const payload = (v: number) => v + 1;
    const action = map(payload);

    expect(reduce.isActionWithPayload(action)).toBeTruthy();
    expect(action.payload).toBe(payload);
  });
});

describe("ext", () => {
  it("creates a new ext action", () => {
    const payload = 10;
    const action = ext(payload);

    expect(reduce.isActionWithPayload(action)).toBeTruthy();
    expect(action.payload).toBe(payload);
  });
});

describe("override", () => {
  const define: ConfigDefinerSync = () => ({
    basePath: "src",
    files: ["*.ts"],
    ignores: ["dist"],
    languageOptions: { ecmaVersion: 2020 },
    linterOptions: { reportUnusedDisableDirectives: true },
    plugins: { foo: {} },
    rules: { "no-console": "error" },
    settings: { react: { version: "18" } },
  });

  it("returns the config unchanged if no overrides are provided", () => {
    const config = define();

    expect(override(config, undefined)).toBe(config);
  });

  it("applies \"set\" overrides by replacing the field value", () => {
    const config = define();
    const result = override(config, { basePath: set("lib") });

    expect(result.basePath).toBe("lib");
    expect(result).toBe(config);
  });

  it("applies \"map\" overrides by transforming the field value", () => {
    const config = define();
    const result = override(config, { files: map((files) => [...(files ?? []), "*.tsx"]) });

    expect(result.files).toEqual(["*.ts", "*.tsx"]);
  });

  it("applies \"ext\" overrides by concatenating arrays", () => {
    const config = define();
    const result = override(config, { ignores: ext(["build"]) });

    expect(result.ignores).toEqual(["dist", "build"]);
  });

  it("applies \"ext\" overrides by merging objects", () => {
    const config = define();
    const result = override(config, { rules: ext({ "no-unused-vars": "error" }) });

    expect(result.rules).toEqual({ "no-console": "error", "no-unused-vars": "error" });
  });

  it("applies \"ext\" overrides to \"basePath\" by joining paths", () => {
    expect(override({}, { basePath: ext("bar") })).toEqual({ basePath: "bar" });
    expect(override({ basePath: "foo" }, { basePath: ext("") })).toEqual({ basePath: "foo" });
    expect(override({ basePath: "foo" }, { basePath: ext("bar") })).toEqual({ basePath: "foo/bar" });
  });

  it("throws an InnerError if an invalid overrider is provided", () => {
    // @ts-expect-error: Required for test to work correctly
    expect(() => override({}, { basePath: { type: "invalid" } })).toThrow("Encountered invalid overrider");
  });

  it("propagates unknown errors", () => {
    const mock = vi.spyOn(reduce, "reduce").mockThrowOnce(new Error("Unknown error"));

    expect(() => override(define(), { basePath: ext("nested") })).toThrow("Unknown error");

    mock.mockRestore();
  });
});

describe("compose", () => {
  const define = vi.fn(async (options: number = 1) => ({ name: `n-${options}` }));

  it("calls the definer without arguments if its \"options\" is exactly true", async () => {
    await compose([[define, true]]);

    expect(define).toHaveBeenCalledWith();
  });

  it("calls the definer with its \"options\" if they are truthy", async () => {
    await compose([[define, 5]]);

    expect(define).toHaveBeenCalledWith(5);
  });

  it("skips definers whose \"options\" are falsy", async () => {
    define.mockClear();

    const result = await compose([[define, false]]);

    expect(define).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it("resolves with the configs returned by the called definers, preserving order", async () => {
    const defineA = async () => ({ name: "a" });
    const defineB = async () => ({ name: "b" });
    const defineC = async () => ({ name: "c" });

    const result = await compose<[boolean, boolean, boolean]>([
      [defineA, true],
      [defineB, false],
      [defineC, true],
    ]);

    expect(result).toEqual([{ name: "a" }, { name: "c" }]);
  });
});
