const { ROOT_PATH } = require('./environment')

const context = require.context(ROOT_PATH, true, /.+(__tests__\/).+\.spec\.js?$/)

context.keys().forEach(context)
