import type { NextRules } from "./types.gen";

const core: NextRules = {
  "@next/next/inline-script-id": "error", // Required for Next.js to track and optimize the script
  "@next/next/no-assign-module-variable": "error", // The module variable is already used
  "@next/next/no-async-client-component": "error", // React Client Components can't be async functions
  "@next/next/no-before-interactive-script-outside-document": "error", // next/script can't be used with the beforeInteractive strategy outside a root layout or pages/_document.js
  "@next/next/no-head-import-in-document": "error", // Can cause unexpected issues
  "@next/next/no-script-component-in-head": "error", // The next/script component should not be used in a next/head component

  "@next/next/google-font-display": "warn",
  "@next/next/google-font-preconnect": "warn",
  "@next/next/next-script-for-ga": "warn",
  "@next/next/no-css-tags": "warn",
  "@next/next/no-document-import-in-page": "warn",
  "@next/next/no-duplicate-head": "warn",
  "@next/next/no-head-element": "warn",
  "@next/next/no-img-element": "warn",
  "@next/next/no-location-assign-relative-destination": "warn",
  "@next/next/no-page-custom-font": "warn",
  "@next/next/no-styled-jsx-in-document": "warn",
  "@next/next/no-title-in-document-head": "warn",
  "@next/next/no-typos": "warn",
  "@next/next/no-unwanted-polyfillio": "warn",
};

const vitals: NextRules = {
  "@next/next/no-html-link-for-pages": "warn",
  "@next/next/no-sync-scripts": "warn",
};

export { core, vitals };
