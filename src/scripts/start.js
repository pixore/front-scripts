
const Promise = require('bluebird')
const debug = require('debug')('pixore')
const historyApiFallback = require('connect-history-api-fallback')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const config = require('../config/webpack.config')
const { PORT, PIXORE_PATH } = require('../config/environment')
const { rewriteListen } = require('../webpackDevServer')
const { validStructure, setupCompile } = require('../utils')

validStructure()

rewriteListen(WebpackDevServer)

const runDevServer = compiler => new WebpackDevServer(compiler, {
  compress: true,
  clientLogLevel: 'none',
  contentBase: false,
  hot: true,
  publicPath: config.output.publicPath,
  quiet: true,
  watchOptions: {
    ignored: /node_modules/
  }
})

const addMiddleware = devServer => {
  devServer
    .use(historyApiFallback({
      disableDotRule: true,
      htmlAcceptHeaders: ['text/html', '*/*']
    }))
  devServer.use(devServer.middleware)
  return devServer
}
const onListen = (err, result) => {
  if (err) {
    return debug(err)
  }
  debug(chalk.cyan('Starting the development server...'))
  debug(chalk.cyan('PORT: ', PORT))
  debug(chalk.cyan('PATH: ', PIXORE_PATH))
}

const run = () =>
  Promise.resolve()
    .then(setupCompile)
    .then(runDevServer)
    .then(addMiddleware)
    .then(devServer => devServer.listen(PORT, onListen))

run()
