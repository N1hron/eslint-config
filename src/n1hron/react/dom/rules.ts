import type { ReactDomRules } from "./types.gen";

export const rules: ReactDomRules = {
  "react-dom/no-dangerously-set-innerhtml-with-children": "error",
  "react-dom/no-find-dom-node": "error",
  "react-dom/no-flush-sync": "error",
  "react-dom/no-hydrate": "error",
  "react-dom/no-render": "error",
  "react-dom/no-render-return-value": "error",
  "react-dom/no-use-form-state": "error",
  "react-dom/no-void-elements-with-children": "error",

  "react-dom/no-dangerously-set-innerhtml": "warn",
  "react-dom/no-missing-button-type": "warn",
  "react-dom/no-missing-iframe-sandbox": "warn",
  "react-dom/no-script-url": "warn",
  "react-dom/no-string-style-prop": "warn",
  "react-dom/no-unknown-property": "warn",
  "react-dom/no-unsafe-iframe-sandbox": "warn",
  "react-dom/no-unsafe-target-blank": "warn",
};
