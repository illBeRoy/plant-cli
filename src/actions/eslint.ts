import { writeFile } from '../utils/fs';

export const defaultPluginPackages = ['@typescript-eslint/parser', '@typescript-eslint/eslint-plugin'];

export const defaultEslintRc = `
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    semi: 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'object-curly-spacing': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    'space-infix-ops': 'error'
  }
};
`

export const initESLint = async (eslintRc = defaultEslintRc) => {
  await writeFile('.eslintrc.js', eslintRc);
}

