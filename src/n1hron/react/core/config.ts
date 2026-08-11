import { ConfigCreator, exists } from "@/utils";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { ConfigOverrides } from "@/utils";
import type { NamelessConfig } from "@/types";
import type { ReactCoreRules } from "./types.gen";

type ReactCoreConfig = NamelessConfig<ReactCoreRules>;

export interface ReactCoreOptions {
  rulesets?: {
    /** @default `true` */
    core?: boolean;
    /** @default `true` if {@link https://www.npmjs.com/package/typescript-eslint|typescript-eslint} installed, `false` otherwise. */
    typechecked?: boolean;
  };
  overrides?: ConfigOverrides<ReactCoreConfig>;
}

const c = new ConfigCreator<ReactCoreConfig>("n1hron/react/core");

export const core = c.define<ReactCoreOptions>(({
  rulesets: { core = true, typechecked = exists("typescript-eslint") } = {},
  overrides,
} = {}) => c.load("eslint-plugin-react-x").then(([{ default: reactX }]) => c.override(
  {
    files: [FILES_JSX, FILES_TSX],
    plugins: { "react-x": reactX },
    rules: {
      ...(core && rules.core),
      ...(typechecked && rules.typechecked),
    },
  },
  overrides,
)));
