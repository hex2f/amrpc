module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/no-for-in-array': 0,
    '@typescript-eslint/return-await': 0,
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/method-signature-style': 0,
    'promise/param-names': 0,
    'no-multi-str': 0
  }
}
