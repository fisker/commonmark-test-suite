import fiskerEslintConfig from '@fisker/eslint-config'

export default [
  {ignores: ['data/*', '.cache/*', 'index.js']},
  ...fiskerEslintConfig,
]
