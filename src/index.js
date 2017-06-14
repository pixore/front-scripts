const fs = require('fs')
const createDebug = require('debug')
const appRoot = fs.realpathSync(process.cwd())
const error = createDebug('error')
error.color = createDebug.colors[5]

error(appRoot)
