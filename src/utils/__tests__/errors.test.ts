import { describe, expect, it } from "vitest";
import { InnerAggregateError, InnerError, NamedError } from "../errors";

describe("NamedError", () => {
  it("creates a new instance of NamedError", () => {
    expect(new NamedError()).toBeInstanceOf(NamedError);
  });

  it("sets the error name equal to the constructor name", () => {
    expect(new NamedError().name).toBe(NamedError.name);
  });
});

describe("InnerError", () => {
  it("creates a new instance of InnerError", () => {
    expect(new InnerError()).toBeInstanceOf(InnerError);
  });
});

describe("InnerAggregateError", () => {
  const error = new InnerAggregateError([
    new InnerError("1"),
    new InnerError("2"),
    new InnerError("3"),
  ]);

  it("creates a new instance of InnerAggregateError", () => {
    expect(error).toBeInstanceOf(InnerAggregateError);
  });

  it("contains provided errors", () => {
    expect(error.errors).toHaveLength(3);
  });
});
