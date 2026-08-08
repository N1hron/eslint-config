import type { JavascriptCoreRules } from "../javascript/core";
import type { TypescriptRules } from "./types.gen";

const compats: JavascriptCoreRules = {
  "constructor-super": "off", // ts(2335) & ts(2377)
  "getter-return": "off", // ts(2378)
  "no-class-assign": "off", // ts(2629)
  "no-const-assign": "off", // ts(2588)
  "no-dupe-args": "off", // ts(2300)
  "no-dupe-class-members": "off", // ts(2393) & ts(2300)
  "no-dupe-keys": "off", // ts(1117)
  "no-func-assign": "off", // ts(2630)
  "no-import-assign": "off", // ts(2632) & ts(2540)
  "no-new-native-nonconstructor": "off", // ts(7009)
  "no-new-symbol": "off", // ts(7009)
  "no-obj-calls": "off", // ts(2349)
  "no-redeclare": "off", // ts(2451)
  "no-setter-return": "off", // ts(2408)
  "no-this-before-super": "off", // ts(2376) & ts(17009)
  "no-undef": "off", // ts(2304) & ts(2552)
  "no-unreachable": "off", // ts(7027)
  "no-unsafe-negation": "off", // ts(2365) & ts(2322) & ts(2358)
  "no-with": "off", // ts(1101) & ts(2410)
};

const core: TypescriptRules & JavascriptCoreRules = {
  "@typescript-eslint/no-duplicate-enum-values": "error",
  "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/no-extra-non-null-assertion": "error",
  "@typescript-eslint/no-import-type-side-effects": "error",
  "@typescript-eslint/no-misused-new": "error",
  "@typescript-eslint/no-namespace": "error",
  "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
  "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
  "@typescript-eslint/no-this-alias": "error",
  "@typescript-eslint/no-unnecessary-type-constraint": "error",
  "@typescript-eslint/no-unsafe-declaration-merging": "error",
  "@typescript-eslint/no-unsafe-function-type": "error",
  "@typescript-eslint/no-wrapper-object-types": "error",
  "@typescript-eslint/prefer-as-const": "error",
  "@typescript-eslint/prefer-namespace-keyword": "error",
  "@typescript-eslint/triple-slash-reference": "error",
  "@typescript-eslint/unified-signatures": "error",
  "@typescript-eslint/default-param-last": "error",
  "@typescript-eslint/no-array-constructor": "error",
  "@typescript-eslint/no-unused-expressions": "error",
  "@typescript-eslint/no-unused-private-class-members": "error",

  "@typescript-eslint/ban-ts-comment": ["error", {
    "ts-check": false,
    "ts-nocheck": "allow-with-description",
    "ts-expect-error": "allow-with-description",
    "ts-ignore": true,
  }],

  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      args: "all",
      argsIgnorePattern: "^_",
      caughtErrors: "all",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      ignoreRestSiblings: true,
    },
  ],

  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      prefer: "type-imports",
      fixStyle: "separate-type-imports",
      disallowTypeAnnotations: false,
    },
  ],

  "no-array-constructor": "off",
  "no-unused-expressions": "off",
  "no-unused-private-class-members": "off",
  "no-unused-vars": "off",
};

const stylistic: TypescriptRules & JavascriptCoreRules = {
  "@typescript-eslint/adjacent-overload-signatures": "error",
  "@typescript-eslint/array-type": ["error", { default: "generic" }],
  "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "as" }],
};

const typechecked: TypescriptRules & JavascriptCoreRules = {
  "@typescript-eslint/await-thenable": ["error"],
  "@typescript-eslint/consistent-type-exports": "error",
  "@typescript-eslint/no-array-delete": "error",
  "@typescript-eslint/no-base-to-string": "error",
  "@typescript-eslint/no-deprecated": "error",
  "@typescript-eslint/no-duplicate-type-constituents": "error",
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/no-for-in-array": "error",
  "@typescript-eslint/no-misused-promises": "error",
  "@typescript-eslint/no-mixed-enums": "error",
  "@typescript-eslint/no-redundant-type-constituents": "error",
  "@typescript-eslint/no-unnecessary-template-expression": "error",
  "@typescript-eslint/no-unnecessary-type-assertion": "error",
  "@typescript-eslint/no-unsafe-argument": "error",
  "@typescript-eslint/no-unsafe-assignment": "error",
  "@typescript-eslint/no-unsafe-call": "error",
  "@typescript-eslint/no-unsafe-enum-comparison": "error",
  "@typescript-eslint/no-unsafe-member-access": "error",
  "@typescript-eslint/no-unsafe-return": "error",
  "@typescript-eslint/no-unsafe-unary-minus": "error",
  "@typescript-eslint/prefer-return-this-type": "error",
  "@typescript-eslint/restrict-plus-operands": "error",
  "@typescript-eslint/restrict-template-expressions": "error",
  "@typescript-eslint/switch-exhaustiveness-check": "error",
  "@typescript-eslint/unbound-method": "error",
  "@typescript-eslint/no-implied-eval": "error",
  "@typescript-eslint/only-throw-error": "error",
  "@typescript-eslint/prefer-promise-reject-errors": "error",
  "@typescript-eslint/require-await": "error",

  "no-implied-eval": "off",
  "no-throw-literal": "off",
  "prefer-promise-reject-errors": "off",
  "require-await": "off",
};

export const rules = { compats, core, stylistic, typechecked };
