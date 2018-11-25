var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'morex.min.js'
  },
  resolve: {
    alias: {
      morex: path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          "presets": ["react",
            ["env", {
              "modules": false
            }]
          ],
          "plugins": [
            "transform-runtime", "transform-class-properties"
          ]
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 3000,
    host: '0.0.0.0'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      inject: true
    })
  ]
}