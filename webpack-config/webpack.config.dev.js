// Webpack configuration for development environment
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

const devConfig = {
  watch: true,
  devtool: 'inline-source-map',
  mode: 'development',
}

module.exports = webpackMerge(baseConfig, devConfig)
