import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint, { parser } from "typescript-eslint";
import jestPlugin from "eslint-plugin-jest";

/**
 * **recommended rules from `@eslint/js`**
 * - usage: `pluginJs.configs.recommended`
 * - [link](https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js)
 *
 * **recommended rules from `typescript-eslint`**
 * - usage: `...tseslint.configs.recommended`
 * - [link](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts)
 *
 * If you want to ignore some of these,
 * ```
 * rules: {
 *  'some-of-rules': 'off',
 * }
 * ```
 */
export default [
  {
    files: ["src/**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.spec.{js,ts}"],
    ...jestPlugin.configs["flat/recommended"],
  },
];