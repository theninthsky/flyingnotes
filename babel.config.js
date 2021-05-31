module.exports = {
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['babel-plugin-styled-components', { fileName: process.env.NODE_ENV === 'development' }]
  ]
}
