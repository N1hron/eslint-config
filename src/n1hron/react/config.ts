import { ConfigUtils, resolve } from "@/utils";
import { dom } from "./dom";
import { FILES_JSX, FILES_TSX } from "@/globs";
import { hooks } from "./hooks";
import { refresh } from "./refresh";
import { rules } from "./rules";

import type { Config, CreateConfig, MaybeConfigArray, MaybePromise } from "@/types";
import type { ConfigOverrides } from "@/utils";
import type { ReactDomOptions } from "./dom";
import type { ReactHooksOptions } from "./hooks";
import type { ReactRefreshOptions } from "./refresh";
import type { ReactRules } from "./types.gen";

type ReactConfig = Config<ReactRules>;

export interface ReactOptions {
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-react-dom|eslint-plugin-react-dom} to be installed
   * @default false
   */
  dom?: boolean | ReactDomOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-react-hooks|eslint-plugin-react-hooks} to be installed
   * @default false
   */
  hooks?: boolean | ReactHooksOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-react-refresh|eslint-plugin-react-refresh} to be installed
   * @default false
   */
  refresh?: boolean | ReactRefreshOptions;
  overrides?: ConfigOverrides<ReactConfig>;
}

interface React extends CreateConfig<ReactOptions> {
  dom: typeof dom;
  hooks: typeof hooks;
  refresh: typeof refresh;
}

const utils = new ConfigUtils("n1hron/react");

const react: React = async ({ dom = false, hooks = false, refresh = false, overrides = {} } = {}) => {
  const [{ default: reactX }] = await utils.load("eslint-plugin-react-x");

  const config: ReactConfig = {
    name: utils.configName,
    files: [FILES_JSX, FILES_TSX],
    plugins: { "react-x": reactX },
    rules,
  };

  const configs: Array<MaybePromise<MaybeConfigArray>> = [utils.override(config, overrides)];

  if (dom === true) configs.push(react.dom());
  else if (dom) configs.push(react.dom(dom));

  if (hooks === true) configs.push(react.hooks());
  else if (hooks) configs.push(react.hooks(hooks));

  if (refresh === true) configs.push(react.refresh());
  else if (refresh) configs.push(react.refresh(refresh));

  return await resolve(configs);
};

react.dom = dom;
react.hooks = hooks;
react.refresh = refresh;

export { react };
