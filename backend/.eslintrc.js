module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-var": "error",
    "no-unused-vars": "warn",
    eqeqeq: "error",
    "default-case": "error",
    "no-console": "warn",
    "consistent-return": "error",
    "func-style": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "no-useless-return": "error",
    "no-plusplus": "error",
  },
};
