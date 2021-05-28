module.exports = {
  env: { node: true, browser: true, es2021: true },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-async-promise-executor': 'off',
    'no-unused-vars': 'warn'
  },
  settings: {
    react: { version: 'detect' }
  }
}
