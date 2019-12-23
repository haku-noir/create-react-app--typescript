const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [{
  cache: true,
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
  },
  context: path.resolve(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    path: __dirname + "/dist",
    filename: 'build.js',
    publicPath: '/dist',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
    })
  ]
}];
