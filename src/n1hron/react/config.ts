import { compose } from "@/utils/config";
import { core } from "./core";
import { dom } from "./dom";
import { has } from "@/utils/modules";
import { hooks } from "./hooks";
import { refresh } from "./refresh";

import type { ConfigArrayDefinerAsync } from "@/utils/config";
import type { ReactCoreOptions } from "./core";
import type { ReactDomOptions } from "./dom";
import type { ReactHooksOptions } from "./hooks";
import type { ReactRefreshOptions } from "./refresh";

export interface ReactOptions {
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-react-x|eslint-plugin-react-x} to be installed.
   * @default `true` if {@link https://www.npmjs.com/package/eslint-plugin-react-x|eslint-plugin-react-x} installed, `false` otherwise.
   */
  core?: boolean | ReactCoreOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-react-dom|eslint-plugin-react-dom} to be installed.
   * @default `true` if {@link https://www.npmjs.com/package/eslint-plugin-react-dom|eslint-plugin-react-dom} installed, `false` otherwise.
   */
  dom?: boolean | ReactDomOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-react-hooks|eslint-plugin-react-hooks} to be installed.
   * @default `true` if {@link https://www.npmjs.com/package/eslint-plugin-react-hooks|eslint-plugin-react-hooks} installed, `false` otherwise.
   */
  hooks?: boolean | ReactHooksOptions;
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-react-refresh|eslint-plugin-react-refresh} to be installed.
   * @default `true` if {@link https://www.npmjs.com/package/eslint-plugin-react-refresh|eslint-plugin-react-refresh} installed, `false` otherwise.
   */
  refresh?: boolean | ReactRefreshOptions;
}

interface React extends ConfigArrayDefinerAsync<ReactOptions> {
  core: typeof core;
  dom: typeof dom;
  hooks: typeof hooks;
  refresh: typeof refresh;
}

const react: React = async (options = {}) => {
  const {
    core = await has.exact("eslint-plugin-react-x", "^4.17.1"),
    dom = await has.exact("eslint-plugin-react-dom", "^5.14.7"),
    hooks = await has.exact("eslint-plugin-react-hooks", "^7.1.1"),
    refresh = await has.exact("eslint-plugin-react-refresh", "^0.5.3"),
  } = options;

  return compose([
    [react.core, core],
    [react.dom, dom],
    [react.hooks, hooks],
    [react.refresh, refresh],
  ]);
};

react.core = core;
react.dom = dom;
react.hooks = hooks;
react.refresh = refresh;

export { react };
