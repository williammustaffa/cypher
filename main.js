/* eslint-disable */
var path = require('path');
var opn = require('opn');
var express = require('express');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var devServerPort = process.env.PORT || 3000;
config.entry.unshift('webpack-dev-server/client?http://localhost:' + devServerPort + '/');
var compiler = webpack(config);

var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/build/',
  stats: { colors: true },
  hot: true,
  inline: true,
  disableHostCheck: true
});

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(devServerPort, function () {
  opn('http://localhost:' + devServerPort);
});
