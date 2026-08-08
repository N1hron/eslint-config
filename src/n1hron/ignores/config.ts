import { ConfigCreator } from "@/utils";

import type { ConfigOverrides } from "@/utils";

export interface IgnoresOptions {
  overrides?: Pick<ConfigOverrides, "basePath" | "ignores">;
}

const c = new ConfigCreator("n1hron/ignores");

export const ignores = c.define<IgnoresOptions>(({ overrides } = {}) => c.override(
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
