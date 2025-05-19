module.exports = {
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx", "*.json", "*.mjs"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              ["^react", "^next", "^(?!@)", "^"],
              ["^@"],
              ["^\\u0000"],
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              ["^.+\\.?(css)$"],
            ],
          },
        ],
      },
    },
  ],
  plugins: ["perfectionist", "prettier", "simple-import-sort", "jsx-a11y"],
  rules: {
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/ban-ts-comment": [
      "warn",
      {
        "ts-ignore": "off",
      },
    ],
    "@typescript-eslint/ban-tslint-comment": "error",
    "@typescript-eslint/consistent-generic-constructors": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        fixStyle: "inline-type-imports",
        prefer: "type-imports",
      },
    ],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      },
    ],
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_" }],
    "@typescript-eslint/padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        next: [
          "class",
          "export",
          "return",
          "function",
          "interface",
          "type",
          "if",
          "switch",
          "try",
        ],
        prev: ["*"],
      },
      {
        blankLine: "any",
        next: ["export"],
        prev: ["export"],
      },
    ],
    "@typescript-eslint/sort-type-constituents": "error",
    "@typescript-eslint/space-infix-ops": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "array-bracket-spacing": ["error", "never"],
    "arrow-body-style": ["error", "as-needed"],
    indent: "off",
    "jsx-a11y/alt-text": [
      "error",
      {
        area: ["*"],
        elements: ["img"],
        img: ["Image", "NextImage"],
      },
    ],
    "no-console": ["error", { allow: ["warn", "log", "error"] }],
    "no-irregular-whitespace": "warn",
    "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            importNames: ["Heading", "Text"],
            message:
              "Please import `Heading` from your custom wrapper file, e.g., `@/components/...`.",
            name: "@chakra-ui/react",
          },
        ],
      },
    ],
    "no-unneeded-ternary": ["error", { defaultAssignment: false }],
    "object-curly-spacing": ["error", "always"],
    "perfectionist/sort-jsx-props": [
      "error",
      {
        customGroups: {
          active: "_active",
          hover: "_hover",
        },
        groups: ["hover", "active"],
        type: "natural",
      },
    ],
    "perfectionist/sort-objects": [
      "error",
      {
        order: "asc",
        type: "alphabetical",
      },
    ],
    "prettier/prettier": "error",
    "react/display-name": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      { children: "never", propElementValues: "always", props: "never" },
    ],
    "react/jsx-curly-spacing": [
      2,
      {
        spacing: {
          objectLiterals: "never",
        },
        when: "never",
      },
    ],
    "react/jsx-equals-spacing": [2, "never"],
    "react/jsx-first-prop-new-line": [2, "multiline"],
    "react/jsx-fragments": "error",
    "react/jsx-indent-props": [2, 2],
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/jsx-props-no-multi-spaces": "error",
    "react/jsx-tag-spacing": [2, { beforeSelfClosing: "always" }],
    "react/no-arrow-function-lifecycle": "error",
    "react/no-invalid-html-attribute": "error",
    "react/no-unescaped-entities": "warn",
    "react/prefer-stateless-function": "error",
    "react/require-render-return": "error",
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    semi: ["error", "always"],
    "simple-import-sort/exports": "error",
    "space-in-parens": ["error", "never"],
    "template-curly-spacing": ["error", "never"],
  },
};
