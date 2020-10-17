const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.prod.js');

module.exports = merge(webpackConfig, {
  output: {
    filename: 'index.js',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
});
