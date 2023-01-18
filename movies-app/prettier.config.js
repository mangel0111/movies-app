/* eslint-env node */
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 100,
  bracketSameLine: true,
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'auto',
  singleAttributePerLine: false,
};
