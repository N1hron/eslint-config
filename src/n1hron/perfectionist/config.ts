import { ConfigCreator } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { ConfigOverrides } from "@/utils";
import type { NamelessConfig } from "@/types";
import type { PerfectionistRules } from "./types.gen";

type PerfectionistConfig = NamelessConfig<PerfectionistRules>;

export interface PerfectionistOptions {
  overrides?: ConfigOverrides<PerfectionistConfig>;
}

const c = new ConfigCreator<PerfectionistConfig>("n1hron/perfectionist");

export const perfectionist = c.define<PerfectionistOptions>(({
  overrides,
} = {}) => c.load("eslint-plugin-perfectionist").then(([perfectionist]) => c.override(
  {
    files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
    plugins: { perfectionist },
    rules,
  },
  overrides,
)));
