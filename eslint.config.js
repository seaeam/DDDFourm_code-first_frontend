import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  rules: {
    'unused-imports/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'ts/ban-ts-comment': 'off',
  },
  ignores: ['dist', 'node_modules', '.next', '**/*.d.ts'],
})
