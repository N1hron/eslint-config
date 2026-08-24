import type { JavascriptCoreRules } from "./types.gen";

const core: JavascriptCoreRules = {
  "constructor-super": "error", // Constructors of derived classes must call super()
  "no-const-assign": "error", // An attempt to modify a constant binding will raise an error
  "no-import-assign": "error", // An attempt to modify a imported binding will raise an error
  "no-invalid-regexp": "error", // Invalid RegExp constructor will throw a SyntaxError
  "no-irregular-whitespace": "error", // Invalid or irregular whitespace causes issues with ECMAScript 5 parsers
  "no-new-native-nonconstructor": "error", // Usage of some global objects without new operator will cause an error
  "no-obj-calls": "error", // Usage of some global objects as functions will cause an error
  "no-this-before-super": "error", // Usage of this/super before super() will cause a ReferenceError
  "no-undef": "error", // Usage of undefined variables will cause a ReferenceError
  "no-unsafe-optional-chaining": "error", // Optional chaining expression that is evaluated to undefined may cause a TypeError

  "getter-return": ["warn", { allowImplicit: true }],
  "no-array-constructor": "warn",
  "no-async-promise-executor": "warn",
  "no-class-assign": "warn",
  "no-compare-neg-zero": "warn",
  "no-cond-assign": "warn",
  "no-constant-binary-expression": "warn",
  "no-constant-condition": "warn",
  "no-control-regex": "warn",
  "no-dupe-args": "warn",
  "no-dupe-class-members": "warn",
  "no-dupe-else-if": "warn",
  "no-dupe-keys": "warn",
  "no-duplicate-case": "warn",
  "no-empty-character-class": "warn",
  "no-empty-pattern": "warn",
  "no-ex-assign": "warn",
  "no-func-assign": "warn",
  "no-loss-of-precision": "warn",
  "no-misleading-character-class": "warn",
  "no-prototype-builtins": "warn",
  "no-self-assign": "warn",
  "no-setter-return": "warn",
  "no-sparse-arrays": "warn",
  "no-unassigned-vars": "warn",
  "no-unexpected-multiline": "warn",
  "no-unreachable": "warn",
  "no-unreachable-loop": "warn",
  "no-unsafe-finally": "warn",
  "no-unsafe-negation": "warn",
  "no-unused-expressions": "warn",
  "no-unused-private-class-members": "warn",
  "no-unused-vars": "warn",
  "no-useless-assignment": "warn",
  "no-useless-backreference": "warn",
  "require-atomic-updates": "warn",
  "use-isnan": "warn",
  "valid-typeof": "warn",
};

const suggestions: JavascriptCoreRules = {
  "no-caller": "error", // Both arguments.caller and arguments.callee are deprecated and should not be used
  "no-delete-var": "error", // Deleting variables, including function parameters, never works and throws SyntaxError in strict mode
  "no-iterator": "error", // The __iterator__ property is deprecated in favor of ES6 iterators/generators and should not be used
  "no-nonoctal-decimal-escape": "error", // \8 and \9 escape sequences are invalid non-octal decimal escapes and should not be used
  "no-octal": "error", // ES6 0o755 syntax should be used instead of legacy octal literals (e.g. 0755)
  "no-proto": "error", // Object.getPrototypeOf/setPrototypeOf should be used instead of the __proto__ property
  "no-with": "error", // The with statement is deprecated and should not be used

  "class-methods-use-this": "warn",
  "default-param-last": "warn",
  eqeqeq: ["warn", "smart"],
  "no-case-declarations": "warn",
  "no-else-return": "warn",
  "no-empty": "warn",
  "no-empty-function": "warn",
  "no-empty-static-block": "warn",
  "no-eval": "warn",
  "no-extra-boolean-cast": "warn",
  "no-extra-label": "warn",
  "no-global-assign": "warn",
  "no-implied-eval": "warn",
  "no-lonely-if": "warn",
  "no-object-constructor": "warn",
  "no-param-reassign": "warn",
  "no-redeclare": "warn",
  "no-script-url": "warn",
  "no-shadow-restricted-names": "warn",
  "no-throw-literal": "warn",
  "no-unused-labels": "warn",
  "no-useless-call": "warn",
  "no-useless-catch": "warn",
  "no-useless-computed-key": "warn",
  "no-useless-concat": "warn",
  "no-useless-constructor": "warn",
  "no-useless-escape": "warn",
  "no-useless-rename": "warn",
  "no-useless-return": "warn",
  "prefer-const": "warn",
  "prefer-template": "warn",
  "preserve-caught-error": "warn",
  "require-await": "warn",
  "require-yield": "warn",
};

export const rules = { core, suggestions };
