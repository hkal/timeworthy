const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, '../server/static'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true
      }
    })
  ],
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
        test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};

module.exports = webpackConfig;
