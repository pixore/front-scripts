
const { isTest } = require('./environment')

module.exports = {
  plugins: [
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-class-properties')
  ],
  presets: [
    [
      require.resolve('babel-preset-es2015'),
      {
        'modules': isTest ? 'commonjs' : true
      }
    ],
    require.resolve('babel-preset-react')
  ],
  ignore: [
    'webpackHotDevClient',
    'node_modules'
  ]
}
