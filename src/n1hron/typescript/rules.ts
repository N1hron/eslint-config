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
  "@typescript-eslint/no-explicit-any": "error", // This is an escape hatch from the type system
  "@typescript-eslint/no-unsafe-declaration-merging": "error", // Declaration merging between classes and interfaces breaks types
  "@typescript-eslint/prefer-namespace-keyword": "error", // "module" keyword is deprecated in favor of "namespace" keyword
  "@typescript-eslint/ban-ts-comment": [ // This is an escape hatch from the type system
    "error",
    {
      "ts-check": false,
      "ts-nocheck": "allow-with-description",
      "ts-expect-error": "allow-with-description",
      "ts-ignore": "allow-with-description",
    },
  ],

  "@typescript-eslint/adjacent-overload-signatures": "warn",
  "@typescript-eslint/array-type": ["warn", { default: "generic" }],
  "@typescript-eslint/consistent-type-assertions": ["warn", { assertionStyle: "as" }],
  "@typescript-eslint/consistent-type-imports": [
    "warn",
    {
      prefer: "type-imports",
      fixStyle: "separate-type-imports",
      disallowTypeAnnotations: false,
    },
  ],
  "@typescript-eslint/default-param-last": "warn",
  "@typescript-eslint/no-array-constructor": "warn",
  "@typescript-eslint/no-duplicate-enum-values": "warn",
  "@typescript-eslint/no-empty-object-type": ["warn", { allowInterfaces: "with-single-extends" }],
  "@typescript-eslint/no-extra-non-null-assertion": "warn",
  "@typescript-eslint/no-namespace": "warn",
  "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
  "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
  "@typescript-eslint/no-this-alias": "warn",
  "@typescript-eslint/no-unnecessary-type-constraint": "warn",
  "@typescript-eslint/no-unsafe-function-type": "warn",
  "@typescript-eslint/no-unused-expressions": "warn",
  "@typescript-eslint/no-unused-private-class-members": "warn",
  "@typescript-eslint/no-unused-vars": [
    "warn",
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
  "@typescript-eslint/no-wrapper-object-types": "warn",
  "@typescript-eslint/prefer-as-const": "warn",
  "@typescript-eslint/triple-slash-reference": "warn",
  "@typescript-eslint/unified-signatures": "warn",

  "default-param-last": "off",
  "no-array-constructor": "off",
  "no-unused-expressions": "off",
  "no-unused-private-class-members": "off",
  "no-unused-vars": "off",
};

const typechecked: TypescriptRules & JavascriptCoreRules = {
  "@typescript-eslint/no-unsafe-argument": "error", // The any type is an escape hatch from the type system
  "@typescript-eslint/no-unsafe-assignment": "error", // The any type is an escape hatch from the type system
  "@typescript-eslint/no-unsafe-call": "error", // The any type is an escape hatch from the type system
  "@typescript-eslint/no-unsafe-member-access": "error", // The any type is an escape hatch from the type system
  "@typescript-eslint/no-unsafe-return": "error", // The any type is an escape hatch from the type system

  "@typescript-eslint/await-thenable": "warn",
  "@typescript-eslint/consistent-type-exports": "warn",
  "@typescript-eslint/no-array-delete": "warn",
  "@typescript-eslint/no-base-to-string": "warn",
  "@typescript-eslint/no-deprecated": "warn",
  "@typescript-eslint/no-duplicate-type-constituents": "warn",
  "@typescript-eslint/no-floating-promises": "warn",
  "@typescript-eslint/no-for-in-array": "warn",
  "@typescript-eslint/no-implied-eval": "warn",
  "@typescript-eslint/no-misused-promises": "warn",
  "@typescript-eslint/no-mixed-enums": "warn",
  "@typescript-eslint/no-redundant-type-constituents": "warn",
  "@typescript-eslint/no-unnecessary-template-expression": "warn",
  "@typescript-eslint/no-unnecessary-type-assertion": "warn",
  "@typescript-eslint/no-unsafe-enum-comparison": "warn",
  "@typescript-eslint/no-unsafe-unary-minus": "warn",
  "@typescript-eslint/only-throw-error": "warn",
  "@typescript-eslint/prefer-promise-reject-errors": "warn",
  "@typescript-eslint/prefer-return-this-type": "warn",
  "@typescript-eslint/require-await": "warn",
  "@typescript-eslint/restrict-plus-operands": "warn",
  "@typescript-eslint/restrict-template-expressions": "warn",
  "@typescript-eslint/switch-exhaustiveness-check": ["warn", { considerDefaultExhaustiveForUnions: true }],
  "@typescript-eslint/unbound-method": "warn",

  "no-implied-eval": "off",
  "no-throw-literal": "off",
  "prefer-promise-reject-errors": "off",
  "require-await": "off",
};

export const rules = { compats, core, typechecked };
