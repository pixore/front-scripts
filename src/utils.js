
const path = require('path')
const fs = require('fs')
const debug = require('debug')('pixore')
const debugError = require('debug')('pixore:error')
const chalk = require('chalk')
const webpack = require('webpack')
const assign = require('lodash.assign')
const appRoot = fs.realpathSync(process.cwd())
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')

debugError.color = require('debug').colors[5]

const { APP_PATH, ROOT_PATH } = require('./config/environment')
const config = require('./config/webpack.config.js')

let customConfig = {}
if (fs.existsSync(path.join(appRoot, 'webpack.config.js'))) {
  customConfig = require(path.join(appRoot, 'webpack.config.js'))
}

const eslintFilePath = path.join(appRoot, '.eslintrc.js')

exports.setupCompile = () => {
  const compiler = webpack(assign(config, customConfig))

  compiler.plugin('invalid', function () {
    debug('Compiling...')
  })

  compiler.plugin('done', function (stats) {
    var messages = formatWebpackMessages(stats.toJson({}, true))
    var isSuccessful = !messages.errors.length && !messages.warnings.length

    if (isSuccessful) {
      debug(chalk.green('Compiled successfully!'))
    }

    if (messages.errors.length) {
      debug(chalk.red('Failed to compile.'))
      debug()
      messages.errors.forEach(message => {
        debug(message)
        debug()
      })
    }

    if (messages.warnings.length) {
      debug(chalk.yellow('Compiled with warnings.'))
      debug()
      messages.warnings.forEach(message => {
        debug(message)
        debug()
      })
    }
  })
  return compiler
}

exports.validStructure = () => {
  if (!fs.existsSync(APP_PATH)) {
    debugError(APP_PATH.replace(ROOT_PATH, '') + ' doesn\'t exists')
    process.exit(1)
  }
  if (!fs.existsSync(eslintFilePath)) {
    debugError(eslintFilePath.replace(ROOT_PATH, '') + ' doesn\'t exists')
    process.exit(1)
  }
}
