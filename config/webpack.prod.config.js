const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.base');

const config = {
  ...baseConfig,
  mode: 'production',
  optimization: {
    ...baseConfig.optimization,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6
        }
      })
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin(),
    ...baseConfig.plugins
  ]
};

module.exports = config;
