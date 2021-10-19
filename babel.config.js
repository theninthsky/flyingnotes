module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { browsers: 'defaults and supports es6-module' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: ['@babel/plugin-transform-runtime']
}
