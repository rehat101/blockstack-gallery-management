// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const server = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
  }),
  new CopyWebpackPlugin([ { from: 'src/assets/manifest.json', to: 'assets/manifest.json' } ]),
  new CopyWebpackPlugin([ { from: 'src/assets/images/icon-192x192.png', to: 'assets/icon-192x192.png' } ])
];

module.exports = { server };
