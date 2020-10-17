const path = require('path');

module.exports = {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    library: 'VueShopifyDraggable',
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules'],
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue',
    },
    '@shopify/draggable': {
      commonjs: '@shopify/draggable',
      commonjs2: '@shopify/draggable',
      amd: 'Draggable',
      root: 'Draggable',
    },
  },
};
