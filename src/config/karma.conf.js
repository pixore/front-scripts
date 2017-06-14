const webpackConfig = require('./config/webpack.config')
const { ROOT_PATH } = require('./config/environment')
const path = require('path')

webpackConfig.devtool = 'cheap-module-source-map'
webpackConfig.watch = true
module.exports = config => {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      './tests.webpack.js',
      {pattern: path.join(ROOT_PATH, '/src/**/*.spec.js'), included: false, served: false, watched: true}
    ],
    preprocessors: {
      './tests.webpack.js': ['webpack']
    },
    plugin: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  })
}
