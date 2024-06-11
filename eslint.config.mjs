import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import airbnbConfig from "eslint-config-airbnb";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    files: ["**/*.jsx"],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  pluginReactConfig,
  airbnbConfig,
  {
    rules: {
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
      "object-curly-newline": [
        "error",
        {
          ObjectExpression: "always",
          ObjectPattern: { multiline: true },
          ImportDeclaration: "never",
          ExportDeclaration: { multiline: true, minProperties: 3 },
        },
      ],
      beforeStatementContinuationChars: "never",
    },
  },
];
