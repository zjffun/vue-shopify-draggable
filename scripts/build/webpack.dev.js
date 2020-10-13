const { merge } = require('webpack-merge');
const webpackUMDConfig = require('./webpack.umd.js');

module.exports = merge(webpackUMDConfig, {
  mode: 'development',
  devtool: 'cheap-source-map',
  watch: true,
});
