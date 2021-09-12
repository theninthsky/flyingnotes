const path = require('path')
const { EnvironmentPlugin } = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const cdn = {
  react: {
    development: {
      url: 'https://unpkg.com/react@17.0.2/umd/react.development.js',
      integrity: 'sha384-xQwCoNcK/7P3Lpv50IZSEbJdpqbToWEODAUyI/RECaRXmOE2apWt7htari8kvKa/'
    },
    production: {
      url: 'https://unpkg.com/react@17.0.2/umd/react.production.min.js',
      integrity: 'sha384-7Er69WnAl0+tY5MWEvnQzWHeDFjgHSnlQfDDeWUvv8qlRXtzaF/pNo18Q2aoZNiO'
    }
  },
  reactDOM: {
    development: {
      url: 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js',
      integrity: 'sha384-E9IgxDsnjKgh0777N3lXen7NwXeTsOpLLJhI01SW7idG046SRqJpsW2rJwsOYk0L'
    },
    production: {
      url: 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js',
      integrity: 'sha384-vj2XpC1SOa8PHrb0YlBqKN7CQzJYO72jz4CkDQ+ePL1pwOV4+dn05rPrbLGUuvCv'
    }
  },
  reactRouterDOM: {
    url: 'https://unpkg.com/react-router-dom@5.3.0/umd/react-router-dom.min.js',
    integrity: 'sha384-VmS7yrSB7tSR+cbeXvcJNJ0nE48GZti0Bl3Y/i/Us/AZSfxogYrnopHE7vfB2T/w'
  },
  pwaCompat: {
    url: 'https://unpkg.com/pwacompat@2.0.17/pwacompat.min.js',
    integrity: 'sha384-Rli908ex+eSk6Xo0v7OWhTha8ooKKFI2XDTQMLlU3yp5VrrY3+K6DmULV2FWtYbM'
  }
}

module.exports = (_, { mode }) => {
  const development = mode === 'development'
  const production = mode === 'production'
  const { react, reactDOM, reactRouterDOM, pwaCompat } = cdn

  return {
    devServer: {
      historyApiFallback: true,
      port: 3000,
      open: true,
      hot: false,
      devMiddleware: { stats: 'errors-warnings' }
    },
    devtool: development ? 'source-map' : undefined,
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['*', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: { localIdentName: '[name]_[local]-[hash:base64:5]' },
                importLoaders: 2
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack']
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name].[hash][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash][ext]'
          }
        }
      ]
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
      },
      minimizer: [`...`, new CssMinimizerPlugin()]
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-router-dom': 'ReactRouterDOM'
    },
    plugins: [
      new EnvironmentPlugin({
        SERVER_URL: 'http://localhost:5000',
        WS_SERVER_URL: 'ws://localhost:5000'
      }),
      new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
      new ESLintPlugin(),
      new HtmlPlugin({
        template: 'public/index.html',
        react: react[mode],
        reactDOM: reactDOM[mode],
        reactRouterDOM,
        pwaCompat
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: { ignore: '**/index.html' }
          }
        ]
      }),
      ...(production ? [new WorkboxPlugin.InjectManifest({ swSrc: './public/stale-while-revalidate-sw.js' })] : [])
    ]
  }
}
