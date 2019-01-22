const path = require('path');
// const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


// copy manifest.json to the path: 'public/build'
// this will allow for the authRequest to see the file at www.example.com/manifest.json
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestAssetPlugin = new CopyWebpackPlugin([ { from: 'src/assets/manifest.json', to: 'manifest.json' } ]);
const IconAssetPlugin = new CopyWebpackPlugin([ { from: 'src/images/icon-192x192.png', to: 'icon-192x192.png' } ]);

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/index.js',
  target: 'web',
  output: {
    path: path.resolve('public/build'),
    filename: 'index_bundle.js',
    chunkFilename: '[name].[contenthash].js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          reuseExistingChunk: true,
          chunks: 'all',
        },
        lodash: {
          test: /[\\/]lodash[\\/]/,
          name: 'lodash',
          chunks: 'all',
        },
        blockstack: {
          test: /[\\/]blockstack[\\/]/,
          name: 'blockstack',
          reuseExistingChunk: true,
          chunks: 'all',
        },
        mobx: {
          test: /[\\/]mobx[\\/]/,
          name: 'mobx',
          reuseExistingChunk: true,
          chunks: 'all',
        }
      }
    }
  },
  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: 'file-loader!url-loader',
      }
    ]
  },
  plugins: [new BundleAnalyzerPlugin(),HtmlWebpackPluginConfig, ManifestAssetPlugin, IconAssetPlugin]
};
