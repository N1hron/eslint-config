import { ConfigCreator } from "@/utils";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { ConfigOverrides } from "@/utils";
import type { NamelessConfig } from "@/types";
import type { ReactRefreshRules } from "./types.gen";

type ReactRefreshConfig = NamelessConfig<ReactRefreshRules>;

export interface ReactRefreshOptions {
  /** @default `"recommended"` */
  preset?: "vite" | "next" | "recommended";
  overrides?: ConfigOverrides<ReactRefreshConfig>;
}

const c = new ConfigCreator<ReactRefreshConfig>("n1hron/react/refresh");

export const refresh = c.define<ReactRefreshOptions>(({
  preset = "recommended",
  overrides,
} = {}) => c.load("eslint-plugin-react-refresh").then(([reactRefresh]) => c.override(
  {
    files: [FILES_JSX, FILES_TSX],
    extends: [reactRefresh.configs[preset]],
    plugins: { "react-refresh": reactRefresh },
    rules: { ...rules },
  },
  overrides,
)));
