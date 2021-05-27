const path = require('path')
const { EnvironmentPlugin } = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (_, { mode }) => ({
  devServer: {
    contentBase: 'public',
    port: 3000,
    // open: true,
    stats: 'errors-warnings'
  },
  devtool: mode === 'development' ? 'source-map' : undefined,
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    recoil: 'Recoil',
    'styled-components': 'styled'
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
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash][ext]'
        }
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
    new HtmlPlugin({ template: 'public/index.html' }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: '**/index.html'
          }
        }
      ]
    })
  ]
})
