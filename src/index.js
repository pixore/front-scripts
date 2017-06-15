
const createDebug = require('debug')
const error = createDebug('error')
error.color = createDebug.colors[5]

error.namespace = ''

error('', error)
