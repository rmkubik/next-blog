module.exports = {
  extends: "get-off-my-lawn",
  rules: {
    "arrow-body-style": "off",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "node/no-unsupported-features/node-builtins": [
      "error",
      {
        version: "^16.0.0",
      },
    ],
    "react/jsx-curly-brace-presence": "off",
    "react/jsx-filename-extension": "off",
    "react/react-in-jsx-scope": "off",
    "unicorn/filename-case": "off",
  },
};
