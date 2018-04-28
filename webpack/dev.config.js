import fs from 'fs'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')

const baseConfig = require('./base.config')
let proxyConfig = require('./proxy.config')

const updateProxy = () => {
  delete require.cache[require.resolve('./proxy.config')]
  try {
    proxyConfig = require('./proxy.config')
  } catch (e) {
    console.error('hot replace proxy fail')
  }
}
fs.watchFile(path.resolve(__dirname, './proxy.config.js'), updateProxy)

const devConfig = {
  entry: {
    app: [
      'react-hot-loader/patch',
      path.resolve(__dirname, '../app/index.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      filename: 'index.html',
      chunks: ['vendor', 'app'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: '../dist',
    disableHostCheck: true,
    hot: true,
    host: 'localhost.paas.cmbuat.com',
    proxy: () => proxyConfig,
  },
}

module.exports = webpackMerge(baseConfig, devConfig)
