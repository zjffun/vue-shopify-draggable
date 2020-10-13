const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.common.js');

module.exports = merge(webpackConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {},
      },
    ],
  },
});
