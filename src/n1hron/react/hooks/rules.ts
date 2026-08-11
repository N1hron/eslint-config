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
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/config": "error",
  "react-hooks/error-boundaries": "error",
  "react-hooks/gating": "error",
  "react-hooks/globals": "error",
  "react-hooks/immutability": "error",
  "react-hooks/preserve-manual-memoization": "error",
  "react-hooks/purity": "error",
  "react-hooks/static-components": "error",
  "react-hooks/unsupported-syntax": "error",
  "react-hooks/use-memo": "error",

  "react-hooks/exhaustive-deps": "warn",
  "react-hooks/refs": "warn",
  "react-hooks/set-state-in-effect": "warn",
  "react-hooks/set-state-in-render": "warn",
  "react-hooks/incompatible-library": "warn",
};

export const rules = { compats, core };
