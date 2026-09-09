import { definer, override } from "@/utils/config";

import type { Config, ConfigOverrides } from "@/utils/config";

export interface IgnoresOptions {
  overrides?: ConfigOverrides<Config, "basePath" | "ignores">;
}

export const ignores = definer<IgnoresOptions>("n1hron/ignores", ({ overrides } = {}) => override(
  {
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
));
