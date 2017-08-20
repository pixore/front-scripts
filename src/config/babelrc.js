
const { isTest } = require('./environment')

module.exports = {
  plugins: [
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-class-properties')
  ],
  presets: [
    [
      require.resolve('babel-preset-env'),
      {
        targets: {
          browsers: ['last 1 Chrome versions']
        },
        modules: isTest ? 'commonjs' : false
      }
    ],
    require.resolve('babel-preset-react')
  ],
  ignore: [
    'webpackHotDevClient',
    'node_modules'
  ]
}
