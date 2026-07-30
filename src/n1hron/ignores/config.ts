import { ConfigUtils } from "@/utils";
import { FILES_IGNORE } from "@/globs";
import type { Config, CreateConfig } from "@/types";
import type { ConfigOverrides } from "@/utils";

export interface IgnoresOptions {
  overrides?: ConfigOverrides;
}

type Ignores = CreateConfig<IgnoresOptions>;

const utils = new ConfigUtils("n1hron/ignores");

export const ignores: Ignores = async ({ overrides = {} } = {}) => {
  const config: Config = {
    name: utils.configName,
    ignores: [...FILES_IGNORE],
  };

  return utils.override(config, overrides);
};
