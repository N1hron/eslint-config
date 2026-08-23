import { definer, load, override } from "@/utils/config";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigOverrides } from "@/utils/config";
import type { ReactRefreshRules } from "./types.gen";

export interface ReactRefreshOptions {
  /** @default `"recommended"` */
  preset?: "vite" | "next" | "recommended";
  overrides?: ConfigOverrides<Config<ReactRefreshRules>>;
}

export const refresh = definer<ReactRefreshOptions>(
  "n1hron/react/refresh",
  ({ preset = "recommended", overrides } = {}) => load("eslint-plugin-react-refresh").then(([reactRefresh]) => override(
    {
      files: [FILES_JSX, FILES_TSX],
      extends: [reactRefresh.configs[preset]],
      plugins: { "react-refresh": reactRefresh },
      rules: { ...rules },
    },
    overrides,
  )),
);
