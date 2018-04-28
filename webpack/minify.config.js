var glob = require('glob')
var path = require('path')
var webpack = require('webpack')

var files = glob.sync(path.resolve(__dirname, 'minifyingDependencies', '*.js'))
var entry = {}
for (var i in files) {
  var obj = path.parse(files[i])
  entry[obj.name] = files[i]
}

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'minfiles'),
    filename: '[name].min.js',
    libraryTarget: 'umd',
  },
  resolve: {
    modules: [
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'],
          },
        },
      },
    ],
  },
  externals: {
    'react': 'commonjs2 react',
    'react-dom': 'commonjs2 react-dom',
    'redux': 'commonjs2 redux',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false, //去除注释
      compress: {
        warnings: false, //忽略警告
      },
    }),
  ],
}
