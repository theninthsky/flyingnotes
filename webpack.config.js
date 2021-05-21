const path = require('path')
const { EnvironmentPlugin } = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')

module.exports = {
  devServer: {
    contentBase: 'build',
    port: 3000,
    // open: true,
    stats: 'errors-warnings'
  },
  devtool: 'source-map',
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development',
      PUBLIC_URL: '',
      REACT_APP_SERVER_URL: 'http://localhost:5000',
      REACT_APP_WS_SERVER_URL: 'ws://localhost:5000'
    }),
    new ESLintPlugin(),
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new InterpolateHtmlPlugin({ PUBLIC_URL: 'public' })
  ]
}
