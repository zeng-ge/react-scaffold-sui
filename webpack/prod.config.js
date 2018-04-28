const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const devConfig = require('./dev.config')

process.env.NODE_ENV = 'PROD'

const prodConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
}

module.exports = webpackMerge(devConfig, prodConfig)
