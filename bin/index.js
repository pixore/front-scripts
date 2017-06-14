#! /usr/bin/env node

process.env.DEBUG = 'pixore, pixore:*'

const {input} = require('parse-cmd-args')()
const debug = require('debug')('pixore')

switch (input) {
  case 'start':
    require('../src/scripts/start')
    break
  default:
    debug('Unknown script "' + input + '".')
    break
}
