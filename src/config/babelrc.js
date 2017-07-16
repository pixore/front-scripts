
module.exports = {
  plugins: [
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('transform-class-properties')
  ],
  presets: [
    [
      require.resolve('babel-preset-es2015'),
      {
        'modules': false
      }
    ],
    require.resolve('babel-preset-react')
  ],
  ignore: [
    'webpackHotDevClient',
    'node_modules'
  ]
}
