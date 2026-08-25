import type { ReactDomRules } from "./types.gen";

export const rules: ReactDomRules = {
  "react-dom/no-find-dom-node": "error", // findDOMNode is deprecated and must not be used
  "react-dom/no-hydrate": "error", // ReactDOM.hydrate() is deprecated in favor of hydrateRoot()
  "react-dom/no-render": "error", // ReactDOM.render() is deprecated in favor of createRoot(node).render()
  "react-dom/no-render-return-value": "error", // Crucial for react to work correctly
  "react-dom/no-use-form-state": "error", // useFormState is deprecated in favor of useActionState
  "react-dom/no-void-elements-with-children": "error", // Void HTML elements can't have children

  "react-dom/no-dangerously-set-innerhtml": "warn",
  "react-dom/no-dangerously-set-innerhtml-with-children": "warn",
  "react-dom/no-flush-sync": "warn",
  "react-dom/no-missing-button-type": "warn",
  "react-dom/no-missing-iframe-sandbox": "warn",
  "react-dom/no-script-url": "warn",
  "react-dom/no-string-style-prop": "warn",
  "react-dom/no-unknown-property": "warn",
  "react-dom/no-unsafe-iframe-sandbox": "warn",
  "react-dom/no-unsafe-target-blank": "warn",
};
