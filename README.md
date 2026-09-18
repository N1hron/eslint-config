# @n1hron/eslint-config

A personal yet highly configurable ESLint flat config with automatic plugin detection and built-in TypeScript definitions. Inspired by [@antfu/eslint-config](https://github.com/antfu/eslint-config).

> This configuration is built around the author's own preferences. You should review (for example, using `eslint --inspect-config`) and adjust it to your needs before using in your project.

## Requirements

* Node.js `>=22.14.0`.
* ESLint `^9.27.0` or `^10.0.0`.

## Installation

```bash
npm install -D eslint @n1hron/eslint-config
```

Then install whichever dependencies from the table below are relevant to your project:

| Module                 | Dependencies                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `typescript`           | `@typescript-eslint/parser@^8.67.0` and `@typescript-eslint/eslint-plugin@^8.67.0` |
| `stylistic`            | `@stylistic/eslint-plugin@^5.10.0`                                                 |
| `imports`              | `eslint-plugin-import-x@^4.17.1`                                                   |
| `perfectionist`        | `eslint-plugin-perfectionist@^5.10.0`                                              |
| `react.core`           | `eslint-plugin-react-x@^5.14.7`                                                    |
| `react.dom`            | `eslint-plugin-react-dom@^5.14.7`                                                  |
| `react.hooks`          | `eslint-plugin-react-hooks@^7.1.1`                                                 |
| `react.refresh`        | `eslint-plugin-react-refresh@^0.5.3`                                               |
| `next`                 | `@next/eslint-plugin-next@^16.3.4`                                                 |
| `javascript.globals`   | `globals@>=15.4.0`                                                                 |

## Usage

Modules are enabled automatically depending on which dependencies you've installed, so simply exporting `n1hron()` in your `eslint.config.js` is enough:

```javascript
import { n1hron } from "@n1hron/eslint-config";

export default n1hron();
```

You can also configure each module individually:

```javascript
import { n1hron, set, ext, map } from "@n1hron/eslint-config";

export default n1hron(
  // Main configuration
  {
    ignores: {
      overrides: {
        ignores: ext(["**/build/**", "**/*.gen.ts"]),
      },
    },
    imports: {
      overrides: {
        rules: map((rules) => ({
          ...rules,
          "import-x/no-duplicates": "warn",
        })),
      },
    },
    javascript: {
      core: {
        rulesets: {
          core: true,
          suggestions: false,
        },
      },
      globals: {
        env: ["browser"],
        lib: "es2024",
      },
    },
    stylistic: {
      overrides: {
        rules: ext({
          "@stylistic/semi": ["error", "always"],
        }),
      },
    },
    react: {
      core: true,
      dom: true,
      hooks: false,
      refresh: {
        preset: "vite",
      },
    },
    typescript: {
      overrides: {
        files: set(["src/**/*.ts", "src/**/*.tsx"]),
      },
      rulesets: {
        core: true,
        typechecked: false,
      },
    },
    next: {
      rulesets: {
        core: true,
        vitals: true,
      },
    },
    perfectionist: false,
  },
  // Additional flat configs
  { rules: { "no-console": "off" } },
  { rules: {} },
);
```

## Manual Composition

Each module is directly exposed as an asynchronous definer function:

* `n1hron.ignores(options?)`
* `n1hron.javascript(options?)`
* `n1hron.javascript.core(options?)`
* `n1hron.javascript.globals(options?)`
* `n1hron.typescript(options?)`
* `n1hron.stylistic(options?)`
* `n1hron.imports(options?)`
* `n1hron.perfectionist(options?)`
* `n1hron.react(options?)`
* `n1hron.react.core(options?)`
* `n1hron.react.dom(options?)`
* `n1hron.react.hooks(options?)`
* `n1hron.react.refresh(options?)`
* `n1hron.next(options?)`

This is useful if you prefer full control over config assembly instead of relying on the `n1hron()` function. You can pass these directly into ESLint's `defineConfig`:

```javascript
import { defineConfig } from "eslint/config";
import { ext, n1hron } from "@n1hron/eslint-config";

export default defineConfig(
  await n1hron.javascript(),
  await n1hron.stylistic(),
  await n1hron.imports(),
  await n1hron.react.hooks(),
  await n1hron.react.refresh({ preset: "vite" }),

  await n1hron.ignores({
    overrides: {
      ignores: ext(["**/build/**"]),
    },
  }),
  await n1hron.typescript({
    rulesets: { typechecked: true },
  }),

  { rules: { "no-console": "off" } },
  { rules: {} },
);
```

