
module.exports = {
  plugins: [
    'transform-object-rest-spread'
  ],
  presets: [
    [
      'es2015',
      {
        'modules': false
      }
    ],
    'react'
  ],
  ignore: [
    'webpackHotDevClient',
    'node_modules'
  ]
}
