import { ConfigUtils } from "@/utils";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigCreator } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { ReactRefreshRules } from "./types.gen";

type ReactRefreshConfig = Config<ReactRefreshRules>;

export interface ReactRefreshOptions {
  /** @default "recommended" */
  preset?: "vite" | "next" | "recommended";
  overrides?: ConfigOverrides<ReactRefreshConfig>;
}

type ReactRefresh = ConfigCreator<ReactRefreshOptions>;

const utils = new ConfigUtils("n1hron/react/refresh");

export const refresh: ReactRefresh = ({
  preset = "recommended",
  overrides = {},
} = {}) => utils.load("eslint-plugin-react-refresh").then(([
  { default: reactRefresh },
]) => utils.override<ReactRefreshConfig>(
  {
    name: utils.configName,
    files: [FILES_JSX, FILES_TSX],
    extends: [reactRefresh.configs[preset]],
    plugins: { "react-refresh": reactRefresh },
    rules,
  },
  overrides,
));
