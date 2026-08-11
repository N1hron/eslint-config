import type { PerfectionistRules } from "./types.gen";

export const rules: PerfectionistRules = {
  "perfectionist/sort-named-imports": ["warn", { type: "natural", order: "asc" }],
  "perfectionist/sort-named-exports": ["warn", { type: "natural", order: "asc" }],

  "perfectionist/sort-imports": [
    "warn",
    {
      type: "natural",
      order: "asc",
      sortBy: "specifier",
      newlinesBetween: 1,

      groups: [
        { group: "multiline-named-value-builtin", newlinesInside: 1 },
        { group: "multiline-named-value-external", newlinesInside: 1 },
        { group: "multiline-named-value-import", newlinesInside: 1 },

        { group: "multiline-named-type-builtin", newlinesInside: 1 },
        { group: "multiline-named-type-external", newlinesInside: 1 },
        { group: "multiline-named-type-import", newlinesInside: 1 },

        "named-value-builtin",
        { newlinesBetween: 0 },
        "named-value-external",
        { newlinesBetween: 0 },
        "named-value-import",

        "named-type-builtin",
        { newlinesBetween: 0 },
        "named-type-external",
        { newlinesBetween: 0 },
        "named-type-import",

        "value-builtin",
        { newlinesBetween: 0 },
        "value-external",
        { newlinesBetween: 0 },
        "value-import",

        "type-builtin",
        { newlinesBetween: 0 },
        "type-external",
        { newlinesBetween: 0 },
        "type-import",

        "wildcard-value-builtin",
        { newlinesBetween: 0 },
        "wildcard-value-external",
        { newlinesBetween: 0 },
        "wildcard-value-import",

        "wildcard-type-builtin",
        { newlinesBetween: 0 },
        "wildcard-type-external",
        { newlinesBetween: 0 },
        "wildcard-type-import",

        "style",
        "side-effect",
        "ts-equals-import",
      ],
    },
  ],

  "perfectionist/sort-exports": [
    "warn",
    {
      type: "natural",
      order: "asc",
      newlinesBetween: 1,

      groups: [
        "wildcard-export",
        "wildcard-type-export",

        "export",
        "type-export",

        "named-export",
        "named-type-export",

        { group: "multiline-named-export", newlinesInside: 1 },
        { group: "multiline-named-type-export", newlinesInside: 1 },
      ],
    },
  ],
};
