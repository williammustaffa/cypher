var path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src', 'demo.js')
  ],
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0'],
        }
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: 'main.js',
  },
};
