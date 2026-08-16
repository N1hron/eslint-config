import { ConfigCreator } from "@/utils";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { ConfigOverrides } from "@/utils";
import type { NamelessConfig } from "@/types";
import type { ReactDomRules } from "./types.gen";

type ReactDomConfig = NamelessConfig<ReactDomRules>;

export interface ReactDomOptions {
  overrides?: ConfigOverrides<ReactDomConfig>;
}

const c = new ConfigCreator<ReactDomConfig>("n1hron/react/dom");

export const dom = c.define<ReactDomOptions>(({
  overrides,
} = {}) => c.load("eslint-plugin-react-dom").then(([reactDOM]) => c.override(
  {
    files: [FILES_JSX, FILES_TSX],
    plugins: { "react-dom": reactDOM },
    rules,
  },
  overrides,
)));
