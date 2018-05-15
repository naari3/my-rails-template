'use strict';

const webpack = require('webpack');
const { basename, extname, resolve } = require('path');

let devtool = false;

let mode = process.env.NODE_ENV || process.env.RAILS_ENV || 'development';

let plugins = [
  new webpack.IgnorePlugin(/\.\/locale$/),
  new webpack.DefinePlugin({
    NODE_ENV: mode,
  }),
];

module.exports = {
  mode,
  cache: true,
  entry: ['app/frontends/application.js'],
  output: {
    path: resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: '[name].js',
  },
  devtool: devtool,
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.(js|tag)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        enforce: 'post',
      },
    ],
  },
};
