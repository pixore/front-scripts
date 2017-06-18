process.env.NODE_ENV = 'test'

const Server = require('karma').Server
const debug = require('debug')('pixore:front-scripts')

const { validStructure } = require('../utils')
const karmaConfig = require.resolve('../config/karma.conf.js')

validStructure()

const server = new Server({
  configFile: karmaConfig
}, (exitCode) => {
  debug('Karma has exited with ' + exitCode)
  process.exit(exitCode)
})

server.start()
