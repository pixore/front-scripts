
const context = require.context(process.env.pwd, true, /src\/.+(\/__tests__\/).+\.spec\.js?$/)

context.keys().forEach(context)
