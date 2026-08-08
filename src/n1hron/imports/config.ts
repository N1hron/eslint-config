import { ConfigCreator } from "@/utils";
import { FILES_JS, FILES_JSX, FILES_TS, FILES_TSX } from "@/globs";
import { rules } from "./rules";

import type { ConfigOverrides } from "@/utils";
import type { ImportsRules } from "./types.gen";
import type { NamelessConfig } from "@/types";

type ImportsConfig = NamelessConfig<ImportsRules>;

export interface ImportsOptions {
  overrides?: ConfigOverrides<ImportsConfig>;
}

const c = new ConfigCreator<ImportsConfig>("n1hron/imports");

export const imports = c.define<ImportsOptions>(async ({ overrides } = {}) => {
  const [{ importX }] = await c.load("eslint-plugin-import-x");

  return c.override(
    {
      files: [FILES_JS, FILES_JSX, FILES_TS, FILES_TSX],
      plugins: { "import-x": importX },
      rules,
    },
    overrides,
  );
});
