import type { PerfectionistRules } from "./types.gen";

export const rules: PerfectionistRules = {
  "perfectionist/sort-named-imports": ["error", { type: "natural", order: "asc" }],
  "perfectionist/sort-named-exports": ["error", { type: "natural", order: "asc" }],

  "perfectionist/sort-imports": [
    "error",
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
        { newlinesBetween: 0 },
        "named-type-builtin",
        { newlinesBetween: 0 },
        "named-type-external",
        { newlinesBetween: 0 },
        "named-type-import",

        "wildcard-value-builtin",
        { newlinesBetween: 0 },
        "wildcard-value-external",
        { newlinesBetween: 0 },
        "wildcard-value-import",
        { newlinesBetween: 0 },
        "wildcard-type-builtin",
        { newlinesBetween: 0 },
        "wildcard-type-external",
        { newlinesBetween: 0 },
        "wildcard-type-import",

        "value-builtin",
        { newlinesBetween: 0 },
        "value-external",
        { newlinesBetween: 0 },
        "value-import",
        { newlinesBetween: 0 },
        "type-builtin",
        { newlinesBetween: 0 },
        "type-external",
        { newlinesBetween: 0 },
        "type-import",

        "style",
        "side-effect",
        "ts-equals-import",
      ],
    },
  ],

  "perfectionist/sort-exports": [
    "error",
    {
      type: "natural",
      order: "asc",
      newlinesBetween: 1,

      groups: [
        { group: "multiline-named-export", newlinesInside: 1 },
        { group: "multiline-named-type-export", newlinesInside: 1 },

        "named-export",
        { newlinesBetween: 0 },
        "named-type-export",

        "wildcard-export",
        { newlinesBetween: 0 },
        "wildcard-type-export",

        "export",
        { newlinesBetween: 0 },
        "type-export",
      ],
    },
  ],
};
