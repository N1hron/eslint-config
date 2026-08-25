import type { ReactCoreRules } from "../core";
import type { ReactHooksRules } from "./types.gen";

const compats: ReactCoreRules = {
  "react-x/error-boundaries": "off",
  "react-x/exhaustive-deps": "off",
  "react-x/globals": "off",
  "react-x/immutability": "off",
  "react-x/purity": "off",
  "react-x/refs": "off",
  "react-x/rules-of-hooks": "off",
  "react-x/set-state-in-effect": "off",
  "react-x/set-state-in-render": "off",
  "react-x/static-components": "off",
  "react-x/unsupported-syntax": "off",
  "react-x/use-memo": "off",
};

const core: ReactHooksRules = {
  "react-hooks/config": "error", // Crucial for react compiler to work correctly
  "react-hooks/error-boundaries": "error", // Crucial for react to work correctly
  "react-hooks/globals": "error", // Side effects must run outside of render
  "react-hooks/immutability": "error", // React values must be immutable
  "react-hooks/preserve-manual-memoization": "error", // Crucial for react compiler to work correctly
  "react-hooks/purity": "error", // Components and hooks must be pure
  "react-hooks/rules-of-hooks": "error", // Crucial for react to work correctly
  "react-hooks/unsupported-syntax": "error", // Crucial for react compiler to work correctly
  "react-hooks/use-memo": "error", // Crucial for useMemo to work correctly

  "react-hooks/exhaustive-deps": "warn",
  "react-hooks/incompatible-library": "warn",
  "react-hooks/refs": "warn",
  "react-hooks/set-state-in-effect": "warn",
  "react-hooks/set-state-in-render": "warn",
  "react-hooks/static-components": "warn",
};

export const rules = { compats, core };
