const path = require('path');
const conf = require('./karma.base.conf.js');

module.exports = (config) => {
  config.set({
    ...conf,

    // set to development to keep function name for check constructor.name
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: [path.resolve(__dirname, '../../node_modules'), path.resolve(__dirname, '../../src/test')],
            enforce: 'post',
            use: {
              loader: 'istanbul-instrumenter-loader',
              options: { esModules: true },
            },
          },
        ],
      },
    },

    reporters: ['coverage'],

    coverageReporter: {
      // specify a common output directory
      dir: path.resolve(__dirname, '../../coverage'),
      reporters: [{ type: 'lcov', subdir: 'report-lcov' }],
    },
  });
};
