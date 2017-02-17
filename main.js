var path = require('path');
var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");
config.entry.unshift("webpack-dev-server/client?http://localhost:3000/");
var compiler = webpack(config);
var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/assets/js/',
  stats: { colors: true },
  hot: true,
  inline: true,
});
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(3000);
