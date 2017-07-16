process.env.NODE_ENV = 'test'
const glob = require('glob')
const { flags } = require('parse-cmd-args')()
const Mocha = require('mocha')
const Server = require('karma').Server
const debug = require('debug')('pixore:front-scripts')

const babelConfig = require('../config/babelrc.js')
const { validStructure } = require('../utils')
const karmaConfig = require.resolve('../config/karma.conf.js')

validStructure()

const withKarma = flags['--karma']

if (withKarma) {
  const server = new Server({
    configFile: karmaConfig
  }, (exitCode) => {
    debug('Karma has exited with ' + exitCode)
    process.exit(exitCode)
  })
  server.start()
} else {
  require('babel-register')(babelConfig)
  const mocha = new Mocha()
  glob('src/**/__tests__/*.spec.js', function (err, files) {
    if (err) {
      debug(err)
      process.exit(1)
    }
    files.forEach((file) => mocha.addFile(file))
    mocha.run(failures => process.on('exit', () => process.exit(failures)))
  })
}
