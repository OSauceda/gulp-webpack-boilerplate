// Webpack configuration for production environment
const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack-config/webpack.config.base.js');

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  performance: {
    hints: false
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        terserOptions: {
          ecma: 5,
          mangle: true,
          beautify: false,
          compress: {
            drop_console: false
          },
          output: {
            comments: false
          }
        }
      })
    ]
  }
}

module.exports = webpackMerge(baseConfig, prodConfig)
