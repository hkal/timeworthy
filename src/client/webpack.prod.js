const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DefinePlugin = webpack.DefinePlugin;

webpackConfig.plugins = [
  new UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
]

module.exports = webpackConfig;
