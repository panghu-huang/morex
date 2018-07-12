var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, './example/src/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'morex.min.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader')
      },
    ]
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'example')
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './dist/index.html'),
      inject: true
    })
  ]
}