const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  externals: [
    // /aws-sdk/, // Available on AWS Lambda
  ],
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json'
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'data', to: 'data' }
    ]),
    new UglifyJsPlugin()
  ],
  target: 'node'
};
