module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['source-map-support', 'mocha', 'sinon'],
    files: [
      'src/tests.js',
    ],
    exclude: [],
    preprocessors: {
      'src/tests.js': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha', 'coverage', 'coveralls'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [/* 'Chrome', */'PhantomJS'],
    singleRun: false,
    webpack: require('./webpack/config.test'),
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
      dir: 'coverage/',
    },
  });
};
