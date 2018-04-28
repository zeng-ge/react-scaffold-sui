const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCss = new ExtractTextPlugin({
  filename: 'global_styles_[name].css',
  allChunks: true,
})
const extractLess = new ExtractTextPlugin({
  filename: 'styles_[name].css',
  allChunks: true,
})

module.exports = {
  entry: {
    vendor: ['babel-polyfill'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      assets: path.resolve(__dirname, '../app/assets'),
      constants: path.resolve(__dirname, '../app/constants'),
    },
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        // use: extractLess.extract({
        //   fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]-[hash:base64:5]',
            },
          },
          // {
          //   loader: 'postcss-loader',
          // },
          {
            loader: 'less-loader',
          },

        ],
        // }),
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30000,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')], { root: path.resolve(__dirname ) }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'local',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    extractCss,
    extractLess,
  ],
}
