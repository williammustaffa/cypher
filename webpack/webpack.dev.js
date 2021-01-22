const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const common = require('./common');

const SRC_PATH = path.resolve(__dirname, '..', 'demo');
const DIST_PATH = path.resolve(__dirname, '..', 'dist');

module.exports = common.extend({
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.join(SRC_PATH, 'index.ts'),
  output: {
    path: DIST_PATH,
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()],
  devServer: {
    port: 3000,
  },
});