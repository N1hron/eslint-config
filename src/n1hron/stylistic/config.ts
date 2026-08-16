import { ConfigCreator } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { ConfigOverrides } from "@/utils";
import type { NamelessConfig } from "@/types";
import type { StylisticRules } from "./types.gen";

type StylisticConfig = NamelessConfig<StylisticRules>;

export interface StylisticOptions {
  overrides?: ConfigOverrides<StylisticConfig>;
}

const c = new ConfigCreator<StylisticConfig>("n1hron/stylistic");

export const stylistic = c.define<StylisticOptions>((
  { overrides } = {},
) => c.load("@stylistic/eslint-plugin").then(([stylistic]) => c.override(
  {
    files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
    plugins: { "@stylistic": stylistic },
    rules,
  },
  overrides,
)));
