import { ConfigUtils } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";
import type { Config, CreateConfig } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { StylisticRules } from "./types.gen";

type StylisticConfig = Config<StylisticRules>;

export interface StylisticOptions {
  overrides?: ConfigOverrides<StylisticConfig>;
}

type Stylistic = CreateConfig<StylisticOptions>;

const utils = new ConfigUtils("n1hron/stylistic");

export const stylistic: Stylistic = async ({ overrides = {} } = {}) => {
  const [{ default: stylistic }] = await utils.load("@stylistic/eslint-plugin");

  const config: StylisticConfig = {
    name: utils.configName,
    files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
    plugins: { "@stylistic": stylistic },
    rules,
  };

  return utils.override(config, overrides);
};
