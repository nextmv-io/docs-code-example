module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier", "@typescript-eslint"],
  rules: {
    // suppress 'React' must be in scope when using JSX errors
    // Next.js does this for you
    "react/react-in-jsx-scope": "off",
    quotes: ["error", "double"],
    "prettier/prettier": ["error"],
  },
};
