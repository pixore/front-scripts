const path = require('path')
const debug = require('debug')('pixore:front-scripts')
const webpack = require('webpack')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const { isProd, isDev, isTest, MAIN_TEMPLATE, APP_PATH, BUILD_PATH, PIXORE_PATH, ROOT_PATH, ESLINT_PATH } = require('./environment')

debug.namespace = ''

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.PIXORE_PATH': JSON.stringify(PIXORE_PATH),
    'process.env.pwd': isTest ? JSON.stringify(path.join(ROOT_PATH, 'src')) : false
  })
]

let devtool
let entry
let devServer
const externals = []

const modules = {
  rules: [{
    test: /\.js$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    exclude: /node_modules|webpackHotDevClient/
  }, {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: require('./babelrc')
  }, {
    test: /\.(jade|pug)$/,
    loader: 'pug-loader'
  }, {
    test: /\.css?$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  }, {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader',
        'sass-loader'
      ]
    })
  }, {
    test: /\.worker\.js?$/,
    use: [{
      loader: 'worker-loader',
      options: {
        name: 'workers/[name].[ext]'
      }
    }, 'babel-loader']
  }, {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    loader: 'file-loader',
    options: {
      name: 'assets/[name].[hash:8].[ext]'
    }
  }]
}

const resolve = {
  extensions: ['.js', '.css', '.scss', '.jade'],
  modules: [
    path.join(__dirname, '../../node_modules'),
    path.join(ROOT_PATH, 'node_modules')
  ]
}
const output = {
  pathinfo: true,
  publicPath: path.join('/', PIXORE_PATH),
  path: BUILD_PATH,
  filename: isProd ? '[name].[chunkhash].js' : 'build.js'
}

if (isProd) {
  entry = {
    index: APP_PATH
  }
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      title: 'Pixore',
      filename: 'index.html',
      template: MAIN_TEMPLATE
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  )
} else {
  entry = [
    require.resolve('../webpackHotDevClient'),
    require.resolve('../polyfills'),
    APP_PATH
  ]
  devtool = 'source-map'
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: {
          options: {
            cacheDirectory: true,
            configFile: ESLINT_PATH
          }
        }
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Pixore',
      filename: 'index.html',
      template: MAIN_TEMPLATE
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(path.resolve(path.join(ROOT_PATH, 'node_modules'))),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new StyleLintPlugin()
  )
}

module.exports = {
  watch: isDev,
  devtool,
  entry,
  output,
  externals,
  module: modules,
  plugins,
  resolve,
  devServer,
  performance: {
    hints: false
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, '../../node_modules'),
      path.join(ROOT_PATH, 'node_modules')
    ]
  }
}
