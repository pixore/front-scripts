const webpackConfig = require('./webpack.config')
// const { ROOT_PATH } = require('./environment')
// const path = require('path')

webpackConfig.devtool = 'cheap-module-source-map'
webpackConfig.watch = true
Object.assign(webpackConfig.externals, {
  'react/lib/ExecutionEnvironment': true,
  'react/addons': true,
  'react/lib/ReactContext': 'window'
})

const testPath = require.resolve('./tests.webpack.js')
module.exports = config => {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      './tests.webpack.js'
    ],
    preprocessors: {
      [testPath]: ['webpack']
    },
    plugin: [
      require('karma-chrome-launcher'),
      require('karma-mocha'),
      require('karma-sourcemap-loader'),
      require('karma-webpack')
    ],
    reporters: ['mocha'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  })
}
