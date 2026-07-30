import { ConfigUtils } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";
import type { Config, CreateConfig } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { PerfectionistRules } from "./types.gen";

type PerfectionistConfig = Config<PerfectionistRules>;

export interface PerfectionistOptions {
  overrides?: ConfigOverrides<PerfectionistConfig>;
}

type Perfectionist = CreateConfig<PerfectionistOptions>;

const utils = new ConfigUtils("n1hron/perfectionist");

export const perfectionist: Perfectionist = async ({ overrides = {} } = {}) => {
  const [perfectionist] = await utils.load("eslint-plugin-perfectionist");

  const config: PerfectionistConfig = {
    name: utils.configName,
    files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
    plugins: { perfectionist },
    rules,
  };

  return utils.override(config, overrides);
};
