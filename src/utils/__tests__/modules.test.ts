import { findPackageJSON } from "node:module";
import { readFile } from "node:fs/promises";
import { describe, expect, it, vi } from "vitest";
import { has, interopDefault, load } from "../modules";
import { InnerAggregateError } from "../errors";

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  return { ...actual, readFile: vi.fn(actual.readFile) };
});

vi.mock("node:module", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:module")>();
  return { ...actual, findPackageJSON: vi.fn(actual.findPackageJSON) };
});

describe("has", () => {
  it("returns true if the specifier resolves to an installed module", () => {
    expect(has("semver")).toBe(true);
  });

  it("returns false if the specifier does not resolve to an installed module", () => {
    expect(has("unknown")).toBe(false);
  });

  describe("all", () => {
    it("returns true if every specifier resolves", () => {
      expect(has.all("semver", "node:path")).toBe(true);
    });

    it("returns false if any specifier fails to resolve", () => {
      expect(has.all("semver", "unknown")).toBe(false);
    });
  });

  describe("any", () => {
    it("returns true if at least one specifier resolves", () => {
      expect(has.any("unknown", "semver")).toBe(true);
    });

    it("returns false if none of the specifiers resolve", () => {
      expect(has.any("unknown", "unknown-2")).toBe(false);
    });
  });

  describe("exact", () => {
    it("resolves with true if the module resolves and satisfies the version range", async () => {
      await expect(has.exact("semver", ">=0.0.0")).resolves.toBe(true);
    });

    it("resolves with false if the module resolves but does not satisfy the version range", async () => {
      await expect(has.exact("semver", "<0.0.0")).resolves.toBe(false);
    });

    it("resolves with false if the module does not resolve", async () => {
      await expect(has.exact("unknown", ">=0.0.0")).resolves.toBe(false);
    });

    it("resolves with false if no package.json can be found for the resolved module", async () => {
      vi.mocked(findPackageJSON).mockReturnValueOnce(undefined);

      await expect(has.exact("semver", ">=0.0.0")).resolves.toBe(false);
    });

    it("resolves with false if the resolved package.json has no version field", async () => {
      vi.mocked(readFile).mockResolvedValueOnce(JSON.stringify({ name: "fake" }));

      await expect(has.exact("semver", ">=0.0.0")).resolves.toBe(false);
    });

    it("resolves with false if determining the module's version throws unexpectedly", async () => {
      vi.mocked(findPackageJSON).mockImplementationOnce(() => {
        throw new Error("Unexpected error");
      });

      await expect(has.exact("semver", ">=0.0.0")).resolves.toBe(false);
    });

    describe("all", () => {
      it("resolves with true if every specifier satisfies its version range", async () => {
        await expect(has.exact.all(["semver", ">=0.0.0"], ["semver", ">=0.0.0"])).resolves.toBe(true);
      });

      it("resolves with false if any specifier fails to satisfy its version range", async () => {
        await expect(has.exact.all(["semver", ">=0.0.0"], ["unknown", ">=0.0.0"])).resolves.toBe(false);
      });
    });

    describe("any", () => {
      it("resolves with true if at least one specifier satisfies its version range", async () => {
        await expect(has.exact.any(["unknown", ">=0.0.0"], ["semver", ">=0.0.0"])).resolves.toBe(true);
      });

      it("resolves with false if none of the specifiers satisfy their version range", async () => {
        await expect(has.exact.any(["unknown", ">=0.0.0"], ["semver", "<0.0.0"])).resolves.toBe(false);
      });
    });
  });
});

vi.mock("globals", () => ({ default: { window: true } }));
vi.mock("eslint-plugin-perfectionist", () => ({ rules: { sort: {} } }));

describe("load", () => {
  it("resolves with the exports of every successfully loaded module, preserving order", async () => {
    await expect(load("globals", "eslint-plugin-perfectionist")).resolves.toEqual([
      { default: { window: true } },
      { rules: { sort: {} } },
    ]);
  });

  it("throws an InnerAggregateError if any of the specified modules fail to load", async () => {
    await expect(load("unknown")).rejects.toThrow("Failed to load modules");
    await expect(load("unknown")).rejects.toBeInstanceOf(InnerAggregateError);
  });

  it("collects an InnerError with a descriptive message for each module that fails to load", async () => {
    await expect(load("globals", "unknown")).rejects.toMatchObject({
      errors: [
        expect.objectContaining({
          message: "Failed to load module \"unknown\". Make sure it is installed",
        }),
      ],
    });
  });
});

describe("interopDefault", () => {
  it("returns the \"default\" property if the value has one", () => {
    expect(interopDefault({ default: 42 })).toBe(42);
  });

  it("returns the value itself if it does not have a \"default\" property", () => {
    const value = { foo: 42 };

    expect(interopDefault(value)).toBe(value);
  });

  it("returns the value itself if it is not an object", () => {
    expect(interopDefault(42)).toBe(42);
    expect(interopDefault("foo")).toBe("foo");
    expect(interopDefault(undefined)).toBe(undefined);
  });

  it("returns the value itself if it is null", () => {
    expect(interopDefault(null)).toBe(null);
  });
});
