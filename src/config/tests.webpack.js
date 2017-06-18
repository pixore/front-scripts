
const context = require.context(process.env.pwd, true, /.+(__tests__\/).+\.spec\.js?$/)

context.keys().forEach(context)
