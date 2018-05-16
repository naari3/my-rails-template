'use strict';

const webpack = require('webpack');
const targets = require('./config/frontend.js').entrypoints;
const { basename, extname, resolve } = require('path');

const entry = targets.reduce((acc, val) => {
  const name = basename(val, extname(val));
  return Object.assign(acc, {[name]: resolve(val)});
}, {});

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
  entry,
  output: {
    path: resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: '[name].js',
  },
  devtool: devtool,
  plugins: plugins,
  loader: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        enforce: 'post',
      },
    ],
  },
};
