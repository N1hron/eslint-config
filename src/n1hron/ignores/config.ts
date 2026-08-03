import { ConfigUtils } from "@/utils";

import type { Config, ConfigCreator } from "@/types";
import type { ConfigOverrides } from "@/utils";

export interface IgnoresOptions {
  overrides?: ConfigOverrides<Config, "basePath" | "ignores" | "name">;
}

type Ignores = ConfigCreator<IgnoresOptions>;

const utils = new ConfigUtils("n1hron/ignores");

export const ignores: Ignores = ({ overrides = {} } = {}) => utils.override(
  {
    name: utils.configName,
    ignores: [
      "**/node_modules",
      "**/dist",
      "**/package-lock.json",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "**/bun.lockb",

      "**/output",
      "**/coverage",
      "**/temp",
      "**/.temp",
      "**/tmp",
      "**/.tmp",
      "**/.history",
      "**/.vitepress/cache",
      "**/.nuxt",
      "**/.next",
      "**/.svelte-kit",
      "**/.vercel",
      "**/.changeset",
      "**/.idea",
      "**/.cache",
      "**/.output",
      "**/.vite-inspect",
      "**/.yarn",

      "**/CHANGELOG*.md",
      "**/LICENSE*",
      "**/*.min.*",
      "**/__snapshots__",

      "**/vite.config.*.timestamp-*",
      "**/auto-import?(s).d.ts",
      "**/components.d.ts",

      "**/.context",
      "**/.claude",
      "**/.agents",
      "**/.*/skills",
    ],
  },
  overrides,
);
