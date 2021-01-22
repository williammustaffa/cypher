const { mergeWithCustomize } = require('webpack-merge');
const { uniq, merge } = require('lodash');

// Configs
const rules = require('./rules');
const alias = require('./alias');

const configs = {
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