import type { ReactCoreRules } from "./types.gen";

const core: ReactCoreRules = {
  "react-x/error-boundaries": "error", // Crucial for react to work correctly
  "react-x/globals": "error", // Side effects must run outside of render
  "react-x/immutability": "error", // React values must be immutable
  "react-x/no-create-ref": "error", // createRef must not be used inside function components
  "react-x/no-direct-mutation-state": "error", // React state must be immutable
  "react-x/no-duplicate-key": "error", // Crucial for react to work correctly
  "react-x/no-misused-capture-owner-stack": "error", // Crucial for react to work correctly
  "react-x/purity": "error", // Components and hooks must be pure
  "react-x/rules-of-hooks": "error", // Crucial for react to work correctly
  "react-x/unsupported-syntax": "error", // Crucial for react compiler to work correctly
  "react-x/use-memo": "error", // Crucial for useMemo to work correctly

  "react-x/exhaustive-deps": "warn",
  "react-x/no-access-state-in-setstate": "warn",
  "react-x/no-array-index-key": "warn",
  "react-x/no-children-count": "warn",
  "react-x/no-children-for-each": "warn",
  "react-x/no-children-map": "warn",
  "react-x/no-children-only": "warn",
  "react-x/no-children-to-array": "warn",
  "react-x/no-class-component": "warn",
  "react-x/no-clone-element": "warn",
  "react-x/no-component-will-mount": "warn",
  "react-x/no-component-will-receive-props": "warn",
  "react-x/no-component-will-update": "warn",
  "react-x/no-context-provider": "warn",
  "react-x/no-forward-ref": "warn",
  "react-x/no-missing-component-display-name": "warn",
  "react-x/no-missing-context-display-name": "warn",
  "react-x/no-missing-key": "warn",
  "react-x/no-nested-component-definitions": "warn",
  "react-x/no-nested-lazy-component-declarations": "warn",
  "react-x/no-set-state-in-component-did-mount": "warn",
  "react-x/no-set-state-in-component-did-update": "warn",
  "react-x/no-set-state-in-component-will-update": "warn",
  "react-x/no-unnecessary-use-prefix": "warn",
  "react-x/no-unsafe-component-will-mount": "warn",
  "react-x/no-unsafe-component-will-receive-props": "warn",
  "react-x/no-unsafe-component-will-update": "warn",
  "react-x/no-unstable-context-value": "warn",
  "react-x/no-unstable-default-props": "warn",
  "react-x/no-unused-class-component-members": "warn",
  "react-x/no-unused-state": "warn",
  "react-x/no-use-context": "warn",
  "react-x/refs": "warn",
  "react-x/set-state-in-effect": "warn",
  "react-x/set-state-in-render": "warn",
  "react-x/static-components": "warn",
  "react-x/use-state": "warn",
};

const typechecked: ReactCoreRules = {
  "react-x/no-implicit-children": "warn",
  "react-x/no-implicit-key": "warn",
  "react-x/no-implicit-ref": "warn",
  "react-x/no-leaked-conditional-rendering": "warn",
  "react-x/no-unused-props": "warn",
};

export const rules = { core, typechecked };
