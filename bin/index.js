#! /usr/bin/env node

process.env.DEBUG = 'pixore:front-scripts, pixore:error'

const {input} = require('parse-cmd-args')()
const debug = require('debug')('pixore:front-scripts')
const path = require('path')

debug(process.env.PWD)
debug(path.resolve(__dirname))
debug(process.cwd())

switch (input) {
  case 'start':
    require('../src/scripts/start')
    break
  case 'test':
    require('../src/scripts/test')
    break
  default:
    debug('Unknown script "' + input + '".')
    break
}
