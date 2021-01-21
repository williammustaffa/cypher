const path = require('path');
const { mergeWithCustomize } = require('webpack-merge');
const { uniq, merge } = require('lodash');

// Configs
const rules = require('./rules');
const alias = require('./alias');

// Paths
const SRC_PATH = path.resolve(__dirname, '..', 'demo');
const DIST_PATH = path.resolve(__dirname, '..', 'dist', 'build');

const configs = {
  entry: path.join(SRC_PATH, 'index.ts'),
  output: {
    path: DIST_PATH,
    filename: 'bundle.js',
  },
  module: { rules: rules },
  resolve: {
    alias: alias,
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};

module.exports = {
  extend: function (data) {
    const customMerge = mergeWithCustomize({
      customizeArray: (a, b) => uniq([...a, ...b]),
      customizeObject: (a, b) => merge({}, a, b),
    });

    return customMerge(configs, data);
  },
}