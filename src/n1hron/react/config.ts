import { compose, one } from "@/utils";
import { core } from "./core";
import { dom } from "./dom";
import { hooks } from "./hooks";
import { refresh } from "./refresh";

import type { DefineConfigArrayAsync } from "@/types";
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

interface React extends DefineConfigArrayAsync<ReactOptions> {
  core: typeof core;
  dom: typeof dom;
  hooks: typeof hooks;
  refresh: typeof refresh;
}

const react: React = ({
  core = one("eslint-plugin-react-x"),
  dom = one("eslint-plugin-react-dom"),
  hooks = one("eslint-plugin-react-hooks"),
  refresh = one("eslint-plugin-react-refresh"),
} = {}) => compose([
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
