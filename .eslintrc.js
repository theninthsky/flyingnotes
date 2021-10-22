module.exports = {
  env: { node: true, browser: true, es2021: true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'no-async-promise-executor': 'off',
    'no-unused-vars': 'warn'
  },
  settings: {
    react: { version: 'detect' }
  }
}
