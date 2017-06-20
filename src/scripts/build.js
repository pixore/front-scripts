process.env.NODE_ENV = 'production'
process.env.DEBUG = 'pixore:front-scripts, pixore:dev, pixore:error'

const rimraf = require('rimraf')
const debugError = require('debug')('pixore:error')
const debug = require('debug')('pixore:front-scripts')
const { setupCompile } = require('../utils')
const { BUILD_PATH } = require('../config/environment')

debug.namespace = ''
debugError.color = require('debug').colors[5]

debug('Deleting build folder...')
rimraf.sync(BUILD_PATH)

setupCompile().run(() => {})
