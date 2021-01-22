const path = require('path');
const common = require('./webpack.common');

const SRC_PATH = path.resolve(__dirname, '..', 'src');
const DIST_PATH = path.resolve(__dirname, '..', 'dist');

module.exports = common.extend({
  mode: 'production',
  entry: path.join(SRC_PATH, 'index.ts'),
  output: {
    path: DIST_PATH,
    filename: 'bundle.js',
  },
});