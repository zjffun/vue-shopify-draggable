const conf = require('./karma.base.conf.js');

module.exports = (config) => {
  config.set({
    ...conf,

    browsers: [
      ...conf.browsers,
      'Chrome',
      'Firefox',
      // 'IE'
    ],

    files: [
      { pattern: '../../node_modules/vue/dist/vue.js', watched: false },
      { pattern: '../../src/**/tests/**/*.js', watched: false },
    ],

    webpack: {
      mode: 'development',
    },
  });
};
