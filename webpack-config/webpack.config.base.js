// Webpack Base config used for both development and production builds
const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const jsViews = glob.sync('./src/js/sections/**/*.js');

let bundleDest = path.resolve(`${__dirname}/../dist/assets`, 'js');

console.log(bundleDest);

const config = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    filename: '[name].js',
    path: bundleDest,
    publicPath: bundleDest
  },
  resolveLoader: {
    modules: ["node_modules"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/react"],
              comments: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
  ]
}

if (jsViews.length) {
  for (var i = 0; i < jsViews.length; i++) {
    config.entry[jsViews[i].replace('./src/js/', './').replace('.js', '')] = jsViews[i];
  }
}

module.exports = config;
