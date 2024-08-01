import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,

  {
    rules: {
      "import/extensions": [
        "error",
      ],
      "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "always" }],
      "class-methods-use-this": "off",
      "ignorePackages": {
        "ts": "never"
      },
	    "prettier/prettier": "error",
    },
    extends: [
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended"
    ],
    plugins: [
      "@typescript-eslint",
      "prettier"
    ],
    settings: {
      "import-resolver": {
        "typescript": {}
      }
    },
  },
];
