import { ConfigCreator } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { ConfigOverrides } from "@/utils";
import type { JavascriptCoreRules } from "./types.gen";
import type { NamelessConfig } from "@/types";

type JavascriptCoreConfig = NamelessConfig<JavascriptCoreRules>;

export interface JavascriptCoreOptions {
  rulesets?: {
    /** @default `true` */
    core?: boolean;
    /** @default `true` */
    stylistic?: boolean;
  };
  overrides?: ConfigOverrides<JavascriptCoreConfig>;
}

const c = new ConfigCreator<JavascriptCoreConfig>("n1hron/javascript");

export const core = c.define<JavascriptCoreOptions>(({
  rulesets: { core = true, stylistic = true } = {},
  overrides,
} = {}) => c.override(
  {
    files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
    rules: {
      ...(core && rules.core),
      ...(stylistic && rules.stylistic),
    },
  },
  overrides,
));
