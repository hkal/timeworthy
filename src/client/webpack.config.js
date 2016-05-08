const path = require('path');

const webpackConfig = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, '../server/static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      }
    ]
  }
};

module.exports = webpackConfig;
