#! /usr/bin/env node

process.env.DEBUG = 'pixore:front-scripts, pixore:error'

const {input} = require('parse-cmd-args')()
const debug = require('debug')('pixore:front-scripts')

switch (input) {
  case 'start':
    require('../src/scripts/start')
    break
  default:
    debug('Unknown script "' + input + '".')
    break
}
