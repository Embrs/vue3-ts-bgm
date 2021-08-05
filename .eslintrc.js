module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "dot-notation": "off", // Object 不強制用 "."
    "no-console": "off", // can console.log
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "error",
      {
        semi: true, // 使用分號,
        singleQuote: false, // 使用雙引號
        // arrowParens: "avoid", // fn = x => x 去除()框框
        trailingComma: "none", // 結尾逗號
        printWidth: 120
      }
    ]
  },
};
// https://prettier.io/docs/en/options.html
