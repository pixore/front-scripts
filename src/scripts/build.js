process.env.NODE_ENV = 'production'

const shell = require('shelljs')

const { setupCompile } = require('../utils')
const { BUILD_PATH } = require('../config/environment')

shell.exec('rimraf ' + BUILD_PATH)

setupCompile()
