const conf = require('./karma.base.conf.js');

module.exports = (config) => {
  config.set({
    ...conf,

    // set to development to keep function name for check constructor.name
    webpack: {
      mode: 'development',
    },
  });
};
