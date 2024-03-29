module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/prop-types": "off",
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "no-var": "error",
    "no-unused-vars": "warn",
    eqeqeq: "error",
    "default-case": "error",
    "no-console": "warn",
    "func-style": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "no-useless-return": "error",
    "no-plusplus": "error",
  },
};
