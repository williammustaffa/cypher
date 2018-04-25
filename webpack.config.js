var path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src', 'Game.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    filename: 'main.js',
  },
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'core/lib/'),
      utils: path.resolve(__dirname, 'core/utils/'),
      entities: path.resolve(__dirname, 'core/entities/'),
      actors: path.resolve(__dirname, 'src/actors/'),
      scenes: path.resolve(__dirname, 'src/scenes/'),
      sounds: path.resolve(__dirname, 'src/sounds/'),
      sprites: path.resolve(__dirname, 'src/sprites/')
    },
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "core"),
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0'],
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          useRelativePath: true,
          publicPath: 'build/',
          name: function(file) {
            if (process.env.NODE_ENV !== 'production') {
              return 'assets/[path][name].[ext]';
            }
            return 'assets/[sha512:hash:base64:7].[ext]';
          }
        },
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
      },
    ],
  },
};
