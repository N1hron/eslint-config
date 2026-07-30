import { ConfigUtils } from "@/utils";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";
import type { Config, CreateConfig } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { ReactDomRules } from "./types.gen";

type ReactDomConfig = Config<ReactDomRules>;

export interface ReactDomOptions {
  overrides?: ConfigOverrides<ReactDomConfig>;
}

type ReactDom = CreateConfig<ReactDomOptions>;

const utils = new ConfigUtils("n1hron/react/dom");

export const dom: ReactDom = async ({ overrides = {} } = {}) => {
  const [{ default: reactDOM }] = await utils.load("eslint-plugin-react-dom");

  const config: ReactDomConfig = {
    name: utils.configName,
    files: [FILES_JSX, FILES_TSX],
    plugins: { "react-dom": reactDOM },
    rules,
  };

  return utils.override(config, overrides);
};
