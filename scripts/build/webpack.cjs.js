const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.prod.js');

module.exports = merge(webpackConfig, {
  output: {
    filename: 'vue-shopify-draggable.cjs.js',
    libraryExport: 'default',
    libraryTarget: 'commonjs2',
  },
});
