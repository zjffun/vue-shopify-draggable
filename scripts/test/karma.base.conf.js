module.exports = {
  browsers: ['ChromeHeadless'],

  basePath: '',

  frameworks: ['jasmine'],

  files: [
    { pattern: '../../node_modules/vue/dist/vue.js', watched: false },
    { pattern: '../../src/**/tests/**/*.js', watched: false },
  ],

  preprocessors: {
    '../../src/**/tests/**/*.js': ['webpack'],
  },

  webpack: {
    mode: 'production',
  },
};
