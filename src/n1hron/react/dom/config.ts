import { ConfigUtils } from "@/utils";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { Config, ConfigCreator } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { ReactDomRules } from "./types.gen";

type ReactDomConfig = Config<ReactDomRules>;

export interface ReactDomOptions {
  overrides?: ConfigOverrides<ReactDomConfig>;
}

type ReactDom = ConfigCreator<ReactDomOptions>;

const utils = new ConfigUtils("n1hron/react/dom");

export const dom: ReactDom = ({
  overrides = {},
} = {}) => utils.load("eslint-plugin-react-dom").then(([{ default: reactDOM }]) => utils.override<ReactDomConfig>(
  {
    name: utils.configName,
    files: [FILES_JSX, FILES_TSX],
    plugins: { "react-dom": reactDOM },
    rules,
  },
  overrides,
));
