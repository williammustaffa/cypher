const path = require('path');

const CONTENT_PATH = path.resolve(__dirname, '..', 'public');

module.exports = require('./webpack.common').extend({
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    contentBase: CONTENT_PATH,
    publicPath: '/build/'
  }
});