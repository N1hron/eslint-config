import { builtinRules } from "eslint/use-at-your-own-risk";
import { pluginsToRulesDTS } from "eslint-typegen/core";

import type { Plugin } from "@eslint/config-helpers";

import fs from "fs/promises";
import path from "path";
import importX from "eslint-plugin-import-x";
import perfectionist from "eslint-plugin-perfectionist";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactX from "eslint-plugin-react-x";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

interface ConfigData {
  name: string;
  type: string;
  plugins: Record<string, Plugin>;

  items?: never;
}

interface ConfigDataGroup {
  name: string;
  items: Array<ConfigData | ConfigDataGroup>;

  type?: never;
  plugins?: never;
}

const data: ConfigDataGroup = {
  name: "n1hron",
  items: [
    {
      name: "typescript",
      type: "TypescriptRules",
      plugins: { "@typescript-eslint": tseslint.plugin },
    },
    {
      name: "stylistic",
      type: "StylisticRules",
      plugins: { "@stylistic": stylistic },
    },
    {
      name: "javascript",
      items: [
        {
          name: "core",
          type: "JavascriptCoreRules",
          // eslint-disable-next-line @typescript-eslint/no-deprecated
          plugins: { "": { rules: Object.fromEntries(builtinRules) } },
        },
      ],
    },
    {
      name: "imports",
      type: "ImportsRules",
      plugins: { "import-x": importX },
    },
    {
      name: "perfectionist",
      type: "PerfectionistRules",
      plugins: { perfectionist: perfectionist },
    },
    {
      name: "react",
      items: [
        {
          name: "core",
          type: "ReactCoreRules",
          plugins: { "react-x": reactX },
        },
        {
          name: "hooks",
          type: "ReactHooksRules",
          plugins: { "react-hooks": reactHooks as Plugin },
        },
        {
          name: "dom",
          type: "ReactDomRules",
          plugins: { "react-dom": reactDom },
        },
        {
          name: "refresh",
          type: "ReactRefreshRules",
          plugins: { "react-refresh": reactRefresh },
        },
      ],
    },
  ],
};

const generate = async (data: ConfigDataGroup | ConfigData, location: string) => {
  if ("type" in data && typeof data.type === "string") {
    const dir = path.join(location, data.name);

    const types = await pluginsToRulesDTS(
      data.plugins,
      { includeAugmentation: false, exportTypeName: data.type },
    ).then((types) => types.replace(
      `export interface ${data.type} {`,
      "$&\n  [key: string]: Linter.RuleEntry<unknown[]>",
    ));

    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, "types.gen.ts"), types);
  } else {
    for (const item of data.items) {
      await generate(item, path.join(location, data.name));
    }
  }
};

await generate(data, path.resolve(import.meta.dirname, "../src"));
