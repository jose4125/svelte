// module.exports = {
//   ...require('prettierconfig/svelte-prettierrc-preset'),
// };
module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  plugins: ['prettier-plugin-svelte'],
  svelteStrictMode: false,
  svelteIndentScriptAndStyle: true,
  svelteSortOrder: 'options-scripts-markup-styles',
};
