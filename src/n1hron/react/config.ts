import { core } from "./core";
import { dom } from "./dom";
import { hooks } from "./hooks";
import { refresh } from "./refresh";
import { resolve } from "@/utils";

import type { ConfigCreator } from "@/types";
import type { ReactDomOptions } from "./dom";
import type { ReactHooksOptions } from "./hooks";
import type { ReactRefreshOptions } from "./refresh";

export interface ReactOptions {
  /**
   * Requires {@link https://www.npmjs.com/package/eslint-plugin-react-x|eslint-plugin-react-x} to be installed
   * @default true
   */
  core?: boolean | ReactDomOptions;
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
}

interface React extends ConfigCreator<ReactOptions> {
  core: typeof core;
  dom: typeof dom;
  hooks: typeof hooks;
  refresh: typeof refresh;
}

const react: React = async ({ core = true, dom = false, hooks = false, refresh = false } = {}) => resolve([
  [react.core, core],
  [react.dom, dom],
  [react.hooks, hooks],
  [react.refresh, refresh],
]);

react.core = core;
react.dom = dom;
react.hooks = hooks;
react.refresh = refresh;

export { react };
