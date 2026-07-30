import { builtinRules } from "eslint/use-at-your-own-risk";
import { pluginsToRulesDTS } from "eslint-typegen/core";
import type { ESLintPlugin } from "@/types";

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

interface PluginData {
  name: string;
  type: string;
  prefix: string;
  plugin: ESLintPlugin;
  children?: PluginData[];
}

const data: PluginData[] = [
  {
    name: "typescript",
    type: "TypescriptRules",
    prefix: "@typescript-eslint",
    plugin: tseslint.plugin,
  },
  {
    name: "stylistic",
    type: "StylisticRules",
    prefix: "@stylistic",
    plugin: stylistic,
  },
  {
    name: "javascript",
    type: "JavascriptRules",
    prefix: "",
    plugin: { rules: Object.fromEntries(builtinRules) },
  },
  {
    name: "imports",
    type: "ImportsRules",
    prefix: "import-x",
    plugin: importX,
  },
  {
    name: "perfectionist",
    type: "PerfectionistRules",
    prefix: "perfectionist",
    plugin: perfectionist,
  },
  {
    name: "react",
    type: "ReactRules",
    prefix: "react-x",
    plugin: reactX,

    children: [
      {
        name: "hooks",
        type: "ReactHooksRules",
        prefix: "react-hooks",
        plugin: reactHooks as ESLintPlugin,
      },
      {
        name: "dom",
        type: "ReactDomRules",
        prefix: "react-dom",
        plugin: reactDom,
      },
      {
        name: "refresh",
        type: "ReactRefreshRules",
        prefix: "react-refresh",
        plugin: reactRefresh,
      },
    ],
  },
];

const generate = (data: PluginData[], location: string) => Promise.all(data.map(async (item) => {
  const dir = path.join(location, item.name);

  await fs.mkdir(dir, { recursive: true });

  const types = await pluginsToRulesDTS(
    { [item.prefix]: item.plugin },
    { includeAugmentation: false, exportTypeName: item.type },
  ).then((types) => types.replace(
    `export interface ${item.type} {`,
    "$&\n  [key: string]: Linter.RuleEntry<unknown[]>",
  ));

  await fs.writeFile(path.join(dir, "types.gen.ts"), types);

  if (item.children?.length) {
    await generate(item.children, dir);
  }
}));

await generate(data, path.resolve(import.meta.dirname, "../src/n1hron"));
