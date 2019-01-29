// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const server = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
  }),
  new CopyWebpackPlugin([ { from: 'src/assets/manifest.json', to: 'manifest.json' } ]),
  new CopyWebpackPlugin([ { from: 'src/assets/images/icon.png', to: 'icon.png' } ]),
  new CopyWebpackPlugin([ { from: 'src/assets/logo.png', to: 'logo.png' } ]),
  new CopyWebpackPlugin([ { from: 'netlify.toml', to: 'netlify.toml' } ])
];

module.exports = { server };
