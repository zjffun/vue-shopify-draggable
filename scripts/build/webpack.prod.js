const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.base.js');
const pkg = require('../../package.json');

module.exports = merge(webpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {},
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PKG_VERSION: JSON.stringify(pkg.version),
    }),
  ],
  optimization: {
    minimize: false,
  },
});
