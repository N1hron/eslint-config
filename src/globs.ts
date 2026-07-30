export const FILES_JS = "**/*.?([cm])js";
export const FILES_TS = "**/*.?([cm])ts";

export const FILES_JSX = "**/*.?([cm])jsx";
export const FILES_TSX = "**/*.?([cm])tsx";

export const FILES_IGNORE = [
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
];
