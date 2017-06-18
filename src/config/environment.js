const { flags } = require('parse-cmd-args')()

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')

const appRoot = process.cwd()
const mainPackage = require(path.join(appRoot, 'package.json'))

const config = {}

config.isTest = process.env.NODE_ENV === 'test'
config.isProd = process.env.NODE_ENV === 'production'
config.isDev = process.env.NODE_ENV === 'development'
config.PORT = Number(process.env.PORT) || Number(flags['--port']) || 80
config.PIXORE_PATH = process.env.PIXORE_PATH || mainPackage.pixorePath || ''
config.ROOT_PATH = appRoot
config.ESLINT_PATH = path.join(config.ROOT_PATH, '.eslintrc.js')
config.BUILD_PATH = path.join(config.ROOT_PATH, 'build')
config.SRC_PATH = path.join(config.ROOT_PATH, 'src')
config.APP_PATH = path.join(config.SRC_PATH, 'index.js')
config.MODULES_PATH = path.join(config.ROOT_PATH, 'node_modules')
config.ASSETS_PATH = path.join(config.SRC_PATH, 'assets')
config.TEMPLATE_PATH = path.join(config.SRC_PATH, 'templates')
config.MAIN_TEMPLATE = path.join(config.TEMPLATE_PATH, 'production.pug')

if (config.isDev) {
  config.MAIN_TEMPLATE = path.join(config.TEMPLATE_PATH, 'development.pug')
}

module.exports = config
