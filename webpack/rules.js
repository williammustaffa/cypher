const path = require('path');

module.exports = [
  {
    test: /\.(ts|js)$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/,
    loader: 'file-loader',
    options: {
      useRelativePath: true,
      publicPath: 'build/',
      name: function (file) {
        if (process.env.NODE_ENV !== 'production') {
          return 'assets/[path][name].[ext]';
        }
        return 'assets/[sha512:hash:base64:7].[ext]';
      },
    },
    exclude: [
      path.resolve(__dirname, 'node_modules'),
    ],
  },
]