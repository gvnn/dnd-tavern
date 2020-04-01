const OFF = 0;
const ERROR = 2;

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-expressions': ERROR,
    '@typescript-eslint/no-unused-vars': [
      ERROR,
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/no-use-before-define': OFF,
    '@typescript-eslint/no-non-null-assertion': OFF,
    '@typescript-eslint/ban-ts-ignore': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/no-empty-function': OFF,
    '@typescript-eslint/no-empty-interface': OFF,
    '@typescript-eslint/no-inferrable-types': [
      ERROR,
      { ignoreParameters: true },
    ],
    // prefer TypeScript exhaustiveness checking
    // https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
    'default-case': OFF,
    'arrow-body-style': [ERROR, 'as-needed'],
  },
};
