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
  overrides: [
    {
      files: [
        '.prettierrc',
        '.eslintrc',
        '.babelrc',
        '.tern-project',
        '.stylelintrc',
        '.lighthouserc',
      ],
      options: {
        parser: 'json',
      },
    },
    {
      files: ['package.json'],
      options: {
        printWidth: 180,
      },
    },
  ],
};
