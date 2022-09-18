module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["@tinkoff/eslint-config/app", "@tinkoff/eslint-config-react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/naming-convention": "off",
  },
};
