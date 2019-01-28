const path = require('path');
const plugins = require('./plugins');
const loaders = require('./loaders');

const config = {
  entry: './src/index.js',
  mode: 'development',
  target: 'web',
  output: {
    path: path.resolve('public/build'),
    filename: 'index_bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  optimization: {
    sideEffects: true,
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      name: true,
      maxInitialRequests: 5,
      maxAsyncRequests: 7,
      cacheGroups: {
        commons: {
          test: /[\\/](react|react-dom|blockstack|lodash?.?\w+)[\\/]/,
          name: 'commons'
        }
      }
    }
  },
  module: { rules: loaders.server },
  plugins: [ ...plugins.server ]
};

module.exports = config;
