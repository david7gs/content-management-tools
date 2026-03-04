import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
// extends: ["js/recommended"],

export default defineConfig([
  {
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
    ],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: pluginReact,
    },
    languageOptions: { globals: globals.browser },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "no-unused-vars": "warn",
      "no-undef": "warn",
      indent: ["error", 2],
      "no-console": [0],
      semi: "error",
      "prefer-const": "error",
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
