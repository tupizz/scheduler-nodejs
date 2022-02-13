module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  rules: {
    'no-plusplus': 0,
    'class-methods-use-this': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'jsx-quotes': ['error', 'prefer-single'],
    quotes: [2, 'single', { avoidEscape: true }],
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
  },
};
